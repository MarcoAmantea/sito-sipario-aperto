// /src/SiteNavbar.jsx
import { useEffect, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, useSpring, useMotionValue, useTransform } from "framer-motion";

export default function SiteNavbar() {
  const { pathname } = useLocation();

  // Stato UI
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [navH, setNavH] = useState(64);

  // Progress bar di lettura (scroll)
  const { scrollYProgress } = useScroll();
  const progressX = useSpring(scrollYProgress, { stiffness: 140, damping: 24, mass: 0.2 });

  // Effetto "navbar compressa" quando si scrolla
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll to top quando torni alla home via routing
  useEffect(() => {
    if (pathname === "/") window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  // Misura dinamicamente l’altezza reale della navbar (anche su mobile expanded)
  useEffect(() => {
    const el = document.querySelector(".navbar.fixed-top");
    if (!el) { setNavH(64); return; }
    const apply = () => setNavH(el.offsetHeight || 64);
    apply();
    if ("ResizeObserver" in window) {
      const ro = new ResizeObserver(apply);
      ro.observe(el);
      return () => ro.disconnect();
    } else {
      window.addEventListener("resize", apply);
      return () => window.removeEventListener("resize", apply);
    }
  }, []);

  // Stile "glass" + glow
  const glass = {
    background: scrolled
      ? "rgba(10,10,10,.78)"
      : "linear-gradient(180deg, rgba(10,10,10,.92), rgba(10,10,10,.30))",
    WebkitBackdropFilter: "blur(10px)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,.08)",
    boxShadow: scrolled ? "0 12px 40px rgba(0,0,0,.45)" : "0 6px 24px rgba(0,0,0,.35)",
    transition: "background .25s ease, box-shadow .25s ease, border-color .25s ease",
  };

  const handleNavClick = (opts = { toTop: false }) => () => {
    if (opts.toTop) window.scrollTo({ top: 0, behavior: "smooth" });
    if (expanded) setExpanded(false);
  };

  // ===== Logo super dinamico =====
  // Tilt 3D reattivo al mouse
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const rotateX = useTransform(mvY, [-40, 40], [8, -8]);
  const rotateY = useTransform(mvX, [-60, 60], [-10, 10]);

  const onLogoMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mvX.set(e.clientX - (r.left + r.width / 2));
    mvY.set(e.clientY - (r.top + r.height / 2));
  };
  const onLogoLeave = () => { mvX.set(0); mvY.set(0); };

  return (
    <>
      <Navbar
        fixed="top"
        expand="lg"
        variant="dark"
        style={glass}
        expanded={expanded}
        onToggle={setExpanded}
      >
        {/* progress bar di scroll */}
        <motion.div
          aria-hidden
          style={{
            position: "absolute", left: 0, right: 0, bottom: 0, height: 2,
            transformOrigin: "0% 50%", scaleX: progressX,
            background: "linear-gradient(90deg, rgba(255,255,255,.85), rgba(255,255,255,.35))",
          }}
        />

        {/* orb glow */}
        <div
          aria-hidden
          className="position-absolute w-100"
          style={{
            inset: "-40% -20% auto -20%", height: "70vh",
            background: "radial-gradient(closest-side, rgba(255,255,255,.12), rgba(255,255,255,0))",
            filter: "blur(32px)", pointerEvents: "none",
          }}
        />

        <Container>
          {/* LOGO */}
          <Navbar.Brand
            as={Link}
            to="/"
            onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); if (expanded) setExpanded(false); }}
            className="d-flex align-items-center gap-2 fw-bold position-relative"
            style={{ zIndex: 2 }}
          >
            {/* wrapper con prospettiva */}
            <div style={{ perspective: 700 }}>
              <motion.div
                onMouseMove={onLogoMove}
                onMouseLeave={onLogoLeave}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="position-relative"
              >
                {/* halo pulsante dietro al logo */}
                <motion.span
                  aria-hidden
                  className="position-absolute"
                  style={{
                    left: -10, top: -10, width: 62, height: 62, borderRadius: 999,
                    background: "radial-gradient(closest-side, rgba(255,255,255,.25), rgba(255,255,255,0))",
                    filter: "blur(10px)", pointerEvents: "none", transform: "translateZ(-1px)",
                  }}
                  animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.06, 1] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.img
                  src="/logo-sipario.jpg"
                  alt="Sipario Aperto"
                  height={38}
                  style={{ display: "block", borderRadius: 10 }}
                  animate={{ scale: scrolled ? 0.96 : 1, opacity: scrolled ? 0.95 : 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            </div>

            {/* testo con shimmer leggero */}
            <span className="d-none d-sm-inline position-relative">
              <span>Sipario Aperto</span>
              <motion.span
                aria-hidden
                className="position-absolute"
                initial={{ x: "-120%" }}
                animate={{ x: ["-120%", "140%"] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
                style={{
                  top: 0, bottom: 0, left: 0, width: 60,
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,.35), rgba(255,255,255,0))",
                  WebkitMaskImage: "linear-gradient(#000, #000)",
                  opacity: 0.4,
                }}
              />
            </span>
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="mainNav"
            className="border-0"
            style={{ zIndex: 2, boxShadow: "0 6px 18px rgba(0,0,0,.35)", borderRadius: 10 }}
          />

          <Navbar.Collapse id="mainNav">
            <Nav className="ms-auto align-items-lg-center gap-lg-2">
              <AnimatedNavLink
                to="/"
                active={pathname === "/"}
                onClick={handleNavClick({ toTop: true })}
                label="Home"
              />
              <AnimatedNavLink
                to="/chi-siamo"
                active={pathname === "/chi-siamo"}
                onClick={handleNavClick()}
                label="Chi siamo"
              />
              <AnimatedNavLink
                to="/calendario"
                active={pathname === "/calendario"}
                onClick={handleNavClick()}
                label="Programmazione"
              />
              <AnimatedNavLink
                to="/video"
                active={pathname === "/video"}
                onClick={handleNavClick()}
                label="Video"
              />
              <AnimatedNavLink
                to="/gallery"
                active={pathname.startsWith("/gallery")}
                onClick={handleNavClick()}
                label="Gallery"
              />
              <AnimatedNavLink
                to="/contatti"
                active={pathname === "/contatti"}
                onClick={handleNavClick()}
                label="Contatti"
              />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Spacer DINAMICO per evitare che il contenuto finisca sotto la navbar */}
      <div aria-hidden="true" style={{ height: navH }} />
    </>
  );
}

/** ====== COMPONENTI ====== */

// Link con underline animata, senza rimbalzo
function AnimatedNavLink({ to, label, active, onClick }) {
  return (
    <Nav.Link
      as={Link}
      to={to}
      onClick={onClick}
      active={active}
      className="px-2 py-2 position-relative navlink-anim text-white"
      style={{ borderRadius: 10, transition: "background .2s ease, color .2s ease" }}
    >
      <span className="position-relative d-inline-block">
        {label}
        {/* underline su hover/active */}
        <motion.span
          className="nav-underline"
          initial={false}
          animate={{ scaleX: active ? 1 : 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: -2,
            height: 2,
            transformOrigin: "0% 50%",
            background: "linear-gradient(90deg, rgba(255,255,255,.9), rgba(255,255,255,.4))",
            borderRadius: 2,
          }}
        />
      </span>

      {/* soft highlight al passaggio */}
      <motion.span
        aria-hidden
        className="position-absolute"
        style={{
          inset: 0,
          borderRadius: 10,
          background: "rgba(255,255,255,.06)",
          opacity: 0,
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      />
    </Nav.Link>
  );
}
