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

console.log(`\n${pass} passed, ${fail} failed\n`);
process.exit(fail?1:0);
