"use client";

import React, { useState } from "react";
import { Plus, Minus, Flame, Pizza, Sparkles, HelpCircle, Gift } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

export default function MenuPage() {
  const { cart, addToCart, updateQuantity, soldOutItems, menuItems } = useCart();
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Standard Veg", "Premium Veg", "On The Side", "Thirst Quenchers", "Desserts"];

  const pizzas = menuItems.filter(item => item.prices !== undefined);
  const otherItems = menuItems.filter(item => item.prices === undefined);

  // Helper to fetch item quantity in current cart
  const getItemQuantity = (itemId) => {
    const cartItem = cart.find((item) => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  // State mapping for selected sizes for each pizza card
  // Store selected size in a dictionary indexed by pizza id
  const [selectedSizes, setSelectedSizes] = useState(
    pizzas.reduce((acc, p) => ({ ...acc, [p.id]: "10\"" }), {})
  );

  const handleSizeChange = (pizzaId, size) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [pizzaId]: size
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Page Title Header */}
      <div className="space-y-3">
        <h1 className="font-display text-5xl sm:text-6xl text-largo-text-primary tracking-wide">
          The Full Menu
        </h1>
        <p className="text-largo-text-muted text-base sm:text-lg max-w-xl font-medium">
          Fresh outdoor oven monster thin crusts, handcrafted sides, and ice-cold thirst quenchers.
        </p>
      </div>

      {/* Promos Banner Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Deal 1: Thursday Steals */}
        <div className="bg-largo-card-surface border border-largo-primary/10 rounded-2xl p-5 flex items-start space-x-4">
          <div className="p-3 bg-largo-primary/10 rounded-xl text-largo-primary">
            <Gift className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-display text-2xl text-largo-text-primary tracking-wide">Thursday Steals BOGO</h3>
            <p className="text-xs text-largo-text-muted mt-1 leading-relaxed">
              Buy 1 Pizza get a <strong className="text-largo-primary">Drink/Dessert/Side FREE</strong>. <br />
              Buy 2 Pizzas get the <strong className="text-largo-primary">3rd Pizza FREE</strong>! (Valid every Thursday on dine-in/takeaway).
            </p>
          </div>
        </div>

        {/* Deal 2: Value Tuesdays */}
        <div className="bg-largo-card-surface border border-largo-primary/10 rounded-2xl p-5 flex items-start space-x-4">
          <div className="p-3 bg-largo-primary/10 rounded-xl text-largo-primary">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-display text-2xl text-largo-text-primary tracking-wide">Value Tuesdays Meals</h3>
            <p className="text-xs text-largo-text-muted mt-1 leading-relaxed">
              <strong className="text-largo-text-primary">Combo for 1</strong>: 10&quot; Pizza + 1 Drink + 1 Dessert for <strong className="text-largo-primary">₹480</strong> (Save ₹60). <br />
              <strong className="text-largo-text-primary">Combo for 2</strong>: 2x 10&quot; Pizzas + 1 Drink + 1 Side + 1 Dessert for <strong className="text-largo-primary">₹970</strong> (Save ₹80).
            </p>
          </div>
        </div>

      </div>

      {/* Filter Category Pills */}
      <div className="flex flex-wrap gap-2 pb-4 border-b border-white/5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`py-2 px-5 rounded-full border text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
              activeCategory === cat
                ? "bg-largo-primary text-black border-largo-primary shadow-lg shadow-largo-primary/20"
                : "border-largo-primary/30 text-largo-primary hover:bg-largo-primary/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Render Pizza items */}
        {(activeCategory === "All" || activeCategory === "Standard Veg" || activeCategory === "Premium Veg") &&
          pizzas
            .filter((p) => activeCategory === "All" || p.category === activeCategory)
            .map((pizza) => {
              const currentSize = selectedSizes[pizza.id] || "10\"";
              const currentPrice = pizza.prices[currentSize];
              
              // Formatting specific size cart keys and name structures
              const cartItemId = `${pizza.id}-${currentSize.replace('"', '').replace('\\', '')}`;
              const cartItemName = `${pizza.name} (${currentSize})`;
              const qty = getItemQuantity(cartItemId);
              const isSoldOut = soldOutItems[pizza.id];

              return (
                <div
                  key={pizza.id}
                  className={`bg-largo-card-surface border rounded-[16px] p-6 flex flex-col justify-between gap-5 hover:shadow-xl hover:shadow-black/40 transition-all duration-300 group relative overflow-hidden min-h-[360px] ${
                    isSoldOut ? "border-red-500/10 opacity-70" : "border-white/5 hover:border-largo-primary/20"
                  }`}
                >
                  {/* Card Background Overlay Image */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={pizza.image}
                      alt={pizza.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover opacity-15 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-largo-card-surface via-largo-card-surface/85 to-transparent" />
                  </div>

                  <div className="relative z-10 flex flex-col justify-between h-full w-full flex-grow gap-4">
                    
                    {/* Header: Title & Spicy Tag */}
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-lg text-largo-text-primary group-hover:text-largo-primary transition duration-300 leading-snug">
                          {pizza.name}
                        </h3>
                        <div className="flex gap-1 flex-shrink-0">
                          {isSoldOut && (
                            <span className="bg-red-500/15 border border-red-500/30 text-red-400 text-[9px] font-extrabold px-2 py-0.5 rounded tracking-wider">
                              SOLD OUT
                            </span>
                          )}
                          {pizza.spicy && (
                            <span className="bg-red-500/10 border border-red-500/20 text-red-400 text-[9px] font-extrabold px-2 py-0.5 rounded tracking-wider flex items-center gap-0.5">
                              <Flame className="w-2.5 h-2.5" />
                              <span>SPICY</span>
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-largo-text-muted text-xs leading-relaxed mt-1.5 min-h-[32px]">
                        {pizza.description}
                      </p>
                    </div>

                    {/* Size Selector Grid */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] uppercase font-bold text-largo-text-muted tracking-wider block">
                        Select Pizza Size
                      </span>
                      <div className="grid grid-cols-4 gap-1.5 bg-black/40 p-1 rounded-lg border border-white/5">
                        {Object.keys(pizza.prices).map((size) => (
                          <button
                            key={size}
                            disabled={isSoldOut}
                            onClick={() => handleSizeChange(pizza.id, size)}
                            className={`py-1.5 text-xs font-bold rounded transition-all ${
                              currentSize === size
                                ? "bg-largo-primary text-black"
                                : "text-largo-text-muted hover:text-largo-text-primary hover:bg-white/5"
                            } ${isSoldOut ? "opacity-40 cursor-not-allowed" : ""}`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Footer Row: Price & Quantity Controls */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-largo-text-muted uppercase tracking-wider">
                          Price ({currentSize})
                        </span>
                        <span className="text-largo-primary font-bold text-lg leading-tight mt-0.5">
                          ₹{currentPrice}
                        </span>
                      </div>

                      {isSoldOut ? (
                        <span className="py-2 px-4 bg-white/5 text-largo-text-muted text-xs font-bold rounded-lg uppercase tracking-wider border border-white/5">
                          Sold Out
                        </span>
                      ) : qty === 0 ? (
                        <button
                          onClick={() =>
                            addToCart({
                              id: cartItemId,
                              name: cartItemName,
                              price: currentPrice,
                              category: pizza.category
                            })
                          }
                          className="py-2 px-4 bg-gradient-to-r from-largo-primary to-largo-secondary text-black text-xs font-bold rounded-lg uppercase tracking-wider hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer"
                        >
                          Add to Order
                        </button>
                      ) : (
                        <div className="flex items-center border border-white/10 rounded-lg bg-black/20">
                          <button
                            onClick={() => updateQuantity(cartItemId, -1)}
                            className="p-2 hover:bg-white/5 text-largo-text-muted hover:text-largo-text-primary transition"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-bold text-largo-text-primary">
                            {qty}
                          </span>
                          <button
                            onClick={() => updateQuantity(cartItemId, 1)}
                            className="p-2 hover:bg-white/5 text-largo-text-muted hover:text-largo-text-primary transition"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}

        {/* Render Non-Pizza items (Sides, Beverages, Desserts) */}
        {otherItems
          .filter((item) => activeCategory === "All" || item.category === activeCategory)
          .map((item) => {
            const qty = getItemQuantity(item.id);
            const isSoldOut = soldOutItems[item.id];

            return (
              <div
                key={item.id}
                className={`bg-largo-card-surface border rounded-[16px] p-6 flex flex-col justify-between gap-5 hover:shadow-xl hover:shadow-black/40 transition-all duration-300 group relative overflow-hidden min-h-[220px] ${
                  isSoldOut ? "border-red-500/10 opacity-70" : "border-white/5 hover:border-largo-primary/20"
                }`}
              >
                {/* Background image overlay */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover opacity-15 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-largo-card-surface via-largo-card-surface/85 to-transparent" />
                </div>

                <div className="relative z-10 flex flex-col justify-between h-full w-full flex-grow gap-4">
                  
                  {/* Top Details */}
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-lg text-largo-text-primary group-hover:text-largo-primary transition duration-300 leading-snug">
                        {item.name}
                      </h3>
                      {isSoldOut ? (
                        <span className="bg-red-500/15 border border-red-500/30 text-red-400 text-[9px] font-extrabold px-2 py-0.5 rounded tracking-wider flex-shrink-0">
                          SOLD OUT
                        </span>
                      ) : item.badge && (
                        <span className="bg-largo-primary text-black text-[9px] font-extrabold px-2 py-0.5 rounded tracking-wide uppercase flex-shrink-0">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-largo-text-muted text-xs leading-relaxed mt-1.5 min-h-[32px]">
                      {item.description}
                    </p>
                  </div>

                  {/* Price & Add Controls */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                    <span className="text-largo-primary font-bold text-lg">₹{item.price}</span>

                    {isSoldOut ? (
                      <span className="py-2 px-4 bg-white/5 text-largo-text-muted text-xs font-bold rounded-lg uppercase tracking-wider border border-white/5">
                        Sold Out
                      </span>
                    ) : qty === 0 ? (
                      <button
                        onClick={() =>
                          addToCart({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            category: item.category
                          })
                        }
                        className="py-2 px-4 bg-gradient-to-r from-largo-primary to-largo-secondary text-black text-xs font-bold rounded-lg uppercase tracking-wider hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer"
                      >
                        Add to Order
                      </button>
                    ) : (
                      <div className="flex items-center border border-white/10 rounded-lg bg-black/20">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-2 hover:bg-white/5 text-largo-text-muted hover:text-largo-text-primary transition"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-largo-text-primary">
                          {qty}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-2 hover:bg-white/5 text-largo-text-muted hover:text-largo-text-primary transition"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            );
          })}
      </div>

    </div>
  );
}
