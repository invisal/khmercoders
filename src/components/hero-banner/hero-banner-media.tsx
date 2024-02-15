"use client";

import React from "react";

import darkAnimationData from "./hero-media-dark.json";
import lightAnimationData from "./hero-media-light.json";
import Lottie from "lottie-react";
import { useTheme } from "next-themes";

export default function HeroBannerMedia() {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const animationData =
    currentTheme === "dark" ? darkAnimationData : lightAnimationData;

  return (
    <div>
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ width: 320, height: 320 }}
        rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
      />
    </div>
  );
}
