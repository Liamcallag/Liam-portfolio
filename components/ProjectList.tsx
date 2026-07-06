"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";

const projects = [
  {
    num: "01",
    title: "Body Burden",
    subtitle: "Microplastics Exposure Calculator",
    slug: "body-burden",
    year: "2026",
    thumb: "/work/body-burden/bb-hero.png",
    rotation: 0,
  },
  {
    num: "02",
    title: "Historiska museet",
    subtitle: "VR & Interactive Exhibition Design",
    slug: "historiska-museet",
    year: "2023",
    thumb: "/work/historiska-museet/hemse-start.png",
    rotation: 0,
  },
  {
    num: "03",
    title: "Florida Driving Ranges",
    subtitle: "Niche Directory",
    slug: "florida-driving-ranges",
    year: "2026",
    thumb: "/work/florida-driving-ranges/fdr-hero.png",
    rotation: 0,
  },
  {
    num: "04",
    title: "Backlink Agent",
    subtitle: "AI Outreach Pipeline",
    slug: "backlink-agent",
    year: "2026",
    thumb: "/work/backlink-agent/agent-dashboard.png",
    rotation: 0,
  },
];

export default function ProjectList() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const thumbRef = useRef<HTMLImageElement>(null);
  const cur = useRef({ x: -400, y: -400 });
  const tgt = useRef({ x: -400, y: -400 });
  const raf = useRef<number>(0);

  // Always-running lerp loop — updates DOM directly, no re-renders
  useEffect(() => {
    const tick = () => {
      cur.current.x += (tgt.current.x - cur.current.x) * 0.12;
      cur.current.y += (tgt.current.y - cur.current.y) * 0.12;
      if (thumbRef.current) {
        thumbRef.current.style.left = `${cur.current.x}px`;
        thumbRef.current.style.top = `${cur.current.y}px`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  // Track cursor globally, offset 20px right, 60px up
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      tgt.current.x = e.clientX + 20;
      tgt.current.y = e.clientY - 60;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const handleEnter = useCallback((slug: string) => {
    // Snap to cursor immediately so it doesn't slide in from off-screen
    cur.current.x = tgt.current.x;
    cur.current.y = tgt.current.y;
    setActiveSlug(slug);
  }, []);

  const handleLeave = useCallback(() => setActiveSlug(null), []);

  const activeProject = projects.find((p) => p.slug === activeSlug) ?? projects[0];

  return (
    <section id="work" className="pb-24 md:pb-32">
      {/* Cursor-following thumbnail — single element, opacity-toggled */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={thumbRef}
        src={activeProject.thumb}
        alt={activeProject.title}
        style={{
          position: "fixed",
          width: "280px",
          height: "auto",
          left: `${cur.current.x}px`,
          top: `${cur.current.y}px`,
          transform: `rotate(${activeProject.rotation}deg)`,
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          borderRadius: "8px",
          pointerEvents: "none",
          zIndex: 50,
          opacity: activeSlug ? 1 : 0,
          transition: "opacity 0.2s ease, transform 0.25s ease",
        }}
      />

      {/* Column header */}
      <div className="flex items-center justify-between mb-0 pb-4 border-b border-[#1e1e1e]">
        <span className="text-xs text-[#444] uppercase tracking-widest">Selected Work</span>
        <span className="text-xs text-[#444] uppercase tracking-widest hidden md:block">Year</span>
      </div>

      {/* Project rows */}
      <div className="divide-y divide-[#1e1e1e]">
        {projects.map((p) => (
          <Link
            key={p.slug}
            href={`/work/${p.slug}`}
            className="group relative flex items-center justify-between py-6 md:py-7 -mx-6 px-6 md:-mx-12 md:px-12 transition-colors overflow-hidden"
            style={{ backgroundColor: activeSlug === p.slug ? "#0d0d0d" : "transparent" }}
            onMouseEnter={() => handleEnter(p.slug)}
            onMouseLeave={handleLeave}
          >
            {/* Sliding left border accent */}
            <span className="absolute left-0 top-0 h-full w-[2px] bg-[#5BB5A8] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out" />

            <div className="flex items-start gap-6 md:gap-10 flex-1 min-w-0">
              <span className="text-xs text-[#333] font-mono pt-1.5 shrink-0 select-none">
                {p.num}
              </span>
              <div className="min-w-0">
                <h2 className="text-xl md:text-2xl font-medium text-[#e8e8e8] group-hover:text-[#5BB5A8] transition-colors leading-tight">
                  {p.title}
                </h2>
                <p className="text-[#555] text-sm mt-1">{p.subtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 shrink-0 ml-4">
              <span className="text-[#333] text-sm hidden md:block">{p.year}</span>
              <span className="text-[#333] group-hover:text-[#5BB5A8] transition-colors text-lg leading-none">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
