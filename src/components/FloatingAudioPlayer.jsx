import { useAudio } from "./AudioProvider";
import { motion } from "framer-motion";
import { FiPause, FiPlay, FiVolume2, FiVolumeX, FiSkipBack, FiSkipForward } from "react-icons/fi";

export default function FloatingAudioPlayer() {
  const audio = useAudio();
  if (!audio) return null;

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: .4 }}
      className="position-fixed mini-audio"
      style={{
        right: 16, bottom: 16, zIndex: 50,
        background: "rgba(255,255,255,.08)",
        border: "1px solid rgba(255,255,255,.18)",
        borderRadius: 12,
        backdropFilter: "blur(8px)",
        padding: "8px 10px",
        boxShadow: "0 12px 30px rgba(0,0,0,.35)",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
      aria-label="Lettore musicale"
    >
      {/* Prev */}
      <button
        onClick={audio.prev}
        className="btn btn-sm btn-outline-light"
        style={{ borderRadius: 999 }}
        title="Traccia precedente"
        aria-label="Traccia precedente"
      >
        <FiSkipBack />
      </button>

      {/* Play/Pause */}
      <button
        onClick={audio.toggle}
        className="btn btn-sm btn-light"
        style={{ borderRadius: 999 }}
        title={audio.playing ? "Pausa" : "Riproduci"}
        aria-label={audio.playing ? "Pausa" : "Riproduci"}
      >
        {audio.playing ? <FiPause/> : <FiPlay/>}
      </button>

      {/* Next */}
      <button
        onClick={audio.next}
        className="btn btn-sm btn-outline-light"
        style={{ borderRadius: 999 }}
        title="Traccia successiva"
        aria-label="Traccia successiva"
      >
        <FiSkipForward />
      </button>

      {/* Title (facoltativo) */}
      {audio.current?.title && (
        <span
          className="d-none d-sm-inline text-white-75"
          style={{ marginLeft: 6, marginRight: 6, maxWidth: 160, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
          title={audio.current.title}
        >
          {audio.current.title}
        </span>
      )}

      {/* Mute */}
      <button
        onClick={audio.toggleMute}
        className="btn btn-sm btn-outline-light"
        style={{ borderRadius: 999 }}
        title={audio.muted ? "Riattiva audio" : "Muta"}
        aria-label={audio.muted ? "Riattiva audio" : "Muta"}
      >
        {audio.muted ? <FiVolumeX/> : <FiVolume2/>}
      </button>

      {/* Volume (nascosto su mobile via CSS) */}
      <input
        className="volume-slider"
        type="range"
        min={0} max={1} step={0.01}
        value={audio.volume}
        onChange={(e) => audio.setVolume(parseFloat(e.target.value))}
        aria-label="Volume"
        style={{ width: 90 }}
      />
    </motion.div>
  );
}
