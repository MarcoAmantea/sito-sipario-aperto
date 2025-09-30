import { useEffect, useMemo, useRef, useState } from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { motion } from "framer-motion";
import { FiMapPin, FiCalendar } from "react-icons/fi";

function Stat({ value, label }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  const [n, setN] = useState(0);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setSeen(true);
        io.disconnect();
      }
    });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!seen) return;
    const end = value;
    const duration = 1400;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      setN(Math.floor(end * p));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [seen, value]);
  return (
    <div ref={ref} className="text-center">
      <div style={{ fontSize: "clamp(1.6rem,4vw,2.6rem)", fontWeight: 800 }}>
        {n.toLocaleString("it-IT")}
      </div>
      <div style={{ opacity: 0.85 }}>{label}</div>
    </div>
  );
}

export default function About() {
  const milestones = useMemo(
    () => [
      {
        year: 1979,
        title: "Nasce la compagnia",
        txt: "A Pagani prende vita un gruppo di artisti che sceglie il cuore napoletano come bussola.",
      },
      {
        year: 1984,
        title: "Le prime tournée",
        txt: "Si cresce tra teatri della Campania e rassegne popolari.",
      },
      {
        year: 1997,
        title: "La nostra casa",
        txt: "Il Teatro La Locandina diventa il nostro rifugio creativo.",
      },
      {
        year: 2008,
        title: "Nuove generazioni",
        txt: "Laboratori e formazione per giovani attori e tecnici.",
      },
      {
        year: 2019,
        title: "Quarant’anni di scena",
        txt: "Una festa lunga una stagione per celebrare il pubblico.",
      },
      {
        year: 2025,
        title: "Oggi",
        txt: "Commedie napoletane e una tragedia all’anno: tradizione che emoziona.",
      },
    ],
    []
  );
const [showAll, setShowAll] = useState(false);

  const members = useMemo(
    () => [
      {
        name: "Carmine De Pascale",
        role: "Direttore Artistico",
        img: "/membri/direttore.jpg",
      },
      {
        name: "Valeria De Pascale",
        role: "Attrice",
        img: "/membri/valeria.png",
      },
      {
        name: "Alessandro De Pascale",
        role: "Regista / Attore",
        img: "/membri/alessandro.jpg",
      },
      {
        name: "Maria Rosaria Argentino",
        role: "Attrice",
        img: "/membri/rosaria.png",
      },
      {
        name: "Cristina De Pascale",
        role: "Attrice",
        img: "/membri/cristina.png",
      },
      
      {
        name: "Marco Amantea",
        role: "Attore / Creatore Sito",
        img: "/membri/marco.png",
      },
      { name: "Luigi Fortino", role: "Attore / Regista", img: "/membri/luigi.png" },
      {
        name: "Giuseppe Delfino",
        role: "Attore",
        img: "/membri/peppe.png",
      },
      { name: "Rosa Amodio", role: "Attrice / Grafica", img: "/membri/rosa.png" },
     
      { name: "Monica Civale", role: "Attrice / Costumista", img: "/membri/monica.png" },
      {
        name: "Pinetto Giordano",
        role: "Collaboratore / Factotum",
        img: "/membri/pinetto.png",
      },
      {
        name: "Elisabetta Pisciotta",
        role: "Attrice",
        img: "/membri/elisabetta.jpg",
      },
            { name: "Enzo Crudele", role: "Attore", img: "/membri/enzo.png" },

      {
        name: "Gianmarco Volpicelli",
        role: "Attore",
        img: "/membri/jimmy.jpg",
      },
 {
        name: "Rosalba Canfora",
        role: "Attrice",
        img: "/membri/rosalba.jpg",
      },
      {
        name: "Fabrizio Manfredonia",
        role: "Regista",
        img: "/membri/fabrizio.jpg",
      },
    ],
    []
  );

  const smoothTo = (id) => (e) => {
    e.preventDefault();
    const el = document.querySelector(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main style={{ background: "linear-gradient(180deg,#000,#0b0b12)" }}>
      {/* HERO */}
      <section
        className="position-relative"
        style={{
          minHeight: "58vh",
          color: "#fff",
          overflow: "hidden",
          paddingTop: 72,
        }}
      >
        <div style={{ position: "absolute", inset: 0 }}>
          <img
            src="/hero-img.png"
            alt="Sipario Aperto"
            className="w-100 h-100"
            style={{ objectFit: "cover", opacity: 0.55 }}
            onError={(e) =>
              (e.currentTarget.src = "https://picsum.photos/1920/1080?blur=2")
            }
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(140% 80% at 50% 20%, rgba(255,255,255,.08), rgba(0,0,0,.85))",
            }}
          />
        </div>
        <Container
          className="h-100 d-flex flex-column justify-content-center text-center"
          style={{ position: "relative", zIndex: 2 }}
        >
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(2rem,5vw,3rem)",
              color: "#fff",
            }}
          >
            Gruppo Teatrale Sipario Aperto
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            style={{
              color: "#fff",
              opacity: 0.9,
              maxWidth: 840,
              margin: "0 auto",
            }}
          >
            Dal <strong>1979</strong> portiamo in scena a Pagani (SA) storie che
            fanno ridere, commuovere e pensare. La nostra casa è il{" "}
            <strong>Teatro La Locandina</strong>, in{" "}
            <strong>Via Tommaso Cauciello 18</strong>.
          </motion.p>
          <div className="d-grid gap-2 d-sm-flex justify-content-center mt-3">
            <button onClick={smoothTo("#repertorio")} className="btn btn-light btn-lg">
              Il nostro repertorio
            </button>
            <button
              onClick={smoothTo("#direzione")}
              className="btn btn-outline-light btn-lg"
            >
              Direzione artistica
            </button>
            <button
              onClick={smoothTo("#compagnia")}
              className="btn btn-outline-light btn-lg"
            >
              La compagnia
            </button>
          </div>
        </Container>
      </section>

      {/* TIMELINE */}
      <section
        className="py-5"
        style={{ background: "linear-gradient(180deg,#0b0b12,#0f0f22)" }}
      >
        <Container>
          <h2
            className="text-light text-center mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.6rem,2.6vw,2.2rem)",
            }}
          >
            La nostra storia
          </h2>
          <Row className="g-4 justify-content-center">
            {milestones.map((m, i) => (
              <Col md={6} lg={4} key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <Card
                    style={{
                      background: "rgba(255,255,255,.05)",
                      color: "#fff",
                      border: "1px solid rgba(255,255,255,.12)",
                    }}
                    className="h-100 shadow-sm"
                  >
                    <Card.Body>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <Badge
                          bg="light"
                          text="dark"
                          style={{ fontWeight: 800 }}
                        >
                          {m.year}
                        </Badge>
                        <FiCalendar />
                      </div>
                      <Card.Title>{m.title}</Card.Title>
                      <Card.Text style={{ opacity: 0.95 }}>{m.txt}</Card.Text>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* REPERTORIO */}
      <section
        id="repertorio"
        className="py-5 anchor"
        style={{ background: "linear-gradient(180deg,#0f0f22,#0b0b12)" }}
      >
        <Container>
          <Row className="align-items-center g-4">
            <Col lg={6}>
              <h2
                className="text-light mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Commedie e tragedie, dal cuore di Napoli
              </h2>
              <p className="text-light" style={{ opacity: 0.9 }}>
                La nostra identità nasce dalla <em>commedia napoletana</em>:
                ritmo, ironia, linguaggio vivo. Una volta all’anno scegliamo una{" "}
                <strong>tragedia</strong> per esplorare l’intensità della
                parola, con regie essenziali e una cura artigianale di
                scenografie e luci.
              </p>
            </Col>
            <Col lg={6}>
              <div
                className="ratio ratio-16x9 rounded-4 overflow-hidden shadow"
                style={{ border: "1px solid rgba(255,255,255,.12)" }}
              >
                <img
                  src="/chi.jpg"
                  alt="Compagnia in scena"
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://picsum.photos/1280/720?blur=2")
                  }
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* COMPAGNIA */}
<section
  id="compagnia"
  className="py-5"
  style={{ background: "linear-gradient(180deg,#0b0b12,#0f0f22)" }}
>
  <Container>
    <h2
      className="text-light text-center mb-5"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      La nostra compagnia
    </h2>

    <Row className="g-4 justify-content-center">
      {(showAll ? members : members.slice(0, 7)).map((m, i) => (
        <Col sm={6} md={4} lg={3} key={i}>
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <div
              className="member-card text-center p-3 rounded-4 shadow"
              style={{
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.1)",
              }}
            >
              <div
                className="member-photo mx-auto mb-3 rounded-circle overflow-hidden shadow"
                style={{ width: 140, height: 140 }}
              >
                <img
                  src={m.img}
                  alt={m.name}
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                  onError={(e) =>
                    (e.currentTarget.src = `https://picsum.photos/seed/${encodeURIComponent(m.name)}/200/200`)
                  }
                />
              </div>
              <h5
                className="text-light mb-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {m.name}
              </h5>
              <p className="text-light mb-0" style={{ opacity: 0.85 }}>
                {m.role}
              </p>
            </div>
          </motion.div>
        </Col>
      ))}
    </Row>

    {/* Pulsante Mostra altri */}
    <div className="text-center mt-4">
      {!showAll && (
        <motion.button
          onClick={() => setShowAll(true)}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-light btn-lg px-4 position-relative"
          style={{
            borderRadius: 999,
            boxShadow: '0 0 0 1px #fff inset, 0 0 25px rgba(255,255,255,.35)',
            background:
              'linear-gradient(135deg, rgba(255,255,255,.15), rgba(255,255,255,.05))',
            backdropFilter: 'blur(6px)',
            color: '#fff',
          }}
        >
          Mostra altri
          <span
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{
              borderRadius: 999,
              boxShadow: '0 0 30px rgba(255,255,255,.25) inset',
              pointerEvents: 'none'
            }}
          />
        </motion.button>
      )}
    </div>
  </Container>
</section>


      {/* DIREZIONE ARTISTICA */}
      <section
        id="direzione"
        className="py-5 anchor"
        style={{ background: "linear-gradient(180deg,#0b0b12,#0f0f22)" }}
      >
        <Container>
          <Row className="align-items-center g-4">
            <Col lg={5}>
              <div
                className="portrait-wrap rounded-4 overflow-hidden shadow"
                style={{ border: "1px solid rgba(255,255,255,.12)" }}
              >
                <img
                  src="/direttore.jpg"
                  alt="Carmine De Pascale"
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://picsum.photos/600/800?grayscale")
                  }
                />
              </div>
            </Col>
            <Col lg={7} className="text-light">
              <h2
                className="mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Direzione artistica
              </h2>
              <h3 className="mb-2">Carmine De Pascale</h3>
              <p style={{ opacity: 0.9 }}>
                Regista e attore, guida la compagnia con una visione che fonde
                tradizione e ricerca. Sotto la sua direzione, Sipario Aperto
                porta in scena testi classici e scritture contemporanee, con una
                predilezione per il ritmo partenopeo e la centralità degli
                attori.
              </p>
              <div className="d-flex flex-wrap gap-2">
                <Badge bg="light" text="dark">
                  Regia
                </Badge>
                <Badge bg="light" text="dark">
                  Formazione
                </Badge>
                <Badge bg="light" text="dark">
                  Tradizione Napoletana
                </Badge>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* SEDE */}
      <section
        id="sede"
        className="py-5 anchor"
        style={{ background: "linear-gradient(180deg,#0f0f22,#0b0b12)" }}
      >
        <Container>
          <Row className="align-items-center g-4">
            <Col lg={6} className="text-light">
              <h2
                className="mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                La nostra casa
              </h2>
              <p style={{ opacity: 0.9 }}>
                Siamo a Pagani (SA), in{" "}
                <strong>Via Tommaso Cauciello 18</strong>, presso il{" "}
                <strong>Teatro La Locandina</strong>.
              </p>
              <div className="d-flex align-items-center gap-2 mb-2">
                <FiMapPin />{" "}
                <a
                  className="text-decoration-none"
                  style={{ color: "#fff" }}
                  href="https://maps.google.com/?q=Via+Tommaso+Cauciello+18,+Pagani+SA"
                  target="_blank"
                  rel="noreferrer"
                >
                  Apri su Google Maps
                </a>
              </div>
            </Col>
            <Col lg={6}>
              <div
                className="ratio ratio-16x9 rounded-4 overflow-hidden shadow"
                style={{ border: "1px solid rgba(255,255,255,.12)" }}
              >
                <iframe
                  title="Mappa Teatro La Locandina"
                  src="https://www.google.com/maps?q=Via%20Tommaso%20Cauciello%2018%20Pagani&output=embed"
                  allowFullScreen
                  style={{ border: 0 }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <style>{`
        .anchor { scroll-margin-top: 84px; }
        .portrait-wrap{ position:relative; width:100%; aspect-ratio:3/4; background:transparent; }
        .portrait-wrap img{ display:block; width:100%; height:100%; object-fit:cover; }
        .member-card:hover { transform: translateY(-6px) scale(1.03); transition: transform .3s ease; }
        .member-photo img { transition: transform .6s ease; }
        .member-photo:hover img { transform: scale(1.1) rotate(2deg); }
      `}</style>
    </main>
  );
}
