import { Container } from 'react-bootstrap'
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa'
import SocialBtn from './SocialBtn'

export default function Footer(){
  return (
    <footer className="py-4 border-top" style={{borderColor:'rgba(255,255,255,.12)'}}>
      <Container className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
        <div style={{opacity:.75}}>© {new Date().getFullYear()} Compagnia Teatrale Sipario Aperto · Pagani (SA)</div>
        <div className="d-flex gap-2">
          <SocialBtn href="https://facebook.com" label="Facebook"><FaFacebookF/></SocialBtn>
          <SocialBtn href="https://instagram.com" label="Instagram"><FaInstagram/></SocialBtn>
          <SocialBtn href="https://tiktok.com" label="TikTok"><FaTiktok/></SocialBtn>
          <SocialBtn href="https://youtube.com" label="YouTube"><FaYoutube/></SocialBtn>
        </div>
      </Container>
    </footer>
  )
}
