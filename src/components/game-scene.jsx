"use client";

import { useEffect, useRef } from "react";
import { initGame } from "@/game/init";

export default function GameScene() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const cleanup = initGame(canvasRef.current);

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <canvas ref={canvasRef} />
  );
}
