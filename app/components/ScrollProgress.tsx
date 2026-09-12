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
    <motion.div
      className="fro-scroll-progress"
      style={{ scaleX, transformOrigin: "0%" }}
      aria-hidden="true"
    />
  );
}
