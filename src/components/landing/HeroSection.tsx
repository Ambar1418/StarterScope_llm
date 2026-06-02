import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, PlayCircle, Star, MapPin } from "lucide-react";
import { SsButton } from "@/components/ss/SsButton";
import { SsBadge } from "@/components/ss/SsBadge";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/utils/translations";

export function HeroSection() {
  const { lang } = useLanguage();
  const { t } = useTranslation(lang);

  const headingWords = lang === "hi" ? ["अपना", "अगला", "बड़ा"] : ["Find", "Your", "Next"];
  const headingWords2 = lang === "hi" ? ["अवसर", "खोजें।"] : ["Big", "Opportunity."];

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden bg-background">
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-60 pointer-events-none" />

      {/* Orbs */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -left-32 w-[700px] h-[700px] orb-emerald pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-40 -right-40 w-[600px] h-[600px] orb-blue pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SsBadge tone="emerald" className="!text-[11px] tracking-[0.25em]">
              {lang === "hi" ? "◈ एआई बाजार खुफिया ◈" : "◈ AI MARKET INTELLIGENCE ◈"}
            </SsBadge>
          </motion.div>

          <h1 className="mt-6 font-display font-extrabold text-[40px] sm:text-[52px] lg:text-[64px] leading-[1.05] tracking-tight">
            <span className="block">
              {headingWords.map((w, i) => (
                <motion.span
                  key={`${lang}-${w}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
                  className="inline-block mr-3 text-text-primary"
                >
                  {w}
                </motion.span>
              ))}
            </span>
            <span className="block">
              {headingWords2.map((w, i) => (
                <motion.span
                  key={`${lang}-${w}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.5 }}
                  className="inline-block mr-3 text-accent-emerald text-glow-emerald"
                >
                  {w}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-6 font-body text-base sm:text-lg text-text-secondary max-w-xl leading-[1.75]"
          >
            {t("heroSubtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link to="/dashboard">
              <SsButton variant="primary" size="lg">
                {t("startScanning")} <ArrowRight className="w-5 h-5" />
              </SsButton>
            </Link>
            <SsButton variant="secondary" size="lg">
              <PlayCircle className="w-5 h-5" /> {t("watchDemo")}
            </SsButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-10 flex flex-wrap items-center gap-4 sm:gap-6"
          >
            <div className="flex -space-x-2">
              {[
                "from-accent-emerald to-vivid-blue",
                "from-vivid-blue to-vivid-violet",
                "from-vivid-amber to-vivid-rose",
                "from-vivid-violet to-accent-emerald",
              ].map((g, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full border-2 border-surface bg-gradient-to-br ${g}`}
                />
              ))}
            </div>
            <div className="flex items-center gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="w-3.5 h-3.5 text-vivid-amber fill-vivid-amber" />
              ))}
            </div>
            <p className="font-body text-[13px] text-text-muted">
              {t("trustedBy")}
            </p>
            <span className="hidden sm:inline text-text-muted">|</span>
            <p className="font-body text-[13px] text-text-muted">
              {t("builtBy")}
            </p>
          </motion.div>
        </div>

        {/* Floating mock dashboard */}
        <div className="hidden lg:block lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: -3 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="glass-card-blur p-6 shadow-float bg-surface/90"
            >
              <div className="flex items-center justify-between">
                <SsBadge tone="emerald">
                  <MapPin className="w-3 h-3" /> {lang === "hi" ? "भोपाल, म.प्र." : "Bhopal, MP"}
                </SsBadge>
                <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
                  {t("liveScan")}
                </span>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  { name: lang === "hi" ? "क्लाउड किचन" : "Cloud Kitchen", score: 94, color: "bg-accent-emerald", w: "w-[94%]" },
                  { name: lang === "hi" ? "एडटेक कोचिंग" : "EdTech Coaching", score: 88, color: "bg-vivid-blue", w: "w-[88%]" },
                  { name: lang === "hi" ? "इलेक्ट्रिक व्हीकल हब" : "EV Charging Hub", score: 82, color: "bg-vivid-amber", w: "w-[82%]" },
                ].map((r) => (
                  <div key={r.name}>
                    <div className="flex items-center justify-between">
                      <span className="font-body text-sm text-text-primary font-medium">
                        {r.name}
                      </span>
                      <span className="font-mono text-xs text-text-secondary">{r.score}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full rounded-full bg-elevated overflow-hidden">
                      <div className={`h-full rounded-full ${r.color} ${r.w}`} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2">
                {[
                  { label: t("investmentLabel"), value: "₹8L+" },
                  { label: t("roiLabel"), value: "14m" },
                  { label: t("riskLabel"), value: t("low") },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="bg-elevated rounded-lg p-2.5 text-center border border-border"
                  >
                    <div className="font-mono text-[11px] text-text-primary font-semibold">
                      {m.value}
                    </div>
                    <div className="text-[9px] text-text-muted uppercase tracking-wider mt-0.5">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
