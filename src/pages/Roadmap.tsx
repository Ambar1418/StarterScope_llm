import { motion } from "framer-motion";
import { Navigate } from "react-router-dom";
import { Check } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useSearch } from "@/context/SearchContext";
import { SsBadge } from "@/components/ss/SsBadge";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/utils/translations";

const phases = [
  {
    n: "01",
    title: "Research & Validation",
    when: "Month 1-2",
    budget: "₹50,000",
    items: ["Market interviews", "Competitor mapping", "Test landing page", "Pricing validation"],
  },
  {
    n: "02",
    title: "Business Registration & Setup",
    when: "Month 2-3",
    budget: "₹1,20,000",
    items: ["Company registration", "GST + licenses", "Bank account", "Initial team hiring"],
  },
  {
    n: "03",
    title: "Infrastructure & Operations",
    when: "Month 3-5",
    budget: "₹4,50,000",
    items: ["Lease premises", "Equipment & fit-out", "Vendor contracts", "Inventory setup"],
  },
  {
    n: "04",
    title: "Launch & Marketing",
    when: "Month 5-6",
    budget: "₹2,00,000",
    items: ["Soft launch event", "Performance marketing", "PR & partnerships", "Loyalty program"],
  },
  {
    n: "05",
    title: "Growth & Scaling",
    when: "Month 6-12",
    budget: "₹3,00,000+",
    items: ["Channel expansion", "Hire ops manager", "Second location", "Brand systemization"],
  },
];

const translateRoadmapString = (str: string, lang: "en" | "hi") => {
  if (lang === "en") return str;
  const map: Record<string, string> = {
    "Research & Validation": "अनुसंधान और सत्यापन",
    "Business Registration & Setup": "व्यवसाय पंजीकरण और सेटअप",
    "Infrastructure & Operations": "बुनियादी ढांचा और संचालन",
    "Launch & Marketing": "लॉन्च और मार्केटिंग",
    "Growth & Scaling": "विकास और स्केलिंग",
    "Month 1-2": "महीना 1-2",
    "Month 2-3": "महीना 2-3",
    "Month 3-5": "महीना 3-5",
    "Month 5-6": "महीना 5-6",
    "Month 6-12": "महीना 6-12",
    "Market interviews": "बाजार साक्षात्कार",
    "Competitor mapping": "प्रतियोगी मानचित्रण",
    "Test landing page": "परीक्षण लैंडिंग पृष्ठ",
    "Pricing validation": "मूल्य निर्धारण सत्यापन",
    "Company registration": "कंपनी पंजीकरण",
    "GST + licenses": "जीएसटी + लाइसेंस",
    "Bank account": "बैंक खाता",
    "Initial team hiring": "प्रारंभिक टीम भर्ती",
    "Lease premises": "परिसर पट्टा",
    "Equipment & fit-out": "उपकरण और फिट-आउट",
    "Vendor contracts": "विक्रेता अनुबंध",
    "Inventory setup": "इन्वेंटरी सेटअप",
    "Soft launch event": "सॉफ्ट लॉन्च इवेंट",
    "Performance marketing": "प्रदर्शन विपणन",
    "PR & partnerships": "पीआर और साझेदारी",
    "Loyalty program": "वफादारी कार्यक्रम",
    "Channel expansion": "चैनल विस्तार",
    "Hire ops manager": "ऑप्स मैनेजर की भर्ती",
    "Second location": "दूसरा स्थान",
    "Brand systemization": "ब्रांड व्यवस्थितकरण",
  };
  return map[str] || str;
};

export default function Roadmap() {
  const { selected } = useSearch();
  const { lang } = useLanguage();
  const { t } = useTranslation(lang);

  if (!selected) return <Navigate to="/dashboard" replace />;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="text-center max-w-2xl mx-auto">
          <span className="eyebrow text-accent-emerald">
            {lang === "hi" ? "◈ रणनीतिक रोडमैप ◈" : "◈ STRATEGIC ROADMAP ◈"}
          </span>
          <h1 className="mt-4 font-display font-extrabold text-3xl sm:text-4xl text-text-primary">
            {t("strategicRoadmapTitle")}
          </h1>
          <p className="mt-2 font-body text-base text-text-secondary">
            {t("phasedLaunchPlan")} {selected.name}
          </p>
        </div>

        <div className="relative mt-16">
          {/* Center vertical line */}
          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-emerald to-vivid-blue" />

          <ul className="space-y-12">
            {phases.map((p, i) => {
              const left = i % 2 === 0;
              return (
                <li key={p.n} className="relative">
                  {/* Node */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-accent-emerald border-4 border-background z-10" />

                  <motion.div
                    initial={{ opacity: 0, x: left ? -24 : 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5 }}
                    className={`pl-12 md:pl-0 md:w-[calc(50%-2rem)] ${
                      left ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"
                    }`}
                  >
                    <div className="glass-card p-6">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-accent-emerald">
                            {t("phase")} {p.n}
                          </span>
                          <SsBadge tone="emerald">{translateRoadmapString(p.when, lang)}</SsBadge>
                        </div>
                      </div>
                      <h3 className="mt-2 font-display font-bold text-lg text-text-primary">
                        {translateRoadmapString(p.title, lang)}
                      </h3>
                      <ul className="mt-4 space-y-2">
                        {p.items.map((it) => (
                          <li key={it} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-accent-emerald mt-0.5 flex-shrink-0" strokeWidth={3} />
                            <span className="font-body text-sm text-text-secondary">
                              {translateRoadmapString(it, lang)}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                        <span className="font-mono text-[11px] uppercase tracking-widest text-text-muted">
                          {t("estBudget")}
                        </span>
                        <span className="font-mono text-base font-bold text-text-primary">
                          {p.budget}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </li>
              );
            })}
          </ul>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
}
