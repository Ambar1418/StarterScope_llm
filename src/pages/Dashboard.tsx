import { useCallback, useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { API_BASE_URL } from "@/config/api";
import { motion } from "framer-motion";
import { Search, MapPin, Download, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SsButton } from "@/components/ss/SsButton";
import { SsInput } from "@/components/ss/SsInput";
import { SsBadge } from "@/components/ss/SsBadge";
import { EmptyState } from "@/components/EmptyState";
import { LoadingScreen } from "@/components/LoadingScreen";
import { EnhancedRecommendationCard } from "@/components/EnhancedRecommendationCard";
import { fetchRecommendations } from "@/utils/realBusinessAPI";
import { useSearch } from "@/context/SearchContext";
import { toast } from "sonner";
import { useGooglePlacesAutocomplete } from "@/hooks/useGooglePlacesAutocomplete";

export default function DashboardPage() {
  const { user } = useAuth();
  const { scan, setScan } = useSearch();
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [recentScans, setRecentScans] = useState<any[]>([]);
  const [sidebarInput, setSidebarInput] = useState<HTMLInputElement | null>(null);
  const [mobileInput, setMobileInput] = useState<HTMLInputElement | null>(null);

  const onPlaceSelected = useCallback((label: string) => {
    setLocation(label);
  }, []);

  useGooglePlacesAutocomplete({ input: sidebarInput, onPlaceSelected });
  useGooglePlacesAutocomplete({ input: mobileInput, onPlaceSelected });

  const fetchHistory = async (email: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/history/${encodeURIComponent(email)}`);
      if (res.ok) {
        const data = await res.json();
        setRecentScans(data.history || []);
      }
    } catch (err) {
      console.error("Failed to fetch search history:", err);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchHistory(user.email);
    }
  }, [user]);

  const runScan = async () => {
    if (!location.trim()) {
      toast.error("Please enter a location");
      return;
    }
    setLoading(true);
    setScan(null);
    try {
      const result = await fetchRecommendations(location.trim(), user?.email || undefined);
      setScan(result);
      toast.success(`Found ${result.recommendations.length} opportunities`);
      if (user?.email) {
        fetchHistory(user.email);
      }
    } catch {
      toast.error("Scan failed — please retry");
    } finally {
      setLoading(false);
    }
  };

  const handleRecentScanClick = (scanItem: any) => {
    setLocation(scanItem.area);
    
    // Normalize recommendations from the history record
    const rawRecs = Array.isArray(scanItem.recommendations)
      ? scanItem.recommendations
      : typeof scanItem.recommendations === "string"
      ? JSON.parse(scanItem.recommendations)
      : [];

    setScan({
      location: scanItem.area,
      scannedAt: scanItem.created_at,
      recommendations: rawRecs
    });
  };

  const formatScanTime = (dateStr: string) => {
    try {
      const normalizedStr = dateStr.replace(" ", "T");
      const date = new Date(normalizedStr);
      if (isNaN(date.getTime())) return dateStr;
      
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      
      if (diffMins < 1) return "Just now";
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      
      return date.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Page header */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center gap-2 font-mono text-xs text-text-muted">
            <span>Home</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-text-primary">Dashboard</span>
          </div>
          <h1 className="mt-2 font-display font-extrabold text-2xl sm:text-3xl text-text-primary">
            Strategic Intelligence Dashboard
          </h1>
        </div>
      </div>

      <div className="flex-1 flex overflow-x-hidden">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-[300px] bg-surface border-r border-border sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="p-6 border-b border-border">
            <p className="font-mono text-[11px] text-text-muted uppercase tracking-widest mb-3">
              New Scan
            </p>
            <SsInput
              ref={setSidebarInput}
              leftIcon={<MapPin className="w-4 h-4" />}
              placeholder="Enter city or area"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && runScan()}
            />
            <SsButton
              variant="primary"
              className="w-full mt-3"
              onClick={runScan}
              disabled={loading}
            >
              {loading ? "Scanning..." : "Run Analysis"}
            </SsButton>
          </div>
          <div className="p-6">
            <p className="font-mono text-[11px] text-text-muted uppercase tracking-widest mb-3">
              Recent Scans
            </p>
            {recentScans.length === 0 ? (
              <p className="text-xs text-text-muted italic px-3 py-2">No recent scans yet</p>
            ) : (
              <ul className="space-y-1">
                {recentScans.map((s, i) => (
                  <li key={s.id || s.area + i}>
                    <button
                      onClick={() => handleRecentScanClick(s)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between hover:bg-elevated transition-colors border-l-2 ${
                        scan?.location === s.area ? "border-accent-emerald bg-elevated" : "border-transparent"
                      }`}
                    >
                      <div>
                        <div className="font-body text-sm text-text-primary">
                          {s.area}
                        </div>
                        <div className="font-mono text-[11px] text-text-muted">
                          {formatScanTime(s.created_at)}
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>

        {/* Main */}
        <motion.main
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1 min-w-0"
        >
          <div className="max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8">
            {/* Mobile scan form */}
            <div className="lg:hidden glass-card p-4 mb-6 space-y-3">
              <SsInput
                ref={setMobileInput}
                leftIcon={<MapPin className="w-4 h-4" />}
                placeholder="Enter city or area"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && runScan()}
              />
              <SsButton
                variant="primary"
                className="w-full"
                onClick={runScan}
                disabled={loading}
              >
                {loading ? "Scanning..." : "Run Analysis"}
              </SsButton>
            </div>

            {loading && <LoadingScreen />}

            {!loading && !scan && (
              <EmptyState
                icon={<Search className="w-10 h-10 text-accent-emerald" />}
                title="Ready to Find Your Opportunity?"
                description="Start by entering a location to activate the intelligence engine."
              />
            )}

            {!loading && scan && (
              <div>
                <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                  <div>
                    <h2 className="font-display font-bold text-xl sm:text-2xl text-text-primary">
                      Intelligence Report
                    </h2>
                    <p className="mt-1 font-mono text-xs text-text-muted">
                      📍 {scan.location} · Scanned just now
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <SsBadge tone="emerald">
                      {scan.recommendations.length} opportunities
                    </SsBadge>
                    <SsButton
                      variant="ghost"
                      size="sm"
                      onClick={() => toast.info("PDF export coming soon")}
                    >
                      <Download className="w-4 h-4" /> Export
                    </SsButton>
                  </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                  {scan.recommendations.map((r, i) => (
                    <EnhancedRecommendationCard key={r.id} rec={r} index={i} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.main>
      </div>

      <Footer />
    </div>
  );
}
