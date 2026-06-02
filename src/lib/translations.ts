export type Lang = "en" | "hi";

export const translations = {
  en: {
    // Navbar & Footer
    features: "Features",
    howItWorks: "How It Works",
    pricing: "Pricing",
    dashboard: "Dashboard",
    signIn: "Sign In",
    getStarted: "Get Started",
    profile: "Profile",
    logout: "Log Out",
    footerBrandDesc: "Smart Business Intelligence. Helping you build better businesses with AI.",
    footerBuiltBy: "Built with ❤️ by Startup Scope Team",
    product: "Product",
    company: "Company",
    connect: "Connect",
    footerRights: "© 2026 Startup Scope. All rights reserved.",
    footerPrivacyTerms: "Privacy Policy · Terms of Service",
    about: "About Us",
    contact: "Contact Support",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    roadmap: "Roadmap",

    // Dashboard & PDF Header
    pdfHeader: "STARTUPSCOPE SYSTEM Scout Report",
    pdfGeneratedAt: "Generated At",
    pdfDisclaimer: "Disclaimer: AI predictions are based on historical telemetry and regional data vectors.",
    home: "Home",
    dashboardTitle: "Strategic Intelligence Console",
    dashboardSubtitle: "Scan regional sectors, run gap analysis, and fetch launch blueprints.",
    newScan: "Launch Scout Drone",
    enterCity: "Type city or region...",
    businessIdea: "Concept or niche (optional)...",
    scanning: "Analyzing Market...",
    runAnalysis: "Run Swarm Analysis",
    recentScans: "Telemetry Logs",
    opportunities: "Business Ideas",
    export: "Export Intelligence",
    analytics: "Metric Dashboard",
    saved: "Alpha Vault",
    filters: "Scout Filters",
    category: "Sector Category",
    all: "All Sectors",
    budget: "Max Setup CAPEX",
    roi: "Min Expected ROI",
    riskLabel: "Volatility Risk",
    low: "Low Risk",
    medium: "Medium Risk",
    high: "High Risk",
    seasonal: "Seasonal Mode",
    seasonalOnly: "Seasonal Only",
    evergreenOnly: "Evergreen Only",
    noResultsTitle: "No Matches In Sector",
    noResultsDesc: "Adjust scout filters to align with current telemetry.",
    comparisonMode: "Comparison Drone Active",
    compareUpTo3: "Up to 3 vectors side-by-side",
    compare: "Compare Ideas",
    compareTitle: "Intelligence Comparison Matrix",
    emptyStateTitle: "Singularity Console Offline",
    emptyStateDesc: "Enter a location to initialize scanning drones and find business gaps.",

    // CompareModal/Dashboard UI
    demandIndex: "Demand Score",
    investmentLabel: "Setup Budget",
    roiLabel: "Projected ROI",
    paybackPeriod: "Payback Period",
    potentialRevenue: "Est. Monthly Income",
    marketSize: "Market Size",
    cac: "Est. CAC",
    idealNeighborhood: "Ideal Neighborhood",
    keySuccessFactors: "Key Success Factors",
    savedToVault: "Saved to Alpha Vault",
    removedFromVault: "Removed from Alpha Vault",
    lowRisk: "Low",
    mediumRisk: "Medium",
    highRisk: "High",

    // Other pages
    profileSettings: "Profile Settings",
    email: "Email Address",
    fullName: "Full Name",
    bio: "Short Bio",
    saveChanges: "Save Changes",
    saving: "Saving Changes...",
    profileUpdated: "Profile updated successfully!",
  },
  hi: {
    // Navbar & Footer
    features: "विशेषताएं",
    howItWorks: "यह कैसे काम करता है",
    pricing: "प्राइसिंग",
    dashboard: "डैशबोर्ड",
    signIn: "साइन इन",
    getStarted: "शुरू करें",
    profile: "प्रोफ़ाइल",
    logout: "लॉग आउट",
    footerBrandDesc: "स्मार्ट बिज़नेस इंटेलिजेंस। AI के साथ बेहतर बिज़नेस बनाने में आपकी मदद करता है।",
    footerBuiltBy: "Startup Scope टीम द्वारा ❤️ के साथ निर्मित",
    product: "उत्पाद",
    company: "कंपनी",
    connect: "कनेक्ट",
    footerRights: "© 2026 Startup Scope. सर्वाधिकार सुरक्षित।",
    footerPrivacyTerms: "गोपनीयता नीति · सेवा की शर्तें",
    about: "हमारे बारे में",
    contact: "सहायता",
    privacy: "गोपनीयता नीति",
    terms: "सेवा की शर्तें",
    roadmap: "रोडमैप",

    // Dashboard & PDF Header
    pdfHeader: "STARTUPSCOPE सिस्टम स्काउट रिपोर्ट",
    pdfGeneratedAt: "जनरेट किया गया समय",
    pdfDisclaimer: "अस्वीकरण: AI भविष्यवाणियां ऐतिहासिक टेलीमेट्री और क्षेत्रीय डेटा वेक्टर पर आधारित हैं।",
    home: "होम",
    dashboardTitle: "सामरिक खुफिया कंसोल",
    dashboardSubtitle: "क्षेत्रीय क्षेत्रों को स्कैन करें, अंतर विश्लेषण चलाएं, और लॉन्च ब्लूप्रिंट प्राप्त करें।",
    newScan: "नया स्कैन शुरू करें",
    enterCity: "शहर या क्षेत्र का नाम लिखें...",
    businessIdea: "आइडिया या आला अवधारणा (वैकल्पिक)...",
    scanning: "मार्केट का एनालिसिस हो रहा है...",
    runAnalysis: "एनालिसिस शुरू करें",
    recentScans: "हाल के स्कैन",
    opportunities: "बिज़नेस आइडिया",
    export: "रिपोर्ट डाउनलोड करें",
    analytics: "एनालिटिक्स व्यू",
    saved: "अल्फा वॉल्ट",
    filters: "सर्च फिल्टर्स",
    category: "इंडस्ट्री कैटेगरी",
    all: "सभी श्रेणियां",
    budget: "अधिकतम सेटअप बजट",
    roi: "न्यूनतम अनुमानित ROI",
    riskLabel: "जोखिम का स्तर",
    low: "कम जोखिम",
    medium: "मध्यम जोखिम",
    high: "उच्च जोखिम",
    seasonal: "सीजनलिटी",
    seasonalOnly: "केवल मौसमी (Seasonal)",
    evergreenOnly: "केवल सदाबहार (Evergreen)",
    noResultsTitle: "कोई मेल नहीं मिला",
    noResultsDesc: "सर्च फ़िल्टर में बदलाव करके दोबारा प्रयास करें।",
    comparisonMode: "तुलना मोड सक्रिय",
    compareUpTo3: "एक बार में अधिकतम 3 आइडिया",
    compare: "तुलना करें",
    compareTitle: "बिज़नेस तुलना मैट्रिक्स",
    emptyStateTitle: "शुरू करने के लिए तैयार",
    emptyStateDesc: "अपने क्षेत्र के लिए आइडिया और बिज़नेस गैप देखने के लिए लोकेशन लिखें।",

    // CompareModal/Dashboard UI
    demandIndex: "मांग सूचकांक (Demand Score)",
    investmentLabel: "शुरू करने का बजट",
    roiLabel: "अनुमानित ROI",
    paybackPeriod: "पेबैक की अवधि",
    potentialRevenue: "महीने की कमाई",
    marketSize: "मार्केट का आकार",
    cac: "संभावित CAC",
    idealNeighborhood: "आदर्श क्षेत्र",
    keySuccessFactors: "सफलता के मुख्य कारक",
    savedToVault: "अल्फा वॉल्ट में सहेजा गया",
    removedFromVault: "अल्फा वॉल्ट से हटाया गया",
    lowRisk: "कम",
    mediumRisk: "मध्यम",
    highRisk: "उच्च",

    // Other pages
    profileSettings: "प्रोफ़ाइल सेटिंग्स",
    email: "ईमेल पता",
    fullName: "पूरा नाम",
    bio: "संक्षिप्त बायो",
    saveChanges: "बदलाव सहेजें",
    saving: "सहेजा जा रहा है...",
    profileUpdated: "प्रोफ़ाइल सफलतापूर्वक अपडेट हो गई!",
  }
};

export function useTranslation(lang: Lang) {
  const t = (key: keyof typeof translations["en"]): string => {
    return translations[lang]?.[key] || translations["en"]?.[key] || (key as string);
  };
  return { t };
}

export function translateTime(timeStr: string, lang: Lang): string {
  if (lang === "hi") {
    const lowerTime = timeStr.toLowerCase().trim();
    if (lowerTime === "just now") return "अभी-अभी";
    if (lowerTime === "yesterday") return "कल";
    if (lowerTime.includes("hours ago")) {
      const hours = lowerTime.replace(/[^0-9]/g, "");
      return `${hours} घंटे पहले`;
    }
  }
  return timeStr;
}

export function translateCategory(cat: string, lang: Lang): string {
  if (lang === "hi") {
    const catMap: Record<string, string> = {
      "Food & Beverage": "खाद्य एवं पेय",
      "Services": "सेवाएं",
      "Retail": "खुदra (Retail)",
      "Technology": "प्रौद्योगिकी",
      "Education": "शिक्षा",
      "Healthcare": "स्वास्थ्य सेवा",
      "Entertainment": "मनोरंजन",
      "all": "सभी श्रेणियां"
    };
    return catMap[cat] || cat;
  }
  return cat;
}

export function translatePricingString(valStr: string, lang: Lang): string {
  if (lang === "hi") {
    const pricingMap: Record<string, string> = {
      "Explorer (Free)": "एक्सप्लोरर (फ्री)",
      "Explorer": "एक्सप्लोरर",
      "Starter": "स्टार्टर",
      "Professional": "प्रोफेशनल",
      "Professional (Pro)": "प्रोफेशनल (प्रो)",
      "Growth Business": "ग्रोथ बिज़नेस",
      "Enterprise Dominance": "एंटरप्राइज़",
      "Get Started Free": "फ्री शुरू करें",
      "Upgrade Now": "अभी अपग्रेड करें",
      "Contact Sales": "सम्पर्क करें",
      "Monthly": "मासिक",
      "Yearly": "सालाना",
      "Most Popular": "लोकप्रिय"
    };
    return pricingMap[valStr] || valStr;
  }
  return valStr;
}

export function translateTestimonialString(valStr: string, lang: Lang): string {
  if (lang === "hi") {
    const testimonialMap: Record<string, string> = {
      "Food Truck Owner": "फ़ूड ट्रक मालिक",
      "Consultant": "सलाहकार",
      "Studio Founder": "स्टूडियो संस्थापक"
    };
    return testimonialMap[valStr] || valStr;
  }
  return valStr;
}
