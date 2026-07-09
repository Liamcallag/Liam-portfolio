import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact — Liam Callaghan",
  description: "Get in touch with Liam Callaghan.",
};

export default function Contact() {
  return (
    <div className="px-6 md:px-12 pt-16 pb-24 md:pt-20 md:pb-32">
      <div className="max-w-2xl">
        <p className="text-xs text-[#444] uppercase tracking-widest mb-10">Contact</p>

        <h1 className="text-3xl md:text-4xl font-semibold leading-tight tracking-tight mb-6">
          Let&apos;s talk.
        </h1>
        <p className="text-[#666] text-base mb-16 leading-relaxed">
          Available for UI/UX and frontend roles in Stockholm from September 2026.
        </p>

        <div className="space-y-6">
          <div className="border-t border-[#1e1e1e] pt-6 flex items-center justify-between">
            <div>
              <p className="text-xs text-[#444] uppercase tracking-widest mb-1">Email</p>
              <Link
                href="mailto:liamcallag@gmail.com"
                className="text-[#e8e8e8] hover:text-[#5BB5A8] transition-colors"
              >
                liamcallag@gmail.com
              </Link>
            </div>
            <span className="text-[#333]">→</span>
          </div>

          <div className="border-t border-[#1e1e1e] pt-6 flex items-center justify-between">
            <div>
              <p className="text-xs text-[#444] uppercase tracking-widest mb-1">LinkedIn</p>
              <Link
                href="https://linkedin.com/in/liam-callaghan-02aa64199"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#e8e8e8] hover:text-[#5BB5A8] transition-colors"
              >
                linkedin.com/in/liam-callaghan-02aa64199
              </Link>
            </div>
            <span className="text-[#333]">→</span>
          </div>
        </div>
      </div>
    </div>
  );
}
