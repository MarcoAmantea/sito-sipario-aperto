import { useEffect, useMemo, useRef, useState } from "react";
import { Container, Row, Col, Button, Card, Badge } from "react-bootstrap";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { FiMapPin, FiArrowRight, FiPhone, FiMail, FiCalendar, FiUsers } from "react-icons/fi";

/* =========================================================
   CHI SIAMO — Pagina "spettacolare"
   - Hero cinematico con parallax/orbs
   - Timeline dal 1979
   - Sezione Direzione Artistica
   - La Nostra Casa (Teatro La Locandina) con mappa
   - Valori & Repertorio (commedie/tragedie)
   - Numeri in contatore animato
   - CTA finale
   Dipendenze: react-bootstrap, framer-motion, react-icons
   Nessuna libreria extra.
========================================================= */

function OrbField() {
  return (
    <>
      <div className="orb orb-a" />
      <div className="orb orb-b" />
      <div className="orb orb-c" />
      <style>{`
        .orb{position:absolute;border-radius:9999px;filter:blur(18px);opacity:.25;mix-blend:screen}
        .orb-a{width:340px;height:340px;left:6%;top:18%;background:radial-gradient(circle,#ff5ea8,#8b1cfb);animation:float1 18s ease-in-out infinite}
        .orb-b{width:420px;height:420px;right:6%;top:28%;background:radial-gradient(circle,#39e6ff,#3b82f6);animation:float2 22s ease-in-out infinite}
        .orb-c{width:260px;height:260px;left:16%;bottom:10%;background:radial-gradient(circle,#22c55e,#a3e635);animation:float3 20s ease-in-out infinite}
        @keyframes float1{0%,100%{transform:translate(0,0)}50%{transform:translate(32px,-18px)}}
        @keyframes float2{0%,100%{transform:translate(0,0)}50%{transform:translate(-36px,22px)}}
        @keyframes float3{0%,100%{transform:translate(0,0)}50%{transform:translate(24px,20px)}}
      `}</style>
    </>
  );
}

function KineticTitle({ top, bottom }){
  const lettersTop = top.split("");
  const lettersBottom = bottom.split("");
  return (
    <div className="text-center" style={{ fontFamily:"'Playfair Display', serif" }}>
      <div aria-label={top} className="d-inline-flex flex-wrap justify-content-center gap-1">
        {lettersTop.map((ch, i) => (
          <motion.span key={`t-${i}`} initial={{y:50,opacity:0,rotateX:90}} animate={{y:0,opacity:1,rotateX:0}} transition={{duration:.6,delay:i*.03}} style={{display:'inline-block',fontSize:'clamp(1.6rem,5vw,3.2rem)',lineHeight:1.05}}>{ch===' ' ? '\u00A0' : ch}</motion.span>
        ))}
      </div>
      <div className="mt-1" aria-label={bottom}>
        {lettersBottom.map((ch, i) => (
          <motion.span key={`b-${i}`} initial={{y:40,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:.55,delay:.4+i*.02}} style={{display:'inline-block',fontSize:'clamp(1.4rem,4.2vw,2.6rem)',opacity:.92}}>{ch===' ' ? '\u00A0' : ch}</motion.span>
        ))}
      </div>
    </div>
  )
}

function Stat({ value, label }){
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(()=>{
    const io = new IntersectionObserver(([e])=>{ if(e.isIntersecting){ setSeen(true); io.disconnect(); } });
    if(ref.current) io.observe(ref.current);
    return () => io.disconnect();
  },[]);
  const [n, setN] = useState(0);
  useEffect(()=>{
    if(!seen) return;
    const end = value; const duration = 1400; const t0 = performance.now();
    const tick = (t)=>{ const p = Math.min(1,(t-t0)/duration); setN(Math.floor(end*p)); if(p<1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  },[seen,value]);
  return (
    <div ref={ref} className="text-center">
      <div style={{fontSize:'clamp(1.6rem,4vw,2.6rem)',fontWeight:800}}>{n.toLocaleString('it-IT')}</div>
      <div style={{opacity:.85}}>{label}</div>
    </div>
  );
}

export default function About(){
  const milestones = useMemo(()=>[
    { year: 1979, title: 'Nasce la compagnia', txt: 'A Pagani prende vita un gruppo di artisti che sceglie il cuore napoletano come bussola.' },
    { year: 1984, title: 'Le prime tournée', txt: 'Si cresce tra teatri della Campania e rassegne popolari.' },
    { year: 1997, title: 'La nostra casa', txt: 'Il Teatro La Locandina diventa il nostro rifugio creativo.' },
    { year: 2008, title: 'Nuove generazioni', txt: 'Laboratori e formazione per giovani attori e tecnici.' },
    { year: 2019, title: 'Quarant’anni di scena', txt: 'Una festa lunga una stagione per celebrare il pubblico.' },
    { year: 2025, title: 'Oggi', txt: 'Commedie napoletane e una tragedia all’anno: tradizione che emoziona.' },
  ],[]);

  return (
    <main style={{background:'linear-gradient(180deg,#000,#0b0b12)'}}>
      {/* HERO */}
      <section className="position-relative" style={{minHeight:'86vh',color:'#fff',overflow:'hidden',paddingTop:72}}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
<img src="/hero-img.png" alt="Sipario Aperto" className="w-100 h-100" style={{ objectFit: "cover", opacity: 3.65 }} onError={(e)=>e.currentTarget.src = "https://picsum.photos/1920/1080?blur=2"} />
<div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,.65), rgba(0,0,0,.82))" }} />
</div>
        <Container style={{position:'relative',zIndex:2}} className="d-flex align-items-center min-vh-75">
          <div className="w-100 text-center">
            <KineticTitle top="Gruppo Teatrale" bottom="Sipario Aperto"/>
            <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.25}} className="mx-auto mt-3" style={{maxWidth:860,opacity:.95,fontSize:'clamp(1rem,2.2vw,1.15rem)'}}>
              Dal <strong>1979</strong> portiamo in scena a Pagani (SA) storie che fanno ridere, commuovere e pensare. La nostra casa è il <strong>Teatro La Locandina</strong>, in <strong>Via Tommaso Cauciello 31</strong>.
            </motion.p>
            <div className="d-grid gap-2 d-sm-flex justify-content-center mt-3">
              <a href="#repertorio" className="btn btn-light">Il nostro repertorio</a>
              <a href="#direzione" className="btn btn-outline-light">Direzione artistica</a>
              <a href="#sede" className="btn btn-outline-light d-inline-flex align-items-center gap-2"><FiMapPin/> Dove siamo</a>
            </div>
          </div>
        </Container>
      </section>

      {/* TIMELINE */}
      <section className="py-5" style={{background:'linear-gradient(180deg,#0b0b12,#0f0f22)'}}>
        <Container>
          <h2 className="text-light text-center mb-4" style={{fontFamily:"'Playfair Display', serif",fontSize:'clamp(1.6rem,2.6vw,2.2rem)'}}>La nostra storia</h2>
          <Row className="g-4 justify-content-center">
            {milestones.map((m, i)=> (
              <Col md={6} lg={4} key={i}>
                <motion.div initial={{opacity:0, y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true, amount:.4}} transition={{duration:.5, delay:i*.05}}>
                  <Card style={{background:'rgba(255,255,255,.05)',color:'#fff',border:'1px solid rgba(255,255,255,.12)'}} className="h-100 shadow-sm">
                    <Card.Body>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <Badge bg="light" text="dark" style={{fontWeight:800}}>{m.year}</Badge>
                        <FiCalendar/>
                      </div>
                      <Card.Title>{m.title}</Card.Title>
                      <Card.Text style={{opacity:.95}}>{m.txt}</Card.Text>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* REPERTORIO / VALORI */}
      <section id="repertorio" className="py-5" style={{background:'linear-gradient(180deg,#0f0f22,#0b0b12)'}}>
        <Container>
          <Row className="align-items-center g-4">
            <Col lg={6}>
              <h2 className="text-light mb-3" style={{fontFamily:"'Playfair Display', serif"}}>Commedie e tragedie, dal cuore di Napoli</h2>
              <p className="text-light" style={{opacity:.9}}>
                La nostra identità nasce dalla <em>commedia napoletana</em>: ritmo, ironia, linguaggio vivo. Una volta all’anno scegliamo una <strong>tragedia</strong> per esplorare l’intensità della parola, con regie essenziali e una cura artigianale di scenografie e luci.
              </p>
              <ul className="text-light" style={{opacity:.95}}>
                <li>Tradizione partenopea, accenti contemporanei</li>
                <li>Accessibilità e prossimità al pubblico</li>
                <li>Laboratori e formazione sul territorio</li>
              </ul>
              <div className="d-flex gap-2 mt-3">
                <a href="/calendario" className="btn btn-light">Vedi programmazione</a>
                <a href="/contatti" className="btn btn-outline-light">Collabora con noi</a>
              </div>
            </Col>
            <Col lg={6}>
              <div className="ratio ratio-16x9 rounded-4 overflow-hidden shadow" style={{border:'1px solid rgba(255,255,255,.12)'}}>
                <img src="/chi.jpg" alt="Compagnia in scena" className="w-100 h-100" style={{objectFit:'cover'}} onError={e=>e.currentTarget.src='https://picsum.photos/1280/720?blur=2'} />
              </div>
            </Col>
          </Row>
          <Row className="mt-4 text-light g-4">
            <Col md={4}><Stat value={1979} label={"Anno di fondazione"}/></Col>
            <Col md={4}><Stat value={45} label={"Anni di palcoscenico"}/></Col>
            <Col md={4}><Stat value={1000} label={"Spettatori ogni stagione (circa)"}/></Col>
          </Row>
        </Container>
      </section>

      {/* DIREZIONE ARTISTICA */}
      <section id="direzione" className="py-5" style={{background:'linear-gradient(180deg,#0b0b12,#0f0f22)'}}>
        <Container>
          <Row className="align-items-center g-4">
            <Col lg={5}>
              <div className="ratio ratio-3x4 rounded-4 overflow-hidden shadow" style={{border:'1px solid rgba(255,255,255,.12)'}}>
                <img src="/direttore.jpg" alt="Carmine De Pascale" className="w-100 h-100" style={{objectFit:'cover'}} onError={e=>e.currentTarget.src='https://picsum.photos/600/800?grayscale'} />
              </div>
            </Col>
            <Col lg={7} className="text-light">
              <h2 className="mb-2" style={{fontFamily:"'Playfair Display', serif"}}>Direzione artistica</h2>
              <h3 className="mb-2">Carmine De Pascale</h3>
              <p style={{opacity:.9}}>
                Regista e attore, guida la compagnia con una visione che fonde tradizione e ricerca. Sotto la sua direzione, Sipario Aperto porta in scena testi classici e scritture contemporanee, con una predilezione per il ritmo partenopeo e la centralità degli attori.
              </p>
              <div className="d-flex flex-wrap gap-2">
                <Badge bg="light" text="dark">Regia</Badge>
                <Badge bg="light" text="dark">Formazione</Badge>
                <Badge bg="light" text="dark">Tradizione Napoletana</Badge>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* SEDE */}
      <section id="sede" className="py-5" style={{background:'linear-gradient(180deg,#0f0f22,#0b0b12)'}}>
        <Container>
          <Row className="align-items-center g-4">
            <Col lg={6} className="text-light">
              <h2 className="mb-2" style={{fontFamily:"'Playfair Display', serif"}}>La nostra casa</h2>
              <p style={{opacity:.9}}>
                Siamo a Pagani (SA), in <strong>Via Tommaso Cauciello 31</strong>, presso il <strong>Teatro La Locandina</strong>.
              </p>
              <div className="d-flex align-items-center gap-2 mb-2"><FiMapPin/> <a className="text-decoration-none" style={{color:'#fff'}} href="https://maps.google.com/?q=Via+Tommaso+Cauciello+31,+Pagani+SA" target="_blank" rel="noreferrer">Apri su Google Maps</a></div>
              <div className="d-flex align-items-center gap-2 mb-2"><FiPhone/> <span>+39 000 000 000</span></div>
              <div className="d-flex align-items-center gap-2"><FiMail/> <a className="text-decoration-none" style={{color:'#fff'}} href="mailto:info@siparioaperto.it">info@siparioaperto.it</a></div>
            </Col>
            <Col lg={6}>
              <div className="ratio ratio-16x9 rounded-4 overflow-hidden shadow" style={{border:'1px solid rgba(255,255,255,.12)'}}>
                <iframe title="Mappa Teatro La Locandina" src="https://www.google.com/maps?q=Via%20Tommaso%20Cauciello%2031%20Pagani&output=embed" allowFullScreen style={{border:0}} />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA FINALE */}
      <section className="py-5" style={{background:'linear-gradient(180deg,#0b0b12,#000)'}}>
        <Container className="text-center text-light">
          <h2 className="mb-3" style={{fontFamily:"'Playfair Display', serif"}}>Vieni a teatro con noi</h2>
          <p className="mx-auto" style={{maxWidth:760,opacity:.9}}>Che sia una risata in compagnia o la catarsi di una tragedia, il teatro è un’esperienza viva. Ti aspettiamo a La Locandina.</p>
          <div className="d-grid gap-2 d-sm-flex justify-content-center mt-2">
            <a href="/calendario" className="btn btn-light">Programmazione</a>
            <a href="/contatti" className="btn btn-outline-light">Contattaci</a>
          </div>
        </Container>
      </section>

      <style>{`
        html, body { overflow-x: hidden; }
        .ratio-3x4{position:relative;width:100%}
        .ratio-3x4::before{content:'';display:block;padding-bottom:133.333%}
        .ratio-3x4>*{position:absolute;inset:0}
      `}</style>
    </main>
  );
}