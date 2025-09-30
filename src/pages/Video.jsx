import { useMemo, useState } from "react";
import { Container, Row, Col, Button, Card, Form, Modal, Badge } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlay, FiSearch } from "react-icons/fi";
import { useConsent } from "../components/ConsentContext";

/* =========================================================
   VIDEO — Griglia spettacolare solo con immagini da /public
   - NIENTE playlist YouTube
   - Ogni card usa SEMPRE la tua immagine (cover) da /public/covers
   - Ricerca + tag
   - Modal player YouTube (apre il video, ma non usa mai il thumbnail YouTube)
   ========================================================= */

// URL assoluto verso /public rispettando BASE_URL (anche in sottocartella)
const pub = (p) => {
  const base = (import.meta?.env?.BASE_URL || "/").replace(/\/+$/, "/");
  const rel = String(p || "").replace(/^\/+/, "");
  return base + rel;
};

// URL canale YouTube ufficiale
const CHANNEL_URL = "https://www.youtube.com/@sipario_aperto";

// Box 16:9 indipendente da Bootstrap .ratio (evita glitch bianchi)
function MediaBox({ src, alt, onPlay }) {
  const url = pub(src || "covers/fallback.jpg");
  return (
    <div
      className="position-relative overflow-hidden"
      style={{
        paddingBottom: "56.25%", // 16:9
        background: "#0b0b12",
        borderBottom: "1px solid rgba(255,255,255,.12)",
      }}
    >
      <img
        src={url}
        alt={alt}
        loading="lazy"
        onError={(e) => (e.currentTarget.src = "https://picsum.photos/seed/teatro/800/450?blur=2")}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", backgroundColor: "#000" }}
      />
      <motion.button
        type="button"
        onClick={onPlay}
        className="play-btn position-absolute top-50 start-50 translate-middle"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        aria-label={`Riproduci ${alt}`}
      >
        <span className="pulse" />
        <FiPlay className="icon" />
        <span className="label d-none d-sm-inline">Riproduci</span>
      </motion.button>
    </div>
  );
}

export default function Video(){
  const { consent, savePartial } = useConsent();

  // === GRIGLIA VIDEO: metti qui le tue cover (percorsi RELATIVI a /public) ===
  // === GRIGLIA VIDEO: metti qui le tue cover (percorsi RELATIVI a /public) ===
const allVideos = useMemo(() => [
  {
    id: "mkhW9tVat0I",
    title: "Miseria e nobiltà",
    cover: "covers/miseria.jpg",
    tags: ["commedia","napoli"],
    description:
      "La celebre commedia di Eduardo Scarpetta che racconta, tra equivoci e risate, l’incontro tra la miseria dei popolani e le vanità della nobiltà partenopea."
  },
  {
    id: "ZaDeyMztD34",
    title: "La Commedia del Re Buffone e del Buffone Re",
    cover: "covers/buffone.jpeg",
    tags: ["commedia","napoli"],
    description:
      "Un gioco teatrale irresistibile in cui il re diventa buffone e il buffone diventa re: satira pungente, ritmo incalzante e un continuo scambio di ruoli che diverte e fa riflettere."
  },
  {
    id: "zhD1Ocoef0I",
    title: "Otello",
    cover: "covers/otello.jpg",
    tags: ["tragedia"],
    description:
      "La grande tragedia di Shakespeare: gelosia, inganno e amore fatale in una messa in scena intensa e visivamente potente."
  },
  {
    id: "oo5fCMiUxJ4",
    title: "Amleto",
    cover: "covers/amleto.jpg",
    tags: ["tragedia"],
    description:
      "Il principe di Danimarca in una versione moderna ma fedele: dubbi, vendetta e il tormento della coscienza, tra atmosfere cupe e monologhi immortali."
  },
  {
    id: "Y5spEBX5mNY",
    title: "Presentazione Rassegna 2024/2025",
    cover: "covers/fallback.jpg",
    tags: ["stagione"],
    description:
      "Uno sguardo esclusivo alla nuova stagione teatrale di Sipario Aperto: anteprime, dietro le quinte e interviste al cast."
  },
 {
  id: "IJ0LM3DUwqs",
  title: "Morte di Carnevale",
  cover: "covers/carnevale.jpg",
  tags: ["commedia","napoli","viviani"],
  description:
    "Commedia di Raffaele Viviani: Pasquale Capozzi, detto Carnevale, finge la propria morte scatenando intrighi ed eredità inattese nella Napoli popolare degli anni ’20."
}


], []);


  // === Stato ricerca e filtro ===
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("tutti");
  const tags = useMemo(() => ["tutti","commedia","tragedia","stagione","napoli"], []);

  const videosFiltered = allVideos.filter(v => {
    const matchQ = v.title.toLowerCase().includes(query.toLowerCase());
    const matchTag = activeTag === "tutti" || v.tags?.includes(activeTag);
    return matchQ && matchTag;
  });

  // === Modal Player ===
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);
  const play = (v) => { setCurrent(v); setOpen(true); };
  const close = () => { setOpen(false); setTimeout(()=> setCurrent(null), 200); };

  return (
    <main style={{ background: "linear-gradient(180deg,#000,#0b0b12)" }}>

      {/* HERO immagine */}
<section className="position-relative" style={{ minHeight: "58vh", overflow: "hidden", paddingTop: 72 }}>
  <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
    <img src={pub("video.png")} alt="Video Sipario Aperto" className="w-100 h-100" style={{ objectFit: "cover", opacity: .58 }} onError={(e)=>e.currentTarget.src = "https://picsum.photos/1600/900?blur=2"} />
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(140% 80% at 50% 20%, rgba(255,255,255,.08), rgba(0,0,0,.86))" }} />
  </div>
  <Container style={{ position: "relative", zIndex: 2 }} className="h-100 d-flex align-items-center text-center">
    <div className="w-100">
      <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .8 }} style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,5vw,3rem)", color: "#fff" }}>
        I nostri video
      </motion.h1>
      <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .1, duration: .8 }} className="mx-auto" style={{ maxWidth: 880, color: "#fff", opacity: .9 }}>
        Trailer, backstage, commedie napoletane e la nostra tragedia annuale: qui trovi le clip e gli estratti più belli di <strong>Sipario Aperto</strong>.
      </motion.p>
      <div className="d-flex justify-content-center gap-2 mt-3 hero-cta">
        <Button size="lg" variant="light" as="a" href={CHANNEL_URL} target="_blank" rel="noreferrer">
          Iscriviti al canale Youtube
        </Button>
        <Button size="lg" variant="outline-light" onClick={() => play(allVideos[0])}>
          Guarda lo spettacolo in primo piano
        </Button>
      </div>
    </div>
  </Container>
</section>

      {/* RICERCA + TAG */}
      <section className="py-4" style={{ background: "linear-gradient(180deg,#0b0b12,#0f0f22)" }}>
        <Container>
          <div className="d-flex flex-column flex-md-row gap-2 align-items-stretch align-items-md-center justify-content-between">
            <Form className="flex-grow-1">
              <div className="position-relative">
                <FiSearch style={{ position:'absolute', left:12, top:10, opacity:.75 }} />
                <Form.Control type="search" placeholder="Cerca un video (titolo)" value={query} onChange={(e)=>setQuery(e.target.value)} style={{ paddingLeft: 38, background:'rgba(255,255,255,.05)', color:'#fff', border:'1px solid rgba(255,255,255,.12)' }} />
              </div>
            </Form>
            <div className="d-flex flex-wrap gap-2 mt-2 mt-md-0">
              {tags.map(t => (
                <Badge key={t} bg={activeTag===t?"light":"secondary"} text={activeTag===t?"dark":"light"} style={{ cursor:'pointer' }} onClick={()=>setActiveTag(t)}>{t}</Badge>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* GRIGLIA VIDEO */}
      <section className="py-5" style={{ background: "linear-gradient(180deg,#0f0f22,#0a0a12)" }}>
        <Container>
          <Row className="g-3 g-md-4">
            {videosFiltered.map((v, i) => (
              <Col sm={6} lg={4} key={v.id + i}>
                <motion.div whileHover={{ y: -4 }}>
                  <Card className="h-100 shadow-sm" style={{ background: "rgba(255,255,255,.05)", color: "#fff", border: "1px solid rgba(255,255,255,.12)" }}>
                    <MediaBox src={v.cover} alt={v.title} onPlay={() => play(v)} />
                    <Card.Body>
  <Card.Title className="mb-1" style={{ fontSize: "1rem" }}>
    {v.title}
  </Card.Title>
  <Card.Text style={{ fontSize: ".9rem", opacity: .85 }}>
    {v.description}
  </Card.Text>
  <div className="d-flex gap-1 flex-wrap">
    {v.tags?.map(tag => (<Badge key={tag} bg="secondary">{tag}</Badge>))}
  </div>
</Card.Body>

                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
          {videosFiltered.length === 0 && (
            <p className="text-center text-light mt-4" style={{ opacity: .8 }}>Nessun risultato: prova a cambiare tag o ricerca.</p>
          )}
        </Container>
      </section>

      {/* MODAL PLAYER */}
      <AnimatePresence>
        {open && (
          <Modal show onHide={close} centered size="lg" contentClassName="bg-dark text-light" backdropClassName="backdrop-blur">
            <Modal.Header closeButton closeVariant="white"><Modal.Title>{current?.title || "Video"}</Modal.Title></Modal.Header>
            <Modal.Body>
  <div className="position-relative" style={{ paddingBottom: "56.25%" }}>
    {!consent.youtube ? (
      <div style={{
        position:'absolute', inset:0, display:'grid', placeItems:'center',
        background:'linear-gradient(180deg,#0b0b12,#12121a)',
        border:'1px solid rgba(255,255,255,.12)'
      }}>
        <div className="text-center px-3">
          <p className="mb-3" style={{ opacity:.9 }}>
            Per riprodurre il video abilita i cookie di YouTube (terze parti).
          </p>
          <button
            className="btn btn-light"
            onClick={() => savePartial({ youtube: true })}
          >
            Abilita e riproduci
          </button>
        </div>
      </div>
    ) : (
      current && (
        <iframe
          src={`https://www.youtube.com/embed/${current.id}?autoplay=1&rel=0`}
          title={current.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', border:0 }}
        />
    ))}
  </div>
</Modal.Body>

          </Modal>
        )}
      </AnimatePresence>

      {/* Inline helpers */}
      <style>{`
        .backdrop-blur { backdrop-filter: blur(6px); }

        /* === Hero CTA mobile-first === */
        .hero-cta .btn{ min-width:220px; }
        @media (max-width: 576px){
          .hero-cta{ flex-direction:column; padding-inline:16px; }
          .hero-cta .btn{ width:100%; padding:.95rem 1.1rem; font-size:1rem; }
        }

        /* === Play Button — spettacolare e reattivo === */
        .play-btn{
          position:absolute; display:inline-flex; align-items:center; gap:10px;
          padding:10px 16px 10px 12px; border:none; border-radius:999px; cursor:pointer;
          color:#0b0b12; background:linear-gradient(180deg,#ffffff,#eaeaea);
          box-shadow:0 10px 30px rgba(0,0,0,.35), 0 0 0 1px rgba(255,255,255,.45) inset;
          transition:box-shadow .2s ease, transform .2s ease;
        }
        .play-btn .icon{ width:20px; height:20px; }
        .play-btn .label{ font-weight:600; letter-spacing:.2px; color:#111; }
        .play-btn .pulse{ position:absolute; inset:-6px; border-radius:999px;
          background:radial-gradient(60% 60% at 50% 50%, rgba(255,255,255,.55), rgba(255,255,255,0));
          filter:blur(6px); animation:pulse 2.2s ease-in-out infinite; pointer-events:none; }
        .play-btn:focus-visible{ outline:2px solid #fff; outline-offset:3px; }
        .play-btn:hover{ box-shadow:0 14px 40px rgba(0,0,0,.45), 0 0 0 1px rgba(255,255,255,.6) inset; }
        @keyframes pulse{ 0%,100%{opacity:.55; transform:scale(.98)} 50%{opacity:.9; transform:scale(1.02)} }

        /* Mobile: compattiamo il bottone play su schermi piccoli */
        @media (max-width: 576px){
          .play-btn{ padding:12px; gap:0; }
          .play-btn .label{ display:none !important; }
          .play-btn .icon{ width:22px; height:22px; }
        }
      `}</style>
    </main>
  );
}
