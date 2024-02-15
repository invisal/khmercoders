"use client";

import React from "react";

import darkAnimationData from "./hero-media-dark.json";
import lightAnimationData from "./hero-media-light.json";
import { useTheme } from "next-themes";
import Lottie from "react-lottie";

export default function HeroBannerMedia() {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  // Determine which animation data to use based on the theme
  const animationData =
    currentTheme === "dark" ? darkAnimationData : lightAnimationData;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} width={320} height={320} />
    </div>
  );
}
