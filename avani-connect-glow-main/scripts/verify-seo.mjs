// scripts/verify-seo.mjs
// ─────────────────────────────────────────────────────────────────────────────
// Regression check for the SEO fixes. Run against a completed build:
//
//   npm run build && node scripts/verify-seo.mjs
//
// Exits non-zero if any check fails, so it can gate a deploy.
// ─────────────────────────────────────────────────────────────────────────────
import handler from '../api/seo.js';
const mk=()=>{const r={_s:200,_h:{},_b:''};r.setHeader=(k,v)=>{r._h[k.toLowerCase()]=v};r.status=s=>{r._s=s;return r};r.send=b=>{r._b=b;return r};return r};
const get=async p=>{const r=mk();await handler({query:{path:p}},r);return r};
const g=(h,re)=>(h.match(re)||[,null])[1];
let pass=0,fail=0;
const chk=(ok,label,extra='')=>{ ok?pass++:fail++; console.log(`  ${ok?'PASS':'FAIL'}  ${label}${extra?'  → '+extra:''}`); };

console.log('\n── P0-2  Unknown routes 404 ──────────────────────────────');
for (const p of ['/this-does-not-exist-xyz','/wp-admin','/index.php','/seo-company-atlantis']) {
  const r=await get(p);
  chk(r._s===404 && /noindex,nofollow/.test(r._b) && !/rel="canonical"/.test(r._b) && !/application\/ld\+json/.test(r._b),
      `${p}`, `${r._s}, robots=${g(r._b,/<meta name="robots" content="([^"]*)"/)}, canonical=${/rel="canonical"/.test(r._b)?'present':'none'}, ld+json=${(r._b.match(/application\/ld\+json/g)||[]).length}`);
}

console.log('\n── P0-1  Real pages keep 200 + unique titles ─────────────');
for (const p of ['/','/contact','/seo-company','/web-development-company-mumbai','/guides/website-development-cost-india','/blog/category/seo']) {
  const r=await get(p);
  const t=g(r._b,/<title>([^<]*)<\/title>/);
  chk(r._s===200 && t && !/Build high-performing/.test(t), p, `${r._s} "${t}"`);
}

console.log('\n── P1-1  One Organization, one FAQPage, one address ──────');
for (const p of ['/','/web-development-company-mumbai','/seo-company']) {
  const r=await get(p);
  // Count distinct ENTITY NODES, not "@type" strings: {"@type":"Organization","@id":"…#organization"}
  // inside provider/publisher is a typed reference to the same node, which
  // JSON-LD merges by @id — it is the intended pattern, not a duplicate.
  const nodes=[...r._b.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map(m=>JSON.parse(m[1].replace(/\u003c/g,'<')));
  const org=nodes.filter(n=>n['@type']==='Organization').length;
  const faq=nodes.filter(n=>n['@type']==='FAQPage').length;
  const ids=nodes.map(n=>n['@id']).filter(Boolean);
  const dupeIds=ids.length-new Set(ids).size;
  const dlf=(r._b.match(/DLF Cyber City/g)||[]).length;
  chk(org===1 && faq<=1 && dupeIds===0 && dlf===0, p, `Organization=${org} FAQPage=${faq} duplicate@id=${dupeIds} DLF=${dlf}`);
}

console.log('\n── P1-1  Founder + HQ LocalBusiness on core pages ────────');
{
  const r=await get('/');
  chk(/"@id":"https:\/\/www\.avanienterprises\.in\/#founder"/.test(r._b), 'homepage has Person #founder');
  chk(/"@type":"ProfessionalService"/.test(r._b) && /Unitech Cyber Park/.test(r._b), 'homepage has HQ LocalBusiness', 'Unitech Cyber Park');
  chk(!/TollFree/.test(r._b), 'no false TollFree claim');
  chk(/"knowsAbout"/.test(r._b), 'Organization declares knowsAbout');
}

console.log('\n── P1-4  No unverifiable claims in served HTML ───────────');
for (const p of ['/','/seo-company-mumbai','/web-development-company-rohtak','/digital-marketing-company-noida']) {
  const r=await get(p);
  const bad=(r._b.match(/5\.0[a-z ]*rating|95% first-page|3x organic traffic|No\.?1 Digital Marketing/gi)||[]);
  chk(bad.length===0, p, bad.length?bad.join(', '):'clean');
}

console.log('\n── P2-1  Edge caching enabled ────────────────────────────');
{
  const ok=await get('/seo-company'), nf=await get('/nope-xyz');
  chk(/s-maxage=3600/.test(ok._h['cache-control']), '200 is edge-cacheable', ok._h['cache-control']);
  chk(/s-maxage=60/.test(nf._h['cache-control']), '404 is briefly cached', nf._h['cache-control']);
}

console.log('\n── P2-2  LCP preload is self-hosted ──────────────────────');
{
  const r=await get('/');
  chk(/rel="preload" as="image"[^>]*hero-office-1280\.webp/.test(r._b) && !/preload[^>]*unsplash/.test(r._b),
      'homepage preloads /hero-office-*.webp, not unsplash');
}

console.log('\n── NAP  One primary phone, one address, everywhere ───────');
{
  const { NAP } = await import('../seo-lib/offices.js');
  const fs = await import('node:fs');
  chk(NAP.phone === '+918448763134', 'offices.js primary phone', NAP.phone);
  chk(NAP.phoneSecondary === '+919253625099', 'offices.js secondary phone', NAP.phoneSecondary);

  // The old number is deliberate in two places: the second ContactPoint in
  // JSON-LD (so the number stays attached to the entity) and the "second line"
  // card on /contact. In VISIBLE copy anywhere else it means a hardcoded string
  // was missed, and the site is showing two different "main" numbers — the
  // exact inconsistency that suppresses local-pack rankings. So strip the
  // structured data before checking.
  const visible = (html) => html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
  for (const p of ['/', '/seo-company', '/web-development-company-mumbai', '/about']) {
    const r = await get(p);
    const stale = (visible(r._b).match(/9253625099|92536[ -]25099/g) || []).length;
    chk(stale === 0, `${p} shows only the primary number`, stale ? `${stale} stale occurrence(s)` : 'clean');
  }
  const c = await get('/contact');
  chk(/8448763134|84487 63134/.test(c._b), '/contact shows the primary number');
  chk(/9253625099|92536 25099/.test(c._b), '/contact still lists the second line');

  // Source files must not reintroduce it either — the served HTML only covers
  // the routes tested above.
  const srcHits = ['src/components/Footer.tsx', 'src/components/Navbar.tsx', 'src/data/cityPagesData.ts']
    .filter(f => fs.existsSync(f) && /9253625099|92536[ -]25099/.test(fs.readFileSync(f, 'utf8')));
  chk(srcHits.length === 0, 'no stale number in nav/footer/city data', srcHits.join(', ') || 'clean');
}

console.log('\n── Contact  Picker and FAQs cannot drift ─────────────────');
{
  const fs = await import('node:fs');
  const { SERVICES, STATIC_PAGES } = await import('../seo-lib/serviceContent.js');

  // contactServices.ts claims to list every canonical service. Verify it does,
  // rather than trusting the comment that says so.
  const picker = fs.readFileSync('src/data/contactServices.ts', 'utf8');
  const listed = new Set([...picker.matchAll(/^\s+'([^']+)',$/gm)].map(m => m[1]));
  const canonical = Object.values(SERVICES).map(s => s.name);
  const missing = canonical.filter(n => !listed.has(n));
  const unknown = [...listed].filter(n => !canonical.includes(n));
  chk(missing.length === 0, 'every service is offered in the contact picker', missing.join(', ') || `all ${canonical.length}`);
  chk(unknown.length === 0, 'picker invents no services', unknown.join(', ') || 'clean');

  // The visible FAQ block and the server-rendered FAQPage schema must ask the
  // same questions — markup describing answers a visitor cannot see is exactly
  // what the FAQ guidelines prohibit.
  const page = fs.readFileSync('src/pages/Contact.tsx', 'utf8');
  const pageQs = [...page.matchAll(/^\s{4}q: '([^']+)',$/gm)].map(m => m[1]);
  const ssrQs = (STATIC_PAGES.contact.faqs || []).map(f => f.q);
  chk(pageQs.length > 0 && pageQs.length === ssrQs.length && pageQs.every(q => ssrQs.includes(q)),
      'visible FAQs match FAQPage schema', `page=${pageQs.length} ssr=${ssrQs.length}`);
}

console.log('\n── Contact  No unverified office claims ──────────────────');
{
  const { OFFICES } = await import('../seo-lib/offices.js');
  const fs = await import('node:fs');
  const page = fs.readFileSync('src/pages/Contact.tsx', 'utf8');
  // Scope to the OFFICES array. The file's header comment documents the
  // fabricated Australia entry that used to be here, and a whole-file match
  // would flag that documentation as the defect it describes.
  const arr = (page.match(/const OFFICES = \[[\s\S]*?\n\];/) || [''])[0];
  const confirmed = Object.values(OFFICES).filter(o => o.confirmed).map(o => o.city);
  chk(arr.length > 0 && !/Australia|Global Outreach|Strategic Liaison/i.test(arr), 'no fabricated office on /contact');
  chk(confirmed.every(c => arr.includes(c)), 'all confirmed offices listed', confirmed.join(', '));
  const unconfirmed = Object.values(OFFICES).filter(o => !o.confirmed).map(o => o.city);
  const claimed = unconfirmed.filter(c => new RegExp(`city: '${c}'`).test(arr));
  chk(claimed.length === 0, 'no sell-only market shown as an office', claimed.join(', ') || 'clean');
}

console.log('\n── Deploy  Serverless Function budget ────────────────────');
{
  // Vercel turns EVERY file in api/ into its own Serverless Function, and the
  // Hobby plan caps a deployment at 12. Twelve plain data modules used to live
  // in api/ alongside the one real endpoint, so the quota was already full and
  // adding a thirteenth file failed the deploy with:
  //   No more than 12 Serverless Functions can be added to a Deployment
  // Data now lives in seo-lib/, which Vercel bundles into the function via
  // import tracing rather than deploying separately.
  const fs = await import('node:fs');
  const fns = fs.readdirSync('api').filter((f) => /\.(js|ts|mjs)$/.test(f));
  chk(fns.length <= 12, `api/ is within the 12-function limit`, `${fns.length}: ${fns.join(', ')}`);
  chk(fns.length === 1 && fns[0] === 'seo.js', 'api/ holds only the real endpoint', fns.join(', '));
  chk(fs.existsSync('seo-lib') && fs.readdirSync('seo-lib').length > 0, 'seo-lib/ holds the data modules', `${fs.readdirSync('seo-lib').length} module(s)`);
}

console.log('\n── Deploy  vercel.json is schema-valid ───────────────────');
{
  // Vercel validates this file against a strict schema and rejects ANY property
  // it does not know — including a "//" key used as a comment, which is a
  // common JSON commenting habit and fails the build with
  //   should NOT have additional property `//`
  // The build fails before anything deploys, so a valid config here is a
  // release blocker, not a nicety.
  const fs = await import('node:fs');
  const raw = fs.readFileSync('vercel.json', 'utf8');
  let cfg = null;
  try { cfg = JSON.parse(raw); } catch (e) { chk(false, 'vercel.json parses', e.message); }

  if (cfg) {
    const ALLOWED = new Set(['$schema', 'buildCommand', 'cleanUrls', 'crons', 'devCommand',
      'framework', 'functions', 'git', 'github', 'headers', 'ignoreCommand', 'images',
      'installCommand', 'outputDirectory', 'public', 'redirects', 'regions', 'rewrites',
      'trailingSlash']);
    const badKeys = Object.keys(cfg).filter((k) => !ALLOWED.has(k));
    chk(badKeys.length === 0, 'no unknown top-level keys', badKeys.join(', ') || Object.keys(cfg).join(', '));

    const walk = (o, p = '') => Object.entries(o || {}).flatMap(([k, v]) =>
      (k === '//' ? [`${p}/${k}`] : []).concat(v && typeof v === 'object' ? walk(v, `${p}/${k}`) : []));
    const comments = walk(cfg);
    chk(comments.length === 0, 'no "//" comment keys', comments.join(', ') || 'clean');
  }
}

console.log(`\n${pass} passed, ${fail} failed\n`);
process.exit(fail?1:0);
