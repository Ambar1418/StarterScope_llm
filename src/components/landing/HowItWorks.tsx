import { motion } from "framer-motion";
import { MapPin, Brain, Target } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/utils/translations";

const steps = [
  {
    n: "01",
    Icon: MapPin,
    titleKey: "step1Title" as const,
    descKey: "step1Desc" as const,
  },
  {
    n: "02",
    Icon: Brain,
    titleKey: "step2Title" as const,
    descKey: "step2Desc" as const,
  },
  {
    n: "03",
    Icon: Target,
    titleKey: "step3Title" as const,
    descKey: "step3Desc" as const,
  },
];

export function HowItWorks() {
  const { lang } = useLanguage();
  const { t } = useTranslation(lang);

  return (
    <section id="how-it-works" className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="eyebrow text-accent-emerald">{t("processBadge")}</span>
          <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-text-primary">
            {t("threeStepsTitle")}
          </h2>
          <p className="mt-4 font-body text-base sm:text-lg text-text-secondary">
            {t("threeStepsSubtitle")}
          </p>
        </div>

        <div className="relative mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Connecting dashed line */}
          <svg
            className="hidden md:block absolute top-12 left-[16.6%] right-[16.6%] h-px pointer-events-none"
            viewBox="0 0 100 1"
            preserveAspectRatio="none"
          >
            <line
              x1="0"
              y1="0.5"
              x2="100"
              y2="0.5"
              stroke="hsl(var(--accent-emerald))"
              strokeOpacity="0.3"
              strokeDasharray="4 6"
            />
          </svg>

          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="glass-card p-7 relative overflow-hidden"
            >
              <span
                aria-hidden
                className="absolute top-3 right-5 font-mono font-bold text-[64px] text-accent-emerald/15 select-none"
              >
                {s.n}
              </span>

              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-accent-emerald-light to-vivid-blue-light"
              >
                <s.Icon className="w-7 h-7 text-accent-emerald" />
              </motion.div>

              <p className="mt-6 font-mono text-[11px] text-text-muted tracking-widest">
                {t("stepLabel")} {s.n}
              </p>
              <h3 className="mt-2 font-display font-bold text-xl text-text-primary">
                {t(s.titleKey as any)}
              </h3>
              <p className="mt-3 font-body text-[15px] text-text-secondary leading-[1.7]">
                {t(s.descKey as any)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
