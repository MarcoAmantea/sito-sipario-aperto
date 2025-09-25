import { Container } from 'react-bootstrap'
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaHeart } from 'react-icons/fa'
import SocialBtn from './SocialBtn'

export default function Footer(){
  const year = new Date().getFullYear()
  return (
    <footer style={{
      background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.04))',
      borderTop: '1px solid rgba(255,255,255,.12)'
    }}>
      <Container className="py-4 d-flex flex-column gap-3">
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
          <div className="text-light" style={{opacity:.8}}>
            © {year} Compagnia Teatrale Sipario Aperto · Pagani (SA) - Tutti i diritti riservati
          </div>
          <div className="d-flex gap-2">
            <SocialBtn href="https://www.facebook.com/profile.php?id=61580420651607&rdid=X2RBrKHUqxh07VuF&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1BJ32FGhar%2F#" label="Facebook"><FaFacebookF/></SocialBtn>
            <SocialBtn href="https://www.instagram.com/siparioaperto_79/" label="Instagram"><FaInstagram/></SocialBtn>
            <SocialBtn href="https://www.youtube.com/@sipario_aperto" label="YouTube"><FaYoutube/></SocialBtn>
          </div>
        </div>

        <div className="pt-2 text-center" style={{borderTop:'1px dashed rgba(255,255,255,.15)'}}>
          <a
            href="https://marcoamantea.it/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none"
            style={{
              color:'#fff',
              fontWeight:'600',
              fontSize:'1rem',
              display:'inline-block',
              padding:'6px 10px',
              borderRadius:'6px',
              background:'rgba(255,255,255,.08)',
              boxShadow:'0 0 12px rgba(255,255,255,.25)',
              transition:'all .2s ease'
            }}
          >
            Sito creato da Marco Amantea — Web Developer
          </a>
        </div>
      </Container>
    </footer>
  )
}