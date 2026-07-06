"use client";

import { useEffect, useState } from "react";

function WordReveal({
  text,
  dim = false,
  startDelay,
  visible,
}: {
  text: string;
  dim?: boolean;
  startDelay: number;
  visible: boolean;
}) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block"
          style={{
            color: dim ? "#3a3a3a" : "#F6F6F6",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition: `opacity 0.6s ease ${startDelay + i * 70}ms, transform 0.6s ease ${startDelay + i * 70}ms`,
          }}
        >
          {word}
          {i < words.length - 1 ? "\u00a0" : ""}
        </span>
      ))}
    </>
  );
}

export default function HeroText() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <section className="pt-20 pb-10 md:pt-28 md:pb-12 max-w-5xl">
      <p
        className="text-[#5BB5A8] text-xs uppercase tracking-widest mb-8 font-medium"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.6s ease 80ms, transform 0.6s ease 80ms",
        }}
      >
        Available September 2026 — Stockholm
      </p>

      <h1 className="text-[2.6rem] md:text-[4.5rem] lg:text-[5.5rem] font-semibold leading-[1.05] tracking-tight overflow-hidden">
        <WordReveal text="Designer & Builder." startDelay={180} visible={visible} />
      </h1>
    </section>
  );
}
