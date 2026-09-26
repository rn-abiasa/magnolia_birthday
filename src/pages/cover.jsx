import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/cover.css";

import envelopeBackImg from "../assets/evenlope_v1.webp";
import envelopePaperImg from "../assets/evenlope_paper_v1.webp";
import envelopeFrontImg from "../assets/evenlope_front_v1.webp";
import irisFlowerImg from "../assets/iris_flower_v1.webp";
import lavenderFlowerImg from "../assets/lavender_flower.webp";
import magnoliaFlowerImg from "../assets/magnolia_flower.webp";
import melatiFlowerImg from "../assets/melati_flower.webp";
import siriWithHatImg from "../assets/siri_with_hat.webp";

const BACKDROP_FLOWERS = [
  {
    className: "flower-bg-l2",
    baseRot: -24,
    depth: -30,
    img: lavenderFlowerImg,
    alt: "Lavender Flower",
  },
  {
    className: "flower-bg-l1",
    baseRot: -12,
    depth: -20,
    img: magnoliaFlowerImg,
    alt: "Magnolia Flower",
  },
  {
    className: "flower-bg-mid",
    baseRot: 1,
    depth: -25,
    img: irisFlowerImg,
    alt: "Iris Flower",
  },
  {
    className: "flower-bg-r1",
    baseRot: 13,
    depth: -20,
    img: melatiFlowerImg,
    alt: "Melati Flower",
  },
  {
    className: "flower-bg-r2",
    baseRot: 25,
    depth: -30,
    img: lavenderFlowerImg,
    alt: "Lavender Flower",
  },
];

const LEFT_STEMS = [
  { className: "stem-l-1", img: irisFlowerImg, alt: "Iris Flower" },
  { className: "stem-l-2", img: magnoliaFlowerImg, alt: "Magnolia Flower" },
  { className: "stem-l-3", img: melatiFlowerImg, alt: "Melati Flower" },
  { className: "stem-l-4", img: lavenderFlowerImg, alt: "Lavender Flower" },
  { className: "stem-l-5", img: magnoliaFlowerImg, alt: "Magnolia Flower" },
];

const RIGHT_STEMS = [
  { className: "stem-r-1", img: irisFlowerImg, alt: "Iris Flower" },
  { className: "stem-r-2", img: melatiFlowerImg, alt: "Melati Flower" },
  { className: "stem-r-3", img: magnoliaFlowerImg, alt: "Magnolia Flower" },
  { className: "stem-r-4", img: lavenderFlowerImg, alt: "Lavender Flower" },
  { className: "stem-r-5", img: melatiFlowerImg, alt: "Melati Flower" },
];

const PARTICLE_COLORS = [
  "rgba(175, 150, 220, 0.65)",
  "rgba(145, 120, 205, 0.55)",
  "rgba(215, 190, 245, 0.7)",
  "rgba(255, 230, 180, 0.6)",
  "rgba(240, 210, 230, 0.65)",
];

// Deterministic particle generation
const PARTICLES = Array.from({ length: 24 }).map((_, i) => {
  const pseudoRand1 = ((i * 17 + 7) % 100) / 100;
  const pseudoRand2 = ((i * 23 + 13) % 100) / 100;
  const pseudoRand3 = ((i * 31 + 19) % 100) / 100;
  const pseudoRand4 = ((i * 47 + 29) % 100) / 100;

  const size = Math.floor(pseudoRand1 * 12) + 10;
  const left = +(pseudoRand2 * 100).toFixed(2);
  const duration = +(pseudoRand3 * 8 + 9).toFixed(2);
  const delay = +(pseudoRand4 * 8).toFixed(2);
  const background = PARTICLE_COLORS[i % PARTICLE_COLORS.length];

  return {
    id: `petal-${i}`,
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

const SPARKLES = Array.from({ length: 16 }).map((_, i) => {
  const pseudoRand1 = ((i * 19 + 5) % 100) / 100;
  const pseudoRand2 = ((i * 29 + 11) % 100) / 100;
  const pseudoRand3 = ((i * 37 + 17) % 100) / 100;
  const pseudoRand4 = ((i * 43 + 23) % 100) / 100;

  const size = Math.floor(pseudoRand1 * 4) + 3;
  const top = +(pseudoRand2 * 80 + 10).toFixed(2);
  const left = +(pseudoRand3 * 95 + 2.5).toFixed(2);
  const duration = +(pseudoRand4 * 4 + 3).toFixed(2);
  const delay = +(pseudoRand1 * 5).toFixed(2);

  return {
    id: `sparkle-${i}`,
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

export default function Cover() {
  const navigate = useNavigate();
  const [isCurtainOpen, setIsCurtainOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaperLifted, setIsPaperLifted] = useState(false);

  const envelopeStageRef = useRef(null);
  const envelope3DRef = useRef(null);
  const flowerRefs = useRef([]);

  const openCurtain = () => {
    setIsCurtainOpen(true);
  };

  const handleOpenLetter = (e) => {
    e.stopPropagation();
    setIsTransitioning(true);
    setTimeout(() => {
      navigate("/special-message");
    }, 900);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      openCurtain();
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isCurtainOpen) {
      document.body.classList.add("curtain-opened");
    } else {
      document.body.classList.remove("curtain-opened");
    }

    return () => {
      document.body.classList.remove("curtain-opened");
    };
  }, [isCurtainOpen]);

  // physics hook logic placeholder
  useEffect(() => {
    const stageEl = envelopeStageRef.current;
    const envelopeEl = envelope3DRef.current;
    if (!stageEl || !envelopeEl) return;

    const flowerPhysics = BACKDROP_FLOWERS.map((flower, index) => {
      const el = flowerRefs.current[index];
      const baseRot = flower.baseRot;
      const depth = flower.depth;
      const flexibility = 1 + (index % 2 === 0 ? 0.4 : 0.2);
      const lagFactor = 0.08 + index * 0.015;

      return {
        el,
        baseRot,
        depth,
        currentRot: baseRot,
        targetRot: baseRot,
        currentTiltX: 0,
        targetTiltX: 0,
        currentTranslateY: 0,
        targetTranslateY: 0,
        flexibility,
        lagFactor,
      };
    });

    let isHovering = false;
    let animFrameId = null;

    const updateFlowerPhysics = () => {
      let needsUpdate = false;

      flowerPhysics.forEach((item) => {
        if (!item.el) return;
        const diffRot = item.targetRot - item.currentRot;
        const diffTiltX = item.targetTiltX - item.currentTiltX;
        const diffY = item.targetTranslateY - item.currentTranslateY;

        if (
          Math.abs(diffRot) > 0.01 ||
          Math.abs(diffTiltX) > 0.01 ||
          Math.abs(diffY) > 0.1
        ) {
          needsUpdate = true;
          item.currentRot += diffRot * item.lagFactor;
          item.currentTiltX += diffTiltX * item.lagFactor;
          item.currentTranslateY += diffY * item.lagFactor;

          item.el.style.transform = `translateZ(${item.depth}px) rotate(${item.currentRot.toFixed(2)}deg) rotateX(${item.currentTiltX.toFixed(2)}deg) translateY(${item.currentTranslateY.toFixed(1)}px)`;
        } else if (!isHovering && item.currentRot !== item.baseRot) {
          item.currentRot = item.baseRot;
          item.currentTiltX = 0;
          item.currentTranslateY = 0;
          item.el.style.transform = `translateZ(${item.depth}px) rotate(${item.baseRot}deg)`;
        }
      });

      if (isHovering || needsUpdate) {
        animFrameId = requestAnimationFrame(updateFlowerPhysics);
      } else {
        animFrameId = null;
      }
    };

    const startPhysicsLoop = () => {
      if (!animFrameId) {
        animFrameId = requestAnimationFrame(updateFlowerPhysics);
      }
    };

    const maxTilt = 22;

    const handlePointerMove = (clientX, clientY) => {
      const rect = envelopeEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const normalizedX = (clientX - centerX) / (rect.width / 2);
      const normalizedY = (clientY - centerY) / (rect.height / 2);

      const clampedX = Math.max(-1.3, Math.min(1.3, normalizedX));
      const clampedY = Math.max(-1.3, Math.min(1.3, normalizedY));

      const rotateY = clampedX * maxTilt;
      const rotateX = -clampedY * maxTilt;

      envelopeEl.classList.remove("resting");
      envelopeEl.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(10px)`;

      flowerPhysics.forEach((item) => {
        const lateralPush = clampedX * (11 * item.flexibility);
        const verticalDip = Math.abs(clampedX) * 4 - clampedY * 6;
        const stemFlexX = -clampedY * 8 * item.flexibility;

        item.targetRot = item.baseRot + lateralPush;
        item.targetTiltX = stemFlexX;
        item.targetTranslateY = -verticalDip;
      });

      startPhysicsLoop();
    };
    const onMouseEnter = () => {
      isHovering = true;
      stageEl.classList.add("is-hovered");

      flowerPhysics.forEach((item, idx) => {
        const impulse = (idx % 2 === 0 ? 3.5 : -3.5) * item.flexibility;
        item.targetRot = item.baseRot + impulse;
      });

      startPhysicsLoop();
    };

    const onMouseMove = (e) => {
      if (!isHovering) {
        isHovering = true;
        stageEl.classList.add("is-hovered");
      }
      handlePointerMove(e.clientX, e.clientY);
    };

    const onMouseLeave = () => {
      isHovering = false;
      stageEl.classList.remove("is-hovered");
      envelopeEl.classList.add("resting");
      envelopeEl.style.transform =
        "rotateX(0deg) rotateY(0deg) translateZ(0px)";

      flowerPhysics.forEach((item) => {
        item.targetRot = item.baseRot;
        item.targetTiltX = 0;
        item.targetTranslateY = 0;
      });
      startPhysicsLoop();
    };

    const onTouchStart = () => {
      isHovering = true;
      stageEl.classList.add("is-hovered");

      flowerPhysics.forEach((item, idx) => {
        const impulse = (idx % 2 === 0 ? 3.5 : -3.5) * item.flexibility;
        item.targetRot = item.baseRot + impulse;
      });

      startPhysicsLoop();
    };

    const onTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        handlePointerMove(touch.clientX, touch.clientY);
      }
    };

    const onTouchEnd = () => {
      isHovering = false;
      stageEl.classList.remove("is-hovered");
      envelopeEl.classList.add("resting");
      envelopeEl.style.transform =
        "rotateX(0deg) rotateY(0deg) translateZ(0px)";

      flowerPhysics.forEach((item) => {
        item.targetRot = item.baseRot;
        item.targetTiltX = 0;
        item.targetTranslateY = 0;
      });
      startPhysicsLoop();
    };

    stageEl.addEventListener("mouseenter", onMouseEnter);
    stageEl.addEventListener("mousemove", onMouseMove);
    stageEl.addEventListener("mouseleave", onMouseLeave);
    stageEl.addEventListener("touchstart", onTouchStart, { passive: true });
    stageEl.addEventListener("touchmove", onTouchMove, { passive: true });
    stageEl.addEventListener("touchend", onTouchEnd);

    return () => {
      stageEl.removeEventListener("mouseenter", onMouseEnter);
      stageEl.removeEventListener("mousemove", onMouseMove);
      stageEl.removeEventListener("mouseleave", onMouseLeave);
      stageEl.removeEventListener("touchstart", onTouchStart);
      stageEl.removeEventListener("touchmove", onTouchMove);
      stageEl.removeEventListener("touchend", onTouchEnd);

      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
      }
    };
  }, []);

  return (
    <div
      className={`garden-wrapper ${isCurtainOpen ? "curtain-opened" : ""} ${
        isTransitioning ? "transitioning-out" : ""
      }`}
    >
      {/* Overlay Transisi Halus Halaman */}
      <div
        className={`page-transition-overlay ${isTransitioning ? "active" : ""}`}
      />

      {/* Container Efek Ladang Bunga (Background & Depth of Field) */}
      <div className="garden-background">
        <div className="sky-gradient"></div>
        <div className="sun-glow"></div>

        {/* Lapisan bukit & ladang bunga kabur di kejauhan (Depth Blur) */}
        <div className="meadow-layer layer-back blur-heavy"></div>
        <div className="meadow-layer layer-mid blur-soft"></div>
        <div className="meadow-layer layer-front"></div>

        {/* Partikel kelopak melayang & kilau cahaya */}
        <div id="particles-container" className="particles-container">
          {PARTICLES.map((p) => (
            <div key={p.id} className="particle" style={p.style} />
          ))}
          {SPARKLES.map((s) => (
            <div key={s.id} className="sparkle" style={s.style} />
          ))}
        </div>
      </div>

      {/* Konten Utama di Tengah Kebun (Amplop 3D Presisi) */}
      <main className="garden-content" id="mainContent">
        <div
          className="envelope-stage"
          id="envelopeStage"
          ref={envelopeStageRef}
        >
          {/* Layer 0: Rangkaian Bunga di Belakang Amplop */}
          <div className="envelope-flowers-backdrop" id="envelopeFlowers">
            {BACKDROP_FLOWERS.map((flower, idx) => (
              <div
                key={flower.className}
                ref={(el) => {
                  flowerRefs.current[idx] = el;
                }}
                className={`env-flower ${flower.className}`}
                data-base-rot={flower.baseRot}
                data-depth={flower.depth}
              >
                <div className="env-flower-inner">
                  <img
                    src={flower.img}
                    alt={flower.alt}
                    className="env-flower-img"
                  />
                </div>
              </div>
            ))}
          </div>

          <div
            className={`envelope-3d ${isPaperLifted ? "paper-lifted" : ""}`}
            id="envelope3D"
            ref={envelope3DRef}
            onClick={() => setIsPaperLifted((prev) => !prev)}
          >
            {/* Layer 1: Belakang Amplop (Evenlope Back & Open Flap) */}
            <img
              src={envelopeBackImg}
              alt="Amplop Belakang"
              className="env-layer env-layer-back"
            />

            {/* Layer 2: Kertas Surat (Evenlope Paper di dalam amplop) */}
            <div className="env-layer-paper-wrap" id="paperWrap">
              <img
                src={envelopePaperImg}
                alt="Kertas Surat"
                className="env-layer env-layer-paper"
              />

              {/* Konten Surat di Atas Kertas */}
              <div className="env-paper-letter">
                <h2 className="env-paper-title">Happy Birthday My Lovee</h2>
                <p className="env-paper-subtitle">26-09-2026</p>
                <button
                  type="button"
                  className="env-paper-btn"
                  onClick={handleOpenLetter}
                  aria-label="Open Our Story"
                >
                  <span>Open</span>
                </button>
              </div>
            </div>

            {/* Layer 3: Depan Amplop (Evenlope Front Pouch Flap) */}
            <img
              src={envelopeFrontImg}
              alt="Amplop Depan"
              className="env-layer env-layer-front"
            />

            {/* Dekorasi Karakter Siri Menempel di Badan Amplop */}
            <img
              src={siriWithHatImg}
              alt="Siri with Hat Decoration"
              className="env-envelope-sticker-siri"
            />

            {/* Bayangan 3D di bawah amplop */}
            <div className="envelope-shadow"></div>
          </div>
        </div>
      </main>

      {/* Tirai Bunga Pembuka Layar (Flower Gate Overlay) */}
      <div className="flower-curtain" id="flowerCurtain" onClick={openCurtain}>
        {/* Sayap Kiri Tirai Bunga */}
        <div className="curtain-wing curtain-left" id="curtainLeft">
          {LEFT_STEMS.map((stem) => (
            <div
              key={stem.className}
              className={`flower-stem ${stem.className}`}
            >
              <img src={stem.img} alt={stem.alt} className="iris-img" />
            </div>
          ))}
        </div>

        {/* Sayap Kanan Tirai Bunga */}
        <div className="curtain-wing curtain-right" id="curtainRight">
          {RIGHT_STEMS.map((stem) => (
            <div
              key={stem.className}
              className={`flower-stem ${stem.className}`}
            >
              <img src={stem.img} alt={stem.alt} className="iris-img" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
