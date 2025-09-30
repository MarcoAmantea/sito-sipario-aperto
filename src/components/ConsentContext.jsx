import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ConsentCtx = createContext(null);
export const useConsent = () => useContext(ConsentCtx);

const STORAGE_KEY = "sipario_consent_v1";

export default function ConsentProvider({ children }) {
  const [consent, setConsent] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { necessary: true, youtube: false };
    } catch {
      return { necessary: true, youtube: false };
    }
  });
  const [bannerOpen, setBannerOpen] = useState(() => !localStorage.getItem(STORAGE_KEY));

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  }, [consent]);

  const api = useMemo(() => ({
    consent,
    bannerOpen,
    openBanner: () => setBannerOpen(true),
    acceptAll: () => { setConsent({ necessary: true, youtube: true }); setBannerOpen(false); },
    rejectAll: () => { setConsent({ necessary: true, youtube: false }); setBannerOpen(false); },
    savePartial: (partial) => { setConsent((c) => ({ ...c, ...partial })); setBannerOpen(false); },
  }), [consent, bannerOpen]);

  return <ConsentCtx.Provider value={api}>{children}</ConsentCtx.Provider>;
}
