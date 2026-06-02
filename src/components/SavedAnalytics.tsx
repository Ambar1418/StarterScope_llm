import { useEffect, useState } from "react";
import { DollarSign, Landmark, TrendingUp, FolderPlus } from "lucide-react";
import type { Recommendation } from "@/utils/realBusinessAPI";
import { translations, Lang } from "@/utils/translations";

interface SavedAnalyticsProps {
  savedItems: Recommendation[];
  lang: Lang;
}

export function SavedAnalytics({ savedItems, lang }: SavedAnalyticsProps) {
  const t = (key: keyof typeof translations["en"]) => {
    return translations[lang][key] || translations["en"][key];
  };

  const [totalCapex, setTotalCapex] = useState("₹0");
  const [avgRoi, setAvgRoi] = useState("0%");

  // Helper to parse ROI percentage, e.g., "35%" -> 35
  const parseRoi = (roiStr: string): number => {
    const cleanStr = roiStr.replace(/[^0-9.]/g, "");
    const val = parseFloat(cleanStr);
    return isNaN(val) ? 0 : val;
  };

  // Helper to parse investment Lakhs, e.g., "₹8-12L" -> 10, "₹15L" -> 15
  const parseInvestment = (invStr: string): number => {
    const cleanStr = invStr.replace(/[^0-9.-]/g, "");
    if (cleanStr.includes("-")) {
      const parts = cleanStr.split("-").map(parseFloat);
      if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        return (parts[0] + parts[1]) / 2;
      }
    }
    const val = parseFloat(cleanStr);
    return isNaN(val) ? 0 : val;
  };

  useEffect(() => {
    if (savedItems.length === 0) {
      setTotalCapex("₹0");
      setAvgRoi("0%");
      return;
    }

    let totalInv = 0;
    let totalRoi = 0;

    savedItems.forEach((item) => {
      totalInv += parseInvestment(item.investment);
      totalRoi += parseRoi(item.roi);
    });

    const averageRoi = totalRoi / savedItems.length;

    setTotalCapex(`₹${totalInv.toFixed(1)}L`);
    setAvgRoi(`${averageRoi.toFixed(1)}%`);
  }, [savedItems]);

  if (savedItems.length === 0) {
    return (
      <div className="p-8 text-center glass-card border border-dashed border-border/80">
        <FolderPlus className="w-10 h-10 mx-auto text-text-muted mb-3 opacity-60" />
        <h3 className="font-display font-bold text-sm text-text-primary">
          Alpha Vault Analytics
        </h3>
        <p className="text-xs text-text-muted mt-1 max-w-sm mx-auto">
          Save strategic opportunities from your scans to build a portfolio and view aggregated financial requirements.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 border border-accent-emerald/10">
      <div>
        <h3 className="font-display font-extrabold text-base text-text-primary">
          🛡️ {t("savedAnalyticsTitle")}
        </h3>
        <p className="text-xs text-text-muted mt-1">
          {t("savedAnalyticsSubtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        {/* Total Count */}
        <div className="p-4 bg-background/50 border border-border/60 rounded-xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-vivid-violet-light/50 dark:bg-vivid-violet-light/10 text-vivid-violet flex items-center justify-center">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">
              {t("totalSaved")}
            </div>
            <div className="font-mono text-xl font-black text-text-primary mt-0.5">
              {savedItems.length}
            </div>
          </div>
        </div>

        {/* Total Investment */}
        <div className="p-4 bg-background/50 border border-border/60 rounded-xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-vivid-blue-light/50 dark:bg-vivid-blue-light/10 text-vivid-blue flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">
              {t("totalInvestment")}
            </div>
            <div className="font-mono text-xl font-black text-text-primary mt-0.5">
              {totalCapex}
            </div>
          </div>
        </div>

        {/* Avg ROI */}
        <div className="p-4 bg-background/50 border border-border/60 rounded-xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-accent-emerald-light/50 dark:bg-accent-emerald-light/10 text-accent-emerald flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">
              {t("avgRoi")}
            </div>
            <div className="font-mono text-xl font-black text-text-primary mt-0.5">
              {avgRoi}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
