"use client";

import { useEffect, useRef } from "react";

export default function ScrollScale({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transform = "scale(1.03)";
          el.style.opacity = "1";
        } else {
          el.style.transform = "scale(1)";
          el.style.opacity = "0.85";
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transform: "scale(1)",
        opacity: "0.85",
        transition: "transform 0.6s ease, opacity 0.6s ease",
      }}
    >
      {children}
    </div>
  );
}
