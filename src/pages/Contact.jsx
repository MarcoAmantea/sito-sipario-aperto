import { useState, useMemo } from "react";
import { Container, Row, Col, Card, Button, Form, Alert, Badge } from "react-bootstrap";
import { motion } from "framer-motion";
import { FiPhone, FiMail, FiMapPin, FiSend, FiUser, FiMessageCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

/* =========================================================
   CONTATTI — Pagina premium e dinamica
   - Hero immagine con call-to-action
   - Card contatti con avatar circolare + glow
   - Scheda sede con mappa e link direzione
   - Form contatto con validazioni (front-end) e integrazione FormSubmit
     => Sostituisci CONTACT_EMAIL con la tua mail per invii reali
   Dipendenze: react-bootstrap, framer-motion, react-icons
========================================================= */

const pub = (p) => {
  const base = (import.meta?.env?.BASE_URL || "/").replace(/\/+$/, "/");
  const rel = String(p || "").replace(/^\/+/, "");
  return base + rel;
};

const CONTACT_EMAIL = "marcoamantea18@gmail.com"; // 👈 Sostituisci con la tua email (FormSubmit)

export default function Contacts(){
  const navigate = useNavigate();

  const people = useMemo(() => ([
    { name: "Carmine De Pascale", role: "Direttore artistico", phone: "+39 338 300 9575", photo: "people/direttore.jpg" },
    { name: "Valeria De Pascale", role: "Attrice, Organizzazione", phone: "+39 349 691 8030", photo: "people/valeria.png" },
    { name: "Alessandro De Pascale", role: "Regista, Attore", phone: "+39 345 816 9825", photo: "people/alessandro.jpg" },
    { name: "Maria Rosaria Argentino", role: "Attrice, Organizzazione", phone: "+39 333 239 7228", photo: "people/rosaria.png" },
    { name: "Marco Amantea", role: "Attore, Web & Digital", phone: "+39 340 706 6819", photo: "people/marco.png" },
  ]), []);

  const [validated, setValidated] = useState(false);
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();                          // niente reload
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setSending(true);
    try {
      const data = new FormData(form);
      // Opzioni FormSubmit (spostate qui al posto degli <input type="hidden">)
      data.append("_captcha", "false");
      data.append("_subject", "Nuovo messaggio dal sito Sipario Aperto");
      data.append("_template", "table");

      const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("Invio fallito");

      form.reset();
      setValidated(false);
      setOk(true);

      // Redirect SPA: niente giro esterno → musica/sipario restano
      navigate("/grazie", { replace: true, state: { from: "contact" } });
    } catch (err) {
      alert("Si è verificato un errore durante l’invio. Riprova più tardi.");
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <main style={{ background: "linear-gradient(180deg,#000,#0b0b12)" }}>
      {/* HERO */}
      <section className="position-relative" style={{ minHeight: "58vh", overflow: "hidden", paddingTop: 72 }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img src={pub("contatti.png")} alt="Contatti Sipario Aperto" className="w-100 h-100" style={{ objectFit: "cover", opacity: .58 }} onError={(e)=>e.currentTarget.src = "https://picsum.photos/1600/900?blur=2"} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(140% 80% at 50% 20%, rgba(255,255,255,.08), rgba(0,0,0,.86))" }} />
        </div>
        <Container style={{ position: "relative", zIndex: 2 }} className="h-100 d-flex align-items-center text-center">
          <div className="w-100">
            <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .8 }} style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,5vw,3rem)", color: "#fff" }}>Contattaci</motion.h1>
            <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .1, duration: .8 }} className="mx-auto" style={{ maxWidth: 860, color: "#fff", opacity: .9 }}>
              La pagina più importante: info, prenotazioni, collaborazioni. Scrivici o contatta direttamente il referente.
            </motion.p>
            <div className="d-flex justify-content-center gap-2 mt-3 hero-cta">
              <Button size="lg" variant="light" href="#form">Scrivici ora</Button>
              <Button size="lg" variant="outline-light" href="#team">Contatti diretti</Button>
            </div>
          </div>
        </Container>
      </section>

      {/* TEAM CARDS */}
      <section id="team" className="py-5" style={{ background: "linear-gradient(180deg,#0b0b12,#0f0f22)" }}>
        <Container>
          <h2 className="text-light text-center mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem,2.6vw,2.2rem)" }}>Contatti diretti</h2>
          <Row className="g-4 justify-content-center">
            {people.map((p, i) => (
              <Col key={i} xs={12} sm={6} md={4} lg={3} className="d-flex">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.45, delay: i * 0.04 }}
                  className="flex-fill"
                >
                  <Card className="h-100 shadow-sm" style={{ background: "rgba(255,255,255,.05)", color: "#fff", border: "1px solid rgba(255,255,255,.12)" }}>
                    <div className="p-4 d-flex flex-column align-items-center text-center">
                      <div className="avatar-wrap mb-3">
                        <img src={pub(p.photo)} alt={p.name} onError={(e)=>e.currentTarget.src = "https://picsum.photos/seed/"+encodeURIComponent(p.name)+"/320/320"} />
                        <span className="ring" />
                      </div>
                      <h5 className="mb-1" style={{ fontWeight: 700 }}>{p.name}</h5>
                      <div className="mb-2"><Badge bg="light" text="dark">{p.role}</Badge></div>
                      <div className="d-flex gap-2">
                        <Button as="a" size="sm" variant="light" href={`tel:${p.phone.replace(/\s+/g, '')}`} className="d-inline-flex align-items-center gap-2"><FiPhone/> Chiama</Button>
                        <Button as="a" size="sm" variant="outline-light" href={`https://wa.me/${p.phone.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="d-inline-flex align-items-center gap-2"><FiMessageCircle/> WhatsApp</Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* SEDE + MAPPA */}
      <section className="py-5" style={{ background: "linear-gradient(180deg,#0f0f22,#0b0b12)" }}>
        <Container>
          <Row className="g-4 align-items-stretch">
            <Col lg={6}>
              <Card style={{ background: "rgba(255,255,255,.05)", color: "#fff", border: "1px solid rgba(255,255,255,.12)" }} className="h-100">
                <Card.Body>
                  <h4 className="mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>La nostra sede</h4>
                  <p style={{ opacity: .9 }}>Via Tommaso Cauciello 18 — Teatro La Locandina, 84016 Pagani (SA)</p>
                  <div className="d-flex align-items-center gap-2 mb-1"><FiMapPin/> <a className="text-decoration-none" style={{ color: '#fff' }} href="https://maps.google.com/?q=Via+Tommaso+Cauciello+18,+Pagani+SA" target="_blank" rel="noreferrer">Indicazioni su Google Maps</a></div>
                  <div className="ratio ratio-16x9 rounded overflow-hidden mt-3" style={{ border: '1px solid rgba(255,255,255,.12)' }}>
                    <iframe title="Mappa" src="https://www.google.com/maps?q=Via%20Tommaso%20Cauciello%2018%20Pagani&output=embed" style={{ border: 0 }} loading="lazy" />
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6}>
              <Card id="form" style={{ background: "rgba(255,255,255,.05)", color: "#fff", border: "1px solid rgba(255,255,255,.12)" }} className="h-100">
                <Card.Body>
                  <h4 className="mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Scrivici</h4>
                  <p style={{ opacity: .9 }}>Ti rispondiamo al più presto. I campi con * sono obbligatori.</p>

                  {/* FORM: FormSubmit via AJAX (niente action/_next) */}
                  <Form noValidate validated={validated} onSubmit={onSubmit}>
                    {/* Honeypot anti-spam */}
                    <div style={{ position:'absolute', left:'-5000px' }} aria-hidden="true">
                      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" />
                    </div>

                    <Row className="g-2">
                      <Col md={6}>
                        <Form.Group className="mb-2" controlId="nome">
                          <Form.Label>Nome *</Form.Label>
                          <Form.Control name="Nome" required placeholder="Il tuo nome"/>
                          <Form.Control.Feedback type="invalid">Inserisci il tuo nome</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-2" controlId="cognome">
                          <Form.Label>Cognome *</Form.Label>
                          <Form.Control name="Cognome" required placeholder="Il tuo cognome"/>
                          <Form.Control.Feedback type="invalid">Inserisci il tuo cognome</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-2" controlId="email">
                          <Form.Label>Email *</Form.Label>
                          <Form.Control type="email" name="Email" required placeholder="nome@esempio.it"/>
                          <Form.Control.Feedback type="invalid">Inserisci un'email valida</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-2" controlId="telefono">
                          <Form.Label>Telefono</Form.Label>
                          <Form.Control type="tel" name="Telefono" placeholder="opzionale"/>
                        </Form.Group>
                      </Col>
                      <Col xs={12}>
                        <Form.Group className="mb-2" controlId="messaggio">
                          <Form.Label>Messaggio *</Form.Label>
                          <Form.Control as="textarea" rows={5} name="Messaggio" required placeholder="Come possiamo aiutarti?"/>
                          <Form.Control.Feedback type="invalid">Scrivi il tuo messaggio</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Check
                            required
                            name="privacy"
                            id="privacy-check"
                            label={
                              <span>
                                Ho letto e accetto la 
                                Privacy &amp; Cookie Policy
                              </span>
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <div className="d-grid d-sm-flex gap-2 justify-content-sm-end mt-2">
                      <button type="submit" className="btn btn-light cta" disabled={sending}>
                        {sending ? "Invio..." : "Invia"}
                      </button>
                      <Button type="reset" variant="outline-light" size="lg">Annulla</Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stili inline */}
      <style>{`
        .hero-cta .btn{ min-width:220px; }
        @media (max-width: 576px){
          .hero-cta{ flex-direction:column; padding-inline:16px; }
          .hero-cta .btn{ width:100%; padding:.95rem 1.1rem; font-size:1rem; }
        }
        .avatar-wrap{ position:relative; width:132px; height:132px; }
        .avatar-wrap img{ position:relative; z-index:2; width:100%; height:100%; object-fit:cover; border-radius:999px; border: 2px solid rgba(255,255,255,.85); box-shadow:0 8px 28px rgba(0,0,0,.35); }
        .avatar-wrap .ring{ position:absolute; z-index:1; inset:-8px; border-radius:999px; background:radial-gradient(60% 60% at 50% 50%, rgba(255,255,255,.35), rgba(255,255,255,0)); filter:blur(8px); animation:ring 2.8s ease-in-out infinite; }
        @keyframes ring{ 0%,100%{ opacity:.5; transform:scale(.98) } 50%{ opacity:.9; transform:scale(1.03) } }
      `}</style>
    </main>
  );
}
