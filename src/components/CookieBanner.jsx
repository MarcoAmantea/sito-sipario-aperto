// /src/CookieBanner.jsx
import { useConsent } from "./ConsentContext";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieBanner() {
  const { bannerOpen, consent, acceptAll, rejectAll, savePartial } = useConsent();

  return (
    <AnimatePresence>
      {bannerOpen && (
        // Barra compatta in basso (nessun backdrop che oscura la pagina)
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="position-fixed w-100"
          style={{
            left: 0,
            bottom: 0,
            zIndex: 2000, // sotto alla navbar fixed-top con z-index alto
            pointerEvents: "none", // la card sotto gestisce gli eventi
          }}
        >
          <div
            className="container d-flex justify-content-center"
            style={{ pointerEvents: "none" }}
          >
            <div
              className="shadow-lg"
              style={{
                maxWidth: 980,
                width: "100%",
                margin: "0 auto 16px",
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,.12)",
                background: "rgba(15,15,15,.92)", // nessuna maschera full-screen
                color: "#fff",
                backdropFilter: "blur(8px)",
                pointerEvents: "auto", // riattiva gli eventi solo sulla card
              }}
            >
              <div className="p-3 d-flex flex-wrap align-items-center gap-3">
                <div style={{ minWidth: 240, flex: 1 }}>
                  <strong>Usiamo i cookie</strong>
                  <div className="text-white-50 small">
                    Miglioriamo l’esperienza e misuriamo le prestazioni del sito.
                    Puoi accettare tutto o gestire le preferenze.
                  </div>
                </div>

                {/* Preferenze essenziali/marketing (semplici switch mock) */}
                <div className="d-flex align-items-center gap-3 flex-wrap">
                  <label className="small d-flex align-items-center gap-2 m-0">
                    <input
                      type="checkbox"
                      disabled
                      checked
                      readOnly
                    />
                    Necessari
                  </label>
                  <label className="small d-flex align-items-center gap-2 m-0">
                    <input
                      type="checkbox"
                      checked={!!consent?.marketing}
                      onChange={(e) => savePartial({ marketing: e.target.checked })}
                    />
                    Marketing
                  </label>
                  <label className="small d-flex align-items-center gap-2 m-0">
                    <input
                      type="checkbox"
                      checked={!!consent?.analytics}
                      onChange={(e) => savePartial({ analytics: e.target.checked })}
                    />
                    Analytics
                  </label>
                </div>

                <div
                  style={{
                    marginLeft: "auto",
                    display: "flex",
                    gap: 8,
                    flexWrap: "wrap",
                  }}
                >
                  {/* Link classico: torna com’era */}
                  <a href="/privacy" className="btn btn-sm btn-outline-light">
                    Leggi la policy
                  </a>
                  <button className="btn btn-sm btn-light" onClick={acceptAll}>
                    Accetta tutto
                  </button>
                  <button className="btn btn-sm btn-secondary" onClick={rejectAll}>
                    Rifiuta
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
