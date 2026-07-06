import Link from "next/link";
import HeroText from "@/components/HeroText";
import ProjectList from "@/components/ProjectList";

export default function Home() {
  return (
    <div className="px-6 md:px-12">
      <HeroText />

      {/* Availability / intent */}
      <div className="border-t border-[#1e1e1e] pt-8 pb-14 md:pb-20 max-w-2xl">
        <p className="text-[#888] text-base md:text-lg leading-relaxed">
          Open to full-time roles in Stockholm as a designer who builds — UI/UX design, design engineering, or frontend design. Particularly interested in studios and startups working with AI products and tooling.
        </p>
      </div>

      <p className="text-[#777] text-sm mb-14">
        Currently training under a world-leading martial arts master in Japan.{" "}
        <Link href="/about" className="text-[#5BB5A8] hover:underline">
          → About
        </Link>
      </p>

      <ProjectList />
    </div>
  );
}
