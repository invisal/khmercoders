"use client";

import animationData from "./hero-media.json";
import Lottie from "react-lottie";

export default function HeroBannerMedia() {
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
