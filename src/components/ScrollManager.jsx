// components/ScrollManager.jsx
import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollManager() {
  const location = useLocation();

  // Disattiva il ripristino automatico dello scroll del browser
  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    // Se c'è un hash (#ancora), vai a quell'elemento
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        // un frame dopo il render della nuova pagina
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        });
        return;
      }
    }

    // Forza lo scroll in alto su OGNI cambio rotta,
    // anche se il browser prova a ripristinare la posizione precedente
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      // secondo frame per sovrascrivere eventuali restore del browser
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      });
    });
  }, [location.pathname, location.key]); // key cambia ad ogni navigazione

  return null;
}
