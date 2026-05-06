import re
import json

html = """
<main class="relative">
<!-- Hero Section -->
<section class="relative min-h-screen flex items-center px-[32px] pt-32 pb-24 overflow-hidden bg-gradient-to-br from-[#faf9f7] to-[#e9e8e6]">
<div class="grid-texture absolute inset-0"></div>
<div class="grain-bg absolute inset-0"></div>
<div class="max-w-[1440px] mx-auto w-full grid grid-cols-12 gap-[32px] relative z-10">
<div class="col-span-12 lg:col-span-10">
<span class="inline-block font-label-caps text-[#4f46e5] font-bold mb-6 tracking-widest bg-[#4f46e5]/10 px-4 py-2 rounded-full border border-[#4f46e5]/20">— EST. 2024 DIGITAL FRONTIER</span>
<h1 class="font-display-xl text-[#172124] leading-none mb-12">
                        WE CREATE <br/>
<span class="text-gradient italic font-light">FUTURE DIGITAL</span> <br/>
                        EXPERIENCES
                    </h1>
</div>
<div class="col-span-12 lg:col-span-8 lg:col-start-5 flex flex-col md:flex-row items-end gap-[32px]">
<p class="font-body-lg text-[#434749] max-w-lg leading-relaxed text-xl">
                        A bespoke technical collective specializing in high-performance digital infrastructure and elevated aesthetic engineering. We build the tools that define the next era of commerce.
                    </p>
<div class="relative w-full md:w-2/3 h-[450px] rounded-2xl overflow-hidden glass-panel p-2 flex-shrink-0 shadow-2xl group border border-white/60">
<div class="absolute inset-0 bg-gradient-to-tr from-[#4f46e5]/20 to-[#ec4899]/20 z-10 mix-blend-overlay"></div>
<img alt="Digital Experience" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out" data-alt="A sophisticated close-up of a high-resolution curved monitor displaying a complex, minimalist web application architecture." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3xCrTqRNqnUVpg1y2ftaoKQC5jGHh-TovJJnPydAVrxV5QC4pNDtH9S3_orvUOw_BeS9q884An4cWniPEWmXysCxsnhP5A9RiaPBzT7chxSle62hxUXnoLdDf7UuCM9uk0RYn917Yg3XzEcXJXA7UXZiuaBQZHHfE304MxY30FjXdapqxNC--TrQahPsvkp2k6r77QeRsfZU3cBPXoRMhyUfTlJhqeR5aSCCp5JGMcD6dYwdoIHLtGR2F8NL9iUmRvET_QWpnJw"/>
</div>
</div>
</div>
<!-- Floating Decorative Element -->
<div class="absolute -right-32 top-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-[#4f46e5]/20 to-[#06b6d4]/20 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
<div class="absolute -left-32 bottom-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-[#ec4899]/20 to-[#4f46e5]/20 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
</section>
<!-- Expertise Section -->
<section class="py-24 bg-white relative">
<div class="max-w-[1440px] mx-auto px-[32px]">
<div class="flex justify-between items-end mb-20 border-b-2 border-[#172124] pb-8">
<h2 class="font-display-lg text-[#172124] uppercase font-black tracking-tight">OUR EXPERTISE</h2>
<span class="font-label-caps text-[#4f46e5] font-bold text-lg">001 — 006</span>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
<!-- Web Development -->
<div class="group relative p-8 rounded-2xl glass-panel hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden bg-[#f4f3f1] border border-[#c3c7c9]/30">
<div class="relative z-10 flex flex-col h-full">
<span class="font-label-caps text-[#4f46e5] mb-6 block text-lg font-bold">/ 01</span>
<h3 class="font-headline-md mb-4 uppercase tracking-tighter font-bold">Web Development</h3>
<p class="font-body-sm text-[#434749] mb-6 text-base">High-performance, scalable web architectures built with modern frameworks and precision engineering.</p>
<div class="mt-auto overflow-hidden rounded-xl">
<img alt="Web Development" class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700" data-alt="A clean, wide-angle shot of a minimalist workstation with multiple monitors displaying clean lines of code in a bright environment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSCKeNThhEDyNHIntrHs92c1NL6a8KClafOaotNkJTIDBC0HTvpIdm71ok3-N3drZjl-WCH96XT1wzlP9iIyvoz8TbRvN052OBW7XYj-rEslXLOOj-wSxVSjOxKQ7bb-M29bsb_8LwPUiKs5wtv8okK4mhur8TSEQIu1yGbmJnhHbHL2JcZTvBHJSq9pqxZ6iwCFKoQ5UwmLfNFbLsRf-MJz3CslOFjJVP-wyHIaIHBZuWLQ7UBNFTXYVlsiwM1UryDuLXib-6Rg"/>
</div>
</div>
</div>
<!-- SEO & Content -->
<div class="group relative p-8 rounded-2xl glass-panel hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden bg-[#f4f3f1] border border-[#c3c7c9]/30">
<div class="relative z-10 flex flex-col h-full">
<span class="font-label-caps text-[#ec4899] mb-6 block text-lg font-bold">/ 02</span>
<h3 class="font-headline-md mb-4 uppercase tracking-tighter font-bold">SEO &amp; Content</h3>
<p class="font-body-sm text-[#434749] mb-6 text-base">Strategic visibility through data-driven content architecture and technical search engine optimization.</p>
<div class="mt-auto overflow-hidden rounded-xl">
<img alt="SEO" class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700" data-alt="An overhead view of a minimalist workspace featuring high-end digital devices and organized analytical documents." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYG8QSjckm38kdFWXVv3jBC4Xg5t1vSIpIGlsKyb7tCXX4KKywinIe2aSlvQYlk7kwBTOHZ-QT3rx1LV7du35iHAuNDmovHxbvHxAtlWuPJ-CVB7y8SB_DpFt7JPQBjvaxHSb4IvXUzS21Uo5ynyRXkF-b8TuEadJeTkFCHB4Vk688YpIGbbGf0L_lKdnIA7MCvUwVx_Igb2W68M3XDuIagdKvc8IWu_AGmpI9XHPMgouOsxYr2qHNNK9ostH-Olx3kreOEdSOvw"/>
</div>
</div>
</div>
<!-- AI Solutions -->
<div class="group relative p-8 rounded-2xl glass-panel hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden bg-[#f4f3f1] border border-[#c3c7c9]/30">
<div class="relative z-10 flex flex-col h-full">
<span class="font-label-caps text-[#06b6d4] mb-6 block text-lg font-bold">/ 03</span>
<h3 class="font-headline-md mb-4 uppercase tracking-tighter font-bold">AI Solutions</h3>
<p class="font-body-sm text-[#434749] mb-6 text-base">Custom machine learning models and automated cognitive workflows for the modern enterprise.</p>
<div class="mt-auto overflow-hidden rounded-xl">
<img alt="AI" class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700" data-alt="Abstract visualization of flowing neural networks in a clean, bright digital space." src="https://lh3.googleusercontent.com/aida-public/AB6AXuClkiULPzct6d9Z5BkpuGXyVC4RuqMbrvsbmd6sUCoV9QMZ-3AC-BVTKn_N4o_wiz2-s24UM6xyqKe7HWHSu_N8fME3klq6ji99OEWEC72Pm6WzTgE4ltwd2VLj9WXdTJvDrI2H1xB2nnTaURe5WEXvqC8D_VaatZIfGNtB97yW7HdFfJaCIpC725fHNvD6wLtnAQ77wPLwMKTHB9OgR6Dbtk89zBCQsjSsOI9GuNkiJK5_KQiYWDBCmZKw9zsQ8r_LZnxgI6cgfw"/>
</div>
</div>
</div>
<!-- Social Media -->
<div class="group relative p-8 rounded-2xl glass-panel hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden bg-[#f4f3f1] border border-[#c3c7c9]/30">
<div class="relative z-10 flex flex-col h-full">
<span class="font-label-caps text-[#4f46e5] mb-6 block text-lg font-bold">/ 04</span>
<h3 class="font-headline-md mb-4 uppercase tracking-tighter font-bold">Social Media</h3>
<p class="font-body-sm text-[#434749] mb-6 text-base">Curated brand experiences and community engagement through elevated digital storytelling.</p>
<div class="mt-auto overflow-hidden rounded-xl">
<img alt="Social" class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700" data-alt="A collection of sleek, high-end smartphones arranged artistically on a white marble surface." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBF7QRczzChUe1lIGG_8tH4FHxyy9C06nnXBMjLV9AU-MPbqYli_KaUz8MphbJm-ti_R4YDEXjzJKQP6Es3rneBqyqvCG-5C2i7eIQ9jkITtJmJjZbRbjmneBK-PW-ckm6HjIVLBYMilTjuu6TyYNnMDOx86LMgDhGbztgPUYAKR5fMkL6q2xY1NJuaIt0wOBvVq6TsXBBwS38jwf0Lql3vSbMMlOLfgZFO4OdaKhpgDtn497U7vK1oGKh6y8JtNT9UZvii4QEtpA"/>
</div>
</div>
</div>
<!-- Podcast Production -->
<div class="group relative p-8 rounded-2xl glass-panel hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden bg-[#f4f3f1] border border-[#c3c7c9]/30">
<div class="relative z-10 flex flex-col h-full">
<span class="font-label-caps text-[#ec4899] mb-6 block text-lg font-bold">/ 05</span>
<h3 class="font-headline-md mb-4 uppercase tracking-tighter font-bold">Podcast Production</h3>
<p class="font-body-sm text-[#434749] mb-6 text-base">Full-spectrum audio engineering and high-fidelity sonic identity for influential voices.</p>
<div class="mt-auto overflow-hidden rounded-xl">
<img alt="Podcast" class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700" data-alt="A professional podcast studio setup featuring a high-end silver microphone on a sleek arm." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpTJCNSk53k3iuuEOpF7sV8rkC6bQGLn-MmJb2LYnsYcU0XnOPmwqDwgVr7nVviQPrPY8R3jT-gDitbaaguteOa-GCUidyOByNhY-E252vbSyA-VJZSPwgbtE35_wesXREdnr0UWA4_d9btXnlP2xt3lUcl_DTVISzI9Jfpy08pMTIsAS6oJhyGrQh_qhnymCIsKCG6th5t5P4Ro2LIkeU8-CMYpU74JmOgkFty6rhlnt4gJz_U4ja2KfEUuWzQpYY047nVC2djQ"/>
</div>
</div>
</div>
<!-- Financial Consulting -->
<div class="group relative p-8 rounded-2xl glass-panel hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden bg-[#f4f3f1] border border-[#c3c7c9]/30">
<div class="relative z-10 flex flex-col h-full">
<span class="font-label-caps text-[#06b6d4] mb-6 block text-lg font-bold">/ 06</span>
<h3 class="font-headline-md mb-4 uppercase tracking-tighter font-bold">Financial Consulting</h3>
<p class="font-body-sm text-[#434749] mb-6 text-base">Fintech integration and digital-first economic modeling for rapid agency scale.</p>
<div class="mt-auto overflow-hidden rounded-xl">
<img alt="Financial" class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700" data-alt="A minimalist architectural shot of a bright modern office interior, focusing on clean lines, glass walls, and structured analytical data projected onto a wall." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBH9Vn-7IvDnEEx-C4HONw4_3yb5TMwdcLdXfk7J3HZHSg07b7HXoA8M1zhUH9PlsEExiO1pSyP8fwH1oqIgOkiWioSjfa0o7LK2fMKMQcyBPMLf66fDEGDieftJTxCu0jD1oBbnbGRztnQoqwTyYn-LgEwM4lfNTuWLnpAynNhc_sok08QzsxXepUBcDoKFRoqkrvmCRYbUIlF3Nh6pZaLRpeKHJMJjZBJfXN_0kwULF9giP3Lj0sBye8uyso4zmOfRDRe1Y6GjA"/>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- Process Section / Bento Grid -->
<section class="py-24 bg-[#f4f3f1] relative">
<div class="grid-texture absolute inset-0 opacity-50"></div>
<div class="max-w-[1440px] mx-auto px-[32px] relative z-10">
<div class="grid grid-cols-12 gap-12">
<div class="col-span-12 lg:col-span-4 mb-[32px] lg:mb-0">
<h2 class="font-display-lg text-[#172124] uppercase leading-tight mb-8 font-black">HOW WE<br/>THINK.</h2>
<p class="font-body-lg text-[#434749] text-xl leading-relaxed">Our methodology is rooted in architectural design principles—prioritizing structure, clarity, and intent above all else.</p>
</div>
<div class="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
<div class="glass-panel p-10 rounded-2xl bg-white flex flex-col justify-between h-72 border border-[#c3c7c9]/30 hover:border-[#4f46e5] hover:shadow-2xl transition-all group">
<span class="material-symbols-outlined text-[#4f46e5] text-5xl group-hover:scale-110 transition-transform">architecture</span>
<div>
<h4 class="font-headline-sm mb-3 uppercase font-bold tracking-tight">Discovery</h4>
<p class="font-body-sm text-[#434749] text-base">Deep immersion into the business ecosystem to identify core friction points.</p>
</div>
</div>
<div class="p-10 rounded-2xl bg-gradient-to-br from-[#4f46e5] to-[#ec4899] text-white flex flex-col justify-between h-72 shadow-2xl md:translate-y-8 group hover:-translate-y-2 transition-all duration-500">
<span class="material-symbols-outlined text-white text-5xl group-hover:scale-110 transition-transform">precision_manufacturing</span>
<div>
<h4 class="font-headline-sm mb-3 uppercase font-bold tracking-tight">Synthesis</h4>
<p class="font-body-sm text-white/90 text-base">Engineered prototyping where form perfectly aligns with technical function.</p>
</div>
</div>
<div class="glass-panel p-10 rounded-2xl bg-white flex flex-col justify-between h-72 border border-[#c3c7c9]/30 hover:border-[#06b6d4] hover:shadow-2xl transition-all group">
<span class="material-symbols-outlined text-[#06b6d4] text-5xl group-hover:scale-110 transition-transform">terminal</span>
<div>
<h4 class="font-headline-sm mb-3 uppercase font-bold tracking-tight">Execution</h4>
<p class="font-body-sm text-[#434749] text-base">Rigorous deployment with a focus on load speeds and interactive fidelity.</p>
</div>
</div>
<div class="glass-panel p-10 rounded-2xl bg-white flex flex-col justify-between h-72 border border-[#c3c7c9]/30 hover:border-[#ec4899] hover:shadow-2xl transition-all md:translate-y-8 group">
<span class="material-symbols-outlined text-[#ec4899] text-5xl group-hover:scale-110 transition-transform">auto_graph</span>
<div>
<h4 class="font-headline-sm mb-3 uppercase font-bold tracking-tight">Evolution</h4>
<p class="font-body-sm text-[#434749] text-base">Continuous monitoring and algorithmic refinement for peak performance.</p>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- CTA Section -->
<section class="py-32 relative overflow-hidden bg-[#172124] text-white">
<div class="absolute inset-0 bg-gradient-to-br from-[#172124] via-[#172124] to-[#4f46e5]/40 mix-blend-multiply"></div>
<div class="max-w-[1440px] mx-auto px-[32px] text-center relative z-10">
<div class="inline-block p-1 border border-white/20 rounded-full mb-10 bg-white/5 backdrop-blur-md">
<div class="bg-white/10 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-white">Ready to scale?</div>
</div>
<h2 class="font-display-xl text-white mb-14 uppercase font-black tracking-tighter">Let's build the <br/> <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#ec4899] to-[#06b6d4]">future together.</span></h2>
<button class="bg-white text-[#172124] px-14 py-6 rounded-full font-label-caps uppercase text-lg font-bold hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-300">
                    Initiate Project
                </button>
</div>
<!-- Large faint background text -->
<div class="absolute bottom-0 left-0 w-full overflow-hidden select-none pointer-events-none opacity-10">
<h2 class="text-[350px] font-black uppercase whitespace-nowrap leading-none transform translate-y-1/3 text-white">AGENCY EXPERIENCE</h2>
</div>
</section>
</main>
"""

# Replace class= with className=
html = html.replace('class=', 'className=')
# Self close tags
html = html.replace('<br>', '<br />').replace('<hr>', '<hr />').replace('<img>', '<img />')
html = re.sub(r'<img([^>]+)(?<!/)>', r'<img\1 />', html)

print(html)
