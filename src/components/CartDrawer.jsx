"use client";

import React, { useRef, useEffect } from "react";
import { X, Trash2, Plus, Minus, ShoppingBag, AlertTriangle } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const {
    cart,
    tableId,
    cartOpen,
    setCartOpen,
    setPaymentOpen,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const drawerRef = useRef(null);

  // Close drawer on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (drawerRef.current && !drawerRef.current.contains(event.target) && cartOpen) {
        // Only close if we clicked on the backdrop overlay
        if (event.target.classList.contains("cart-overlay")) {
          setCartOpen(false);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cartOpen, setCartOpen]);

  // Prevent scroll when drawer is open
  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [cartOpen]);

  if (!cartOpen) return null;

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;

  const handleCheckoutClick = () => {
    setCartOpen(false);
    setPaymentOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end cart-overlay bg-black/60 backdrop-blur-sm transition-all duration-300">
      
      {/* Drawer Body */}
      <div
        ref={drawerRef}
        className="w-full md:w-[420px] h-full bg-largo-bg-surface border-l border-white/5 flex flex-col shadow-2xl relative animate-slide-in-right"
      >
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ShoppingBag className="w-5 h-5 text-largo-primary" />
            <h2 className="text-xl font-bold tracking-wide">Your Order</h2>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="p-1.5 rounded-full hover:bg-white/10 text-largo-text-muted hover:text-largo-text-primary transition duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Items list */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 no-scrollbar">
          
          {/* Table Sync Warning/Info */}
          <div className="p-4 rounded-xl border border-white/5 bg-largo-card-surface/50">
            {tableId ? (
              <div className="flex items-center space-x-2 text-largo-success text-sm font-semibold">
                <span className="w-2.5 h-2.5 bg-largo-success rounded-full animate-pulse" />
                <span>Ordering for Table #{tableId}</span>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-start space-x-2 text-largo-primary">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold">Sync your table first</h4>
                    <p className="text-xs text-largo-text-muted mt-0.5">
                      Please enter your table number on the home page hero section to complete your order.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setCartOpen(false);
                    window.location.hash = "hero";
                    // Fallback search scroll if on other page
                    const hero = document.getElementById("hero");
                    if (hero) {
                      hero.scrollIntoView({ behavior: "smooth" });
                    } else {
                      window.location.href = "/#hero";
                    }
                  }}
                  className="text-xs text-largo-primary hover:underline font-semibold block"
                >
                  Go to Table Sync Card &rarr;
                </button>
              </div>
            )}
          </div>

          {/* Empty State */}
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
              <div className="p-4 bg-white/5 rounded-full border border-white/5 text-largo-text-muted">
                🍕
              </div>
              <div>
                <h3 className="text-lg font-semibold text-largo-text-primary">Nothing here yet</h3>
                <p className="text-sm text-largo-text-muted mt-1 max-w-[280px]">
                  Explore the 18-inch thin crust monsters and start adding to your order.
                </p>
              </div>
              <button
                onClick={() => {
                  setCartOpen(false);
                  window.location.href = "/menu";
                }}
                className="px-5 py-2.5 bg-largo-primary/10 border border-largo-primary/30 text-largo-primary rounded-lg text-sm font-semibold hover:bg-largo-primary/20 transition duration-300"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            // Cart Items List
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-largo-card-surface border border-white/5 relative overflow-hidden group hover:border-largo-primary/20 transition-all duration-300"
                >
                  <div className="flex-1 mr-4">
                    <span className="text-xs font-bold text-largo-primary tracking-wider uppercase opacity-80 block">
                      {item.category}
                    </span>
                    <h3 className="font-semibold text-largo-text-primary leading-tight mt-0.5">
                      {item.name}
                    </h3>
                    <p className="text-largo-primary font-semibold text-sm mt-1">
                      ₹{item.price}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    {/* Controls */}
                    <div className="flex items-center border border-white/10 rounded-lg bg-black/20">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1.5 hover:bg-white/5 text-largo-text-muted hover:text-largo-text-primary transition"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-largo-text-primary">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1.5 hover:bg-white/5 text-largo-text-muted hover:text-largo-text-primary transition"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Trash */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-largo-text-muted hover:text-red-500 hover:bg-red-500/10 rounded-lg transition duration-300"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Footer Summary (if cart has items) */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-white/5 bg-largo-card-surface space-y-4">
            
            {/* Calculation */}
            <div className="space-y-2">
              <div className="flex justify-between text-largo-text-muted text-sm">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-largo-text-muted text-sm">
                <span>GST (5%)</span>
                <span>₹{gst}</span>
              </div>
              <div className="border-t border-white/5 my-2 pt-2 flex justify-between items-end">
                <span className="font-bold text-largo-text-primary">Grand Total</span>
                <div className="text-right">
                  <span className="text-2xl font-bold text-largo-primary">₹{total}</span>
                </div>
              </div>
            </div>

            {/* Pay Button */}
            <button
              onClick={handleCheckoutClick}
              disabled={!tableId}
              className={`w-full py-4 rounded-lg font-bold text-center tracking-wide flex items-center justify-center space-x-2 transition duration-300 ${
                tableId
                  ? "bg-gradient-to-r from-largo-primary to-largo-secondary text-black hover:shadow-lg hover:shadow-largo-primary/10 cursor-pointer"
                  : "bg-largo-text-muted/20 text-largo-text-muted cursor-not-allowed"
              }`}
            >
              <span>Pay via UPI — ₹{total}</span>
            </button>
            
            {!tableId && (
              <p className="text-[11px] text-center text-largo-primary mt-1">
                ⚠️ Table number sync required to place order
              </p>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
