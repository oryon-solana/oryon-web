"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useConnect, useDisconnect, usePhantom } from "@phantom/react-sdk";
import { AddressType } from "@phantom/browser-sdk";
import { PublicKey } from "@solana/web3.js";

const links = [
  { label: "Swap", href: "/swap" },
  { label: "Merchants", href: "/merchants" },
  { label: "Partnership", href: "/partnership" },
];

const Navbar = () => {
  const { connect, isConnecting } = useConnect();
  const { disconnect, isDisconnecting } = useDisconnect();
  const { isConnected, addresses } = usePhantom();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [menuOpen]);

  const solanaAddress = useMemo(() => {
    const addr =
      addresses.find((item) => item.addressType === AddressType.solana)?.address ||
      addresses[0]?.address ||
      "";
    if (!addr) return "";
    try {
      return new PublicKey(addr).toBase58();
    } catch {
      return addr;
    }
  }, [addresses]);

  const shortAddress = useMemo(() => {
    if (!solanaAddress) return "";
    return `${solanaAddress.slice(0, 4)}...${solanaAddress.slice(-4)}`;
  }, [solanaAddress]);

  const handleConnect = async () => {
    setMenuOpen(false);
    try {
      await connect({ provider: "injected" });
    } catch {
      // Connection can be cancelled by the user.
    }
  };

  const handleDisconnect = async () => {
    setMenuOpen(false);
    try {
      await disconnect();
    } catch {
      // Ignore disconnect errors to keep UI responsive.
    }
  };

  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-[60px] items-center justify-between px-12 bg-[#080b10]/85 backdrop-blur-md border-b border-[#1e2a3a]">
      <Link href="/" className="flex items-center gap-2.5 shrink-0">
        <Image
          src="/logo-color.svg"
          alt="Oryon"
          width={100}
          height={28}
          className="h-7 w-auto"
          priority
        />
      </Link>

      <ul className="hidden md:flex items-center gap-8 list-none">
        {links.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              className={`text-[13.5px] font-medium transition-colors tracking-wide ${
                pathname === href ? "text-[#e8f0f8]" : "text-[#7a90a8] hover:text-[#e8f0f8]"
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3" ref={menuRef}>
        {!isConnected ? (
          <Button
            variant="ghost"
            size="sm"
            className="text-[13.5px] text-[#7a90a8] hover:text-[#e8f0f8] hover:bg-transparent"
            onClick={handleConnect}
            disabled={isConnecting}
          >
            {isConnecting ? "Connecting..." : "Sign In"}
          </Button>
        ) : (
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex items-center gap-2 rounded-full px-3 py-1.5 text-[12.5px] font-medium text-[#e8f0f8] bg-[#0d1117] border border-[#1e2a3a]"
              aria-expanded={menuOpen}
              aria-haspopup="menu"
            >
              <span className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                {shortAddress}
              </span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform ${menuOpen ? "rotate-180" : ""}`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {menuOpen && (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-[220px] rounded-xl border border-[#1e2a3a] bg-[#0d1117] shadow-[0_10px_30px_rgba(0,0,0,0.35)] p-2"
              >
                <div className="px-3 py-2">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-[#5a7090] mb-1">
                    Solana Wallet
                  </p>
                  <p className="text-[12.5px] text-[#e8f0f8] break-all">
                    {solanaAddress}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleDisconnect}
                  disabled={isDisconnecting}
                  className="w-full text-left px-3 py-2.5 text-[12.5px] rounded-lg text-[#e8f0f8] hover:bg-[#121a24] transition-colors"
                >
                  {isDisconnecting ? "Disconnecting..." : "Disconnect"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
