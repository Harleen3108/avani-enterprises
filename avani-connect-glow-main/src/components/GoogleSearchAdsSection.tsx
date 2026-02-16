import { motion } from "framer-motion";
import { Search, Monitor, Rocket, Clock } from "lucide-react";

export default function GoogleSearchAdsSection() {

  const ads = [
    {
      id: 1,
      headline: "Business Setup Delhi NCR | 7 Days",
      subHeadline: "₹2,499 Se Start | Complete Package",
      extraHeadline: "60+ Businesses Launched | Experts",
      description1: "Complete business setup in 7 days. Registration, website, marketing - everything included. ₹99,999 only!",
      description2: "Delhi NCR's fastest business launch service. Start with ₹2,499. 50 slots only. Call now!",
      url: "avanienterprises.com/7-day-launch"
    },
    {
      id: 2,
      headline: "Company Registration Delhi - 7 Days",
      subHeadline: "Website + Marketing Free Included",
      extraHeadline: "One-Stop Business Solution ₹99,999",
      description1: "GST, Pvt Ltd, Trademark, Website, Marketing - sab ek price mein. Payment flexibility available.",
      description2: "Industry experts. 60+ successful launches. Delhi NCR exclusive. Limited slots!",
      url: "avanienterprises.com/7-day-launch"
    },
    {
      id: 3,
      headline: "Fast Business Launch | Delhi NCR",
      subHeadline: "Everything In One Package | 7 Days",
      extraHeadline: "₹2,499 Start | 1L Views Guaranteed",
      description1: "Stop wasting 6 months! Get complete business setup in 7 days. Registration to marketing - all covered.",
      description2: "50 slots monthly. Expert team. Proven results. Call for Delhi NCR's fastest business launch!",
      url: "avanienterprises.com/7-day-launch"
    }
  ];

  const hookSets = [
    {
      title: "Shock Value Hooks",
      icon: <Rocket className="w-6 h-6 text-red-500" />,
      hooks: [
        { text: "₹2,499 mein business? Pagal ho gaye kya!", subtext: "(Disbelief trigger)" },
        { text: "Tumhara competitor kal launch kar raha hai. Tum?", subtext: "(Competition FOMO)" },
        { text: "6 mahine waste karna hai ya 7 din mein shuru?", subtext: "(Time contrast)" }
      ]
    },
    {
      title: "Direct Challenge Hooks",
      icon: <Monitor className="w-6 h-6 text-blue-500" />,
      hooks: [
        { text: "Business kholne ka dare nahi hai? Ya budget nahi hai?", subtext: "(Ego + Budget)" },
        { text: "Delhi waale smart hote hain - phir tum slow kyun ho?", subtext: "(Local pride)" },
        { text: "Serious entrepreneur ho ya timepass?", subtext: "(Identity challenge)" }
      ]
    },
    {
      title: "Value-Driven Hooks",
      icon: <Clock className="w-6 h-6 text-green-500" />,
      hooks: [
        { text: "₹2.5 lakh ki service, ₹1 lakh mein - scam hai kya?", subtext: "(Value shock)" },
        { text: "7 din mein business? Proof chahiye?", subtext: "(Skepticism addressing)" },
        { text: "Registration se lekar marketing tak - ek price mein?", subtext: "(Convenience)" }
      ]
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-secondary/30 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="container px-4 mx-auto relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Search className="w-3 h-3" />
            Campaign Previews
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-display font-bold mb-4"
          >
            Google Search Ads & Hooks
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground"
          >
            A preview of how we position your business to dominate search results and capture attention immediately.
          </motion.p>
        </div>

        {/* Google Ads Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {ads.map((ad, index) => (
            <motion.div
              key={ad.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow-lg border border-border/50 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold text-slate-900 dark:text-slate-100">Sponsored</span>
                <span className="text-[10px] text-slate-500">·</span>
                <span className="text-[10px] text-slate-500 truncate">{ad.url}</span>
              </div>

              <div className="mb-1">
                <a href="#" className="text-lg md:text-xl text-[#1a0dab] dark:text-[#8ab4f8] hover:underline hover:cursor-pointer font-medium leading-tight block">
                  {ad.headline} - {ad.subHeadline}
                </a>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                {ad.description1} {ad.description2}
              </p>

              <div className="flex gap-2 flex-wrap">
                <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">7-Day Launch</span>
                <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">Expert Team</span>
              </div>
            </motion.div>
          ))}
        </div>


        {/* Hooks Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold font-display">A/B Testing Hook Variations</h3>
            <p className="text-muted-foreground mt-2">Strategic messaging designed to trigger specific psychological responses.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {hookSets.map((set, setIndex) => (
              <motion.div
                key={setIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: setIndex * 0.1 }}
                className="bg-white backdrop-blur-sm border border-border rounded-2xl overflow-hidden shadow-sm"
              >
                <div className="p-5 border-b border-border/50 bg-secondary/50 flex items-center gap-3">
                  <div className="p-2 bg-background rounded-lg shadow-sm">
                    {set.icon}
                  </div>
                  <h4 className="font-bold text-lg">{set.title}</h4>
                </div>
                <div className="p-5 space-y-4">
                  {set.hooks.map((hook, hookIndex) => (
                    <div key={hookIndex} className="p-4 bg-background rounded-xl border border-border/50 hover:border-primary/30 transition-colors group">
                      <p className="font-medium text-foreground group-hover:text-primary transition-colors text-lg">"{hook.text}"</p>
                      <p className="text-xs text-muted-foreground mt-2 font-mono uppercase tracking-wide">{hook.subtext}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
