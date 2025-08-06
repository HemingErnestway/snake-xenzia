"use client";

import dynamic from "next/dynamic";

const DynamicGameScene = dynamic(
  () => import("@/components/game-scene"),
  { ssr: false },
);

export default function Home() {
  return (
    <div className="home">
      <DynamicGameScene />
    </div>
  );
}
