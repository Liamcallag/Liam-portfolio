"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="px-6 md:px-12 py-6 flex justify-between items-center border-b border-[#1e1e1e]">
      <Link
        href="/"
        className="text-sm font-medium tracking-tight hover:text-[#5BB5A8] transition-colors"
      >
        Liam Callaghan
      </Link>
      <nav className="flex gap-8 text-sm">
        {[
          { label: "Work", href: "/#work" },
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
        ].map(({ label, href }) => {
          const isActive =
            href.startsWith("/#")
              ? pathname === "/"
              : pathname === href;
          return (
            <Link
              key={label}
              href={href}
              className={`transition-colors hover:text-[#5BB5A8] ${
                isActive ? "text-[#e8e8e8]" : "text-[#999]"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
