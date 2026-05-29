import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import d1 from "@/assets/darshan-1.png";
import d2 from "@/assets/darshan-2.png";
import d3 from "@/assets/darshan-3.png";
import d4 from "@/assets/darshan-4.png";
import d5 from "@/assets/darshan-5.png";

type Anim =
  | "panLeft"
  | "panRight"
  | "zoomIn"
  | "zoomOut"
  | "tiltUp"
  | "tiltDown"
  | "diagonal"
  | "spinIn";

const slides: { src: string; anim: Anim }[] = [
  { src: d1, anim: "panLeft" },
  { src: d2, anim: "zoomIn" },
  { src: d3, anim: "panRight" },
  { src: d4, anim: "tiltUp" },
  { src: d5, anim: "diagonal" },
];

const IMG_MS = 1100;

function variantFor(anim: Anim) {
  switch (anim) {
    case "panLeft":
      return { initial: { x: -160, scale: 1.1, opacity: 0 }, animate: { x: 60, scale: 1.15, opacity: 1 } };
    case "panRight":
      return { initial: { x: 160, scale: 1.1, opacity: 0 }, animate: { x: -60, scale: 1.15, opacity: 1 } };
    case "zoomIn":
      return { initial: { scale: 0.85, opacity: 0 }, animate: { scale: 1.25, opacity: 1 } };
    case "zoomOut":
      return { initial: { scale: 1.4, opacity: 0 }, animate: { scale: 1, opacity: 1 } };
    case "tiltUp":
      return { initial: { y: 120, scale: 1.1, opacity: 0, rotate: -3 }, animate: { y: -40, scale: 1.2, opacity: 1, rotate: 0 } };
    case "tiltDown":
      return { initial: { y: -120, scale: 1.1, opacity: 0, rotate: 3 }, animate: { y: 40, scale: 1.2, opacity: 1, rotate: 0 } };
    case "diagonal":
      return { initial: { x: -120, y: 80, scale: 1.1, opacity: 0 }, animate: { x: 60, y: -40, scale: 1.2, opacity: 1 } };
    case "spinIn":
      return { initial: { scale: 0.6, rotate: -15, opacity: 0 }, animate: { scale: 1.15, rotate: 0, opacity: 1 } };
  }
}

export function Intro({ onDone }: { onDone: () => void }) {
  const [index, setIndex] = useState(0);
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    if (showTitle) {
      const t = setTimeout(onDone, 3200);
      return () => clearTimeout(t);
    }
    if (index >= slides.length) {
      setShowTitle(true);
      return;
    }
    const t = setTimeout(() => setIndex((i) => i + 1), IMG_MS);
    return () => clearTimeout(t);
  }, [index, showTitle, onDone]);

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-amber-700/10 blur-[100px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-yellow-600/10 blur-[100px]" />
      </div>

      <button
        onClick={onDone}
        className="absolute top-6 right-6 z-20 rounded-full border border-amber-400/40 bg-black/40 px-4 py-2 text-xs uppercase tracking-[0.25em] text-amber-200 backdrop-blur hover:bg-amber-400/10 transition"
      >
        Skip Intro
      </button>

      <AnimatePresence mode="sync">
        {!showTitle && index < slides.length && (() => {
          const s = slides[index];
          const v = variantFor(s.anim);
          return (
            <motion.div
              key={index}
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <motion.img
                src={s.src}
                alt=""
                className="h-[80vh] w-auto max-w-[90vw] object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
                initial={v.initial}
                animate={v.animate}
                transition={{ duration: (IMG_MS + 500) / 1000, ease: "easeOut" }}
              />
              <div className="pointer-events-none absolute inset-0 vignette" />
            </motion.div>
          );
        })()}

        {showTitle && (
          <motion.div
            key="title"
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0, filter: "blur(20px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-display text-amber-300/80 tracking-[0.5em] text-xs sm:text-sm mb-6">
                CHALLENGING STAR
              </p>
              <h1 className="font-display gold-gradient glow-gold text-6xl sm:text-8xl md:text-9xl font-bold">
                DARSHAN
              </h1>
              <motion.div
                className="mx-auto mt-8 h-px w-64 gold-line"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 1.4 }}
              />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 1 }}
                className="mt-6 text-amber-100/60 tracking-[0.4em] text-[10px] sm:text-xs uppercase"
              >
                A Fan Tribute
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
