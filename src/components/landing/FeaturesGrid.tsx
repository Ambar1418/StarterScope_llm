import { motion } from "framer-motion";
import {
  Telescope,
  MapPin,
  Lightbulb,
  Map,
  Swords,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/utils/translations";

const features = [
  {
    Icon: Telescope,
    titleKey: "feat1Title" as const,
    descKey: "feat1Desc" as const,
    bg: "from-accent-emerald-light to-transparent",
    iconColor: "text-accent-emerald",
  },
  {
    Icon: MapPin,
    titleKey: "feat2Title" as const,
    descKey: "feat2Desc" as const,
    bg: "from-vivid-blue-light to-transparent",
    iconColor: "text-vivid-blue",
  },
  {
    Icon: Lightbulb,
    titleKey: "feat3Title" as const,
    descKey: "feat3Desc" as const,
    bg: "from-vivid-amber/10 to-transparent",
    iconColor: "text-vivid-amber",
  },
  {
    Icon: Map,
    titleKey: "feat4Title" as const,
    descKey: "feat4Desc" as const,
    bg: "from-vivid-violet/10 to-transparent",
    iconColor: "text-vivid-violet",
  },
  {
    Icon: Swords,
    titleKey: "feat5Title" as const,
    descKey: "feat5Desc" as const,
    bg: "from-vivid-rose/10 to-transparent",
    iconColor: "text-vivid-rose",
  },
  {
    Icon: ShieldCheck,
    titleKey: "feat6Title" as const,
    descKey: "feat6Desc" as const,
    bg: "from-accent-emerald-light to-transparent",
    iconColor: "text-accent-emerald",
  },
];

export function FeaturesGrid() {
  const { lang } = useLanguage();
  const { t } = useTranslation(lang);

  return (
    <section id="features" className="py-24 bg-surface border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="eyebrow text-accent-emerald">{t("capabilitiesBadge")}</span>
          <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-text-primary">
            {t("featuresTitle")}
          </h2>
          <p className="mt-4 font-body text-base sm:text-lg text-text-secondary">
            {t("featuresSubtitle")}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              whileHover={{ y: -6 }}
              className="group p-7 rounded-2xl bg-background border border-border transition-all duration-200 hover:border-accent-emerald/25 hover:shadow-card-hover"
            >
              <div
                className={`w-[52px] h-[52px] rounded-xl bg-gradient-to-br ${f.bg} flex items-center justify-center`}
              >
                <f.Icon className={`w-6 h-6 ${f.iconColor}`} strokeWidth={2} />
              </div>
              <h3 className="mt-5 font-display font-semibold text-[17px] text-text-primary">
                {t(f.titleKey)}
              </h3>
              <p className="mt-2 font-body text-sm text-text-secondary leading-[1.65]">
                {t(f.descKey)}
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-accent-emerald text-[13px] font-medium opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                {t("learnMore")} <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
