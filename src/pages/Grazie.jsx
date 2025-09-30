// Grazie.jsx
import { useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { FiCheckCircle, FiHome, FiYoutube } from "react-icons/fi";
import { Link } from "react-router-dom";


// Helper per servire immagini da /public anche in sottocartella
const pub = (p) => {
  const base = (import.meta?.env?.BASE_URL || "/").replace(/\/+$/, "/");
  const rel = String(p || "").replace(/^\/+/, "");
  return base + rel;
};

export default function Grazie() {
  // (opzionale) auto-redirect alla home dopo N secondi
  const SECONDS_BEFORE_REDIRECT = 0; // metti 0 per disattivare, es. 6 per 6s

  useEffect(() => {
    if (SECONDS_BEFORE_REDIRECT > 0) {
      const t = setTimeout(() => {
        window.location.href = pub("");
      }, SECONDS_BEFORE_REDIRECT * 1000);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <main
      className="position-relative"
      style={{
        minHeight: "100dvh",
        background:
          "radial-gradient(120% 120% at 50% 0%, #1a1a27 0%, #0b0b12 40%, #07070c 100%)",
        overflow: "hidden",
      }}
    >
      {/* Particelle decorative */}
      <div className="particles" aria-hidden="true">
        {Array.from({ length: 36 }).map((_, i) => (
          <span key={i} style={{ "--i": i + 1 }} />
        ))}
      </div>

      {/* Texture sfondo (facoltativa: metti in /public/textures/noise.png) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url('${pub("textures/noise.png")}')`,
          opacity: 0.07,
          mixBlendMode: "soft-light",
          pointerEvents: "none",
        }}
      />

      {/* Hero centrale */}
      <Container
        className="d-flex flex-column justify-content-center align-items-center text-center"
        style={{ minHeight: "100dvh", position: "relative", zIndex: 2 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="p-4 p-md-5"
          style={{
            maxWidth: 820,
            color: "#fff",
            background:
              "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02))",
            border: "1px solid rgba(255,255,255,.15)",
            borderRadius: 24,
            boxShadow:
              "0 20px 60px rgba(0,0,0,.45), inset 0 0 0 1px rgba(255,255,255,.04)",
            backdropFilter: "blur(6px)",
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 120, damping: 10 }}
            className="mx-auto mb-3"
            style={{
              width: 88,
              height: 88,
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              background:
                "conic-gradient(from 0deg, #ffffff, #b7b7ff, #ffffff, #d8d8ff, #ffffff)",
              boxShadow: "0 10px 30px rgba(0,0,0,.35)",
            }}
          >
            <div
              style={{
                width: 78,
                height: 78,
                borderRadius: "50%",
                background: "#0b0b12",
                display: "grid",
                placeItems: "center",
              }}
            >
              <FiCheckCircle size={42} color="#9df7b1" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4.5vw, 3rem)",
              marginBottom: 12,
              lineHeight: 1.1,
            }}
          >
            Grazie per il tuo messaggio!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ opacity: 0.9, fontSize: "1.05rem" }}
            className="mb-0"
          >
            Abbiamo ricevuto la tua richiesta e ti risponderemo al più presto.
            Nel frattempo puoi tornare alla home o dare un’occhiata ai nostri video.
          </motion.p>

          <div className="d-flex flex-wrap gap-2 justify-content-center mt-4">
            <Link to="/" className="btn btn-light cta" aria-label="Torna alla Home">
  Torna alla Home
</Link>
            <Button
              as="a"
              href="https://www.youtube.com/@sipario_aperto"
              target="_blank"
              rel="noreferrer"
              size="lg"
              variant="outline-light"
              className="cta"
              aria-label="Vai al canale YouTube"
            >
              <FiYoutube style={{ marginRight: 8 }} />
              Vai al canale
            </Button>
          </div>

          {/* micro-nota */}
          <p className="mt-3 mb-0" style={{ fontSize: ".9rem", opacity: 0.65 }}>
            Se non dovessi ricevere la nostra email entro 24 ore, controlla la posta indesiderata.
          </p>
        </motion.div>
      </Container>

      {/* Glow decorativo */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "auto -30% -20% -30%",
          height: 320,
          background:
            "radial-gradient(60% 80% at 50% 50%, rgba(120,110,255,.28), rgba(0,0,0,0))",
          filter: "blur(40px)",
        }}
      />

      {/* Stili locali */}
      <style>{`
        .cta { min-width: 240px; border-radius: 999px; padding: .9rem 1.2rem; }
        @media (max-width: 576px){ .cta { width: 100%; } }

        /* Particelle "confetti" eleganti */
        .particles { position: absolute; inset: 0; overflow: hidden; }
        .particles span{
          --size: calc(6px + (var(--i) % 6));
          position: absolute;
          top: -10vh;
          left: calc((var(--i) * 29) % 100 * 1%);
          width: var(--size); height: var(--size);
          border-radius: 999px;
          background:
            radial-gradient(circle at 30% 30%, #fff, rgba(255,255,255,.2) 40%, transparent 70%),
            linear-gradient(180deg, rgba(255,255,255,.9), rgba(255,255,255,.25));
          opacity: .6;
          transform: translateY(-20vh) translateX(0) scale(1);
          animation: fall calc(6s + (var(--i) % 8) * .35s) linear infinite;
          animation-delay: calc((var(--i) % 10) * -.6s);
          box-shadow: 0 0 12px rgba(255,255,255,.15);
        }
        @keyframes fall {
          0%   { transform: translateY(-20vh) translateX(0) rotate(0deg); opacity:.0; }
          10%  { opacity:.65; }
          100% { transform: translateY(120vh) translateX(6vw) rotate(360deg); opacity:.0; }
        }
      `}</style>

      {/* SEO basilare (facoltativo se usi un wrapper <Helmet /> altrove) */}
      <title>Grazie – Sipario Aperto</title>
      <meta name="description" content="Grazie! Il tuo messaggio è stato inviato correttamente. Ti risponderemo a breve." />
      <link rel="canonical" href={typeof window !== "undefined" ? window.location.href : ""} />
      <meta property="og:title" content="Grazie – Sipario Aperto" />
      <meta property="og:description" content="Abbiamo ricevuto il tuo messaggio. A presto!" />
      <meta property="og:image" content={pub("covers/fallback.jpg")} />
      <meta property="og:type" content="website" />
    </main>
  );
}
