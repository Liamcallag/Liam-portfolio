"use client";

import { useState } from "react";
import Image from "next/image";

interface FlipCardProps {
  afterSrc: string;
  afterAlt: string;
  beforeSrc: string;
  beforeAlt: string;
}

export default function FlipCard({ afterSrc, afterAlt, beforeSrc, beforeAlt }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative w-full cursor-pointer"
      style={{ perspective: "1200px", aspectRatio: "16 / 9" }}
      onClick={() => setFlipped(!flipped)}
    >
      {/* Rotating inner */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.7s ease",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* FRONT — After */}
        <div
          className="absolute inset-0 rounded-sm overflow-hidden border border-[#2a2a2a]"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Image src={afterSrc} alt={afterAlt} fill className="object-cover" />
          <span className="absolute top-3 left-3 text-[10px] uppercase tracking-widest font-semibold text-white bg-[#5BB5A8] px-2 py-1 rounded-sm z-10">
            After
          </span>
          <span className="absolute bottom-3 right-3 text-[10px] uppercase tracking-widest text-[#5BB5A8] border border-[#5BB5A8] px-2 py-1 rounded-sm bg-black/60 z-10">
            Click to compare ↺
          </span>
        </div>

        {/* BACK — Before */}
        <div
          className="absolute inset-0 rounded-sm overflow-hidden border border-[#2a2a2a]"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <Image src={beforeSrc} alt={beforeAlt} fill className="object-cover" />
          <span className="absolute top-3 left-3 text-[10px] uppercase tracking-widest font-semibold text-white bg-[#444] px-2 py-1 rounded-sm z-10">
            Before
          </span>
          <span className="absolute bottom-3 right-3 text-[10px] uppercase tracking-widest text-[#aaa] border border-[#444] px-2 py-1 rounded-sm bg-black/60 z-10">
            Click to flip back ↺
          </span>
        </div>
      </div>
    </div>
  );
}
