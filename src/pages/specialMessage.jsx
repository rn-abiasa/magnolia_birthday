import { useEffect, useState } from "react";
import "../styles/specialMessage.css";

/* --------------------------------------------------------------------------
   DATA LATAR DANAU SIANG
   Hanya tiga lapisan siluet danau dengan kadar blur bertingkat, mengikuti
   pola .meadow-layer pada cover (14px / 6px / 1.5px) sebagai depth of field.
   -------------------------------------------------------------------------- */
const LAKE_LAYERS = [
  { className: "lake-layer lake-layer-far blur-heavy" },
  { className: "lake-layer lake-layer-mid blur-soft" },
  { className: "lake-layer lake-layer-near" },
];

const PETAL_COLORS = [
  "rgba(216, 208, 238, 0.6)",
  "rgba(255, 240, 214, 0.6)",
  "rgba(198, 220, 200, 0.55)",
  "rgba(240, 214, 224, 0.6)",
];

// Serpihan kecil yang melayang di atas danau (deterministik)
const LAKE_PETALS = Array.from({ length: 10 }).map((_, i) => {
  const pseudoRand1 = ((i * 17 + 7) % 100) / 100;
  const pseudoRand2 = ((i * 23 + 13) % 100) / 100;
  const pseudoRand3 = ((i * 31 + 19) % 100) / 100;
  const pseudoRand4 = ((i * 47 + 29) % 100) / 100;

  const size = Math.floor(pseudoRand1 * 10) + 8;
  const left = +(pseudoRand2 * 100).toFixed(2);
  const duration = +(pseudoRand3 * 8 + 10).toFixed(2);
  const delay = +(pseudoRand4 * 8).toFixed(2);
  const background = PETAL_COLORS[i % PETAL_COLORS.length];

  return {
    id: `lake-petal-${i}`,
    style: {
      width: `${size}px`,
      height: `${size * 1.3}px`,
      left: `${left}vw`,
      background,
      animationDuration: `${duration}s`,
      animationDelay: `${delay}s`,
    },
  };
});

// Kilau cahaya kecil di atas air (mirip .sparkle pada cover)
const LAKE_SPARKLES = Array.from({ length: 6 }).map((_, i) => {
  const pseudoRand1 = ((i * 19 + 5) % 100) / 100;
  const pseudoRand2 = ((i * 29 + 11) % 100) / 100;
  const pseudoRand3 = ((i * 37 + 17) % 100) / 100;
  const pseudoRand4 = ((i * 43 + 23) % 100) / 100;

  const size = Math.floor(pseudoRand1 * 4) + 4;
  const top = +(pseudoRand2 * 70 + 12).toFixed(2);
  const left = +(pseudoRand3 * 92 + 4).toFixed(2);
  const duration = +(pseudoRand4 * 4 + 3).toFixed(2);
  const delay = +(pseudoRand1 * 5).toFixed(2);

  return {
    id: `lake-sparkle-${i}`,
    style: {
      width: `${size}px`,
      height: `${size}px`,
      top: `${top}vh`,
      left: `${left}vw`,
      animationDuration: `${duration}s`,
      animationDelay: `${delay}s`,
    },
  };
});

/* --------------------------------------------------------------------------
   HALAMAN SPECIAL MESSAGE
   Konten pesan sengaja dibiarkan kosong terlebih dahulu (.lake-content).
   -------------------------------------------------------------------------- */
export default function SpecialMessage() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Beri satu frame agar overlay masuk tampil dulu (transisi dari Cover),
    // lalu memudar memperlihatkan danau siang.
    const frameId = requestAnimationFrame(() => setIsReady(true));

    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className={`lake-wrapper ${isReady ? "is-ready" : ""}`}>
      {/* Overlay masuk halaman: menutup sesaat lalu memudar (nyambung dari Cover) */}
      <div
        className={`special-message-enter-overlay ${
          isReady ? "is-cleared" : ""
        }`}
      />

      {/* Container Efek Danau Siang (Background & Depth Blur) */}
      <div className="lake-background" aria-hidden="true">
        <div className="lake-sky-gradient"></div>
        <div className="lake-sun-glow"></div>

        {/* Tiga lapisan siluet danau bertingkat */}
        {LAKE_LAYERS.map((layer) => (
          <div key={layer.className} className={layer.className}></div>
        ))}

        {/* Partikel ringan: serpihan & kilau melayang */}
        <div className="lake-particles">
          {LAKE_PETALS.map((petal) => (
            <div key={petal.id} className="lake-petal" style={petal.style} />
          ))}
          {LAKE_SPARKLES.map((sparkle) => (
            <div
              key={sparkle.id}
              className="lake-sparkle"
              style={sparkle.style}
            />
          ))}
        </div>
      </div>

      {/* Konten utama halaman (masih kosong, siap diisi nanti) */}
      <main className="lake-content" id="lakeContent" />
    </div>
  );
}
