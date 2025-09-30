// /src/AudioProvider.jsx
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

const AudioCtx = createContext(null);
export function useAudio() { return useContext(AudioCtx); }

// --- Utils ---------------------------------------------------------------

// Normalizza input tracce: accetta string o {src,title}
function normalizeTracks(tracksProp, singleSrc) {
  const arr = Array.isArray(tracksProp) && tracksProp.length > 0 ? tracksProp : (singleSrc ? [singleSrc] : []);
  return arr.map((t, i) =>
    typeof t === "string"
      ? { src: t, title: `Traccia ${i + 1}` }
      : { ...t, src: t.src, title: t.title || `Traccia ${i + 1}` }
  );
}

// Fisher–Yates
function shuffleIndices(n) {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ------------------------------------------------------------------------

export default function AudioProvider({
  // Retro-compatibilità: se non passi tracks, usa src singolo
  src = "/music/theme.mp3",
  // Nuovo: array di tracce (string o {src,title})
  tracks: tracksProp,
  // Se true, parte con ordine casuale e ad ogni giro rimescola
  shuffleStart = true,
  children,
}) {
  const audioRef = useRef(null);

  const playlist = useMemo(() => normalizeTracks(tracksProp, src), [tracksProp, src]);

  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);

  // Ordine casuale e indice nell'ordine
  const [order, setOrder] = useState([]);
  const [ordIdx, setOrdIdx] = useState(0);

  // Costruisci/reset ordine quando cambia la playlist
  useEffect(() => {
    if (!playlist.length) {
      setOrder([]);
      setOrdIdx(0);
      return;
    }
    const base = shuffleStart ? shuffleIndices(playlist.length) : Array.from({ length: playlist.length }, (_, i) => i);
    setOrder(base);
    setOrdIdx(0);
  }, [playlist, shuffleStart]);

  // Crea l'elemento Audio una sola volta
  useEffect(() => {
    const el = new Audio();
    el.preload = "auto";
    el.loop = false; // vogliamo passare alla successiva
    el.volume = volume;
    audioRef.current = el;

    const onCanPlay = () => setReady(true);

    // Handler definiti sotto dopo advance()
    let onEnded, onError;

    // li assegnamo dopo aver definito advance
    const attachHandlers = (ended, error) => {
      onEnded = ended;
      onError = error;
      el.addEventListener("canplaythrough", onCanPlay);
      el.addEventListener("ended", onEnded);
      el.addEventListener("error", onError);
    };

    // funzione di detach quando smontiamo
    const detachHandlers = () => {
      el.pause();
      el.removeEventListener("canplaythrough", onCanPlay);
      if (onEnded) el.removeEventListener("ended", onEnded);
      if (onError) el.removeEventListener("error", onError);
      audioRef.current = null;
    };

    // Attaccheremo gli handler in un effetto separato dopo che advance esiste
    // Restituiamo il detach
    return detachHandlers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Aggiorna mute/volume
  useEffect(() => { if (audioRef.current) audioRef.current.muted = muted; }, [muted]);
  useEffect(() => { if (audioRef.current) audioRef.current.volume = volume; }, [volume]);

  // Traccia corrente calcolata dall'ordine
  const currentIndex = order.length ? order[ordIdx % order.length] : 0;
  const current = playlist[currentIndex] || null;

  // Cambia src quando cambia current
  useEffect(() => {
    const el = audioRef.current;
    if (!el || !current) return;

    setReady(false);

    const absoluteSrc = new URL(current.src, window.location.origin).href;
    if (el.src !== absoluteSrc) {
      el.src = current.src;
      el.load();
    }

    // Se eravamo in play, continuiamo automaticamente
    if (playing) {
      el.play().catch((err) => console.warn("Audio play blocked:", err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current?.src]);

  // --- Controls ----------------------------------------------------------

  const play = async () => {
    if (!audioRef.current || !current) return;
    try {
      await audioRef.current.play(); // necessita gesto utente la prima volta
      setPlaying(true);
    } catch (err) {
      console.warn("Audio play blocked:", err);
    }
  };

  const pause = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setPlaying(false);
  };

  const toggle = () => (playing ? pause() : play());

  // Avanza di 1; se chiude il giro, reshuffle (se abilitato)
  const advance = (auto = false) => {
    if (!order.length || playlist.length === 0) return;

    setOrdIdx((i) => {
      const nextI = (i + 1) % order.length;

      // Se abbiamo chiuso il giro e abbiamo più di 1 traccia, rimescola
      if (nextI === 0 && shuffleStart && playlist.length > 1) {
        let newOrder = shuffleIndices(playlist.length);

        // Evita che la prossima parta uguale alla traccia appena finita
        const justPlayed = order[i];
        if (newOrder[0] === justPlayed && playlist.length > 2) {
          // semplice swap tra 0 e 1
          [newOrder[0], newOrder[1]] = [newOrder[1], newOrder[0]];
        }
        setOrder(newOrder);
        return 0; // riparti dall'inizio del nuovo ordine
      }

      return nextI;
    });

    if (auto) {
      // spingi il play della nuova traccia dopo il cambio src
      setTimeout(() => {
        const el = audioRef.current;
        if (!el) return;
        el.play().catch(() => { /* ignoriamo blocchi sporadici dell'autoplay */ });
      }, 100);
    }
  };

  const next = (auto = false) => {
    setPlaying(true); // mantieni stato playing
    advance(auto);
  };

  const prev = () => {
    if (!audioRef.current || !order.length) return;
    // se siamo oltre 2s, restart della stessa
    if (audioRef.current.currentTime > 2) {
      audioRef.current.currentTime = 0;
      return;
    }
    setOrdIdx((i) => (i - 1 + order.length) % order.length);
    setPlaying(true);
    // piccolo nudge al play
    setTimeout(() => {
      const el = audioRef.current;
      if (!el) return;
      el.play().catch(() => {});
    }, 80);
  };

  const setVolumeClamped = (v) => setVolume(Math.max(0, Math.min(1, v)));

  // Collega gli handler ended/error ora che advance è definita
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const onEnded = () => advance(true);
    const onError = () => advance(true);

    el.addEventListener("ended", onEnded);
    el.addEventListener("error", onError);
    return () => {
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("error", onError);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [advance, order, playlist.length, shuffleStart]);

  const api = useMemo(
    () => ({
      // stato
      ready,
      playing,
      muted,
      volume,
      current,          // {src,title}
      index: ordIdx,
      count: playlist.length,
      // controlli
      play,
      pause,
      toggle,
      next,
      prev,
      setMuted,
      toggleMute: () => setMuted((m) => !m),
      setVolume: setVolumeClamped,
    }),
    [ready, playing, muted, volume, current, ordIdx, playlist.length]
  );

  return <AudioCtx.Provider value={api}>{children}</AudioCtx.Provider>;
}
