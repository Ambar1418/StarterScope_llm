import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useSubscription } from "@/context/SubscriptionContext";
import { API_BASE_URL } from "@/config/api";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SsButton } from "@/components/ss/SsButton";
import { SsInput } from "@/components/ss/SsInput";
import { ChevronRight, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface SavedBusinessItem {
  id: number;
  user_email: string;
  business_name: string;
  category: string;
  location: string;
  details?: {
    demand_score?: number;
    category?: string;
    location?: string;
  };
  created_at: string;
}

export default function Profile() {
  const { user } = useAuth();
  const { plan, scansUsed, scanLimit } = useSubscription();
  const planLabel = plan.charAt(0).toUpperCase() + plan.slice(1);

  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [joinedDate, setJoinedDate] = useState("Joined April 2024");
  const [savedBusinesses, setSavedBusinesses] = useState<SavedBusinessItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Helper to get initials
  const getInitials = (nameString?: string | null) => {
    if (!nameString) return "U";
    const parts = nameString.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  useEffect(() => {
    if (user?.email) {
      setProfileName(user.name || "");
      setProfileEmail(user.email);

      const fetchProfileAndSaved = async () => {
        setIsLoading(true);
        try {
          // 1. Fetch user basic info to get created_at
          const userRes = await fetch(`${API_BASE_URL}/api/users/${encodeURIComponent(user.email)}`);
          if (userRes.ok) {
            const userData = await userRes.json();
            if (userData.name) setProfileName(userData.name);
            if (userData.created_at) {
              const date = new Date(userData.created_at);
              const month = date.toLocaleString("default", { month: "long" });
              const year = date.getFullYear();
              setJoinedDate(`Joined ${month} ${year}`);
            }
          }

          // 2. Fetch saved businesses
          const savedRes = await fetch(`${API_BASE_URL}/api/saved-businesses/${encodeURIComponent(user.email)}`);
          if (savedRes.ok) {
            const savedData = await savedRes.json();
            setSavedBusinesses(savedData);
          }
        } catch (error) {
          console.error("Error loading profile details:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchProfileAndSaved();
    }
  }, [user]);

  const handleSave = async () => {
    if (!profileEmail) return;
    setIsSaving(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/${encodeURIComponent(profileEmail)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: profileName
        })
      });
      if (!res.ok) throw new Error("Failed to update profile");
      
      toast.success("Profile saved successfully");
      
      // Update local storage so that other pages (like Navbar) show the new name
      const localUserRaw = localStorage.getItem("ss.auth.user");
      if (localUserRaw) {
        const localUser = JSON.parse(localUserRaw);
        localUser.name = profileName;
        localStorage.setItem("ss.auth.user", JSON.stringify(localUser));
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to save profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteSaved = async (savedId: number) => {
    if (!user?.email) return;
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/saved-businesses/${savedId}?user_email=${encodeURIComponent(user.email)}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Failed to remove business");
      
      setSavedBusinesses((prev) => prev.filter((b) => b.id !== savedId));
      toast.success("Removed from vault");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete saved business");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="bg-surface border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-2 font-mono text-xs text-text-muted">
            <span>Dashboard</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-text-primary">Profile</span>
          </div>
          <h1 className="mt-2 font-display font-extrabold text-3xl text-text-primary">Your Profile</h1>
        </div>
      </div>

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6"
      >
        {/* Identity */}
        <div className="glass-card p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-6">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-gradient-brand flex items-center justify-center text-white font-display font-bold text-2xl">
              {getInitials(profileName || user?.name || user?.email)}
            </div>
            <span className="mt-3 text-[11px] font-mono px-2 py-0.5 rounded-md bg-accent-emerald-light text-accent-emerald border border-accent-emerald/20">
              Active
            </span>
          </div>
          <div>
            <h2 className="font-display font-bold text-2xl text-text-primary">{profileName || user?.name || "Guest User"}</h2>
            <p className="mt-1 font-mono text-[13px] text-text-muted">{profileEmail || user?.email}</p>
            <p className="mt-2 font-body text-sm text-text-secondary">{joinedDate}</p>
          </div>
        </div>

        {/* Subscription */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-1 h-5 bg-accent-emerald rounded-full" />
            <h3 className="font-display font-semibold text-base text-text-primary">Subscription</h3>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest px-3 py-1.5 rounded-full bg-accent-emerald-light text-accent-emerald border border-accent-emerald/30">
                {planLabel} Plan
              </span>
              <p className="mt-3 font-body text-sm text-text-secondary">
                {scansUsed} of {scanLimit === Infinity ? "∞" : scanLimit} scans used this month
              </p>
            </div>
            <SsButton variant="outline" size="sm" onClick={() => toast.info("Upgrade flow coming soon")}>
              Upgrade
            </SsButton>
          </div>
        </div>

        {/* Edit form */}
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-1 h-5 bg-accent-emerald rounded-full" />
            <h3 className="font-display font-semibold text-base text-text-primary">Edit Profile</h3>
          </div>
          <div>
            <label className="font-mono text-[11px] uppercase tracking-widest text-text-muted">Display Name</label>
            <SsInput 
              value={profileName} 
              onChange={(e) => setProfileName(e.target.value)} 
              className="mt-2" 
            />
          </div>
          <div>
            <label className="font-mono text-[11px] uppercase tracking-widest text-text-muted">Email (Read Only)</label>
            <SsInput 
              value={profileEmail} 
              disabled 
              type="email" 
              className="mt-2 bg-muted/30 cursor-not-allowed opacity-75" 
            />
          </div>
          <div className="flex justify-end pt-2">
            <SsButton variant="primary" onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin inline-block" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </SsButton>
          </div>
        </div>

        {/* Saved Vault */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-1 h-5 bg-accent-emerald rounded-full" />
            <h3 className="font-display font-semibold text-base text-text-primary">Saved Businesses (Alpha Vault)</h3>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center py-6 text-text-muted">
              <Loader2 className="w-6 h-6 animate-spin mr-2" />
              <span>Loading saved vault...</span>
            </div>
          ) : savedBusinesses.length === 0 ? (
            <p className="text-sm text-text-muted text-center py-6">
              {plan === "free" 
                ? "Upgrade to Professional plan to save analysis results to your Alpha Vault." 
                : "No saved business plans in your vault yet."}
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {savedBusinesses.map((b) => (
                <li key={b.id} className="flex items-center justify-between py-3 px-3 -mx-3 rounded-lg hover:bg-elevated">
                  <div className="flex items-center gap-3">
                    <span className="font-body text-sm text-text-primary">
                      {b.business_name} {b.location ? `/ ${b.location}` : ""}
                    </span>
                    {b.details?.demand_score !== undefined && (
                      <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-accent-emerald-light text-accent-emerald">
                        {b.details.demand_score}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteSaved(b.id)}
                    className="text-text-muted hover:text-vivid-rose transition-colors p-1"
                    aria-label="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.main>
      <Footer />
    </div>
  );
}
