import { Routes, Route } from 'react-router-dom'
import SiteNavbar from './components/SiteNavbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Calendar from './pages/Calendar'
import Contact from './pages/Contact'
import Video from "./pages/Video"

export default function App(){
  return (
    <div className="bg-black text-light min-vh-100 d-flex flex-column">
      <SiteNavbar />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chi-siamo" element={<About />} />
          <Route path="/calendario" element={<Calendar />} />
          <Route path="/contatti" element={<Contact />} />
          <Route path="/video" element={<Video />} />

        </Routes>
      </div>
      <Footer />
    </div>
  )
}
