import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About — Liam Callaghan",
  description:
    "UI/UX designer and frontend developer. Building research-backed digital products from concept to launch.",
};

const stack = [
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Supabase",
  "Figma",
  "Anthropic API",
];

export default function About() {
  return (
    <div className="px-6 md:px-12 pt-16 pb-24 md:pt-20 md:pb-32">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24">

        {/* Left: text */}
        <div className="md:col-span-2 max-w-2xl">
          <p className="text-xs text-[#444] uppercase tracking-widest mb-10">About</p>

          <h1 className="text-3xl md:text-4xl font-semibold leading-tight tracking-tight mb-10">
            Liam Callaghan
          </h1>

          <div className="space-y-5 text-[#999] text-base leading-relaxed mb-16">
            <p className="text-[#c8c8c8]">
              I&apos;m a UI/UX designer and frontend developer based in Japan, relocating to Stockholm in September 2026.
            </p>
            <p>
              I hold a degree in IT, Media &amp; Design from Södertörns högskola. Since graduating I&apos;ve built and shipped my own digital products independently — a science-backed microplastics exposure calculator, a niche directory generating organic traffic, and an AI-powered outreach agent built on the Anthropic API. I work across the full stack: Next.js, Supabase, Tailwind CSS, TypeScript, and Figma.
            </p>
            <p>
              Two years ago I made a decision that had nothing to do with design — I moved to Japan to train Shorinji Kempo under one of the discipline&apos;s world-leading masters. I&apos;ve trained for over 12 years. To fully access my teacher&apos;s knowledge I committed to learning Japanese, which I&apos;ve done. It&apos;s the same approach I bring to everything: identify what matters, go deep, don&apos;t cut corners.
            </p>
            <p className="text-[#c8c8c8]">
              Available for work in Stockholm from September 2026.
            </p>
          </div>

          {/* Stack */}
          <div className="mb-16">
            <p className="text-xs text-[#444] uppercase tracking-widest mb-5">Stack</p>
            <div className="flex flex-wrap gap-2">
              {stack.map((tool) => (
                <span
                  key={tool}
                  className="text-sm text-[#888] border border-[#1e1e1e] px-3 py-1.5 rounded-sm"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Contact links */}
          <div>
            <p className="text-xs text-[#444] uppercase tracking-widest mb-5">Contact</p>
            <div className="flex flex-col gap-3">
              <Link
                href="mailto:liamcallag@gmail.com"
                className="text-[#e8e8e8] hover:text-[#5BB5A8] transition-colors text-sm flex items-center gap-2 group"
              >
                <span className="text-[#333] group-hover:text-[#5BB5A8] transition-colors">→</span>
                liamcallag@gmail.com
              </Link>
              <Link
                href="https://linkedin.com/in/liam-callaghan-02aa64199"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#e8e8e8] hover:text-[#5BB5A8] transition-colors text-sm flex items-center gap-2 group"
              >
                <span className="text-[#333] group-hover:text-[#5BB5A8] transition-colors">→</span>
                LinkedIn
              </Link>
            </div>
          </div>
        </div>

        {/* Right: photo */}
        <div className="md:col-span-1 flex flex-col gap-4 md:pt-10">
          <Image
            src="/kempo.jpg"
            alt="Liam Callaghan training Shorinji Kempo in Japan"
            width={600}
            height={800}
            className="w-full h-auto rounded-sm"
          />
          <p className="text-xs text-[#444] leading-snug">
            Training Shorinji Kempo in Japan, 2026.
          </p>
        </div>

      </div>
    </div>
  );
}
