"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

export type AppLanguage = "en" | "hi" | "bn" | "ta" | "te" | "mr";

export type AppPreferences = {
  language: AppLanguage;
  jobAlerts: boolean;
  compactCards: boolean;
  highContrast: boolean;
};

type AppPreferencesContextValue = {
  prefs: AppPreferences;
  setLanguage: (lang: AppLanguage) => void;
  setPref: <K extends keyof AppPreferences>(key: K, value: AppPreferences[K]) => void;
};

const STORAGE_KEY = "labour.appPreferences";

const defaultPrefs: AppPreferences = {
  language: "en",
  jobAlerts: true,
  compactCards: false,
  highContrast: false,
};

function readPrefs(): AppPreferences {
  if (typeof window === "undefined") return defaultPrefs;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultPrefs;
    return { ...defaultPrefs, ...(JSON.parse(raw) as Partial<AppPreferences>) };
  } catch {
    return defaultPrefs;
  }
}

function writePrefs(prefs: AppPreferences) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}

const Ctx = createContext<AppPreferencesContextValue | null>(null);

export function AppPreferencesProvider({ children }: { children: React.ReactNode }) {
  const [prefs, setPrefs] = useState<AppPreferences>(() => readPrefs());

  React.useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = prefs.language;
    document.documentElement.classList.toggle("high-contrast", prefs.highContrast);
    document.documentElement.dataset.compactCards = prefs.compactCards ? "1" : "0";
  }, [prefs.language, prefs.highContrast, prefs.compactCards]);

  const value = useMemo<AppPreferencesContextValue>(() => {
    const setLanguage = (lang: AppLanguage) => {
      setPrefs((prev) => {
        const next = { ...prev, language: lang };
        writePrefs(next);
        if (typeof document !== "undefined") document.documentElement.lang = lang;
        return next;
      });
    };
    const setPref = <K extends keyof AppPreferences>(key: K, val: AppPreferences[K]) => {
      setPrefs((prev) => {
        const next = { ...prev, [key]: val };
        writePrefs(next);
        return next;
      });
    };
    return { prefs, setLanguage, setPref };
  }, [prefs]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppPreferences() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAppPreferences must be used within AppPreferencesProvider");
  return ctx;
}

const TEXT = {
  en: {
    findWork: "Find Work",
    appliedJobs: "Applied Jobs",
    howItWorks: "How it Works",
    pricing: "Pricing",
    signIn: "Sign in",
    registerFree: "Register Free",
    profile: "Profile",
    logout: "Logout",
    settings: "Settings",
    workerHome: "Worker home",
    findDailyWorkNearYou: "Find daily work near you",
    liveJobOpenings: "Live job openings",
    viewAll: "View all",
    noJobsMatchFilters: "No jobs match your filters. Try another trade or clear search.",
    yourJobActivity: "YOUR JOB ACTIVITY",
    myJobs: "My Jobs",
    trackApplications: "Track your applications, shortlists & confirmed work",
    applied: "Applied",
    confirmed: "Confirmed",
    completed: "Completed",
    nothingHereYet: "Nothing here yet.",
    applyNow: "Apply now",
    save: "Save",
    availableNow: "Available now",
    worker: "Worker",
    preferredWage: "Preferred wage",
    perMonth: "per month",
    experience: "Experience",
    location: "Location",
    primaryTrade: "Primary trade",
    skillsExpertise: "Skills & expertise",
    about: "About",
    phone: "Phone",
    email: "Email",
    availability: "Availability",
    lastUpdated: "Last updated",
    editProfile: "Edit profile",
    buildProfile: "Build profile",
    takePhoto: "Take photo",
    chooseFromDevice: "Choose from device",
    removePhoto: "Remove photo",
    profilePhoto: "Profile photo",
    saveProfile: "Save profile",
    cancel: "Cancel",
    close: "Close",
    settingsTitle: "Settings",
    language: "Language",
    languageHint: "Language applies to navigation and main app labels.",
    jobAlerts: "Job alerts",
    jobAlertsDesc: "Receive updates for new matching jobs.",
    compactCards: "Compact cards",
    compactCardsDesc: "Show denser cards in jobs and profile areas.",
    highContrast: "High contrast mode",
    highContrastDesc: "Increase visual contrast for easier reading.",
    appliedJobsTitle: "Applied jobs",
    appliedJobsSubtitle: "Track all jobs you have applied for.",
    noAppliedJobs: "You have not applied to any jobs yet.",
    browseJobs: "Browse jobs",
    loading: "Loading…",
    capture: "Capture",
    capturing: "Capturing...",
    createAccount: "Create account",
    welcomeBack: "Welcome back. Sign in to continue.",
    signInAction: "Sign in",
    forgotPassword: "Forgot password?",
    dontHaveAccount: "Don’t have an account?",
    createOne: "Create one",
    workerRegistration: "Worker registration",
    registerSubtitle: "Find daily work and get paid on time.",
    creating: "Creating…",
    registerAsWorker: "Register as Worker",
    alreadyHaveAccount: "Already have an account?",
    resetPassword: "Reset password",
    resetSubtitle: "Enter your email. We’ll generate a reset link (frontend-only demo).",
    generating: "Generating…",
    generateResetLink: "Generate reset link",
    resetLinkGenerated: "Reset link generated",
    backTo: "Back to",
    setNewPassword: "Set a new password",
    setNewPasswordSubtitle: "Paste the reset token from the reset link and choose a new password.",
    newPassword: "New password",
    saving: "Saving…",
    resetPasswordAction: "Reset password",
    pricingTitle: "Pricing",
    pricingPlaceholder: "This is a placeholder page. Next step: add plans + checkout.",
    backToHome: "Back to home",
    demoAccounts: "Demo accounts",
    workerLabel: "Worker",
    emailLabel: "Email",
    passwordLabel: "Password",
    fullNameLabel: "Full name",
    open: "Open",
    jobsAvailableNow: "jobs available right now",
    wagesPaidThisMonth: "Wages paid this month",
    registeredWorkers: "Registered workers",
    allTypes: "All Types",
    fullTime: "Full-time",
    dailyWage: "Daily wage",
    contract: "Contract",
    allJobs: "All Jobs",
    mason: "Mason",
    electrician: "Electrician",
    driver: "Driver",
    plumber: "Plumber",
    helper: "Helper",
    carpenter: "Carpenter",
    painter: "Painter",
    searchByTrade: "Search by trade, skill…",
    active: "active",
    job: "job",
    jobs: "jobs",
    verified: "Verified",
    urgent: "Urgent",
    monthly: "Monthly",
    opening: "opening",
    openings: "openings",
    saveJob: "Save job",
    perDay: "per day",
    contractLabel: "contract",
    today: "today",
    daysAgoSuffix: "d ago",
    appliedDaysAgo: "Applied {{days}} days ago",
    shortlistedToday: "Shortlisted today",
    startsNextWeek: "Starts next week",
    paidInFull: "Paid in full",
    weeksAgo: "weeks ago",
    shortlisted: "Shortlisted",
    noPhoto: "No photo",
    immediate: "Immediate",
    withinWeek: "Within a week",
    partTime: "Part-time",
    english: "English",
    hindi: "Hindi",
    bengali: "Bengali",
    tamil: "Tamil",
    telugu: "Telugu",
    marathi: "Marathi",
    liveJobOpeningsUpper: "LIVE JOB OPENINGS",
    jobsNearDelhiNcr: "Jobs near Delhi NCR",
    qualified: "Qualified",
    viewDetails: "View details",
    findWorkThatFitsYou: "Find work that fits you",
    browseVerifiedOpenings: "Browse verified openings with pay and location upfront",
    applyFromOneProfile: "Apply from one profile - track where you've applied",
    noFeeRegister: "No fee to register or browse jobs",
    growYourWorkProfile: "Grow your work profile",
    buildProfileTrade: "Build your profile with trade, experience, and preferred pay",
    uploadPhotoDevice: "Upload a photo from your device or capture one from camera",
    updateAvailability: "Update your availability as your schedule changes",
  },
  hi: {
    findWork: "काम खोजें",
    appliedJobs: "आवेदन किए गए काम",
    howItWorks: "कैसे काम करता है",
    pricing: "मूल्य",
    signIn: "साइन इन",
    registerFree: "मुफ़्त रजिस्टर",
    profile: "प्रोफ़ाइल",
    logout: "लॉगआउट",
    settings: "सेटिंग्स",
    workerHome: "वर्कर होम",
    findDailyWorkNearYou: "अपने पास रोज़ का काम खोजें",
    liveJobOpenings: "लाइव जॉब ओपनिंग",
    viewAll: "सभी देखें",
    noJobsMatchFilters: "फिल्टर से मेल खाते काम नहीं मिले। दूसरा ट्रेड चुनें या सर्च साफ़ करें।",
    yourJobActivity: "आपकी जॉब गतिविधि",
    myJobs: "मेरी जॉब्स",
    trackApplications: "अपने आवेदन, शॉर्टलिस्ट और कन्फर्म काम ट्रैक करें",
    applied: "आवेदन किया",
    confirmed: "पुष्ट",
    completed: "पूरा",
    nothingHereYet: "अभी कुछ नहीं है।",
    applyNow: "अभी आवेदन करें",
    save: "सेव",
    availableNow: "अभी उपलब्ध",
    worker: "वर्कर",
    preferredWage: "पसंदीदा वेतन",
    perMonth: "प्रति माह",
    experience: "अनुभव",
    location: "लोकेशन",
    primaryTrade: "मुख्य ट्रेड",
    skillsExpertise: "स्किल्स और एक्सपर्टीज",
    about: "परिचय",
    phone: "फोन",
    email: "ईमेल",
    availability: "उपलब्धता",
    lastUpdated: "आखिरी अपडेट",
    editProfile: "प्रोफाइल एडिट करें",
    buildProfile: "प्रोफाइल बनाएं",
    takePhoto: "फोटो लें",
    chooseFromDevice: "डिवाइस से चुनें",
    removePhoto: "फोटो हटाएं",
    profilePhoto: "प्रोफाइल फोटो",
    saveProfile: "प्रोफाइल सेव करें",
    cancel: "रद्द करें",
    close: "बंद करें",
    settingsTitle: "सेटिंग्स",
    language: "भाषा",
    languageHint: "भाषा से नेविगेशन और मुख्य लेबल बदलेंगे।",
    jobAlerts: "जॉब अलर्ट",
    jobAlertsDesc: "नई मैचिंग जॉब्स की अपडेट पाएं।",
    compactCards: "कॉम्पैक्ट कार्ड्स",
    compactCardsDesc: "जॉब्स और प्रोफाइल में छोटे कार्ड्स दिखाएं।",
    highContrast: "हाई कॉन्ट्रास्ट मोड",
    highContrastDesc: "पढ़ने के लिए विजुअल कॉन्ट्रास्ट बढ़ाएं।",
    appliedJobsTitle: "आवेदन की गई जॉब्स",
    appliedJobsSubtitle: "जिन जॉब्स में आपने आवेदन किया उन्हें ट्रैक करें।",
    noAppliedJobs: "आपने अभी तक किसी जॉब में आवेदन नहीं किया।",
    browseJobs: "जॉब्स देखें",
    loading: "लोड हो रहा है…",
    capture: "कैप्चर",
    capturing: "कैप्चर हो रहा है...",
    createAccount: "खाता बनाएं",
    welcomeBack: "वापस स्वागत है। जारी रखने के लिए साइन इन करें।",
    signInAction: "साइन इन",
    forgotPassword: "पासवर्ड भूल गए?",
    dontHaveAccount: "क्या आपका खाता नहीं है?",
    createOne: "खाता बनाएं",
    workerRegistration: "वर्कर रजिस्ट्रेशन",
    registerSubtitle: "रोज़ का काम पाएँ और समय पर भुगतान लें।",
    creating: "बना रहे हैं…",
    registerAsWorker: "वर्कर के रूप में रजिस्टर करें",
    alreadyHaveAccount: "पहले से खाता है?",
    resetPassword: "पासवर्ड रीसेट",
    resetSubtitle: "अपना ईमेल दर्ज करें। हम रीसेट लिंक बनाएँगे (डेमो)।",
    generating: "बना रहे हैं…",
    generateResetLink: "रीसेट लिंक बनाएं",
    resetLinkGenerated: "रीसेट लिंक बन गया",
    backTo: "वापस जाएं",
    setNewPassword: "नया पासवर्ड सेट करें",
    setNewPasswordSubtitle: "रीसेट टोकन पेस्ट करें और नया पासवर्ड चुनें।",
    newPassword: "नया पासवर्ड",
    saving: "सेव हो रहा है…",
    resetPasswordAction: "पासवर्ड रीसेट करें",
    pricingTitle: "मूल्य",
    pricingPlaceholder: "यह प्लेसहोल्डर पेज है। अगला कदम: प्लान और चेकआउट जोड़ें।",
    backToHome: "होम पर वापस",
    demoAccounts: "डेमो खाते",
    workerLabel: "वर्कर",
    emailLabel: "ईमेल",
    passwordLabel: "पासवर्ड",
    fullNameLabel: "पूरा नाम",
    open: "खोलें",
    jobsAvailableNow: "नौकरियां अभी उपलब्ध",
    wagesPaidThisMonth: "इस महीने भुगतान की गई मजदूरी",
    registeredWorkers: "पंजीकृत श्रमिक",
    allTypes: "सभी प्रकार",
    fullTime: "फुल-टाइम",
    dailyWage: "दैनिक मजदूरी",
    contract: "कॉन्ट्रैक्ट",
    allJobs: "सभी नौकरियां",
    mason: "राजमिस्त्री",
    electrician: "इलेक्ट्रीशियन",
    driver: "ड्राइवर",
    plumber: "प्लंबर",
    helper: "हेल्पर",
    carpenter: "बढ़ई",
    painter: "पेंटर",
    searchByTrade: "ट्रेड या स्किल से खोजें…",
    active: "सक्रिय",
    job: "नौकरी",
    jobs: "नौकरियां",
    verified: "सत्यापित",
    urgent: "तुरंत",
    monthly: "मासिक",
    opening: "ओपनिंग",
    openings: "ओपनिंग्स",
    saveJob: "नौकरी सेव करें",
    perDay: "प्रति दिन",
    contractLabel: "कॉन्ट्रैक्ट",
    today: "आज",
    daysAgoSuffix: "दिन पहले",
    appliedDaysAgo: "{{days}} दिन पहले आवेदन किया",
    shortlistedToday: "आज शॉर्टलिस्ट",
    startsNextWeek: "अगले हफ्ते शुरू",
    paidInFull: "पूरा भुगतान",
    weeksAgo: "हफ्ते पहले",
    shortlisted: "शॉर्टलिस्ट",
    noPhoto: "कोई फोटो नहीं",
    immediate: "तुरंत",
    withinWeek: "एक हफ्ते के भीतर",
    partTime: "पार्ट-टाइम",
    english: "अंग्रेज़ी",
    hindi: "हिंदी",
    bengali: "बंगाली",
    tamil: "तमिल",
    telugu: "तेलुगु",
    marathi: "मराठी",
    liveJobOpeningsUpper: "लाइव जॉब ओपनिंग्स",
    jobsNearDelhiNcr: "दिल्ली NCR के पास नौकरियां",
    qualified: "योग्य",
    viewDetails: "विवरण देखें",
    findWorkThatFitsYou: "अपने हिसाब का काम खोजें",
    browseVerifiedOpenings: "वेतन और लोकेशन के साथ सत्यापित ओपनिंग देखें",
    applyFromOneProfile: "एक ही प्रोफाइल से आवेदन करें - जहां आवेदन किया है उसे ट्रैक करें",
    noFeeRegister: "रजिस्टर या नौकरी देखने के लिए कोई फीस नहीं",
    growYourWorkProfile: "अपनी प्रोफाइल मजबूत करें",
    buildProfileTrade: "ट्रेड, अनुभव और पसंदीदा वेतन के साथ प्रोफाइल बनाएं",
    uploadPhotoDevice: "डिवाइस से फोटो अपलोड करें या कैमरा से लें",
    updateAvailability: "अपना शेड्यूल बदलने पर उपलब्धता अपडेट करें",
  },
  bn: {} as Record<string, string>,
  ta: {} as Record<string, string>,
  te: {} as Record<string, string>,
  mr: {} as Record<string, string>,
} as const;

export function useI18nText() {
  const { prefs } = useAppPreferences();
  const effectiveLang = prefs.language === "en" ? "en" : "hi";
  const langPack = TEXT[effectiveLang] as Record<string, string>;
  return { ...TEXT.en, ...langPack };
}

