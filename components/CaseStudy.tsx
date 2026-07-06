import Link from "next/link";
import Image from "next/image";
import ScrollScale from "@/components/ScrollScale";
import ScrollFade from "@/components/ScrollFade";

interface Section {
  heading: string;
  body: string | string[];
  image?: { src: string; alt: string };
  image2?: { src: string; alt: string; text?: string };
  mobileImages?: { src: string; alt: string; caption?: string }[];
}

interface CaseStudyProps {
  category: string;
  title: string;
  subtitle: string;
  url?: string;
  intro?: string;
  heroImage: { src: string; alt: string };
  heroCrop?: boolean;
  secondaryImage?: { src: string; alt: string };
  sections: Section[];
}

export default function CaseStudy({
  category,
  title,
  subtitle,
  url,
  intro,
  heroImage,
  heroCrop = false,
  secondaryImage,
  sections,
}: CaseStudyProps) {
  return (
    <div>

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <div className="bg-white grid grid-cols-1 md:grid-cols-4 border-b border-[#e5e5e5] min-h-[70vh]">

        {/* Col 1-3: back link pinned top, title centered */}
        <div className="md:col-span-3 md:border-r border-b md:border-b-0 border-[#e5e5e5] p-6 md:p-10 flex flex-col justify-center relative">
          <Link
            href="/"
            className="absolute top-6 left-6 md:top-10 md:left-10 text-[10px] text-[#999] uppercase tracking-widest hover:text-[#5BB5A8] transition-colors"
          >
            ← Work
          </Link>
          <h1 className="text-[14vw] md:text-[10vw] font-bold leading-none text-black tracking-tight">
            {title}
          </h1>
        </div>

        {/* Col 4: metadata centered */}
        <div className="p-6 md:p-10 flex flex-col justify-center gap-10">
          <div>
            <p className="text-sm text-[#999] uppercase tracking-widest mb-3">Project Field</p>
            <p className="text-xl text-black font-semibold leading-tight">{category}</p>
          </div>
          <div>
            <p className="text-sm text-[#999] uppercase tracking-widest mb-3">Project</p>
            <p className="text-xl text-black font-semibold leading-tight">{subtitle}</p>
          </div>
          {url && (
            <div>
              <p className="text-sm text-[#999] uppercase tracking-widest mb-3">URL</p>
              <Link
                href={`https://${url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-[#5BB5A8] hover:underline"
              >
                {url}
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* ── HERO IMAGE ─────────────────────────────────────────────────────── */}
      <div className={`bg-[#0a0a0a] overflow-hidden ${heroCrop ? "max-h-[88vh]" : ""}`}>
        <ScrollScale>
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            width={1600}
            height={900}
            className={`w-full h-auto ${heroCrop ? "-mt-[6%]" : ""}`}
            priority
          />
        </ScrollScale>
      </div>

      {/* ── INTRO STATEMENT ────────────────────────────────────────────────── */}
      {intro && (
        <div className="grid grid-cols-1 md:grid-cols-4 border-t border-b border-[#1e1e1e]">
          <div className="md:col-span-3 md:border-r border-[#1e1e1e] px-6 py-14 md:px-10 md:py-20">
            <ScrollFade>
              <p className="text-2xl md:text-3xl lg:text-4xl text-white font-semibold leading-snug">
                {intro}
              </p>
            </ScrollFade>
          </div>
          <div className="hidden md:block" />
        </div>
      )}

      {/* ── SECONDARY IMAGE ────────────────────────────────────────────────── */}
      {secondaryImage && (
        <div className="bg-[#0a0a0a] py-10 max-h-[100vh] overflow-hidden flex items-start justify-center border-b border-[#1e1e1e]">
          <ScrollScale>
            <Image
              src={secondaryImage.src}
              alt={secondaryImage.alt}
              width={1600}
              height={900}
              className="w-full h-auto rounded-sm shadow-xl"
            />
          </ScrollScale>
        </div>
      )}

      {/* ── CASE STUDY SECTIONS ────────────────────────────────────────────── */}
      {sections.map((section, i) => {
        const onRight = i % 2 === 0;
        const body = Array.isArray(section.body) ? section.body : [section.body];

        return (
          <div key={i}>

            {/* Text row — alternates left/right */}
            <div className="grid grid-cols-1 md:grid-cols-4 border-b border-[#1e1e1e]">
              {onRight ? (
                <>
                  {/* Left: "Case Study" on first section only */}
                  <div className="hidden md:flex md:col-span-2 border-r border-[#1e1e1e] px-10 py-28 items-start">
                    {i === 0 && (
                      <p className="text-6xl lg:text-7xl font-bold text-white leading-none">
                        Case Study
                      </p>
                    )}
                  </div>
                  {/* Right: content */}
                  <div className="md:col-span-2 px-6 py-14 md:px-10 md:py-28 flex flex-col justify-center gap-5">
                    <ScrollFade>
                      <p className="text-lg text-[#888]">
                        ● ● ● ●&nbsp;&nbsp;{section.heading}
                      </p>
                    </ScrollFade>
                    <div className="space-y-3">
                      {body.map((para, j) => (
                        <ScrollFade key={j} delay={j * 100}>
                          <p className="text-white leading-snug text-xl md:text-2xl">
                            {para}
                          </p>
                        </ScrollFade>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Left: content */}
                  <div className="md:col-span-2 border-r border-[#1e1e1e] px-6 py-14 md:px-10 md:py-28 flex flex-col justify-end gap-5">
                    <ScrollFade>
                      <p className="text-lg text-[#888]">
                        ● ● ● ●&nbsp;&nbsp;{section.heading}
                      </p>
                    </ScrollFade>
                    <div className="space-y-3">
                      {body.map((para, j) => (
                        <ScrollFade key={j} delay={j * 100}>
                          <p className="text-white leading-snug text-xl md:text-2xl">
                            {para}
                          </p>
                        </ScrollFade>
                      ))}
                    </div>
                  </div>
                  {/* Right: empty */}
                  <div className="hidden md:block md:col-span-2" />
                </>
              )}
            </div>

            {/* Section image — framed on dark */}
            {section.image && (
              <div className="bg-[#0a0a0a] py-10 flex items-center justify-center border-b border-[#1e1e1e] overflow-hidden">
                <ScrollScale>
                  <Image
                    src={section.image.src}
                    alt={section.image.alt}
                    width={1600}
                    height={900}
                    className="w-full h-auto rounded-sm shadow-xl"
                  />
                </ScrollScale>
              </div>
            )}

            {/* Section image2 — with optional side text */}
            {section.image2 && (
              <div className="grid grid-cols-1 md:grid-cols-4 border-b border-[#1e1e1e]">
                {section.image2.text && (
                  <div className="md:col-span-1 border-b md:border-b-0 md:border-r border-[#1e1e1e] px-6 py-10 md:px-10 flex flex-col justify-center">
                    <p className="text-white leading-snug text-lg">{section.image2.text}</p>
                  </div>
                )}
                <div className={`${section.image2.text ? "md:col-span-3" : "md:col-span-4"} bg-[#0a0a0a] py-10 flex items-center justify-center`}>
                  <Image
                    src={section.image2.src}
                    alt={section.image2.alt}
                    width={1600}
                    height={900}
                    className="w-full h-auto rounded-sm shadow-xl"
                  />
                </div>
              </div>
            )}

            {/* Mobile screenshots — 3-column grid */}
            {section.mobileImages && section.mobileImages.length > 0 && (
              <div className="grid grid-cols-3 border-b border-[#1e1e1e]">
                {section.mobileImages.map((img, j) => (
                  <div
                    key={j}
                    className={`overflow-hidden ${j < section.mobileImages!.length - 1 ? "border-r border-[#1e1e1e]" : ""}`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={400}
                      height={720}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            )}

          </div>
        );
      })}

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
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
