import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookmarkPlus,
  FileText,
  TrendingUp,
  Shield,
  Layers,
  MapPin,
  Users,
  Percent,
  CheckCircle,
  HelpCircle
} from "lucide-react";
import type { Recommendation } from "@/utils/realBusinessAPI";
import { SsButton } from "@/components/ss/SsButton";
import { SsBadge } from "@/components/ss/SsBadge";
import { useSearch } from "@/context/SearchContext";
import { toast } from "sonner";
import { translations, Lang, translateCategory } from "@/utils/translations";

function riskTone(risk: Recommendation["risk"]): "emerald" | "amber" | "rose" {
  if (risk === "Low") return "emerald";
  if (risk === "Medium") return "amber";
  return "rose";
}

interface EnhancedRecommendationCardProps {
  rec: Recommendation;
  index: number;
  lang: Lang;
  isSelectedForCompare: boolean;
  onToggleCompare: () => void;
  onSaveToVault?: () => void;
  isSaved?: boolean;
}

export function EnhancedRecommendationCard({
  rec,
  index,
  lang,
  isSelectedForCompare,
  onToggleCompare,
  onSaveToVault,
  isSaved = false
}: EnhancedRecommendationCardProps) {
  const { setSelected } = useSearch();

  const t = (key: keyof typeof translations["en"]) => {
    return translations[lang][key] || translations["en"][key];
  };

  // Circular progress ring parameters
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (rec.score / 100) * circumference;

  // Color scheme based on score
  const getGradientClass = (score: number) => {
    if (score >= 90) return "from-accent-emerald to-vivid-blue";
    if (score >= 75) return "from-vivid-blue to-vivid-violet";
    return "from-vivid-amber to-vivid-rose";
  };

  const getBorderColor = (score: number) => {
    if (score >= 90) return "group-hover:border-accent-emerald/50";
    if (score >= 75) return "group-hover:border-vivid-blue/50";
    return "group-hover:border-vivid-amber/50";
  };

  const getGlowColor = (score: number) => {
    if (score >= 90) return "rgba(0, 200, 150, 0.15)";
    if (score >= 75) return "rgba(59, 110, 234, 0.15)";
    return "rgba(245, 158, 11, 0.15)";
  };

  const handleSave = () => {
    if (onSaveToVault) {
      onSaveToVault();
    } else {
      toast.success(`${t("savedToVault")}: ${rec.name}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="group rounded-xl overflow-hidden border border-border bg-surface shadow-card hover:shadow-card-hover transition-all duration-300"
    >
      {/* Top Accent Bar (thin & clean) */}
      <div className={`h-[2px] w-full bg-gradient-to-r ${getGradientClass(rec.score)}`} />
      
      <div className="p-6">
        {/* Header Block */}
        <div className="flex justify-between items-start gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="font-display font-bold text-base sm:text-lg text-text-primary leading-snug group-hover:text-accent-emerald transition-colors">
              {rec.name}
            </h3>
            <span className="mt-1 inline-block font-mono text-[9px] uppercase tracking-wider bg-elevated text-text-muted px-2 py-0.5 rounded border border-border/40">
              {translateCategory(rec.category, lang)}
            </span>
          </div>

          {/* Animated SVG Progress Ring */}
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="24"
                  cy="24"
                  r="18"
                  className="stroke-overlay"
                  strokeWidth="2.5"
                  fill="transparent"
                />
                <motion.circle
                  cx="24"
                  cy="24"
                  r="18"
                  className="stroke-accent-emerald"
                  strokeWidth="2.5"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 18}
                  initial={{ strokeDashoffset: 2 * Math.PI * 18 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 18 - (rec.score / 100) * (2 * Math.PI * 18) }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: "easeOut" }}
                  style={{ stroke: `url(#gradient-${rec.id})` }}
                />
                <defs>
                  <linearGradient id={`gradient-${rec.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={rec.score >= 90 ? "hsl(var(--accent-emerald))" : rec.score >= 75 ? "hsl(var(--vivid-blue))" : "hsl(var(--vivid-amber))"} />
                    <stop offset="100%" stopColor={rec.score >= 90 ? "hsl(var(--vivid-blue))" : rec.score >= 75 ? "hsl(var(--vivid-violet))" : "hsl(var(--vivid-rose))"} />
                  </linearGradient>
                </defs>
              </svg>
              <span className="absolute font-mono text-xs font-bold text-text-primary">
                {rec.score}
              </span>
            </div>
            <span className="mt-0.5 text-[8px] text-text-muted uppercase tracking-wider font-semibold">
              {t("demandIndex")}
            </span>
          </div>
        </div>

        {/* Tags Block */}
        <div className="mt-2.5 flex flex-wrap gap-1">
          {rec.tags.map((t) => (
            <SsBadge key={t} tone="neutral" className="text-[9px] font-mono px-1.5 py-0 rounded border border-border/60">
              #{t}
            </SsBadge>
          ))}
        </div>

        {/* Description */}
        <p className="mt-3.5 font-body text-xs text-text-secondary leading-relaxed line-clamp-3">
          {rec.description}
        </p>

        {/* Financial and Risk Telemetry Grid */}
        <div className="mt-5 grid grid-cols-3 border border-border/60 rounded-xl overflow-hidden bg-elevated/10">
          {[
            { value: rec.investment, label: m => t("investmentLabel"), icon: <Layers className="w-3.5 h-3.5 text-vivid-blue" /> },
            { value: rec.roi, label: m => t("roiLabel"), icon: <TrendingUp className="w-3.5 h-3.5 text-accent-emerald" /> },
            { value: rec.risk, label: m => t("riskLabel"), icon: <Shield className="w-3.5 h-3.5" /> }
          ].map((m, idx) => (
            <div
              key={idx}
              className={`p-3 text-center flex flex-col justify-between items-center ${
                idx < 2 ? "border-r border-border/60" : ""
              }`}
            >
              <div className="text-[9px] text-text-muted uppercase tracking-wider font-semibold mb-1">
                {m.label({})}
              </div>
              <div className="font-mono text-xs font-bold text-text-primary">
                {idx === 2 ? (
                  <SsBadge tone={riskTone(rec.risk)} className="!py-0.5 !px-1.5 text-[9px] font-sans font-bold">
                    {rec.risk}
                  </SsBadge>
                ) : (
                  m.value
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Structured Row List */}
        <div className="mt-4 pt-3.5 border-t border-border/40 space-y-2 text-xs">
          <div className="flex justify-between items-center py-0.5">
            <span className="text-text-muted text-[11px] font-medium">📅 {t("paybackPeriod")}</span>
            <span className="font-mono font-semibold text-text-primary text-[11px]">{rec.paybackPeriod || "12 Months"}</span>
          </div>
          <div className="flex justify-between items-center py-0.5">
            <span className="text-text-muted text-[11px] font-medium">💰 {t("potentialRevenue")}</span>
            <span className="font-mono font-semibold text-text-primary text-[11px]">{rec.potentialRevenue || "—"}</span>
          </div>
          <div className="flex justify-between items-center py-0.5">
            <span className="text-text-muted text-[11px] font-medium">📍 {t("idealNeighborhood")}</span>
            <span className="font-semibold text-text-secondary text-[11px] truncate max-w-[160px]">{rec.idealNeighborhood || "Prime Hubs"}</span>
          </div>
        </div>

        {/* Success Probability Progress Bar */}
        <div className="mt-4 pt-3 border-t border-border/40">
          <div className="flex justify-between items-center text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-1">
            <span>🎯 {t("successProbability")}</span>
            <span className="font-mono font-bold text-accent-emerald">{rec.score}%</span>
          </div>
          <div className="h-1 w-full bg-border rounded-full overflow-hidden">
            <motion.div 
              className={`h-full bg-gradient-to-r ${getGradientClass(rec.score)}`} 
              initial={{ width: 0 }}
              animate={{ width: `${rec.score}%` }}
              transition={{ delay: index * 0.1 + 0.4, duration: 0.6 }}
            />
          </div>
        </div>

        {/* Action Panel */}
        <div className="mt-5 pt-4 border-t border-border/40 flex flex-wrap items-center justify-between gap-3">
          {/* Compare Checkbox */}
          <label className="flex items-center gap-2 cursor-pointer group/label select-none">
            <input
              type="checkbox"
              checked={isSelectedForCompare}
              onChange={onToggleCompare}
              className="w-3.5 h-3.5 rounded border-border text-accent-emerald focus:ring-accent-emerald/20 cursor-pointer"
            />
            <span className="text-[11px] font-semibold text-text-muted group-hover/label:text-text-primary transition-colors">
              {t("addToCompare")}
            </span>
          </label>

          <div className="flex gap-1">
            <SsButton
              variant={isSaved ? "emerald" : "ghost"}
              size="xs"
              onClick={handleSave}
              className="h-8 text-[11px] font-bold"
            >
              <BookmarkPlus className="w-3.5 h-3.5" /> {isSaved ? t("saved") : t("save")}
            </SsButton>
            <Link to="/business-details" onClick={() => setSelected(rec)}>
              <SsButton variant="primary" size="xs" className="h-8 text-[11px] font-bold">
                {t("details")} <ArrowRight className="w-3.5 h-3.5" />
              </SsButton>
            </Link>
            <Link to="/business-plan" onClick={() => setSelected(rec)}>
              <SsButton variant="blue" size="xs" className="h-8 text-[11px] font-bold">
                <FileText className="w-3.5 h-3.5" /> {t("plan")}
              </SsButton>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
