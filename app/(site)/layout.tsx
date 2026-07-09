import Nav from "@/components/Nav";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full flex flex-col bg-black text-[#F6F6F6] antialiased">
      <Nav />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-[#1e1e1e] px-6 md:px-12 py-6 text-[#444] text-xs flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <span>Liam Callaghan — © 2026</span>
        <div className="flex gap-6">
          <a href="mailto:liamcallag@gmail.com" className="hover:text-[#F6F6F6] transition-colors">liamcallag@gmail.com</a>
          <a href="https://linkedin.com/in/liam-callaghan-02aa64199" target="_blank" rel="noopener noreferrer" className="hover:text-[#F6F6F6] transition-colors">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
}
