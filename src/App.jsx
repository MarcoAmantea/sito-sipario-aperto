import { Routes, Route } from "react-router-dom";
import SiteNavbar from "./components/SiteNavbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Calendar from "./pages/Calendar";
import Contact from "./pages/Contact";
import Video from "./pages/Video";
import Privacy from "./pages/Privacy";
import ScrollManager from "./components/ScrollManager";

import AudioProvider, { useAudio } from "./components/AudioProvider";
import FloatingAudioPlayer from "./components/FloatingAudioPlayer";
import CurtainIntro from "./components/CurtainIntro";

// NEW: gestione cookie/consensi
import ConsentProvider from "./components/ConsentContext";
import CookieBanner from "./components/CookieBanner";
import Gallery from "./pages/Gallery";
import ShowGallery from "./pages/ShowGallery";
import Grazie from "./pages/Grazie";

// Wrapper per passare la funzione play al sipario
function CurtainWithAudio() {
  const audio = useAudio();
  return (
    <CurtainIntro
      showOnce={false} // metti true se vuoi mostrarlo solo alla prima visita
      onEnter={() => audio.play()} // avvia la musica al click
    />
  );
}

export default function App() {
  return (
    <ConsentProvider>
      <AudioProvider
        tracks={[
          { src: "/music/theme.mp3", title: "Idea 10" },
          {
            src: "/music/cinema.mp3",
            title: "Cinema Paradiso - Ennio Morricone",
          },
          {
            src: "/music/califfa.mp3",
            title: "La Califfa - Ennio Morricone",
          },
          {
            src: "/music/divenire.mp3",
            title: "Divenire - Ludovico Einaudi",
          },
          {
            src: "/music/gabriel.mp3",
            title: "Gabriel's Oboe - Ennio Morricone",
          },
          {
            src: "/music/giorni.mp3",
            title: "I Giorni - Ludovico Einaudi",
          },
          {
            src: "/music/icarus.mp3",
            title: "Icarus - Penguin Piano",
          },
          {
            src: "/music/ode.mp3",
            title: "Ode Al Pomodoro - Franco Cleopatra",
          },
          {
            src: "/music/valzer.mp3",
            title: "Valzer D'Autunno - Andrea Vanzo",
          },
          
        ]}
        shuffleStart={true} // parte da un ordine casuale
      >
        <div className="bg-black text-light min-vh-100 d-flex flex-column">
          <ScrollManager />
          <CurtainWithAudio />
          <SiteNavbar />
          <div className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chi-siamo" element={<About />} />
              <Route path="/calendario" element={<Calendar />} />
              <Route path="/contatti" element={<Contact />} />
              <Route path="/video" element={<Video />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/gallery/:slug" element={<ShowGallery />} />
              <Route path="/grazie" element={<Grazie />} />

            </Routes>
          </div>
          <Footer />
          <FloatingAudioPlayer />
          <CookieBanner /> {/* banner consensi */}
        </div>
      </AudioProvider>
    </ConsentProvider>
  );
}
