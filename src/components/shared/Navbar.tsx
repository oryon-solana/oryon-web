import Image from "next/image";
import { Button } from "@/components/ui/button";

const links = ["Swap", "Rewards", "Ecosystem", "Developers", "Docs"];

const Navbar = () => (
  <header className="fixed inset-x-0 top-0 z-50 flex h-[60px] items-center justify-between px-12 bg-[#080b10]/85 backdrop-blur-md border-b border-[#1e2a3a]">
    <a href="#" className="flex items-center gap-2.5 shrink-0">
      <Image
        src="/logo-color.svg"
        alt="Oryon"
        width={100}
        height={28}
        className="h-7 w-auto"
        priority
      />
    </a>

    <ul className="hidden md:flex items-center gap-8 list-none">
      {links.map((l) => (
        <li key={l}>
          <a
            href="#"
            className="text-[13.5px] font-medium text-[#7a90a8] hover:text-[#e8f0f8] transition-colors tracking-wide"
          >
            {l}
          </a>
        </li>
      ))}
    </ul>

    <div className="flex items-center gap-3">
      <Button
        variant="ghost"
        size="sm"
        className="text-[13.5px] text-[#7a90a8] hover:text-[#e8f0f8] hover:bg-transparent"
      >
        Sign In
      </Button>
      <Button
        size="sm"
        className="bg-primary hover:bg-primary/90 text-white text-[13px] font-semibold px-5 rounded-md tracking-wide transition-all hover:shadow-[0_0_20px_oklch(0.60_0.22_250_/_0.3)]"
      >
        Launch App →
      </Button>
    </div>
  </header>
);

export default Navbar;
