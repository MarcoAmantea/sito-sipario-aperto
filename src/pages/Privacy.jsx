import { Container, Row, Col, Card, Badge } from "react-bootstrap";

export default function Privacy() {
  const lastUpdate = new Date().toLocaleDateString("it-IT");

  return (
    <div className="text-light">
      {/* HERO */}
      <section
        className="position-relative"
        style={{
          padding: "64px 0 40px",
          background:
            "radial-gradient(1200px 600px at 50% 0%, rgba(255,255,255,.10), transparent 60%), linear-gradient(180deg,#0b0b12,#0f0f22)"
        }}
      >
        <Container style={{ position: "relative", zIndex: 2 }}>
          <Row className="justify-content-center">
            <Col lg={10} xl={9} className="text-center">
              <h1
                className="mb-3"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 900,
                  color: "#fff",
                  textShadow: "0 12px 40px rgba(0,0,0,.55)"
                }}
              >
                Privacy &amp; Cookie Policy
              </h1>
              <p className="lead" style={{ color: "#fff", opacity: 0.95 }}>
                Trasparenza sul trattamento dei dati personali e sull’uso dei cookie
                (GDPR – Regolamento UE 2016/679; ePrivacy).
              </p>
              <div className="mt-2">
                <Badge bg="light" text="dark" className="me-2">
                  Versione Sito: Informativa Semplificata
                </Badge>
                <Badge bg="secondary">Ultimo aggiornamento: {lastUpdate}</Badge>
              </div>
            </Col>
          </Row>
        </Container>

        {/* Decor glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(60% 80% at 50% 120%, rgba(255,255,255,.06), rgba(0,0,0,0))",
            pointerEvents: "none"
          }}
        />
      </section>

      {/* SOMMARIO ANCORATO */}
      <section className="py-3" style={{ background: "linear-gradient(180deg,#0f0f22,#101024)" }}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={10} xl={9}>
              <Card className="border-0 rounded-4" style={navCardStyle}>
                <Card.Body className="py-3">
                  <div className="d-flex flex-wrap gap-2 justify-content-center">
                    <a href="#titolare" className="btn btn-sm btn-light">Titolare</a>
                    <a href="#dati" className="btn btn-sm btn-outline-light">Dati raccolti</a>
                    <a href="#finalita" className="btn btn-sm btn-outline-light">Finalità &amp; basi</a>
                    <a href="#conservazione" className="btn btn-sm btn-outline-light">Conservazione</a>
                    <a href="#cookie" className="btn btn-sm btn-outline-light">Cookie</a>
                    <a href="#youtube" className="btn btn-sm btn-outline-light">YouTube</a>
                    <a href="#diritti" className="btn btn-sm btn-outline-light">Diritti</a>
                    <a href="#contatti" className="btn btn-sm btn-outline-light">Contatti</a>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CONTENUTI */}
      <section className="py-4 pb-5" style={{ background: "linear-gradient(180deg,#101024,#0b0b12)" }}>
        <Container>
          <Row className="justify-content-center g-4">
            <Col lg={10} xl={9}>
              {/* Titolare */}
              <Card id="titolare" className="border-0 rounded-4 mb-4" style={cardStyle}>
                <Card.Body>
                  <h3 className="h4 mb-3" style={titleStyle}>Titolare del trattamento</h3>
                  <p className="mb-2" style={textStyle}>
                    Compagnia Teatrale <strong>Sipario Aperto</strong> — Pagani (SA)
                  </p>
                  <p className="mb-0" style={textStyle}>
                    Email:{" "}
                    <a href="mailto:siparioapertoteatro@gmail.com" className="link-light">
                      siparioapertoteatro@gmail.com
                    </a>
                  </p>
                </Card.Body>
              </Card>

              {/* Dati raccolti */}
              <Card id="dati" className="border-0 rounded-4 mb-4" style={cardStyle}>
                <Card.Body>
                  <h3 className="h4 mb-3" style={titleStyle}>Tipologie di dati raccolti</h3>
                  <ul className="mb-0" style={textStyle}>
                    <li className="mb-2">
                      <strong>Dati forniti volontariamente:</strong> informazioni inviate tramite il
                      form contatti (nome, email, messaggio). Il conferimento è facoltativo ma
                      necessario per ricevere una risposta.
                    </li>
                    <li>
                      <strong>Dati di navigazione:</strong> dati tecnici (indirizzo IP, log di
                      server) utilizzati al solo fine di sicurezza e manutenzione.
                    </li>
                  </ul>
                </Card.Body>
              </Card>

              {/* Finalità e basi */}
              <Card id="finalita" className="border-0 rounded-4 mb-4" style={cardStyle}>
                <Card.Body>
                  <h3 className="h4 mb-3" style={titleStyle}>Finalità e basi giuridiche</h3>
                  <p className="mb-2" style={textStyle}>
                    I dati sono trattati esclusivamente per:
                  </p>
                  <ul className="mb-2" style={textStyle}>
                    <li>rispondere a richieste inviate tramite form o email;</li>
                    <li>garantire sicurezza e corretta fruizione del sito.</li>
                  </ul>
                  <p className="mb-0" style={textStyle}>
                    <strong>Basi giuridiche:</strong> consenso dell’interessato (art. 6.1.a GDPR) e
                    legittimo interesse del titolare per sicurezza e prevenzione abusi.
                  </p>
                </Card.Body>
              </Card>

              {/* Conservazione */}
              <Card id="conservazione" className="border-0 rounded-4 mb-4" style={cardStyle}>
                <Card.Body>
                  <h3 className="h4 mb-3" style={titleStyle}>Tempi di conservazione</h3>
                  <p className="mb-0" style={textStyle}>
                    I dati inviati tramite form sono conservati per il tempo necessario a evadere
                    la richiesta e comunque non oltre <strong>12 mesi</strong>. I log tecnici sono
                    conservati per il periodo previsto dalla normativa a fini di sicurezza.
                  </p>
                </Card.Body>
              </Card>

              {/* Cookie */}
              <Card id="cookie" className="border-0 rounded-4 mb-4" style={cardStyle}>
                <Card.Body>
                  <h3 className="h4 mb-3" style={titleStyle}>Cookie</h3>
                  <p className="mb-2" style={textStyle}>
                    Il sito usa cookie tecnici necessari al funzionamento della piattaforma React e,
                    <strong> solo previo consenso</strong>, cookie di terze parti relativi ai video
                    incorporati da YouTube.
                  </p>
                  <p className="mb-0" style={textStyle}>
                    Puoi gestire le preferenze dal banner o dalle impostazioni del browser. Senza
                    consenso per YouTube, i video restano bloccati e non vengono installati cookie
                    di profilazione.
                  </p>
                </Card.Body>
              </Card>

              {/* YouTube */}
              <Card id="youtube" className="border-0 rounded-4 mb-4" style={cardStyle}>
                <Card.Body>
                  <h3 className="h4 mb-3" style={titleStyle}>Cookie di terze parti — YouTube</h3>
                  <p className="mb-2" style={textStyle}>
                    I video sono incorporati da YouTube (Google Ireland Ltd.). Se acconsenti,
                    YouTube può installare cookie e raccogliere dati di utilizzo. Maggiori
                    informazioni nell’informativa di Google:
                  </p>
                  <p className="mb-0" style={textStyle}>
                    <a href="https://policies.google.com/privacy" className="link-light">
                      https://policies.google.com/privacy
                    </a>
                  </p>
                </Card.Body>
              </Card>

              {/* Diritti */}
              <Card
                id="diritti"
                className="border-0 rounded-4 mb-4"
                style={cardStyleEmph}
              >
                <Card.Body>
                  <h3 className="h4 mb-3" style={{ ...titleStyle, color: "#fff" }}>
                    Diritti dell’interessato (artt. 15–22 GDPR)
                  </h3>
                  <p className="mb-2" style={textStyle}>
                    Hai diritto di accesso, rettifica, cancellazione, limitazione, portabilità e
                    opposizione al trattamento. Puoi anche proporre reclamo al Garante per la
                    Protezione dei Dati Personali.
                  </p>
                  <p className="mb-0" style={textStyle}>
                    Per esercitare i diritti scrivi a{" "}
                    <a href="mailto:siparioapertoteatro@gmail.com" className="link-light">
                      siparioapertoteatro@gmail.com
                    </a>.
                  </p>
                </Card.Body>
              </Card>

              {/* Contatti e aggiornamenti */}
              <Card id="contatti" className="border-0 rounded-4" style={cardStyle}>
                <Card.Body>
                  <h3 className="h4 mb-3" style={titleStyle}>Contatti &amp; Aggiornamenti</h3>
                  <p className="mb-2" style={textStyle}>
                    Per qualsiasi domanda sull’informativa o sul trattamento dei dati, contatta il
                    Titolare ai recapiti sopra indicati.
                  </p>
                  <p className="mb-0" style={textStyle}>
                    Questa informativa può essere aggiornata in base a modifiche normative o a nuove
                    funzionalità del sito. <strong>Ultimo aggiornamento:</strong> {lastUpdate}.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Offset ancore per navbar fissa */}
      <style>{`
        /* assicura che i titoli ancorati non finiscano sotto la navbar */
        #titolare, #dati, #finalita, #conservazione, #cookie, #youtube, #diritti, #contatti {
          scroll-margin-top: 84px;
        }
      `}</style>
    </div>
  );
}

/* ---- Stili riutilizzabili ---- */
const navCardStyle = {
  background: "rgba(255,255,255,.10)",
  border: "1px solid rgba(255,255,255,.25)",
  color: "#fff"
};

const cardStyle = {
  background: "rgba(255,255,255,.14)",         // più chiaro per contrasto
  border: "1px solid rgba(255,255,255,.28)",
  color: "#fff"
};

const cardStyleEmph = {
  background: "linear-gradient(180deg, rgba(255,255,255,.22), rgba(255,255,255,.14))",
  border: "1px solid rgba(255,255,255,.38)",
  boxShadow: "0 10px 30px rgba(0,0,0,.35)",
  color: "#fff"
};

const titleStyle = {
  fontWeight: 800,
  fontFamily: "'Playfair Display', serif",
  color: "#fff"
};

const textStyle = {
  color: "#fff",
  opacity: 0.98,
  lineHeight: 1.6
};
