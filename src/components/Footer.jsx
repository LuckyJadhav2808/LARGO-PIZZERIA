"use client";

import React from "react";
import Link from "next/link";
import { Mail, RefreshCw } from "lucide-react";

function InstagramIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
import { useCart } from "@/context/CartContext";

export default function Footer() {
  const { clearAllData } = useCart();

  const handleClearData = () => {
    if (window.confirm("Reset all cart, table, and payment tracker data? This is a testing utility.")) {
      clearAllData();
      window.location.reload();
    }
  };

  return (
    <footer className="bg-largo-bg-base border-t border-white/5 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        
        {/* Col 1: Brand Info */}
        <div className="space-y-4">
          <Link href="/" className="inline-block">
            <span className="font-display text-3xl text-largo-primary tracking-wide">
              LARGO PIZZERIA
            </span>
          </Link>
          <p className="text-sm text-largo-text-muted leading-relaxed max-w-xs">
            Crafted with passion in the heart of Pune. The home of the 18-inch thin-crust monster pizza, creeping vines, and warm night garden vibes.
          </p>
        </div>

        {/* Col 2: Kitchen Hours */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-largo-primary">
            KITCHEN HOURS
          </h4>
          <ul className="space-y-2 text-sm text-largo-text-muted">
            <li>12 PM – 11 PM Daily</li>
            <li className="text-largo-primary/70">Last order at 10:30 PM</li>
          </ul>
        </div>

        {/* Col 3: Outlets / Locations */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-largo-primary">
            LOCATIONS
          </h4>
          <ul className="space-y-2 text-sm text-largo-text-muted">
            <li>
              <Link href="/outlets#viman-nagar" className="hover:text-largo-text-primary transition duration-200">
                Viman Nagar (Original)
              </Link>
            </li>
            <li>
              <Link href="/outlets#baner" className="hover:text-largo-text-primary transition duration-200">
                Baner (Tech Hub)
              </Link>
            </li>
            <li>
              <Link href="/outlets#koregaon-park" className="hover:text-largo-text-primary transition duration-200">
                Koregaon Park (Weekend Special)
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Connect & Developer Actions */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-largo-primary">
            CONNECT
          </h4>
          <div className="flex items-center space-x-4 mb-4">
            <a
              href="https://instagram.com/largo_pizzeria"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/5 rounded-full hover:bg-largo-primary/20 text-largo-text-muted hover:text-largo-primary transition-all duration-300"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href="mailto:contact@largopizzeria.com"
              className="p-2 bg-white/5 rounded-full hover:bg-largo-primary/20 text-largo-text-muted hover:text-largo-primary transition-all duration-300"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <div className="pt-2 border-t border-white/5">
            <span className="text-[10px] text-largo-text-muted uppercase tracking-wider block mb-2">
              Testing Utility
            </span>
            <button
              onClick={handleClearData}
              className="py-1.5 px-3 rounded border border-red-500/20 hover:border-red-500/50 bg-red-500/5 hover:bg-red-500/10 text-red-400 hover:text-red-300 text-xs font-medium flex items-center space-x-1.5 transition duration-300"
            >
              <RefreshCw className="w-3 h-3" />
              <span>CLEAR DATA (RESET STATE)</span>
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-largo-text-muted">
        <div>
          © 2026 Largo Pizzeria. Crafted for Pune.
        </div>
        <div className="flex items-center space-x-6">
          <a href="#" className="hover:text-largo-text-primary transition">Privacy Policy</a>
          <a href="#" className="hover:text-largo-text-primary transition">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
