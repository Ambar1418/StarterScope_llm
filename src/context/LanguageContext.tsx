import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Lang = "en" | "hi";

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    if (lang === "hi") {
      document.documentElement.classList.add("lang-hi");
      document.documentElement.setAttribute("lang", "hi");
    } else {
      document.documentElement.classList.remove("lang-hi");
      document.documentElement.setAttribute("lang", "en");
    }
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
