import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const links = ["Swap", "Rewards", "Ecosystem", "Developers", "Docs"];

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <nav className="glass rounded-full flex items-center justify-between px-6 py-3">
          <a href="#" className="flex items-center gap-2">
            <Image
              src="/logo-color.webp"
              alt="Oryon"
              width={120}
              height={32}
              className="h-8 w-auto object-contain"
              priority
            />
          </a>
          <ul className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            {links.map((l) => (
              <li key={l}>
                <a href="#" className="hover:text-foreground transition-colors">{l}</a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-muted-foreground hover:text-foreground">
              Sign in
            </Button>
            <Button size="sm" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow-soft font-medium">
              Launch App
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
