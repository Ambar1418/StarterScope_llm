import { useLanguage } from "@/context/LanguageContext";
import { Languages } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  const handleToggle = () => {
    const nextLang = lang === "en" ? "hi" : "en";
    setLang(nextLang);
    toast.success(
      nextLang === "hi"
        ? "भाषा हिन्दी में बदली गई"
        : "Language switched to English"
    );
  };

  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={handleToggle}
      aria-label={lang === "en" ? "Switch to Hindi" : "Switch to English"}
      className="w-20 h-10 rounded-full bg-elevated border border-border flex items-center justify-between px-3.5 transition-all hover:border-accent-emerald/40 group relative overflow-hidden select-none"
    >
      <Languages className="w-[16px] h-[16px] text-text-secondary group-hover:text-accent-emerald transition-colors" />
      <div className="flex-1 text-right font-mono text-xs font-bold text-text-primary pl-1.5">
        <AnimatePresence mode="wait">
          <motion.span
            key={lang}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="block"
          >
            {lang === "en" ? "EN" : "हिं"}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.button>
  );
}
