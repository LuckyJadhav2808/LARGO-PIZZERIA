"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, ChevronRight } from "lucide-react";

export default function FloatingCartBar() {
  const { cart, cartOpen, setCartOpen, paymentOpen } = useCart();

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Do not render if cart is empty or if checkout overlays are active
  if (totalQuantity === 0 || cartOpen || paymentOpen) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full sm:bottom-6 sm:left-1/2 sm:-translate-x-1/2 sm:w-[92%] sm:max-w-md z-45 animate-fade-in-up">
      
      {/* 
        Container styling:
        - Mobile: Full width rectangular bar, pinned to the bottom, sharp corners, solid dark card background.
        - Desktop (sm+): Floating capsule, rounded borders, glassmorphic glow effect.
      */}
      <div className="w-full glassmorphism border-t border-white/10 sm:border sm:border-largo-primary/25 sm:rounded-2xl px-5 py-4 sm:p-4 shadow-[0_-8px_30px_rgba(0,0,0,0.5)] sm:shadow-2xl flex items-center justify-between sm:glow-amber">
        
        {/* Left Side: Summary info */}
        <div className="flex items-center space-x-3.5">
          <div className="p-2 bg-largo-primary/10 rounded-xl text-largo-primary border border-largo-primary/10 hidden xs:block">
            <ShoppingBag className="w-4.5 h-4.5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-largo-text-muted font-bold uppercase tracking-wider">
              {totalQuantity} {totalQuantity === 1 ? "Item" : "Items"} Selected
            </span>
            <span className="text-largo-text-primary font-extrabold text-lg leading-tight mt-0.5">
              ₹{totalPrice} <span className="text-[10px] text-largo-text-muted font-normal">+ GST</span>
            </span>
          </div>
        </div>

        {/* Right Side: Proceed to Pay direct action button */}
        <button
          onClick={() => setCartOpen(true)}
          className="py-3 px-6 sm:py-2.5 sm:px-5 bg-gradient-to-r from-largo-primary to-largo-secondary text-black text-xs font-extrabold rounded-xl uppercase tracking-wider flex items-center space-x-1.5 transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:shadow-lg hover:shadow-largo-primary/20 cursor-pointer"
        >
          <span>Proceed to Pay</span>
          <ChevronRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
}
