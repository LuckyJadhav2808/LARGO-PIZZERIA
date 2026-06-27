"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const pathname = usePathname();
  const { cart, setCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Calculate total items in the cart
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Full Menu", href: "/menu" },
    { label: "Reviews", href: "/reviews" },
    { label: "Our Story", href: "/story" },
    { label: "Locate Outlets", href: "/outlets" },
    { label: "Admin Panel", href: "/admin" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glassmorphism border-b border-white/5 backdrop-blur-md bg-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left - Brand Mark */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="border-2 border-dashed border-largo-primary rounded-full px-4 py-1.5 text-largo-primary font-display text-3xl tracking-wider hover:bg-largo-primary/10 transition duration-300">
                LARGO
              </span>
            </Link>
          </div>

          {/* Center - Nav Links (Desktop) */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-2 text-sm font-semibold tracking-wide transition-colors duration-300 ${
                    isActive ? "text-largo-primary" : "text-largo-text-muted hover:text-largo-text-primary"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-largo-primary rounded-full animate-fade-in" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right - Shopping Cart Icon + Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCartOpen((prev) => !prev)}
              className="relative p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-largo-text-primary hover:text-largo-primary transition-all duration-300"
              aria-label="Open Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-largo-primary text-black font-semibold text-xs w-5 h-5 flex items-center justify-center rounded-full border-2 border-largo-bg-base">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-md text-largo-text-muted hover:text-largo-text-primary focus:outline-none"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Nav Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/5 bg-largo-bg-surface px-4 py-4 space-y-3">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-base font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-largo-primary/10 text-largo-primary border-l-4 border-largo-primary"
                    : "text-largo-text-muted hover:bg-white/5 hover:text-largo-text-primary"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
