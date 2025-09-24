import { useEffect, useState } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

// Navbar minima, a prova di telefono:
// - Nessun Offcanvas, solo Collapse nativo (hamburger affidabile)
// - fixed="top" sempre (sticky reale su mobile)
// - Effetto vetro/blur forzato anche su iOS Safari
export default function SiteNavbar(){
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(()=>{
    const onScroll = ()=> setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return ()=> window.removeEventListener('scroll', onScroll)
  },[])

  const glass = {
    // vetro sempre visibile, un po' più intenso dopo lo scroll
    background: scrolled ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0.35)',
    backdropFilter: 'saturate(160%) blur(10px)',
    WebkitBackdropFilter: 'saturate(160%) blur(10px)',
    borderBottom: '1px solid rgba(255,255,255,.15)',
    boxShadow: '0 6px 30px rgba(0,0,0,.25)',
    transition: 'background .25s ease, backdrop-filter .25s ease',
    zIndex: 2000
  }

  return (
    <>
      <Navbar fixed="top" expand="lg" variant="dark" style={glass}>
        <Container>
          {/* Logo a sinistra */}
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 fw-bold">
            <img
              src="/logo-sipario.jpg"
              alt="Sipario Aperto"
              height={36}
              style={{ display:'block' }}
              onError={(e)=>{ e.currentTarget.onerror=null; e.currentTarget.src='/images/logo-sipario.png' }}
            />
            <span className="d-none d-sm-inline">Sipario Aperto</span>
          </Navbar.Brand>

          {/* Hamburger */}
          <Navbar.Toggle aria-controls="mainNav" />

          {/* Menu: collassa sotto lg, inline da lg in su */}
          <Navbar.Collapse id="mainNav">
            <Nav className="ms-auto align-items-lg-center gap-lg-2">
              <Nav.Link as={Link} to="/" active={pathname==='/' }>Home</Nav.Link>
              <Nav.Link as={Link} to="/chi-siamo" active={pathname==='/chi-siamo'}>Chi siamo</Nav.Link>
              <Nav.Link as={Link} to="/calendario" active={pathname==='/calendario'}>Programmazione</Nav.Link>
              <Nav.Link as={Link} to="/foto" active={pathname==='/foto'}>Foto</Nav.Link>
              <Nav.Link as={Link} to="/video" active={pathname==='/video'}>Video</Nav.Link>
              <Nav.Link as={Link} to="/contatti" active={pathname==='/contatti'}>Contatti</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Spacer per evitare overlap con la navbar fixed */}
      <div aria-hidden="true" style={{ height: 64 }} />

      {/* Hardening mobile: su schermi piccoli forza un po' più di vetro */}
      <style>{`
        @media (max-width: 991.98px){
          .navbar.navbar-dark{
            background: rgba(0,0,0,0.5) !important;
            -webkit-backdrop-filter: saturate(160%) blur(10px) !important;
            backdrop-filter: saturate(160%) blur(10px) !important;
          }
        }
      `}</style>
    </>
  )
}