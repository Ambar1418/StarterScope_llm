import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Hexagon } from "lucide-react";

const STAGES = [
  "Starting our expert market scan...",
  "Connecting to local market data...",
  "Scanning local business gaps...",
  "Organizing local insights...",
  "Building your business profile...",
  "Reasoning through the best opportunities...",
  "Polishing your final report..."
];

interface LoadingScreenProps {
  progressMessage?: string;
}

export function LoadingScreen({ progressMessage }: LoadingScreenProps) {
  // Check active index from the stream
  const activeIndex = STAGES.findIndex(s => s.toLowerCase() === (progressMessage || "").toLowerCase());
  const currentIndex = activeIndex !== -1 ? activeIndex : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Progress indicator */}
      <div className="glass-card p-6 border border-accent-emerald/20 bg-accent-emerald-light/5 dark:bg-accent-emerald-light/0">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex items-center justify-center">
            <span className="absolute w-4 h-4 rounded-full bg-accent-emerald/30 animate-ping" />
            <Hexagon className="w-6 h-6 text-accent-emerald fill-accent-emerald/10 relative" strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="font-display font-extrabold text-xs tracking-wider text-text-primary uppercase">
              RAG Swarm Reconnaissance
            </h4>
            <p className="text-[11px] text-text-muted font-mono uppercase tracking-tight mt-0.5">
              Live WebSocket telemetry connection established
            </p>
          </div>
        </div>

        <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-elevated">
          <motion.div 
            className="h-full bg-gradient-brand rounded-full"
            initial={{ width: "10%" }}
            animate={{ width: `${Math.max(10, ((currentIndex + 1) / STAGES.length) * 100)}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
          {STAGES.map((s, idx) => {
            const isCompleted = idx < currentIndex;
            const isActive = idx === currentIndex;
            
            return (
              <li
                key={s}
                className={`p-2.5 rounded-xl border font-mono text-[11px] flex items-center gap-2.5 transition-all duration-300 ${
                  isActive
                    ? "border-accent-emerald bg-accent-emerald/5 text-text-primary shadow-sm"
                    : isCompleted
                    ? "border-border bg-surface text-text-muted line-through"
                    : "border-border/30 bg-surface/30 text-text-muted opacity-40"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${
                  isActive ? "bg-accent-emerald animate-pulse" : isCompleted ? "bg-text-muted" : "bg-transparent border border-border"
                }`} />
                <span className="truncate">{s}</span>
              </li>
            );
          })}
        </ul>

        {/* Live stream ticker */}
        {progressMessage && (
          <div className="mt-4 p-3 bg-surface border border-border rounded-xl flex items-center justify-between">
            <span className="font-mono text-[11px] text-text-muted uppercase tracking-wider">Current Telemetry Signal</span>
            <span className="font-mono text-xs text-accent-emerald font-semibold animate-pulse">{progressMessage}</span>
          </div>
        )}
      </div>

      {/* Shimmer Skeletons grid */}
      <div className="grid gap-5 md:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="glass-card p-6 space-y-4 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 bg-elevated" />
            <div className="flex justify-between items-start">
              <div className="space-y-2.5 flex-1">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
              </div>
              <Skeleton className="h-12 w-12 rounded-full" />
            </div>
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
            <div className="grid grid-cols-3 gap-2 mt-4">
              <Skeleton className="h-10 w-full rounded-xl" />
              <Skeleton className="h-10 w-full rounded-xl" />
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
            <div className="flex gap-2 pt-2">
              <Skeleton className="h-8 w-20 rounded-lg" />
              <Skeleton className="h-8 w-20 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
