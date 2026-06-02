import { useCountUp } from "@/hooks/useCountUp";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/utils/translations";

const stats = [
  { value: 2400, suffix: "+", labelKey: "statsUsers" as const },
  { value: 50, suffix: "+", labelKey: "statsCities" as const },
  { value: 98, suffix: "%", labelKey: "statsAccuracy" as const },
  { value: 5, suffix: "-Layer", labelKey: "statsEngine" as const },
];

function Stat({ value, suffix, labelKey }: { value: number; suffix: string; labelKey: "statsUsers" | "statsCities" | "statsAccuracy" | "statsEngine" }) {
  const { ref, value: animated } = useCountUp(value);
  const { lang } = useLanguage();
  const { t } = useTranslation(lang);

  return (
    <div className="text-center">
      <div className="font-display font-extrabold text-3xl sm:text-4xl text-text-primary">
        <span ref={ref} className="font-mono">
          {animated.toLocaleString()}
        </span>
        <span className="text-accent-emerald">{suffix}</span>
      </div>
      <div className="mt-1 font-body text-[13px] text-text-muted">{t(labelKey)}</div>
    </div>
  );
}

export function StatsStrip() {
  const { lang } = useLanguage();
  const { t } = useTranslation(lang);

  return (
    <section className="border-y border-border bg-gradient-to-r from-accent-emerald-light via-background to-vivid-blue-light dark:bg-elevated dark:from-elevated dark:via-elevated dark:to-elevated py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
          {stats.map((s) => (
            <Stat key={s.labelKey} {...s} />
          ))}
          <div className="text-center col-span-2 md:col-span-1">
            <div className="font-display font-extrabold text-3xl sm:text-4xl text-text-primary font-mono">
              ₹<span className="text-accent-emerald">·</span>
            </div>
            <div className="mt-1 font-body text-[13px] text-text-muted">{t("statsIndiaReady")}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
