import { useMemo, useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button, Card, Badge } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { FiCalendar, FiMapPin, FiExternalLink, FiPlay } from "react-icons/fi";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaQuoteLeft,
} from "react-icons/fa";
import { Link } from "react-router-dom";

/* =========================================================
   HOME (pulita): rimosse ORBS + video hero anche su mobile in HD
   - Video unico <video> (desktop+mobile) con playsInline/muted/loop
   - Mantiene spotlight e titolo cinetico
   ========================================================= */

/* ---------- Utility ---------- */
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
function formatDT(iso) {
  const d = new Date(iso);
  return {
    date: new Intl.DateTimeFormat("it-IT", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(d),
    time: new Intl.DateTimeFormat("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(d),
  };
}

/* ---------- Mini components ---------- */
function SocialBtn({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="d-inline-flex align-items-center justify-content-center"
      style={{
        width: 46,
        height: 46,
        borderRadius: 999,
        background:
          "linear-gradient(180deg, rgba(255,255,255,.16), rgba(255,255,255,.08))",
        color: "#fff",
        border: "1px solid rgba(255,255,255,.18)",
        boxShadow:
          "0 10px 30px rgba(0,0,0,.35), inset 0 0 18px rgba(255,255,255,.06)",
        transition: "transform .14s ease, background .2s ease",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-2px)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      {/* lineHeight:0 elimina lo spazio di baseline; translateY(+0.5px) corregge l’ottica */}
      <span
        style={{
          fontSize: 18,
          lineHeight: 0,
          display: "inline-flex",
          transform: "translateY(0.5px)",
        }}
      >
        {children}
      </span>
    </a>
  );
}

function KineticTitle({ text }) {
  const letters = text.split("");
  return (
    <div
      aria-label={text}
      role="heading"
      className="d-inline-flex flex-wrap justify-content-center gap-1"
      style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900 }}
    >
      {letters.map((ch, i) => (
        <motion.span
          key={i}
          initial={{ y: 50, opacity: 0, rotateX: 90 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          transition={{ duration: 0.6, delay: i * 0.03, ease: "easeOut" }}
          style={{
            display: "inline-block",
            fontSize: "clamp(2rem,5vw,4rem)",
            lineHeight: 1.05,
            textShadow: "0 10px 35px rgba(0,0,0,.6)",
          }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </div>
  );
}

function TiltCard({ children }) {
  const ref = useRef(null);
  const [r, setR] = useState({ rx: 0, ry: 0 });
  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const rect = ref.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setR({ rx: clamp(-y * 8, -8, 8), ry: clamp(x * 8, -8, 8) });
      }}
      onMouseLeave={() => setR({ rx: 0, ry: 0 })}
      style={{ transformStyle: "preserve-3d" }}
      animate={{ rotateX: r.rx, rotateY: r.ry }}
      transition={{ type: "spring", stiffness: 160, damping: 12 }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Pagina ---------- */
export default function Home() {
  const events = useMemo(
    () => [
      {
        title: "Le voci di dentro",
        excerpt:
          "Commedia di Eduardo De Filippo che intreccia sogno e realtà: un presunto omicidio scatena sospetti e rivelazioni nella Napoli del dopoguerra, tra ironia e tensione morale.",
        whenISO: "2025-10-03T20:45:00+02:00",
        monthLabel: "Ottobre",
        venue: "Teatro La Locandina",
        city: "Pagani (SA)",
        status: "In Scena",
        poster: "/dentro.jpg",
        link: "/spettacoli/le-voci-di-dentro",
      },
      {
        title: "Il medico dei pazzi",
        excerpt:
          "Capolavoro comico di Eduardo Scarpetta: Felice Sciosciammocca, ignaro, scambia una casa di cura per una pensione e dà vita a una valanga di equivoci irresistibili.",
        whenISO: "2025-12-06T21:00:00+01:00",
        monthLabel: "Dicembre",
        venue: "Teatro La Locandina",
        city: "Pagani (SA)",
        status: "In programmazione",
        poster: "/pazzi.jpeg",
        link: "/spettacoli/il-medico-dei-pazzi",
      },
      {
        title: "Romeo e Giulietta",
        excerpt:
          "Il dramma senza tempo di Shakespeare: l’amore travolgente di due giovani sfida l’odio tra Montecchi e Capuleti in una Verona divisa e tragica.",
        whenISO: "2026-02-07T21:00:00+01:00",
        monthLabel: "Febbraio",
        venue: "Teatro La Locandina",
        city: "Pagani (SA)",
        status: "In programmazione",
        poster: "/romeo.jpg",
        link: "/spettacoli/romeo-e-giulietta",
      },
    ],
    []
  );

  const quotes = useMemo(
    () => [
      {
        text: "Il teatro dove la magia incontra l'anima.",
        author: "Sipario Aperto",
      },
      {
        text: "La scena si illumina quando il pubblico trattiene il respiro.",
        author: "Critica di Spettacolo",
      },
      {
        text: "Passione, mestiere, territorio: la compagnia che emoziona.",
        author: "Spettatore",
      },
      {
        text: "Una serata di risate genuine e cuore napoletano: indimenticabile.",
        author: "Spettatore entusiasta",
      },
    ],
    []
  );

  const [qIndex, setQIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setQIndex((i) => (i + 1) % quotes.length),
      4200
    );
    return () => clearInterval(id);
  }, [quotes.length]);

  // Spotlight dinamico (coord relative all'hero)
  useEffect(() => {
    const layer = document.getElementById("spotlightLayer");
    const hero = document.getElementById("hero");
    if (!layer || !hero) return;
    const onMove = (e) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      layer.style.setProperty("--x", `${x}px`);
      layer.style.setProperty("--y", `${y}px`);
    };
    const center = () => {
      const rect = hero.getBoundingClientRect();
      layer.style.setProperty("--x", `${rect.width / 2}px`);
      layer.style.setProperty("--y", `${rect.height * 0.45}px`);
    };
    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", center);
    center();
    return () => {
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", center);
    };
  }, []);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ====== HERO ====== */}
      <section
        id="hero"
        className="position-relative"
        style={{
          minHeight: "100vh",
          background: "#000",
          color: "#fff",
          overflow: "hidden",
        }}
      >
        {/* Background video unico (desktop + mobile) */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <video
            className="w-100 h-100"
            style={{ objectFit: "cover", opacity: 0.6, pointerEvents: "none" }}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/hero-img.png"
          >
            {/* Se hai una versione 1080p specifica, mettila COME PRIMA SOURCE */}
            <source src="/hero-1080p.mp4" type="video/mp4" />
            <source src="/hero.mp4" type="video/mp4" />
          </video>
          {/* Gradient overlay + spotlight */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(0,0,0,.68), rgba(0,0,0,.45) 40%, rgba(0,0,0,.8))",
            }}
          />
          <div id="spotlightLayer" className="spotlight" />
        </div>

        <Container
          style={{ position: "relative", zIndex: 2, minHeight: "100vh" }}
          className="d-flex align-items-center text-center"
        >
          <div className="w-100">
            <KineticTitle text={"Il teatro allunga la vita"} />
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mx-auto mt-3"
              style={{
                maxWidth: 880,
                opacity: 0.95,
                fontSize: "clamp(1rem,2.2vw,1.2rem)",
              }}
            >
              Compagnia Teatrale <strong>Sipario Aperto</strong> — classico e
              contemporaneo in un dialogo vivo con il pubblico.
            </motion.p>

            {/* CTA + Social allineati otticamente */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.8 }}
              className="mt-3 mx-auto d-flex flex-column align-items-center"
              style={{ width: "fit-content" }}
            >
              <Button
                as={Link}
                to="/calendario"
                size="lg"
                variant="light"
                className="w-auto position-relative mb-3"
              >
                <span className="position-relative" style={{ zIndex: 2 }}>
                  Vai alla programmazione
                </span>
                <span
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{
                    borderRadius: 999,
                    boxShadow:
                      "0 0 0 1px #fff inset, 0 0 20px rgba(255,255,255,.35)",
                  }}
                />
              </Button>

              {/* Social, centrati sullo stesso asse del bottone */}
              <div className="d-flex justify-content-center gap-3">
                <SocialBtn
                  href="https://www.facebook.com/profile.php?id=61580420651607"
                  label="Facebook"
                >
                  <FaFacebookF />
                </SocialBtn>
                <SocialBtn
                  href="https://www.instagram.com/siparioaperto_79/"
                  label="Instagram"
                >
                  <FaInstagram />
                </SocialBtn>
                <SocialBtn
                  href="https://www.youtube.com/@sipario_aperto"
                  label="YouTube"
                >
                  <FaYoutube />
                </SocialBtn>
              </div>
            </motion.div>

            <div className="mt-3" style={{ minHeight: 28 }}>
              <small
                style={{ opacity: 0.92, fontSize: "clamp(.95rem, 2vw, 1rem)" }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={qIndex}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.35 }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <FaQuoteLeft style={{ opacity: 0.8 }} />{" "}
                    {quotes[qIndex].text} —{" "}
                    <span style={{ opacity: 0.85 }}>
                      {quotes[qIndex].author}
                    </span>
                  </motion.span>
                </AnimatePresence>
              </small>
            </div>

            <div className="mt-4">
              <div className="scroll-cue" />
            </div>
          </div>
        </Container>
      </section>

      {/* ====== CHI SIAMO ====== */}
      <section
        id="chi-siamo"
        className="py-5"
        style={{ background: "linear-gradient(180deg,#000,#0b0b12)" }}
      >
        <Container>
          <Row className="align-items-center g-4">
            <Col md={6}>
              <h2
                className="mb-3 text-light"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.6rem,2.6vw,2.2rem)",
                }}
              >
                Chi siamo
              </h2>
              <p className="text-light" style={{ opacity: 0.9 }}>
                Siamo una compagnia indipendente nata a Pagani. Mettiamo in
                scena grandi classici e nuovi testi, con un linguaggio
                accessibile e una cura artigianale di scenografie, costumi e
                luci.
              </p>
              <ul className="text-light mb-0" style={{ opacity: 0.95 }}>
                <li>Regie d'autore e formazione costante</li>
                <li>Collaborazioni con scuole e realtà del territorio</li>
                <li>Accessibilità, prezzi popolari, tournée regionali</li>
              </ul>
              <div className="mt-3 d-flex gap-2">
                <Button as={Link} to="/chi-siamo" variant="light">
                  Scopri Chi Siamo
                </Button>{" "}
                <Button
                  variant="outline-light"
                  onClick={() => scrollToId("eventi")}
                >
                  Vedi gli spettacoli
                </Button>
              </div>
            </Col>
            <Col md={6}>
              <TiltCard>
                <div
                  className="ratio ratio-16x9 rounded overflow-hidden shadow-lg"
                  style={{ border: "1px solid rgba(255,255,255,.15)" }}
                >
                  <img
                    src="/compagnia.jpg"
                    alt="La compagnia in scena"
                    className="w-100 h-100"
                    style={{ objectFit: "cover" }}
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://picsum.photos/1280/720?blur=2")
                    }
                  />
                </div>
              </TiltCard>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ====== EVENTI ====== */}
      <section
        id="eventi"
        className="py-5"
        style={{ background: "linear-gradient(180deg,#0b0b12,#0f0f22)" }}
      >
        <Container>
          <div className="d-flex justify-content-between align-items-end mb-3">
            <h2
              className="text-light mb-0"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.6rem,2.6vw,2.2rem)",
              }}
            >
              Prossimi eventi
            </h2>
          </div>
          <Row>
            {events.map((ev, i) => {
              const monthOnly =
                ev.monthLabel ||
                new Intl.DateTimeFormat("it-IT", { month: "long" }).format(
                  new Date(ev.whenISO)
                );
              const variant =
                ev.status === "In programmazione"
                  ? "warning"
                  : ev.status === "Anteprima"
                  ? "info"
                  : "success";
              return (
                <Col xs={12} sm={6} lg={4} className="mb-3" key={i}>
                  <TiltCard>
                    <Card
                      className="h-100 shadow-sm"
                      style={{
                        background: "rgba(255,255,255,.04)",
                        color: "#fff",
                        border: "1px solid rgba(255,255,255,.12)",
                      }}
                    >
                      <div className="ratio ratio-4x3">
                        <img
                          src={ev.poster}
                          alt={`Locandina ${ev.title}`}
                          className="w-100 h-100"
                          style={{ objectFit: "cover" }}
                          onError={(e) =>
                            (e.currentTarget.src = `https://picsum.photos/seed/${
                              i + 10
                            }/600/450`)
                          }
                        />
                      </div>
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <Card.Title
                            className="mb-0"
                            style={{ fontSize: "1rem", lineHeight: 1.1 }}
                          >
                            {ev.title}
                          </Card.Title>
                          <Badge bg={variant}>{ev.status}</Badge>
                        </div>
                        <Card.Text className="mb-2" style={{ opacity: 0.95 }}>
                          {ev.excerpt}
                        </Card.Text>
                        <div className="d-flex align-items-center gap-2 small mb-1">
                          <FiCalendar /> <small>Nel mese di {monthOnly}</small>
                        </div>
                        <div className="d-flex align-items-center gap-2 small mb-3">
                          <FiMapPin />{" "}
                          <small>
                            {ev.venue} — {ev.city}
                          </small>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <Button
                            as={Link}
                            to="/contatti"
                            variant="light"
                            size="sm"
                          >
                            Prenota
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </TiltCard>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>

      {/* ====== RECENSIONI ====== */}
      <section
        id="recensioni"
        className="py-5"
        style={{ background: "linear-gradient(180deg,#0f0f22,#0a0a12)" }}
      >
        <Container>
          <h2
            className="text-center text-light mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.6rem,2.6vw,2.2rem)",
            }}
          >
            Dicono di noi
          </h2>
          <div className="marquee-mask">
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: "-50%" }}
              transition={{ repeat: Infinity, duration: 90, ease: "linear" }}
              className="marquee-track"
            >
              {[...quotes, ...quotes].map((q, idx) => (
                <figure
                  key={idx}
                  className="p-3 p-md-4 rounded"
                  style={{
                    background: "rgba(255,255,255,.06)",
                    border: "1px solid rgba(255,255,255,.12)",
                    color: "#fff",
                    minWidth: 360,
                    maxWidth: 460,
                  }}
                >
                  <blockquote className="mb-2" style={{ fontStyle: "italic" }}>
                    “{q.text}”
                  </blockquote>
                  <figcaption style={{ opacity: 0.85, fontSize: 14 }}>
                    — {q.author}
                  </figcaption>
                </figure>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>
      {/* ====== VIDEO ====== */}
      <section id="video" className="position-relative py-5 py-md-6">
        {/* sfondo video full-bleed con overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            overflow: "hidden",
          }}
        >
          <video
            className="w-100 h-100"
            style={{
              objectFit: "cover",
              filter: "contrast(1.05) brightness(.8)",
              transform: "scale(1.02)",
            }}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/hero-img.png"
          >
            <source src="/cinema.mp4" type="video/mp4" />
            <source src="/cinema.mp4" type="video/mp4" />
          </video>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(1200px 600px at 50% 10%, rgba(255,255,255,.08), transparent 55%), linear-gradient(180deg, rgba(0,0,0,.35) 0%, rgba(0,0,0,.80) 85%, #000)",
            }}
          />
        </div>

        <Container style={{ position: "relative", zIndex: 1 }}>
          <Row className="align-items-center">
            <Col lg={{ span: 10, offset: 1 }} className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8 }}
                className="d-inline-flex flex-column align-items-center gap-3"
              >
                <Link to="/video">
  <motion.button
    className="d-inline-flex align-items-center justify-content-center"
    style={{
      width: 96,
      height: 96,
      borderRadius: 999,
      border: "1px solid rgba(255,255,255,.35)",
      background: "rgba(255,255,255,.08)",
      boxShadow:
        "0 12px 40px rgba(0,0,0,.45), inset 0 0 22px rgba(255,255,255,.10)",
      cursor: "pointer",
    }}
    whileHover={{ scale: 1.06 }}
    whileTap={{ scale: 0.98 }}
  >
    <FiPlay size={40} />
  </motion.button>
</Link>


                <h2
                  className="text-light m-0"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 900,
                    fontSize: "clamp(1.8rem,3.5vw,2.6rem)",
                    textShadow: "0 12px 40px rgba(0,0,0,.65)",
                  }}
                >
                  Guarda il nostro mondo in scena
                </h2>
                <p
                  className="text-light"
                  style={{ opacity: 0.9, maxWidth: 820 }}
                >
                  Trailer, backstage e momenti dal vivo: emozioni in alta
                  definizione.
                </p>

                <div className="d-grid gap-2 d-sm-flex">
                  <Button
                    as={Link}
                    to="/video"
                    size="lg"
                    variant="light"
                    className="position-relative"
                  >
                    Vai alla pagina Video
                    <span
                      className="position-absolute top-0 start-0 w-100 h-100"
                      style={{
                        borderRadius: 999,
                        boxShadow:
                          "0 0 0 1px #fff inset, 0 0 24px rgba(255,255,255,.35)",
                      }}
                    />
                  </Button>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ====== UNISCITI (WhatsApp) ====== */}
      <section
        id="unisciti"
        className="py-5"
        style={{ background: "linear-gradient(180deg,#0a0a12,#000)" }}
      >
        <Container>
          <Row className="align-items-center g-4">
            <Col lg={6}>
              <h2
                className="text-light mb-3"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.6rem,2.6vw,2.2rem)",
                }}
              >
                Unisciti al nostro gruppo WhatsApp
              </h2>
              <p className="text-light" style={{ opacity: 0.9, maxWidth: 720 }}>
                Niente newsletter: ti aggiorniamo direttamente sul nostro canale
                WhatsApp ufficiale. Nuove date, apertura biglietti, dietro le
                quinte e comunicazioni speciali.
              </p>
              <div className="d-grid gap-2 d-sm-flex mt-3">
                <a
                  href="https://chat.whatsapp.com/LtX78JyizfFFTXfala0BrV"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-success btn-lg"
                >
                  Apri Gruppo WhatsApp
                </a>
                <Button
  as={Link}          //  <── usa Link
  to="/contatti"     //  <── rotta interna
  variant="outline-light"
  size="lg"
>
  Contattaci
</Button>
              </div>
              <div
                className="text-light mt-2"
                style={{ opacity: 0.8, fontSize: 14 }}
              >
                📢 Segui il nostro gruppo ufficiale su WhatsApp per ricevere
                notizie e anteprime.
              </div>
            </Col>
            <Col lg={6} className="text-center">
              <div
                className="ratio ratio-1x1 rounded-4 overflow-hidden d-inline-flex align-items-center justify-content-center shadow"
                style={{
                  background: "rgba(255,255,255,.05)",
                  border: "1px solid rgba(255,255,255,.12)",
                  width: 320,
                  maxWidth: "90%",
                }}
              >
                <img
                  src="/qr.jpg"
                  alt="QR per unirti al canale WhatsApp"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "cover",
                  }}
                  onError={(e) => (e.currentTarget.src = "/qr.jpg")}
                />
              </div>
              <small
                className="d-block mt-2 text-light"
                style={{ opacity: 0.8 }}
              >
                Scansiona con il telefono per unirti subito
              </small>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Helpers + Spotlight CSS */}
      <style>{`
html, body { overflow-x: hidden; }
.marquee-mask{ overflow:hidden; position:relative; width:100%; }
.marquee-track{ display:flex; gap:16px; width:max-content; }
/* Spotlight */
.spotlight{ position:absolute; inset:0; pointer-events:none; background: radial-gradient(340px 340px at var(--x, 50%) var(--y, 45%), rgba(255,255,255,0.10), transparent 70%); transition:60ms; }
@media (max-width:768px){ .spotlight{ background: radial-gradient(260px 260px at 50% 45%, rgba(255,255,255,0.10), transparent 70%); } }
.hero-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.hero-actions > .btn {
  margin-bottom: 0.75rem; /* spaziatura minore */
}
  /* Effetto leggero di glow sugli elementi della sezione video */
#video h2 { letter-spacing: .3px; }
#video .btn { backdrop-filter: blur(2px); }


      `}</style>
    </>
  );
}
