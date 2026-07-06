import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ScrollScale from "@/components/ScrollScale";
import ScrollFade from "@/components/ScrollFade";

export const metadata: Metadata = {
  title: "Historiska museet — Liam Callaghan",
  description: "VR & Interactive Exhibition Design — case study.",
};

// Paste your YouTube embed ID here (the part after watch?v=)
const YOUTUBE_ID: string = "cy83QGfxXjg";

export default function HistoriskaMus() {
  return (
    <div>

      {/* HEADER */}
      <div className="bg-white grid grid-cols-1 md:grid-cols-4 border-b border-[#e5e5e5] min-h-[70vh]">
        <div className="md:col-span-3 md:border-r border-b md:border-b-0 border-[#e5e5e5] p-6 md:p-10 flex flex-col justify-center relative">
          <Link
            href="/"
            className="absolute top-6 left-6 md:top-10 md:left-10 text-[10px] text-[#999] uppercase tracking-widest hover:text-[#5BB5A8] transition-colors"
          >
            ← Work
          </Link>
          <h1 className="text-[12vw] md:text-[10vw] font-bold leading-none text-black tracking-tight">
            Historiska museet
          </h1>
        </div>
        <div className="p-6 md:p-10 flex flex-col justify-center gap-10">
          <div>
            <p className="text-sm text-[#999] uppercase tracking-widest mb-3">Project Field</p>
            <p className="text-xl text-black font-semibold leading-tight">UX Research & Exhibition Design</p>
          </div>
          <div>
            <p className="text-sm text-[#999] uppercase tracking-widest mb-3">Project</p>
            <p className="text-xl text-black font-semibold leading-tight">VR & Interactive Exhibition</p>
          </div>
        </div>
      </div>

      {/* HERO IMAGE */}
      <div className="border-b border-[#1e1e1e] overflow-hidden">
        <ScrollScale>
          <Image
            src="/work/historiska-museet/hemse-church.jpeg"
            alt="Hemse Stave Church digital reconstruction"
            width={1280}
            height={720}
            className="w-full h-auto"
          />
        </ScrollScale>
      </div>

      {/* INTRO STATEMENT */}
      <div className="grid grid-cols-1 md:grid-cols-4 border-b border-[#1e1e1e]">
        <div className="md:col-span-3 md:border-r border-[#1e1e1e] px-6 py-14 md:px-10 md:py-20">
          <ScrollFade>
            <p className="text-2xl md:text-3xl lg:text-4xl text-white font-semibold leading-snug">
              A collaboration with the Swedish History Museum to redesign two connected experiences for an exhibition on Hemse Stave Church — a 12th-century site reconstructed digitally from archaeological findings.
            </p>
          </ScrollFade>
        </div>
        <div className="hidden md:block" />
      </div>

      {/* FIGMA OVERVIEW */}
      <div className="relative border-b border-[#1e1e1e] bg-[#0a0a0a] overflow-hidden">
        <span className="absolute top-6 left-6 text-base text-white uppercase tracking-widest z-10">Project Overview</span>
        <ScrollScale>
          <Image
            src="/work/historiska-museet/figma-overview.png"
            alt="Figma overview of redesign"
            width={1600}
            height={900}
            className="w-full h-auto"
          />
        </ScrollScale>
      </div>

      {/* RESEARCH FIRST */}
      <div className="grid grid-cols-1 md:grid-cols-4 border-b border-[#1e1e1e]">
        <div className="md:col-span-2 md:border-r border-[#1e1e1e] px-6 py-10 md:px-10 md:py-20 flex items-end">
          <ScrollFade>
            <p className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-none">
              Case Study
            </p>
          </ScrollFade>
        </div>
        <div className="md:col-span-2 px-6 pb-10 md:px-10 md:pb-20 md:pt-20 flex flex-col justify-end gap-4">
          <ScrollFade>
            <p className="text-lg text-[#888]">● ● ● ●&nbsp;&nbsp;Research First</p>
          </ScrollFade>
          <div className="space-y-3">
            {[
              "Rather than jumping to solutions, we started with observation and interviews at the exhibition. Two problems emerged clearly from the research.",
              "For the interactive screen — visitors rarely engaged with it, and when they did, their interest dropped quickly. The content existed but wasn't pulling people in.",
              "For the VR — navigation relied on users focusing their gaze on orange dots to move through the virtual space. Through observation we discovered this wasn't intuitive, and the absence of any onboarding meant users put on the headset with no idea how to start.",
            ].map((para, j) => (
              <ScrollFade key={j} delay={j * 100}>
                <p className="text-white leading-snug text-xl md:text-2xl">{para}</p>
              </ScrollFade>
            ))}
          </div>
        </div>
      </div>

      {/* SOLUTION 1 — UI SCREEN */}
      <div className="grid grid-cols-1 md:grid-cols-4 border-b border-[#1e1e1e]">
        <div className="md:col-span-2 md:border-r border-[#1e1e1e] px-6 py-10 md:px-10 md:py-20 flex items-end" />
        <div className="md:col-span-2 px-6 pb-10 md:px-10 md:pb-20 md:pt-20 flex flex-col justify-end gap-4">
          <ScrollFade>
            <p className="text-lg text-[#888]">● ● ● ●&nbsp;&nbsp;The Solutions</p>
          </ScrollFade>
          <ScrollFade delay={100}>
            <p className="text-white leading-snug text-xl md:text-2xl">
              For the interactive screen we restructured the content into four distinct sections — the reconstruction itself, missing archaeological components, findings from the excavation, and historical context. A startup page was added to orient visitors before they engaged.
            </p>
          </ScrollFade>
        </div>
      </div>

      {/* SCREEN GALLERY */}
      <div className="grid grid-cols-2 border-b border-[#1e1e1e]">
        <div className="overflow-hidden border-r border-b border-[#1e1e1e]">
          <ScrollScale>
            <Image src="/work/historiska-museet/hm-explore.png" alt="Explore Hemse Stave Church — start screen" width={1440} height={810} className="w-full h-auto" />
          </ScrollScale>
        </div>
        <div className="overflow-hidden border-b border-[#1e1e1e]">
          <ScrollScale>
            <Image src="/work/historiska-museet/hm-what-remains.png" alt="What Remains — 67 wooden pieces" width={1440} height={810} className="w-full h-auto" />
          </ScrollScale>
        </div>
        <div className="overflow-hidden border-r border-[#1e1e1e]">
          <ScrollScale>
            <Image src="/work/historiska-museet/hm-what-is-missing.png" alt="What Is Missing — reconstruction" width={1440} height={810} className="w-full h-auto" />
          </ScrollScale>
        </div>
        <div className="overflow-hidden">
          <ScrollScale>
            <Image src="/work/historiska-museet/hm-in-depth.png" alt="In-Depth Text — Hemse Stave Church" width={1440} height={810} className="w-full h-auto" />
          </ScrollScale>
        </div>
      </div>

      {/* SOLUTION 2 — VR */}
      <div className="grid grid-cols-1 md:grid-cols-4 border-b border-[#1e1e1e]">
        <div className="md:col-span-2 md:border-r border-[#1e1e1e] px-6 py-10 md:px-10 md:py-20 flex items-end" />
        <div className="md:col-span-2 px-6 pb-10 md:px-10 md:pb-20 md:pt-20 flex flex-col justify-end gap-4">
          <ScrollFade>
            <p className="text-lg text-[#888]">● ● ● ●&nbsp;&nbsp;The Solutions</p>
          </ScrollFade>
          <ScrollFade delay={100}>
            <p className="text-white leading-snug text-xl md:text-2xl">
              For the VR, targeted changes came directly from the research. Orange navigation dots were replaced with arrows — a universally understood symbol — and an instruction screen was added at the start of every session, triggered by tilting the head upward since the headset has no physical buttons. To see the changes in action, watch the video below.
            </p>
          </ScrollFade>
        </div>
      </div>

      {/* WHAT THIS PROJECT SHOWS */}
      <div className="grid grid-cols-1 md:grid-cols-4 border-b border-[#1e1e1e]">
        <div className="md:col-span-2 md:border-r border-[#1e1e1e] px-6 pb-10 md:px-10 md:pb-20 md:pt-20 flex flex-col justify-end gap-4">
          <ScrollFade>
            <p className="text-lg text-[#888]">● ● ● ●&nbsp;&nbsp;What This Project Shows</p>
          </ScrollFade>
          <ScrollFade delay={100}>
            <p className="text-white leading-snug text-xl md:text-2xl">
              Both changes are small. Neither required a visual overhaul. They came entirely from watching real people struggle with the existing experience and making precise decisions based on what was observed — which is what UX research is for.
            </p>
          </ScrollFade>
        </div>
        <div className="hidden md:block md:col-span-2" />
      </div>

      {/* VIDEO */}
      <div className="border-b border-[#1e1e1e] bg-[#0a0a0a] py-14 md:py-20 px-6 md:px-10">
        <p className="text-sm text-[#888] uppercase tracking-widest mb-8">Walkthrough</p>
        {YOUTUBE_ID === "YOUR_VIDEO_ID" ? (
          <div className="w-full aspect-video bg-[#111] border border-[#1e1e1e] rounded-sm flex items-center justify-center">
            <p className="text-[#555] text-sm">Paste your YouTube video ID into YOUTUBE_ID at the top of this file</p>
          </div>
        ) : (
          <div className="w-full aspect-video">
            <iframe
              className="w-full h-full rounded-sm"
              src={`https://www.youtube.com/embed/${YOUTUBE_ID}`}
              title="Historiska museet walkthrough"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="px-6 py-12 md:px-10 md:py-16">
        <Link
          href="/"
          className="text-[10px] text-[#444] uppercase tracking-widest hover:text-[#5BB5A8] transition-colors"
        >
          ← Back to Work
        </Link>
      </div>

    </div>
  );
}
