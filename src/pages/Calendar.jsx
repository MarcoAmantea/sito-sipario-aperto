import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { FiCalendar, FiMapPin, FiClock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const pub = (p) => {
  const base = (import.meta?.env?.BASE_URL || "/").replace(/\/+$/, "/");
  const rel = String(p || "").replace(/^\/+/, "");
  return base + rel;
};

export default function Programmazione(){
  const location = {
    short: "Teatro La Locandina",
    full: "Teatro La Locandina – Via Tommaso Cauciello 18, Pagani (SA)"
  };

  const navigate = useNavigate();
  const goToContatti = () => {
    navigate('/contatti');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

 // === DATA ===
  const nostri = [
    {
      key: "voci-di-dentro",
      titolo: "Le voci di dentro",
      periodo: "Ottobre 2025",
      repliche: [
        "3, 4, 5, 11, 12, 17, 18, 19 Ottobre",
        "Venerdì e Sabato ore 21.00",
        "Domenica ore 18.30",
      ],
      cover: "/dentro.jpg",
      ribbon: "In scena a Ottobre",
    },

    {
      key: "medico-dei-pazzi",
      titolo: "Il medico dei pazzi",
      periodo: "Dicembre 2025",
      repliche: [
        "5, 6, 7, 13, 14, 19, 20, 21, 25, 26, 27, 28 Dicembre",
        "Venerdì e Sabato ore 21.00",
        "Domenica ore 18.30",
        "27 Dicembre in scena all'Auditorium Sant'Alfonso Maria De' Liguori",
      ],
      cover: "covers/pazzi.jpeg",
      ribbon: "In scena a Dicembre",
    },
    {
      key: "romeo-giulietta",
      titolo: "Romeo e Giulietta",
      periodo: "Febbraio 2026",
      repliche: [
        "1, 7, 8, 13, 14, 15, 21, 22, 27, 28 Febbraio",
        "Venerdì e Sabato ore 21.00",
        "Domenica ore 18.30",
      ],
      cover: "romeo.jpg",
      ribbon: "In scena a Febbraio",
    },
  ];

  const ospiti = [
    {
      key: "popcord",
      titolo: "Popcord",
      data: "26 Ottobre 2025",
      descr: "Spettacolo musicale di Luca Petrosino",
      cover: "/luca.jpeg",
    },
    {
      key: "scannasurece",
      titolo: "Scannasurece",
      data: "25 Ottobre 2025",
      descr: "di Enzo Moscato, regia di Carlo Cerciello, con Imma Villa",
      cover: "/scanna.jpg",
    },
    {
      key: "grisaglia-blu",
      titolo: "Grisaglia Blu",
      data: "31 Ottobre 2025",
      descr: "di Sergio Velitti, regia di Nello Pepe, con Maria Pia Iannuzzi",
      cover: "/grisaglia.jpg",
    },
  ];
  return (
    <main style={{ background: "linear-gradient(180deg,#000,#0b0b12)" }}>
      {/* HERO */}
      <section className="position-relative" style={{ minHeight: "58vh", overflow: "hidden", paddingTop: 72 }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src={pub("programmazione.png")} alt="Programmazione teatrale"
               className="w-100 h-100" style={{ objectFit: "cover", opacity: .55 }}
               onError={(e)=>e.currentTarget.src = "https://picsum.photos/1600/900?blur=2"} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(140% 80% at 50% 20%, rgba(255,255,255,.10), rgba(0,0,0,.88))" }} />
        </div>
        <Container className="h-100 d-flex flex-column justify-content-center text-center" style={{ position: "relative", zIndex: 2 }}>
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .8 }}
            style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5vw,3.2rem)", color: "#fff" }}>
            Programmazione Teatrale
          </motion.h1>
          <motion.p initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .1, duration: .8 }}
            style={{ color: "#fff", opacity: .92, maxWidth: 900, margin: "0 auto" }}>
            Tutti gli spettacoli si tengono al <strong>{location.short}</strong>. Prenota, scopri i dettagli e vivi la stagione.
          </motion.p>
        </Container>
      </section>

      {/* PRODUZIONI — CARDS CON IMMAGINI ALLINEATE */}
      <section className="py-5" style={{ background: "linear-gradient(180deg,#0b0b12,#0f0f22)" }}>
        <Container>
          <h2 className="text-light text-center mb-4" style={{ fontFamily: "'Playfair Display',serif" }}>Produzioni Sipario Aperto 2025 / 2026</h2>
          <Row className="g-4">
            {nostri.map((s, i) => (
              <Col md={6} lg={4} key={s.key}>
                <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .4 }} transition={{ duration: .5, delay: i * .05 }}>
                  <article className="card-neo h-100">
                    <div className="img-wrap">
                      <img src={pub(s.cover)} alt={s.titolo}
                           onError={(e)=>e.currentTarget.src = `https://picsum.photos/seed/${encodeURIComponent(s.titolo)}/960/540`}/>
                      {s.ribbon && <span className="ribbon">{s.ribbon}</span>}
                    </div>
                    <div className="card-body-neo d-flex flex-column">
                      <h4 className="title">{s.titolo}</h4>
                      <div className="mb-2 d-flex align-items-center gap-2 text-light-50"><FiCalendar/> <Badge bg="light" text="dark">{s.periodo}</Badge></div>
                      <ul className="bullets">
                        {s.repliche.map((r, idx) => <li key={idx}>{r}</li>)}
                      </ul>
                      <div className="mt-auto d-flex align-items-center gap-2 place"><FiMapPin/> {location.full}</div>
                      <div className="mt-3 d-flex gap-2">
                        <Button onClick={goToContatti} size="sm" variant="light">Prenota</Button>
                      </div>
                    </div>
                  </article>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* OSPITI — CARD MATCHING, IMMAGINI ALLINEATE */}
      <section className="py-5" style={{ background: "linear-gradient(180deg,#0f0f22,#0b0b12)" }}>
        <Container>
          <h2 className="text-light text-center mb-4" style={{ fontFamily: "'Playfair Display',serif" }}>Ospiti della rassegna</h2>
          <Row className="g-4">
            {ospiti.map((e, i) => (
              <Col md={6} lg={4} key={e.key}>
                <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .4 }} transition={{ duration: .5, delay: i * .05 }}>
                  <article className="card-neo h-100">
                    <div className="img-wrap">
                      <img src={pub(e.cover)} alt={e.titolo}
                           onError={(ev)=>ev.currentTarget.src = `https://picsum.photos/seed/${encodeURIComponent(e.titolo)}/960/540`}/>
                      <span className="ribbon">Ospite</span>
                    </div>
                    <div className="card-body-neo d-flex flex-column">
                      <h4 className="title">{e.titolo}</h4>
                      <div className="mb-2 d-flex align-items-center gap-2 text-light-50">
                        <FiClock/> {e.data}
                      </div>
                      <p className="flex-grow-1" style={{ opacity: .92 }}>{e.descr}</p>
                      <div className="mt-auto d-flex align-items-center gap-2 place"><FiMapPin/> {location.full}</div>
                      <div className="mt-3 d-flex gap-2">
                        <Button onClick={goToContatti} size="sm" variant="light">Prenota</Button>
                      </div>
                    </div>
                  </article>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <style>{`
        .card-neo{ position:relative; background:rgba(255,255,255,.05); color:#fff; border:1px solid rgba(255,255,255,.12); border-radius:22px; overflow:hidden; box-shadow:0 12px 40px rgba(0,0,0,.35); transition:transform .35s ease, box-shadow .35s ease; }
        .card-neo:hover{ transform:translateY(-6px); box-shadow:0 16px 60px rgba(0,0,0,.5); }
        .img-wrap{ position:relative; aspect-ratio:16/9; overflow:hidden; background:transparent !important; }
        .img-wrap img{ display:block; width:100%; height:100%; object-fit:cover; object-position:center; transition: transform .6s ease; filter:saturate(1.05) contrast(1.03); background:transparent !important; }
        .card-neo:hover .img-wrap img{ transform:scale(1.06); }
        .ribbon{ position:absolute; top:14px; left:14px; background:rgba(255,255,255,.95); color:#000; font-weight:700; font-size:.8rem; padding:.35rem .6rem; border-radius:999px; box-shadow:0 6px 18px rgba(0,0,0,.25); }
        .card-body-neo{ padding:1rem 1rem 1.2rem; }
        .card-body-neo .title{ font-family:'Playfair Display',serif; font-size:clamp(1.1rem,1.8vw,1.35rem); margin: .25rem 0 .35rem; }
        .bullets{ margin:0 0 .25rem; padding-left:1.05rem; opacity:.95; min-height:84px; }
        .place{ opacity:.92; }
        .text-light-50{ color: rgba(255,255,255,.75) !important; }
        .card-neo .btn{ border-radius:999px; padding:.4rem .9rem; }
        .card-neo .btn-outline-light{ border-color:rgba(255,255,255,.55); }
        @media (max-width: 576px){
          .card-body-neo{ padding: .9rem; }
          .bullets{ min-height:0; }
        }
      `}</style>
    </main>
  );
}
