import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function CurtainIntro({
  showOnce = true,
  storageKey = "curtainSeen",
  title = "Sipario Aperto",
  ctaLabel = "Entra in Sipario Aperto",
  onEnter,                // <── callback per far partire la musica
}) {
  const [visible, setVisible] = useState(() => {
    if (!showOnce) return true;
    try {
      return localStorage.getItem(storageKey) !== "1";
    } catch {
      return true;
    }
  });
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    const prev = document.body.style.overflow;
    if (visible) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [visible]);

  const handleEnter = () => {
    // ⬇️ avvia musica (o altre azioni) al click
    if (typeof onEnter === "function") {
      onEnter();
    }

    if (prefersReducedMotion) {
      if (showOnce) localStorage.setItem(storageKey, "1");
      setVisible(false);
      return;
    }
    setOpening(true);
  };

  const handleAnimationComplete = () => {
    if (opening) {
      if (showOnce) localStorage.setItem(storageKey, "1");
      setVisible(false);
    }
  };

  if (!visible) return null;

  const leftVariants = {
    initial: { x: 0 },
    open: { x: "-110%", transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } }
  };
  const rightVariants = {
    initial: { x: 0 },
    open: { x: "110%", transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } }
  };
  const bgVariants = {
    initial: { opacity: 1 },
    open: { opacity: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.5 } }
  };

  return (
    <AnimatePresence>
      <motion.div
        key="curtain"
        className="curtain-root"
        initial="initial"
        animate={opening ? "open" : "initial"}
        exit={{ opacity: 0 }}
        onAnimationComplete={handleAnimationComplete}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          pointerEvents: opening ? "none" : "auto"
        }}
        role="dialog"
        aria-label="Sipario"
      >
        {/* Fondale */}
        <motion.div
          variants={bgVariants}
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(1200px 600px at 50% 20%, rgba(255,255,255,.08), transparent 60%), linear-gradient(180deg,#000 0%, #111 70%, #000 100%)"
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(60% 80% at 50% 100%, rgba(0,0,0,.6), rgba(0,0,0,0))",
            pointerEvents: "none"
          }}
        />

        {/* Tenda sinistra */}
        <motion.div
          variants={leftVariants}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "55%",
            minWidth: 360,
            background:
              "repeating-linear-gradient(90deg, #700 0 22px, #8b0000 22px 44px)",
            boxShadow: "8px 0 30px rgba(0,0,0,.6)"
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(255,255,255,.06), transparent 30%, transparent 70%, rgba(0,0,0,.25))",
              mixBlendMode: "overlay"
            }}
          />
        </motion.div>

        {/* Tenda destra */}
        <motion.div
          variants={rightVariants}
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "55%",
            minWidth: 360,
            background:
              "repeating-linear-gradient(90deg, #700 0 22px, #8b0000 22px 44px)",
            boxShadow: "-8px 0 30px rgba(0,0,0,.6)"
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(0,0,0,.25), transparent 30%, transparent 70%, rgba(255,255,255,.06))",
              mixBlendMode: "overlay"
            }}
          />
        </motion.div>

        {/* Contenuto centrale con fade-out */}
        <motion.div
          className="curtain-center"
          style={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            display: "grid",
            placeItems: "center",
            textAlign: "center",
            color: "#fff",
            padding: 24
          }}
          initial={{ opacity: 1 }}
          animate={opening ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontSize: "clamp(2rem,6vw,4rem)",
                marginBottom: 12,
                textShadow: "0 12px 40px rgba(0,0,0,.55)"
              }}
            >
              {title}
            </h1>
            <p style={{ opacity: 0.9, marginBottom: 18 }}>
              Benvenuti. Il sipario sta per aprirsi.
            </p>

            <button
              onClick={handleEnter}
              className="btn btn-light btn-lg position-relative"
              autoFocus
              style={{
                borderRadius: 999,
                padding: "10px 20px",
                boxShadow:
                  "0 10px 30px rgba(0,0,0,.45), inset 0 0 22px rgba(255,255,255,.08)"
              }}
            >
              {ctaLabel}
              <span
                aria-hidden
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                  borderRadius: 999,
                  boxShadow: "0 0 0 1px #fff inset, 0 0 24px rgba(255,255,255,.35)"
                }}
              />
            </button>
          </div>
        </motion.div>

        <style>{`
          @media (max-width: 768px){
            .curtain-root div[style*="width: 55%"] { min-width: 50vw !important; }
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
}
