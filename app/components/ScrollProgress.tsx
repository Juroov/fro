"use client";
import { useScroll, useSpring, motion, useReducedMotion } from "motion/react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const shouldReduce = useReducedMotion();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  if (shouldReduce) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        overflow: "hidden",
        zIndex: 100,
        pointerEvents: "none",
        maxWidth: "100vw",
      }}
      aria-hidden="true"
    >
      <motion.div
        className="fro-scroll-progress"
        style={{ scaleX, transformOrigin: "0%", width: "100%", height: "100%" }}
      />
    </div>
  );
}
