import { Container } from 'react-bootstrap';
import { FaFacebookF, FaInstagram, FaYoutube, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';      // <── aggiunto
import SocialBtn from './SocialBtn';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="position-relative"
      style={{
        background:
          'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.05))',
        borderTop: '1px solid rgba(255,255,255,.12)',
        overflow: 'hidden',
      }}
    >
      {/* Glow morbido sullo sfondo */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: -80,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 900,
          height: 300,
          background:
            'radial-gradient(50% 60% at 50% 50%, rgba(255,255,255,.12), rgba(255,255,255,0))',
          filter: 'blur(40px)',
          opacity: 0.55,
          pointerEvents: 'none',
        }}
      />

      <Container className="py-4 py-md-5 position-relative" style={{ zIndex: 2 }}>
        {/* Riga top: brand/copyright + social */}
        <div
          className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3"
          style={{ rowGap: 12 }}
        >
          {/* Testo centrato su mobile, a sinistra su desktop */}
          <div
            className="text-light text-center text-md-start"
            style={{ opacity: 0.9, lineHeight: 1.4 }}
          >
            <div style={{ fontWeight: 700 }}>
              © {year} · Compagnia Teatrale <span style={{ opacity: 0.95 }}>Sipario Aperto</span>
            </div>
            <div style={{ fontSize: '0.95rem', opacity: 0.9 }}>
              Pagani (SA) · <em>Teatro La Locandina</em> — Via Tommaso Cauciello 18
            </div>
            <div style={{ fontSize: '0.95rem', opacity: 0.8 }}>
              Classico e contemporaneo in dialogo con il pubblico: risate, emozioni e tradizione
              napoletana.
            </div>

            {/* Link Privacy & Cookie Policy */}
            <div className="mt-2">
              <Link
                to="/privacy"
                className="text-decoration-none"
                style={{ color: '#fff', opacity: 0.85 }}
              >
                Privacy &amp; Cookie Policy
              </Link>
            </div>
          </div>

          {/* Social lucidi */}
          <div className="d-flex gap-2 justify-content-center">
            <SocialBtn
              href="https://www.facebook.com/profile.php?id=61580420651607&rdid=X2RBrKHUqxh07VuF&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1BJ32FGhar%2F#"
              label="Facebook"
            >
              <FaFacebookF />
            </SocialBtn>
            <SocialBtn href="https://www.instagram.com/siparioaperto_79/" label="Instagram">
              <FaInstagram />
            </SocialBtn>
            <SocialBtn href="https://www.youtube.com/@sipario_aperto" label="YouTube">
              <FaYoutube />
            </SocialBtn>
          </div>
        </div>

        {/* Divider */}
        <div
          className="my-3 my-md-4"
          style={{
            height: 1,
            background:
              'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,.16), rgba(255,255,255,0))',
          }}
        />

        {/* Credits centrati con “cuore” */}
        <div className="text-center">
          <a
            href="https://marcoamantea.it/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none d-inline-flex align-items-center gap-2"
            style={{
              color: '#fff',
              fontWeight: 700,
              fontSize: '1rem',
              padding: '10px 14px',
              borderRadius: 999,
              background: 'linear-gradient(135deg, rgba(255,255,255,.10), rgba(255,255,255,.04))',
              border: '1px solid rgba(255,255,255,.18)',
              boxShadow:
                '0 10px 30px rgba(0,0,0,.35), inset 0 0 18px rgba(255,255,255,.06)',
              transition: 'transform .15s ease, box-shadow .2s ease',
              backdropFilter: 'blur(6px)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <span className="d-none d-sm-inline" style={{ opacity: 0.9 }}>
              Sito realizzato con
            </span>
            <FaHeart aria-hidden="true" />
            <span style={{ opacity: 0.95 }}>Marco Amantea — Web Developer</span>
          </a>

          {/* Micro-copy sotto, sottile e elegante */}
          <div
            className="mt-2"
            style={{ color: 'rgba(255,255,255,.85)', fontSize: '0.9rem', opacity: 0.9 }}
          >
            Performance ottimizzate, design responsive, accessibilità e SEO-ready.
          </div>
        </div>
      </Container>

      {/* Riga decorativa in basso */}
      <div
        aria-hidden="true"
        style={{
          height: 2,
          background:
            'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,.25), rgba(255,255,255,0))',
          opacity: 0.6,
        }}
      />
    </footer>
  );
}
