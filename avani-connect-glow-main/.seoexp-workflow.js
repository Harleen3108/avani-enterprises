export const meta = {
  name: 'seo-expansion-businessos-socialsync-location',
  description: 'Generate + adversarially verify 23 unique SEO pages (Business OS hub, Social Sync, service-location)',
  phases: [
    { title: 'Generate', detail: 'one writer per page' },
    { title: 'Verify', detail: 'adversarial compliance + uniqueness QA' },
  ],
}

const BRAND = `
Avani Enterprises — web/software/digital-marketing agency, HQ DLF Cyber City, Gurugram, Haryana, India. Founded 2016 (8+ years). Phone +91 92536 25099, email kp@avanienterprises.in.
ALLOWED real claims ONLY: "150+ clients", "300+ projects", "8+ years", "5.0 client rating", "24/7 support", reasonable capability statements (e.g. "2-second load times", schema-ready). NEVER invent: client names, testimonials, review counts, awards, specific revenue, or specific pricing numbers (no "₹999/month" unless told). Do NOT keyword-stuff. Write genuinely useful, specific, original copy — NOT the same boilerplate with a swapped keyword.
`

const SOCIALSYNC = `
PRODUCT: SocialSync (live app at https://socialsync.avanienterprises.in) — a social media management platform by Avani for agencies, creators and businesses.
ONLY these capabilities are real — do NOT invent others or any pricing numbers:
- Instagram & Facebook: posts, reels, stories, auto DM, bulk DM
- X/Twitter: scheduling & publishing
- YouTube: video upload & publishing
- LinkedIn: content publishing
- Agency admin panel for teams & clients; multi-brand management
- Credit-based pricing where 1 credit = 1 post (do NOT state any ₹/$ amount)
- Plans for creators, small businesses, agencies, enterprises
`

const BUSINESSOS = `
PRODUCT: Avani Business OS (live app at https://os.avanienterprises.in) — an all-in-one business operating system. Real modules: HRMS/HR portal, employee management, attendance, leave, payroll, recruitment/ATS, performance (KPI/OKR), plus finance (invoicing, GST, expenses, assets), CRM (leads/pipeline), and project/task management. Frame HR pages as modules of this unified suite. Do NOT invent pricing numbers, customer names, or ratings.
`

const ITEM = (req) => ({ type:'object', required:req, properties:Object.fromEntries(req.map(k=>[k,{type:'string'}])) })
const SCHEMA = {
  type:'object',
  required:['seo','hero','introHeading','intro','whyAvani','features','bodySections','faqs','internalLinks','cta'],
  properties:{
    seo: ITEM(['title','description','keywords']),
    hero:{ type:'object', required:['tag','h1','subtitle','stats'], properties:{ tag:{type:'string'},h1:{type:'string'},subtitle:{type:'string'}, stats:{type:'array', items: ITEM(['value','label'])} } },
    introHeading:{type:'string'}, intro:{type:'string'},
    whyAvani:{ type:'array', items: ITEM(['title','desc']) },
    features:{ type:'array', items: ITEM(['title','desc']) },
    bodySections:{ type:'array', items:{ type:'object', required:['heading','paragraphs'], properties:{ heading:{type:'string'}, paragraphs:{type:'array', items:{type:'string'}} } } },
    faqs:{ type:'array', items: ITEM(['q','a']) },
    internalLinks:{ type:'array', items: ITEM(['label','href','desc']) },
    cta: ITEM(['headline','sub']),
  },
}
const VERDICT = { type:'object', required:['approved','issues','finalConfig'], properties:{ approved:{type:'boolean'}, issues:{type:'array',items:{type:'string'}}, finalConfig: SCHEMA } }

const BOS_LINKS = '/business-os, /business-os/hr-management-system, /business-os/hrms-software-for-small-business, /business-os/best-hrms-software-in-india, /hr-portal, /hrms-software-india, /attendance-management-system, /leave-management-software, /payroll-software-india, /employee-management-software, /business-operating-system, /employee-portal, /services'
const SS_LINKS = '/social-sync, /social-sync/social-media-management-tool, /social-sync/social-media-scheduler, /social-sync/social-media-tool-for-agencies, /social-sync/social-media-tool-for-creators, /social-sync/instagram-post-scheduler, /social-sync/facebook-post-scheduler, /social-sync/linkedin-post-scheduler, /social-sync/youtube-video-scheduler, /social-sync/multi-brand-social-media-management, /social-sync/bulk-dm-tool, /social-sync/auto-dm-tool, /social-media-marketing-company, /meta-ads-agency, /digital-marketing-company, /services'
const LOC_LINKS = '/web-development-company, /mobile-app-development-company, /seo-company, /digital-marketing-company, /google-ads-agency, /meta-ads-agency, /social-media-marketing-company, /agentic-ai-development-company, /custom-ai-development, /services'

const PAGES = [
  // ── Business OS (4) ──
  { slug:'business-os', group:'bos', label:'Business OS', focus:'the flagship all-in-one Business OS hub page — explain the unified suite (HR/HRMS, payroll, attendance, leave, recruitment, performance, finance, CRM, projects), who it is for (Indian SMBs to enterprises), and why one connected system beats disconnected tools. This is the cluster hub: internalLinks MUST point to the specific module pages.', kw:'business os, business operating system, all in one business software, HRMS software, business management software', app:'os' },
  { slug:'business-os/hr-management-system', group:'bos', label:'HR Management System', focus:'Business OS as a complete HR management system — core HR records, org structure, self-service, approvals, the full employee lifecycle from onboarding to exit.', kw:'HR management system, HRMS, HR software, employee lifecycle management', app:'os' },
  { slug:'business-os/hrms-software-for-small-business', group:'bos', label:'HRMS Software for Small Business', focus:'HRMS for small businesses & startups — affordable, quick to set up, no bloat; how a small team runs attendance, leave, payroll and records without a big HR department.', kw:'HRMS software for small business, HR software for startups, small business HR system', app:'os' },
  { slug:'business-os/best-hrms-software-in-india', group:'bos', label:'Best HRMS Software in India', focus:'an honest buyer-guide style page: what to look for in HRMS software in India (statutory compliance — PF/ESI/TDS, India payroll, biometric/geo attendance, support), and how Avani Business OS meets these. Do NOT fabricate rankings, awards, or "rated #1" claims — frame as a practical guide.', kw:'best HRMS software in India, top HR software India, HRMS comparison India', app:'os' },
  // ── Social Sync (12) ──
  { slug:'social-sync', group:'ss', label:'SocialSync', focus:'the flagship SocialSync hub page — manage every brand and platform in one place; overview of all capabilities; who it serves (creators, businesses, agencies). Cluster hub: internalLinks point to the feature/audience pages.', kw:'social media management platform, social media tool, SocialSync', app:'ss' },
  { slug:'social-sync/social-media-management-tool', group:'ss', label:'Social Media Management Tool', focus:'SocialSync as an all-in-one social media management tool across Instagram, Facebook, X, YouTube and LinkedIn — publishing, scheduling, DMs, multi-brand.', kw:'social media management tool, manage multiple social media accounts', app:'ss' },
  { slug:'social-sync/social-media-scheduler', group:'ss', label:'Social Media Scheduler', focus:'scheduling and queuing posts/reels/stories/videos across all supported platforms ahead of time from one calendar.', kw:'social media scheduler, schedule social media posts, content calendar', app:'ss' },
  { slug:'social-sync/social-media-tool-for-agencies', group:'ss', label:'Social Media Tool for Agencies', focus:'the agency use case — agency admin panel, teams, client management, multi-brand at scale, approvals; credit model (1 credit = 1 post). No pricing numbers.', kw:'social media tool for agencies, agency social media management, multi-client social media', app:'ss' },
  { slug:'social-sync/social-media-tool-for-creators', group:'ss', label:'Social Media Tool for Creators', focus:'the creator use case — schedule reels/stories/posts, grow with auto DM, manage Instagram/YouTube/etc from one place, credit model.', kw:'social media tool for creators, creator scheduling tool, content creator tool', app:'ss' },
  { slug:'social-sync/instagram-post-scheduler', group:'ss', label:'Instagram Post Scheduler', focus:'Instagram specifically — schedule posts, reels and stories; auto DM and bulk DM on Instagram.', kw:'instagram post scheduler, schedule instagram reels, instagram scheduling tool', app:'ss' },
  { slug:'social-sync/facebook-post-scheduler', group:'ss', label:'Facebook Post Scheduler', focus:'Facebook specifically — schedule posts/reels/stories, auto DM and bulk DM on Facebook.', kw:'facebook post scheduler, schedule facebook posts, facebook scheduling tool', app:'ss' },
  { slug:'social-sync/linkedin-post-scheduler', group:'ss', label:'LinkedIn Post Scheduler', focus:'LinkedIn content publishing & scheduling for personal brands, founders and B2B companies.', kw:'linkedin post scheduler, schedule linkedin posts, linkedin publishing tool', app:'ss' },
  { slug:'social-sync/youtube-video-scheduler', group:'ss', label:'YouTube Video Scheduler', focus:'YouTube video upload & publishing/scheduling from SocialSync.', kw:'youtube video scheduler, schedule youtube videos, youtube upload tool', app:'ss' },
  { slug:'social-sync/multi-brand-social-media-management', group:'ss', label:'Multi-Brand Social Media Management', focus:'managing many brands/accounts from one dashboard — switching brands, separate calendars, team roles; ideal for agencies and multi-brand businesses.', kw:'multi-brand social media management, manage multiple brands, multiple social accounts', app:'ss' },
  { slug:'social-sync/bulk-dm-tool', group:'ss', label:'Bulk DM Tool', focus:'sending bulk direct messages on Instagram/Facebook responsibly via SocialSync — outreach, broadcasts. Note responsible/compliant use; no spam claims.', kw:'bulk dm tool, bulk direct message, mass dm instagram', app:'ss' },
  { slug:'social-sync/auto-dm-tool', group:'ss', label:'Auto DM Tool', focus:'automated DMs on Instagram/Facebook — welcome messages, keyword/comment triggers, lead capture via SocialSync.', kw:'auto dm tool, instagram auto dm, automated direct messages', app:'ss' },
  // ── Service-Location (7) ──
  { slug:'app-development-company-in-chandigarh', group:'loc', label:'App Development Company in Chandigarh', focus:'mobile app development for Chandigarh/Tricity (Mohali, Panchkula) — real local context: IT/SaaS scene in Mohali, startups, education & healthcare; Android/iOS/cross-platform.', kw:'app development company in chandigarh, mobile app developers chandigarh, android ios app chandigarh', app:null },
  { slug:'digital-marketing-agency-in-punjab', group:'loc', label:'Digital Marketing Agency in Punjab', focus:'digital marketing across Punjab (Ludhiana, Amritsar, Jalandhar, Mohali) — real local industries: textiles/hosiery (Ludhiana), sports goods (Jalandhar), agriculture, tourism (Amritsar); SEO + ads + social.', kw:'digital marketing agency in punjab, digital marketing punjab, seo company punjab', app:null },
  { slug:'social-media-marketing-agency-in-gurgaon', group:'loc', label:'Social Media Marketing Agency in Gurgaon', focus:'SMM for Gurgaon — Cyber City brands, D2C on Sohna Road, real estate on Golf Course Road; Instagram/Facebook/LinkedIn content + paid social.', kw:'social media marketing agency in gurgaon, smm agency gurugram, instagram marketing gurgaon', app:null },
  { slug:'google-ads-agency-in-noida', group:'loc', label:'Google Ads Agency in Noida', focus:'Google Ads/PPC for Noida & Greater Noida — IT, real estate, education, manufacturing in the sectors; Search/Shopping/PMax, cost-per-lead focus.', kw:'google ads agency in noida, ppc agency noida, google ads management noida', app:null },
  { slug:'meta-ads-agency-in-delhi', group:'loc', label:'Meta Ads Agency in Delhi', focus:'Meta (Facebook/Instagram) Ads for Delhi — local retail, D2C, services across Delhi markets; creative + targeting + ROAS focus.', kw:'meta ads agency in delhi, facebook ads agency delhi, instagram ads delhi', app:null },
  { slug:'ai-video-services-in-india', group:'loc', label:'AI Video Services in India', focus:'AI video creation services for Indian businesses — AI-generated/edited marketing videos, ads, product & explainer videos, social reels; use cases & process. Honest about what AI video can/cannot do.', kw:'ai video services in india, ai video generation, ai video creation company india', app:null },
  { slug:'agentic-ai-development-company-in-delhi', group:'loc', label:'Agentic AI Development Company in Delhi', focus:'agentic AI development for Delhi businesses — autonomous AI agents that plan & execute multi-step tasks with tools; use cases for Delhi enterprises/startups.', kw:'agentic ai development company in delhi, ai agents delhi, autonomous ai delhi', app:null },
]

function ctx(p){ if(p.group==='ss') return SOCIALSYNC; if(p.group==='bos') return BUSINESSOS; return ''; }
function links(p){ if(p.group==='ss') return SS_LINKS; if(p.group==='bos') return BOS_LINKS; return LOC_LINKS; }

const results = await pipeline(
  PAGES,
  (p) => agent(
    `You are a senior SEO content writer for Avani Enterprises creating the page "/${p.slug}" — ${p.label}.\n\n${BRAND}\n${ctx(p)}\nFOCUS: ${p.focus}\nPrimary keywords (use naturally, no stuffing): ${p.kw}\n\nProduce a UNIQUE, genuinely useful page with these fields:\n- seo.title (~60 chars, include the primary keyword + "Avani Enterprises" or "| Avani"), seo.description (150-160 chars), seo.keywords (6-8 comma keywords).\n- hero.tag (short eyebrow), hero.h1 (one clear H1 with the primary keyword), hero.subtitle (1-2 sentences), hero.stats: EXACTLY 4 {value,label} using ONLY allowed metrics (or capability facts like "5 platforms", "1 credit = 1 post" for SocialSync) — never invented numbers.\n- introHeading + intro (2-3 sentences).\n- whyAvani: EXACTLY 4 {title,desc} (why choose this / differentiators).\n- features: EXACTLY 6 {title,desc} (real capabilities/use cases for THIS page's topic).\n- bodySections: EXACTLY 3 {heading, paragraphs:[2 paragraphs each]} of genuinely useful H2 content specific to this topic (not generic filler).\n- faqs: EXACTLY 6 {q,a} specific to this page (include cost/timeline/how-it-works as relevant, but NO invented prices — say pricing depends on scope / is credit-based).\n- internalLinks: EXACTLY 4 {label,href,desc}; href MUST be chosen ONLY from: ${links(p)}\n- cta: {headline, sub}.\nReturn ONLY the structured object. Make it specific to "${p.label}" — do not write generic content that could apply to any page.`,
    { label:`write:${p.slug}`, phase:'Generate', schema: SCHEMA }
  ),
  (content, p) => agent(
    `Adversarial SEO + compliance QA for Avani page "/${p.slug}" (${p.label}).\n\n${BRAND}\n${ctx(p)}\n\nCONTENT:\n${JSON.stringify(content)}\n\nCheck & FIX, then return a corrected finalConfig:\n1. NO fabricated content: remove any fake testimonials, client names, awards, "#1/best rated" claims, specific prices (₹/$), or invented statistics. ${p.group==='ss'?'SocialSync: ensure ONLY the real capabilities are mentioned (no invented platforms/features); pricing is credit-based (1 credit = 1 post) with no currency amounts.':''}${p.group==='bos'?'Business OS: modules must be real; no invented pricing/ratings.':''}${p.group==='loc'?'Location: localAreaText/intro must reference REAL, accurate localities & industries of the target place — fix anything generic or wrong.':''}\n2. UNIQUENESS: content must be specific to this exact topic, not generic boilerplate. Strengthen anything that reads like a keyword swap.\n3. NO keyword stuffing: natural language only.\n4. KEYWORD present in seo.title, hero.h1, intro.\n5. STRUCTURE: exactly 4 hero.stats, 4 whyAvani, 6 features, 3 bodySections (2 paragraphs each), 6 faqs, 4 internalLinks. internalLinks hrefs ONLY from: ${links(p)}. Fix counts/hrefs.\n6. Grammar, clarity, citation-friendly FAQs.\nReturn approved=true only if fully compliant after your fixes. List problems in issues[]. Always return a complete corrected finalConfig.`,
    { label:`qa:${p.slug}`, phase:'Verify', schema: VERDICT }
  ).then(v => ({ slug:p.slug, group:p.group, label:p.label, app:p.app, approved:v.approved, issues:v.issues, config:v.finalConfig }))
)

const clean = results.filter(Boolean)
log(`SEO expansion: ${clean.length}/${PAGES.length} pages generated + verified. Issues fixed: ${clean.reduce((n,r)=>n+(r.issues?r.issues.length:0),0)}`)
return clean
