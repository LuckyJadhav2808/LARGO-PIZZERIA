"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const pathname = usePathname();
  const { cart, setCartOpen, tableId } = useCart();
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
    <header className="sticky top-3 sm:top-5 mx-auto w-[94%] sm:w-[92%] max-w-7xl rounded-xl sm:rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] glassmorphism bg-black/50 z-40 backdrop-blur-md transition-all duration-300">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left Block (1/4 width on mobile, 1/3 width on desktop) */}
          {/* Mobile: Hamburger Menu Button */}
          {/* Desktop: Custom Nav Links Grid */}
          <div className="flex md:hidden w-1/4 justify-start">
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-md text-largo-text-muted hover:text-largo-text-primary focus:outline-none cursor-pointer"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-8 w-1/3 justify-start py-2">
            {/* Column 1: Boxed HOME & OUTLETS */}
            <div className="flex flex-col items-center">
              <Link 
                href="/" 
                className={`border border-largo-primary/60 px-3.5 py-1 text-[11px] uppercase font-black tracking-wider transition rounded-sm ${
                  pathname === "/" 
                    ? "bg-largo-primary text-black border-largo-primary" 
                    : "text-largo-primary hover:bg-largo-primary/10 hover:border-largo-primary"
                }`}
              >
                HOME
              </Link>
              <Link 
                href="/outlets" 
                className={`text-[9px] uppercase font-extrabold tracking-widest mt-1.5 transition ${
                  pathname === "/outlets" ? "text-largo-primary" : "text-largo-text-muted hover:text-largo-text-primary"
                }`}
              >
                OUTLETS
              </Link>
            </div>
            
            {/* Column 2: MENU & ADMIN */}
            <div className="flex flex-col items-start justify-center">
              <Link 
                href="/menu" 
                className={`text-xs uppercase font-extrabold tracking-widest transition ${
                  pathname === "/menu" ? "text-largo-primary" : "text-largo-text-muted hover:text-largo-text-primary"
                }`}
              >
                MENU
              </Link>
              <Link 
                href="/admin" 
                className={`text-[9px] uppercase font-extrabold tracking-widest mt-1.5 transition ${
                  pathname === "/admin" ? "text-largo-primary" : "text-largo-text-muted hover:text-largo-text-primary"
                }`}
              >
                ADMIN
              </Link>
            </div>

            {/* Column 3: REVIEWS */}
            <div className="flex items-center h-full">
              <Link 
                href="/reviews" 
                className={`text-xs uppercase font-extrabold tracking-widest transition ${
                  pathname === "/reviews" ? "text-largo-primary" : "text-largo-text-muted hover:text-largo-text-primary"
                }`}
              >
                REVIEWS
              </Link>
            </div>

            {/* Column 4: OUR STORY */}
            <div className="flex items-center h-full">
              <Link 
                href="/story" 
                className={`text-xs uppercase font-extrabold tracking-widest transition ${
                  pathname === "/story" ? "text-largo-primary" : "text-largo-text-muted hover:text-largo-text-primary"
                }`}
              >
                STORY
              </Link>
            </div>
          </div>

          {/* Center Block - Brand Logo (2/4 width on mobile, 1/3 width on desktop) */}
          <div className="flex justify-center w-2/4 md:w-1/3">
            <Link href="/" className="group flex items-center space-x-2 transition duration-300 select-none">
              <svg viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-[42px] sm:h-[46px] w-auto">
                {/* Circular Badge Icon */}
                <g className="group-hover:rotate-12 transition-transform duration-500 origin-[20px_20px]">
                  <circle cx="20" cy="20" r="18" stroke="#E2953B" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="20" cy="20" r="15" stroke="#C84B31" strokeWidth="1" />
                  <path d="M12 24 C 12 14, 28 14, 28 24" stroke="#E2953B" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M20 15 L16 23 L24 23 Z" fill="#E2953B" />
                  <path d="M18 12 Q20 10 20 13" stroke="#C84B31" strokeWidth="1" strokeLinecap="round" />
                  <path d="M22 13 Q20 11 22 10" stroke="#C84B31" strokeWidth="1" strokeLinecap="round" />
                  <line x1="16" y1="26" x2="24" y2="26" stroke="#C84B31" strokeWidth="1.5" strokeLinecap="round" />
                </g>

                {/* Brand Typography */}
                <g transform="translate(48, 0)">
                  <text x="0" y="22" fill="#E2953B" fontSize="22" fontWeight="900" fontFamily="var(--font-bebas-neue), sans-serif" letterSpacing="0.1em" className="group-hover:fill-largo-secondary transition-colors duration-300">LARGO</text>
                  <text x="0" y="32" fill="#F4F3EF" fontSize="8" fontWeight="bold" fontFamily="var(--font-inter), sans-serif" letterSpacing="0.28em" opacity="0.7">PIZZERIA</text>
                </g>
              </svg>
            </Link>
          </div>

          {/* Right Block (1/4 width on mobile, 1/3 width on desktop) */}
          {/* Mobile: Cart Button + Table Indicator */}
          {/* Desktop: Instagram Follow link + solid ORDER button */}
          <div className="flex items-center justify-end w-1/4 md:w-1/3 space-x-4 md:space-x-6">
            
            {/* Instagram Follow link (Desktop Only) */}
            <a 
              href="https://instagram.com/largopizzapune" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden lg:flex items-center space-x-2 text-[10px] uppercase font-extrabold tracking-widest text-largo-text-muted hover:text-largo-text-primary transition"
            >
              <span>FOLLOW US ON</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-largo-primary flex-shrink-0">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span>INSTAGRAM</span>
            </a>

            <div className="flex items-center space-x-3">
              {tableId && (
                <div className="hidden xs:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-largo-primary/10 border border-largo-primary/20 text-[10px] font-extrabold text-largo-primary tracking-wider uppercase animate-fade-in">
                  <span className="w-1.5 h-1.5 rounded-full bg-largo-success animate-pulse" />
                  <span>T{tableId}</span>
                </div>
              )}

              {/* Desktop solid amber ORDER button */}
              <button
                onClick={() => setCartOpen(true)}
                className="hidden md:flex px-5 py-2.5 bg-gradient-to-r from-largo-primary to-largo-secondary text-black font-extrabold text-xs uppercase tracking-widest rounded-sm hover:shadow-lg hover:shadow-largo-primary/20 transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer items-center space-x-2"
              >
                <span>ORDER</span>
                {cartItemCount > 0 && (
                  <span className="bg-black text-largo-primary text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full ml-1.5 flex-shrink-0">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* Mobile cart circular button */}
              <button
                onClick={() => setCartOpen(true)}
                className="md:hidden relative p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-largo-text-primary hover:text-largo-primary transition-all duration-300 cursor-pointer"
                aria-label="Open Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-largo-primary text-black font-semibold text-xs w-5 h-5 flex items-center justify-center rounded-full border-2 border-largo-bg-base">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Mobile Dropdown Nav Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/5 bg-largo-bg-surface/95 backdrop-blur-md px-4 py-4 space-y-3 rounded-b-xl">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
                  isActive
                    ? "bg-largo-primary/10 text-largo-primary border-l-4 border-largo-primary"
                    : "text-largo-text-muted hover:bg-white/5 hover:text-largo-text-primary"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          
          {/* Mobile Instagram link */}
          <a 
            href="https://instagram.com/largopizzapune" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center space-x-2 px-3 py-3 border-t border-white/5 text-[10px] uppercase font-extrabold tracking-widest text-largo-text-muted hover:text-largo-text-primary transition"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-largo-primary flex-shrink-0">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <span>FOLLOW ON INSTAGRAM</span>
          </a>
        </div>
      )}
    </header>
  );
}
