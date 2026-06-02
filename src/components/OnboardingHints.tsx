import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, X, Sparkles, MapPin, Sliders, Heart } from "lucide-react";
import { translations, Lang } from "@/utils/translations";

interface OnboardingHintsProps {
  lang: Lang;
}

export function OnboardingHints({ lang }: OnboardingHintsProps) {
  const [visible, setVisible] = useState(false);

  const t = (key: keyof typeof translations["en"]) => {
    return translations[lang][key] || translations["en"][key];
  };

  useEffect(() => {
    const dismissed = localStorage.getItem("ss.onboarding.dismissed");
    if (!dismissed) {
      // Show onboarding if never dismissed
      setVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem("ss.onboarding.dismissed", "true");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-6 p-5 glass-card-blur border border-accent-emerald/20 relative bg-accent-emerald-light/10 dark:bg-accent-emerald-light/5"
        >
          {/* Dismiss Button */}
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition-colors"
            title={t("onboardingDismiss")}
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-accent-emerald/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-sm text-text-primary">
                🚀 {t("onboardingTitle")}
              </h3>
              <p className="text-xs text-text-secondary mt-1">
                {t("onboardingWelcome")}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                {[
                  {
                    icon: <MapPin className="w-4 h-4 text-accent-emerald" />,
                    text: t("onboardingStep1")
                  },
                  {
                    icon: <Sparkles className="w-4 h-4 text-vivid-blue" />,
                    text: t("onboardingStep2")
                  },
                  {
                    icon: <HelpCircle className="w-4 h-4 text-vivid-amber" />,
                    text: t("onboardingStep3")
                  },
                  {
                    icon: <Sliders className="w-4 h-4 text-vivid-violet" />,
                    text: t("onboardingStep4")
                  }
                ].map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-surface border border-border/50 rounded-xl flex gap-3 items-start"
                  >
                    <div className="p-1.5 rounded-lg bg-elevated">{step.icon}</div>
                    <span className="text-[11px] leading-relaxed text-text-secondary">
                      {step.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setVisible(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface border border-border hover:bg-elevated text-xs font-mono font-bold text-text-muted hover:text-text-primary transition-all active:scale-[0.98]"
          >
            <HelpCircle className="w-3.5 h-3.5" /> {t("onboardingShow")}
          </button>
        </div>
      )}
    </AnimatePresence>
  );
}
