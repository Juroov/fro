"use client";
import dynamic from "next/dynamic";

const SolarIntroAnimation = dynamic(
  () => import("./SolarIntroAnimation"),
  { ssr: false }
);

export default function IntroAnimationClient() {
  return <SolarIntroAnimation />;
}
