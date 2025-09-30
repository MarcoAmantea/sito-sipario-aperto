// /src/pages/ShowGallery.jsx
import React, { useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { shows } from "../data/showsData";
import { motion } from "framer-motion";
import { FiChevronLeft } from "react-icons/fi";

export default function ShowGallery() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const show = useMemo(() => shows.find((s) => s.slug === slug), [slug]);

  const [modalIndex, setModalIndex] = useState(null); // null = chiuso

  if (!show) {
    return (
      <main className="container py-5">
        <button className="btn btn-outline-light mb-3" onClick={() => navigate(-1)}>
          <FiChevronLeft /> Indietro
        </button>
        <h1 className="text-white">Spettacolo non trovato</h1>
        <p className="text-white-50">Controlla il link oppure torna alla <Link to="/gallery">gallery</Link>.</p>
      </main>
    );
  }

  const openModal = (i) => setModalIndex(i);
  const closeModal = () => setModalIndex(null);
  const next = () =>
    setModalIndex((i) => (i + 1) % show.photos.length);
  const prev = () =>
    setModalIndex((i) => (i - 1 + show.photos.length) % show.photos.length);

  return (
    <main>
      {/* HERO */}
      <section
        className="position-relative"
        style={{
          minHeight: "50vh",
          backgroundImage: `url(${show.cover})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ background: "linear-gradient(180deg, rgba(0,0,0,.6), rgba(0,0,0,.9))" }}
        />
        <div className="container position-relative py-5" style={{ zIndex: 2 }}>
          <Link to="/gallery" className="btn btn-outline-light mb-3">
            <FiChevronLeft /> Torna alla gallery
          </Link>
          <h1 className="display-5 fw-bold text-white mb-2">{show.title}</h1>
          <p className="lead text-white-50 mb-3">{show.subtitle}</p>
          <div className="d-flex flex-wrap gap-2">
            <span className="badge bg-light text-dark">{show.date}</span>
            {show.tags?.map((t) => (
              <span key={t} className="badge" style={{ background: "rgba(255,255,255,.15)", color: "#fff" }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* MASONRY GRID */}
      <section className="py-5" style={{ background: "#0b0b0b" }}>
        <div className="container">
          <div className="masonry">
            {show.photos.map((src, i) => (
              <motion.figure
                key={src}
                className="masonry-item"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45 }}
                onClick={() => openModal(i)}
                style={{
                  cursor: "zoom-in",
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "0 12px 40px rgba(0,0,0,.35)",
                }}
              >
                <img
                  src={src}
                  alt={`${show.title} - foto ${i + 1}`}
                  loading="lazy"
                  style={{ width: "100%", display: "block" }}
                />
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX (Modal semplice) */}
      {modalIndex !== null && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ background: "rgba(0,0,0,.85)", zIndex: 1080 }}
          onClick={closeModal}
        >
          <button
            type="button"
            className="btn btn-light position-absolute"
            style={{ top: 20, right: 20, zIndex: 1090 }}
            onClick={closeModal}
          >
            Chiudi
          </button>

          <button
            type="button"
            className="btn btn-outline-light position-absolute"
            style={{ top: "50%", left: 20, transform: "translateY(-50%)" }}
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
          >
            ‹
          </button>

          <img
            src={show.photos[modalIndex]}
            alt={`${show.title} - foto ${modalIndex + 1}`}
            style={{
              maxWidth: "90vw",
              maxHeight: "85vh",
              display: "block",
              borderRadius: 12,
              boxShadow: "0 30px 120px rgba(0,0,0,.6)",
            }}
            onClick={(e) => e.stopPropagation()}
          />

          <button
            type="button"
            className="btn btn-outline-light position-absolute"
            style={{ top: "50%", right: 20, transform: "translateY(-50%)" }}
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
          >
            ›
          </button>
        </div>
      )}
    </main>
  );
}
