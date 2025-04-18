"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React from "react";

function LottieReact({ url }: { url: string }) {
  return (
    <div>
      <DotLottieReact src={url} loop autoplay />
    </div>
  );
}

export default LottieReact;
