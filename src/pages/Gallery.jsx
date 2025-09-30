// /src/pages/Gallery.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { shows } from "../data/showsData";
import { FiArrowRight, FiTool, FiClock, FiImage } from "react-icons/fi";

export default function Gallery() {
  const hasShows = Array.isArray(shows) && shows.length > 0;

  return (
    <main>
      {/* HERO */}
      <section
        className="position-relative"
        style={{
          minHeight: "60vh",
          background:
            "radial-gradient(1200px 500px at 50% -20%, rgba(255,255,255,.08), rgba(0,0,0,0)), linear-gradient(180deg,#0a0a0a,#000)",
          color: "#fff",
          overflow: "hidden",
        }}
      >
        {/* orb scenografica */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{
            position: "absolute",
            inset: "-20% -10% auto -10%",
            height: "70vh",
            background:
              "radial-gradient(closest-side, rgba(255,255,255,.12), rgba(255,255,255,0))",
            filter: "blur(30px)",
            pointerEvents: "none",
          }}
        />
        <div className="container py-5 position-relative" style={{ zIndex: 2 }}>
          <div className="row">
            <div className="col-lg-10">
              <h1 className="display-4 fw-bold mb-3">Gallery</h1>
              <p className="lead text-white-50 mb-0">
                {hasShows
                  ? "Una selezione dei nostri spettacoli — entra in ciascuna galleria per vedere tutte le foto."
                  : "Pagina in allestimento: stiamo selezionando gli scatti migliori. Torna presto!"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENUTO */}
      {hasShows ? (
        <ShowsGrid />
      ) : (
        <MaintenanceBlock />
      )}
    </main>
  );
}

/** === COMPONENTI === */

// Blocco “manutenzione” super scenografico
function MaintenanceBlock() {
  return (
    <section className="py-5" style={{ background: "#0b0b0b" }}>
      <div className="container">
        <motion.div
          className="mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          style={{
            maxWidth: 920,
            borderRadius: 24,
            padding: "2.25rem",
            background:
              "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02))",
            border: "1px solid rgba(255,255,255,.10)",
            boxShadow: "0 30px 120px rgba(0,0,0,.55)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* bordo glow animato */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0.5, rotate: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              inset: -2,
              borderRadius: 26,
              background:
                "conic-gradient(from 180deg, rgba(255,255,255,.25), rgba(255,255,255,0) 40%, rgba(255,255,255,.2))",
              mask:
                "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMask:
                "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              padding: 2,
              pointerEvents: "none",
            }}
          />
          {/* particelle soft */}
          <FloatingIcon style={{ top: 24, left: 24 }}>
            <FiTool />
          </FloatingIcon>
          <FloatingIcon style={{ top: 24, right: 24 }}>
            <FiClock />
          </FloatingIcon>
          <FloatingIcon style={{ bottom: 24, left: 24 }}>
            <FiImage />
          </FloatingIcon>

          <div className="text-center position-relative" style={{ zIndex: 2 }}>
            <motion.h2
              className="fw-bold text-white mb-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
            >
              Gallery in allestimento
            </motion.h2>
            <motion.p
              className="text-white-50 mb-4"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Stiamo curando le immagini e la post-produzione per offrirti
              un’esperienza mozzafiato.
            </motion.p>

            {/* pillole di stato */}
            <div className="d-inline-flex flex-wrap justify-content-center gap-2 mb-4">
              <StatusPill label="Selezione scatti" />
              <StatusPill label="Post-produzione" />
              <StatusPill label="Upload in corso" />
            </div>

            {/* call to action secondaria */}
            <motion.div
              className="d-flex justify-content-center gap-3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Link to="/" className="btn btn-light">
                Torna alla Home
              </Link>
              <Link to="/contatti" className="btn btn-outline-light">
                Contattaci
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Griglia degli show (riappare automaticamente quando inserisci dati)
function ShowsGrid() {
  return (
    <section className="py-5" style={{ background: "#0b0b0b" }}>
      <div className="container">
        <div className="row g-4">
          {shows.map((s, i) => (
            <div key={s.slug} className="col-12 col-sm-6 col-lg-4">
              <Link to={`/gallery/${s.slug}`} className="text-decoration-none">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="card border-0 shadow-lg h-100"
                  style={{
                    borderRadius: 20,
                    overflow: "hidden",
                    background: "#121212",
                  }}
                >
                  <div
                    className="ratio ratio-16x9"
                    style={{
                      backgroundImage: `url(${s.cover})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      filter: "saturate(1.05)",
                    }}
                  >
                    <div
                      className="w-100 h-100 d-flex flex-column justify-content-end p-3"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(0,0,0,0) 10%, rgba(0,0,0,.75) 100%)",
                      }}
                    >
                      <span className="badge bg-light text-dark mb-2">
                        {s.date}
                      </span>
                      <h3 className="h4 text-white mb-1">{s.title}</h3>
                      <p className="text-white-50 mb-2">{s.subtitle}</p>
                      <div className="d-flex flex-wrap gap-2">
                        {s.tags?.map((t) => (
                          <span
                            key={t}
                            className="badge"
                            style={{
                              background: "rgba(255,255,255,.12)",
                              color: "#fff",
                              backdropFilter: "blur(8px)",
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-3 d-flex align-items-center justify-content-between">
                    <small className="text-white-50">
                      {s.photos?.length || 0} foto
                    </small>
                    <span className="text-white">
                      <FiArrowRight />
                    </span>
                  </div>
                </motion.div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// UI helpers
function StatusPill({ label }) {
  return (
    <span
      className="badge"
      style={{
        background: "rgba(255,255,255,.12)",
        color: "#fff",
        backdropFilter: "blur(8px)",
        padding: ".6rem .9rem",
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,.14)",
      }}
    >
      {label}
    </span>
  );
}

function FloatingIcon({ children, style }) {
  return (
    <motion.div
      aria-hidden
      initial={{ y: 0, opacity: 0.6 }}
      animate={{ y: [-4, 4, -4], opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      style={{
        position: "absolute",
        fontSize: 22,
        color: "rgba(255,255,255,.7)",
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}
