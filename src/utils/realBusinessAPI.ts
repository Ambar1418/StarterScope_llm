import { endpoints } from "@/config/api";

export interface Recommendation {
  id: string;
  name: string;
  category: string;
  score: number; // demand_index
  description: string;
  tags: string[];
  investment: string; // investment_range
  roi: string; // roi_potential
  risk: "Low" | "Medium" | "High"; // implementation_difficulty
  paybackPeriod?: string; // payback_period
  potentialRevenue?: string; // potential_revenue
  marketSize?: string; // market_size
  cac?: string;
  idealNeighborhood?: string; // ideal_neighborhood
  keySuccessFactors?: string[]; // key_success_factors
  sixMonthPlan?: { month: string; goal: string }[]; // six_month_plan
  m1Traffic?: string; // m1_traffic
  retentionRate?: string; // retention_rate
  strategicRecommendations?: { title: string; description: string }[]; // strategic_recommendations
  lat?: number;
  lng?: number;
  is_seasonal?: boolean;
}

export interface ScanResult {
  location: string;
  businessType?: string;
  scannedAt: string;
  recommendations: Recommendation[];
  analysis?: any;
  seasonal_opportunities?: any;
}

/**
 * Mock fallback used when the live API is unreachable. Real data
 * comes from the backend at endpoints.recommendations.
 */
const mockRecommendations: Recommendation[] = [
  {
    id: "1",
    name: "Cloud Kitchen / Dark Restaurant",
    category: "Food & Beverage",
    score: 94,
    description:
      "High-demand delivery-first kitchen model with low overhead and rapid scaling potential. Ideal for tier-2 cities with growing food delivery penetration.",
    tags: ["low-capital", "trending", "high-margin"],
    investment: "₹8-12L",
    roi: "35%",
    risk: "Low",
    paybackPeriod: "14 Months",
    potentialRevenue: "₹24L/Year",
    marketSize: "₹5Cr",
    cac: "₹350",
    idealNeighborhood: "HSR Layout",
    keySuccessFactors: ["High hygiene standards", "Delivery platform partnerships", "Aggressive social marketing"],
    sixMonthPlan: [
      { month: "Month 1-2", goal: "Secure license & location" },
      { month: "Month 3-4", goal: "Setup kitchen & hire staff" },
      { month: "Month 5-6", goal: "Launch marketing & live ops" }
    ],
    m1Traffic: "400 customers",
    retentionRate: "80%",
    strategicRecommendations: [
      { title: "Partner with Swiggy/Zomato", description: "Run micro-targeted discounts for lunch hours." }
    ]
  },
  {
    id: "2",
    name: "EdTech Coaching Centre",
    category: "Education",
    score: 88,
    description:
      "Hybrid coaching model targeting JEE/NEET aspirants with proven local demand and recurring revenue from monthly subscriptions.",
    tags: ["high-demand", "recurring", "scalable"],
    investment: "₹15-20L",
    roi: "40%",
    risk: "Medium",
    paybackPeriod: "18 Months",
    potentialRevenue: "₹36L/Year",
    marketSize: "₹8Cr",
    cac: "₹1,200",
    idealNeighborhood: "MP Nagar",
    keySuccessFactors: ["Premium faculty", "Hybrid study materials", "Parent updates"],
    sixMonthPlan: [
      { month: "Month 1-2", goal: "Lease study space & register" },
      { month: "Month 3-4", goal: "Recruit teachers & run demo classes" },
      { month: "Month 5-6", goal: "Start first cohort batch" }
    ],
    m1Traffic: "150 students",
    retentionRate: "92%",
    strategicRecommendations: [
      { title: "Free Diagnostic Tests", description: "Offer free assessment checks to attract local students." }
    ]
  },
  {
    id: "3",
    name: "EV Charging Hub",
    category: "Clean Energy",
    score: 82,
    description:
      "Government-backed infrastructure play with long-term moat. Strategic location near highway intersection with low existing competition.",
    tags: ["govt-backed", "long-term", "infrastructure"],
    investment: "₹25-35L",
    roi: "25%",
    risk: "Medium",
    paybackPeriod: "30 Months",
    potentialRevenue: "₹18L/Year",
    marketSize: "₹12Cr",
    cac: "₹80",
    idealNeighborhood: "Indore Highway",
    keySuccessFactors: ["Reliable electricity board permits", "Fast chargers", "Amenity pairing (cafe)"],
    sixMonthPlan: [
      { month: "Month 1-2", goal: "Obtain grid permissions" },
      { month: "Month 3-4", goal: "Install level-3 fast chargers" },
      { month: "Month 5-6", goal: "Integrate UPI apps & launch cafe" }
    ],
    m1Traffic: "600 vehicles",
    retentionRate: "75%",
    strategicRecommendations: [
      { title: "RWA & Society Fleet Tie-ups", description: "Provide commercial vehicle fleets with monthly packages." }
    ]
  },
  {
    id: "4",
    name: "Boutique Co-Working Space",
    category: "Real Estate",
    score: 76,
    description:
      "Premium flexible workspace targeting freelancers and remote teams. Membership model with predictable monthly revenue.",
    tags: ["recurring", "premium"],
    investment: "₹20-30L",
    roi: "30%",
    risk: "Medium",
    paybackPeriod: "24 Months",
    potentialRevenue: "₹28L/Year",
    marketSize: "₹6Cr",
    cac: "₹1,500",
    idealNeighborhood: "Koregaon Park",
    keySuccessFactors: ["Ergonomic design", "High-speed redundant internet", "Community networking events"],
    sixMonthPlan: [
      { month: "Month 1-2", goal: "Lease commercial floor" },
      { month: "Month 3-4", goal: "Fitout & interior designer setup" },
      { month: "Month 5-6", goal: "Pre-launch memberships & opening event" }
    ],
    m1Traffic: "80 members",
    retentionRate: "88%",
    strategicRecommendations: [
      { title: "Freelancer Meetups", description: "Host tech/art community meetups to gain local visibility." }
    ]
  },
];

function normalizeRisk(val: unknown): Recommendation["risk"] {
  if (val === "Low" || val === "Medium" || val === "High") return val;
  if (typeof val === "string") {
    const v = val.toLowerCase();
    if (v.includes("low")) return "Low";
    if (v.includes("high")) return "High";
  }
  return "Medium";
}

function normalizeRecommendation(raw: unknown, idx: number): Recommendation | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;

  const name =
    (typeof r.name === "string" && r.name) ||
    (typeof r.title === "string" && r.title) ||
    (typeof r.business_name === "string" && r.business_name) ||
    `Opportunity ${idx + 1}`;

  const category =
    (typeof r.category === "string" && r.category) ||
    (typeof r.industry === "string" && r.industry) ||
    "Business";

  // backend uses `demand_index` primarily
  const scoreNum =
    typeof r.demand_index === "number"
      ? r.demand_index
      : typeof r.demand_index === "string"
      ? Number(r.demand_index)
      : typeof r.score === "number"
      ? r.score
      : typeof r.score === "string"
      ? Number(r.score)
      : typeof r.opportunity_score === "number"
      ? r.opportunity_score
      : typeof r.opportunity_score === "string"
      ? Number(r.opportunity_score)
      : 75;

  const score = Number.isFinite(scoreNum) ? Math.max(0, Math.min(100, Math.round(scoreNum))) : 75;

  const description =
    (typeof r.description === "string" && r.description) ||
    (typeof r.summary === "string" && r.summary) ||
    "No description available yet.";

  const tagsRaw = r.tags ?? r.tag_list ?? r.keywords;
  const tags = Array.isArray(tagsRaw)
    ? tagsRaw.filter((t): t is string => typeof t === "string").slice(0, 8)
    : typeof tagsRaw === "string"
    ? tagsRaw
        .split(/[,\n]/)
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 8)
    : [];

  const investment =
    (typeof r.investment_range === "string" && r.investment_range) ||
    (typeof r.investment === "string" && r.investment) ||
    (typeof r.funding_required === "string" && r.funding_required) ||
    (typeof r.capital_required === "string" && r.capital_required) ||
    "—";

  const roi =
    (typeof r.roi_potential === "string" && r.roi_potential) ||
    (typeof r.roi === "string" && r.roi) ||
    "—";

  const paybackPeriod =
    (typeof r.payback_period === "string" && r.payback_period) ||
    (typeof r.be_period === "string" && r.be_period) ||
    undefined;

  const potentialRevenue = typeof r.potential_revenue === "string" ? r.potential_revenue : undefined;
  const marketSize = typeof r.market_size === "string" ? r.market_size : undefined;
  const cac = typeof r.cac === "string" ? r.cac : (typeof r.cac === "number" ? `₹${r.cac}` : undefined);
  const idealNeighborhood = typeof r.ideal_neighborhood === "string" ? r.ideal_neighborhood : undefined;
  
  // parse success factors array
  const ksfRaw = r.key_success_factors ?? r.success_factors;
  const keySuccessFactors = Array.isArray(ksfRaw)
    ? ksfRaw.filter((t): t is string => typeof t === "string")
    : typeof ksfRaw === "string"
    ? ksfRaw.split(/[,;\n]/).map(s => s.trim()).filter(Boolean)
    : undefined;

  // parse plan
  const planRaw = r.six_month_plan ?? r.roadmap_steps;
  const sixMonthPlan = Array.isArray(planRaw)
    ? planRaw.map((step: any) => {
        if (step && typeof step === "object") {
          return {
            month: String(step.month || step.phase || ""),
            goal: String(step.goal || step.description || step.title || "")
          };
        }
        return { month: "Month", goal: String(step) };
      }).filter(s => s.month || s.goal)
    : undefined;

  const m1Traffic = typeof r.m1_traffic === "string" ? r.m1_traffic : (typeof r.m1_traffic === "number" ? String(r.m1_traffic) : undefined);
  const retentionRate = typeof r.retention_rate === "string" ? r.retention_rate : undefined;

  // parse strategic recommendations
  const stratRaw = r.strategic_recommendations ?? r.recommendations;
  const strategicRecommendations = Array.isArray(stratRaw)
    ? stratRaw.map((item: any) => {
        if (item && typeof item === "object") {
          return {
            title: String(item.title || ""),
            description: String(item.description || "")
          };
        }
        return { title: "Strategy Tip", description: String(item) };
      }).filter(s => s.title || s.description)
    : undefined;

  const risk = normalizeRisk(r.risk ?? r.risk_level ?? r.implementation_difficulty);

  const id =
    (typeof r.id === "string" && r.id) ||
    (typeof r.id === "number" && String(r.id)) ||
    (typeof r.saved_id === "string" && r.saved_id) ||
    `${idx + 1}-${name}`.toLowerCase().replace(/\s+/g, "-").slice(0, 64);

  const lat = typeof r.lat === "number" ? r.lat : typeof r.latitude === "number" ? (r.latitude as number) : undefined;
  const lng = typeof r.lng === "number" ? r.lng : typeof r.longitude === "number" ? (r.longitude as number) : undefined;
  const is_seasonal = r.is_seasonal === true || r.seasonal === true || false;

  return {
    id,
    name,
    category,
    score,
    description,
    tags,
    investment,
    roi,
    risk,
    paybackPeriod,
    potentialRevenue,
    marketSize,
    cac,
    idealNeighborhood,
    keySuccessFactors,
    sixMonthPlan,
    m1Traffic,
    retentionRate,
    strategicRecommendations,
    lat,
    lng,
    is_seasonal
  };
}


export async function fetchRecommendations(location: string, businessType?: string): Promise<ScanResult> {
  try {
    const res = await fetch(endpoints.recommendations, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Backend expects `area` (not `location`) and optional `business_type`
      body: JSON.stringify({
        area: location,
        business_type: businessType || undefined,
      }),
    });
    if (!res.ok) throw new Error(`API ${res.status}`);
    const data = await res.json();
    // Backend may return slightly different shapes — normalize defensively.
    const rawRecs = Array.isArray(data?.recommendations)
      ? (data.recommendations as unknown[])
      : Array.isArray(data)
      ? (data as unknown[])
      : [];

    const recs = rawRecs.map((r, i) => normalizeRecommendation(r, i)).filter((x): x is Recommendation => !!x);
    return {
      location,
      businessType,
      scannedAt: new Date().toISOString(),
      recommendations: recs.length ? recs : mockRecommendations,
    };
  } catch {
    // Graceful fallback so the UI still demonstrates the flow.
    return {
      location,
      businessType,
      scannedAt: new Date().toISOString(),
      recommendations: mockRecommendations,
    };
  }
}
