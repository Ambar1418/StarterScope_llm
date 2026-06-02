import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Recommendation } from "@/utils/realBusinessAPI";
import { translations, Lang } from "@/utils/translations";
import { SsButton } from "@/components/ss/SsButton";
import { SsBadge } from "@/components/ss/SsBadge";

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRecs: Recommendation[];
  lang: Lang;
}

export function CompareModal({ isOpen, onClose, selectedRecs, lang }: CompareModalProps) {
  const t = (key: keyof typeof translations["en"]) => {
    return translations[lang][key] || translations["en"][key];
  };

  const riskBadgeColor = (risk: Recommendation["risk"]): "emerald" | "amber" | "rose" => {
    if (risk === "Low") return "emerald";
    if (risk === "Medium") return "amber";
    return "rose";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            key="compare-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]"
          />

          {/* Modal Content */}
          <motion.div
            key="compare-modal"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3 }}
            className="relative bg-surface border border-border shadow-float rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto z-[101] p-6 md:p-8"
          >
            {/* Header */}
            <div className="flex justify-between items-start border-b border-border pb-4 mb-6">
              <div>
                <h2 className="font-display font-extrabold text-xl md:text-2xl text-text-primary">
                  📊 {t("compareTitle")}
                </h2>
                <p className="text-xs text-text-muted mt-1">
                  Comparing {selectedRecs.length} strategic business vectors
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-elevated text-text-muted hover:text-text-primary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Matrix Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="p-4 text-left font-mono text-[11px] uppercase tracking-widest text-text-muted border-b border-border bg-background/50 min-w-[150px]">
                      Dimension
                    </th>
                    {selectedRecs.map((rec) => (
                      <th
                        key={rec.id}
                        className="p-4 text-left border-b border-border bg-background/50 min-w-[200px]"
                      >
                        <h4 className="font-display font-bold text-sm text-text-primary leading-tight">
                          {rec.name}
                        </h4>
                        <SsBadge tone="neutral" className="mt-1">
                          {rec.category}
                        </SsBadge>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {/* Demand Score */}
                  <tr>
                    <td className="p-4 text-xs font-semibold text-text-secondary">
                      {t("demandIndex")}
                    </td>
                    {selectedRecs.map((rec) => (
                      <td key={rec.id} className="p-4 text-sm font-mono font-bold text-text-primary">
                        <span className="inline-flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${rec.score >= 85 ? 'bg-accent-emerald' : rec.score >= 70 ? 'bg-vivid-blue' : 'bg-vivid-amber'}`} />
                          {rec.score}/100
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Investment */}
                  <tr>
                    <td className="p-4 text-xs font-semibold text-text-secondary">
                      {t("investmentLabel")}
                    </td>
                    {selectedRecs.map((rec) => (
                      <td key={rec.id} className="p-4 text-sm font-mono font-bold text-text-primary">
                        {rec.investment}
                      </td>
                    ))}
                  </tr>

                  {/* ROI */}
                  <tr>
                    <td className="p-4 text-xs font-semibold text-text-secondary">
                      {t("roiLabel")}
                    </td>
                    {selectedRecs.map((rec) => (
                      <td key={rec.id} className="p-4 text-sm font-mono font-bold text-accent-emerald">
                        {rec.roi}
                      </td>
                    ))}
                  </tr>

                  {/* Payback Period */}
                  <tr>
                    <td className="p-4 text-xs font-semibold text-text-secondary">
                      {t("paybackPeriod")}
                    </td>
                    {selectedRecs.map((rec) => (
                      <td key={rec.id} className="p-4 text-sm font-mono text-text-primary">
                        {rec.paybackPeriod || "—"}
                      </td>
                    ))}
                  </tr>

                  {/* Risk */}
                  <tr>
                    <td className="p-4 text-xs font-semibold text-text-secondary">
                      {t("riskLabel")}
                    </td>
                    {selectedRecs.map((rec) => (
                      <td key={rec.id} className="p-4 text-sm">
                        <SsBadge tone={riskBadgeColor(rec.risk)}>
                          {rec.risk}
                        </SsBadge>
                      </td>
                    ))}
                  </tr>

                  {/* Potential Revenue */}
                  <tr>
                    <td className="p-4 text-xs font-semibold text-text-secondary">
                      {t("potentialRevenue")}
                    </td>
                    {selectedRecs.map((rec) => (
                      <td key={rec.id} className="p-4 text-sm font-mono text-text-primary">
                        {rec.potentialRevenue || "—"}
                      </td>
                    ))}
                  </tr>

                  {/* Market Size */}
                  <tr>
                    <td className="p-4 text-xs font-semibold text-text-secondary">
                      {t("marketSize")}
                    </td>
                    {selectedRecs.map((rec) => (
                      <td key={rec.id} className="p-4 text-sm font-mono text-text-primary">
                        {rec.marketSize || "—"}
                      </td>
                    ))}
                  </tr>

                  {/* Est. CAC */}
                  <tr>
                    <td className="p-4 text-xs font-semibold text-text-secondary">
                      {t("cac")}
                    </td>
                    {selectedRecs.map((rec) => (
                      <td key={rec.id} className="p-4 text-sm font-mono text-text-primary">
                        {rec.cac || "—"}
                      </td>
                    ))}
                  </tr>

                  {/* Ideal Neighborhood */}
                  <tr>
                    <td className="p-4 text-xs font-semibold text-text-secondary">
                      {t("idealNeighborhood")}
                    </td>
                    {selectedRecs.map((rec) => (
                      <td key={rec.id} className="p-4 text-sm text-text-secondary">
                        📍 {rec.idealNeighborhood || "—"}
                      </td>
                    ))}
                  </tr>

                  {/* Key Success Factors */}
                  <tr>
                    <td className="p-4 text-xs font-semibold text-text-secondary">
                      {t("keySuccessFactors")}
                    </td>
                    {selectedRecs.map((rec) => (
                      <td key={rec.id} className="p-4 text-xs text-text-secondary">
                        {rec.keySuccessFactors ? (
                          <ul className="list-disc pl-4 space-y-1">
                            {rec.keySuccessFactors.map((f, i) => (
                              <li key={i}>{f}</li>
                            ))}
                          </ul>
                        ) : (
                          "—"
                        )}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Footer Actions */}
            <div className="flex justify-end gap-3 mt-8 border-t border-border pt-4">
              <SsButton variant="ghost" onClick={onClose}>
                Dismiss
              </SsButton>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
