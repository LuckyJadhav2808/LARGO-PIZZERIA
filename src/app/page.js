"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Plus, 
  Flame, 
  Leaf, 
  UtensilsCrossed, 
  GlassWater, 
  Bell, 
  ChefHat, 
  Utensils, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  CirclePlus,
  Star,
  Pizza
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Home() {
  const { 
    tableId, 
    syncTable, 
    addToCart, 
    orderStep, 
    updateOrderStep,
    addWaiterRequest,
    soldOutItems
  } = useCart();

  // Hero Table Input State
  const [tableInput, setTableInput] = useState("");
  const [showSyncedCheck, setShowSyncedCheck] = useState(false);

  // Sync state with tableId on mount
  useEffect(() => {
    if (tableId) {
      setTableInput(tableId);
    }
  }, [tableId]);

  const handleSyncTable = (e) => {
    e.preventDefault();
    if (!tableInput.trim()) return;
    syncTable(tableInput);
    setShowSyncedCheck(true);
    setTimeout(() => {
      setShowSyncedCheck(false);
    }, 2000);
  };

  // Menu Preview States
  const [activeCategory, setActiveCategory] = useState("All");

  const menuPreviewItems = [
    { 
      id: "classyrita-10", 
      name: "Classyrita (10\")", 
      price: 335, 
      description: "Tomato, fresh basil, and mozzarella cheese.", 
      icon: Pizza, 
      category: "Slices" 
    },
    { 
      id: "peppy-peppers-10", 
      name: "Peppy Peppers (10\")", 
      price: 335, 
      description: "Capsicum, mixed bell peppers, and jalapenos.", 
      icon: Flame, 
      category: "Slices" 
    },
    { 
      id: "garlic-bread", 
      name: "Garlic Bread", 
      price: 140, 
      description: "Toasted baguette with whipped garlic butter.", 
      icon: UtensilsCrossed, 
      category: "Sides" 
    },
    { 
      id: "virgin-mojito", 
      name: "Virgin Mojito", 
      price: 130, 
      description: "Fresh mint, lime wedges, simple syrup, and carbonated water.", 
      icon: GlassWater, 
      category: "Beverages",
      image: "/assets/mojito.png"
    }
  ];

  // Filter logic
  const filteredSmallCards = activeCategory === "All"
    ? menuPreviewItems
    : menuPreviewItems.filter(item => {
        if (activeCategory === "Slices") return item.category === "Slices";
        if (activeCategory === "Whole Monsters") return false; // Main card is monsters
        return false;
      });

  // Waiter notification handler
  const handleCallWaiter = () => {
    const currentTable = tableId || tableInput || "Takeaway";
    addWaiterRequest(currentTable);
    window.alert(`A waiter has been notified for Table #${currentTable}. They will arrive shortly.`);
  };

  // Order Tracker stages definition
  const trackerStages = [
    { step: 0, icon: Flame, label: "Oven Preheating", sublabel: "Temperature sync" },
    { step: 1, icon: ChefHat, label: "Baking Crust", sublabel: "12 minutes remaining" },
    { step: 2, icon: Utensils, label: "Serving to Table", sublabel: "Almost there" },
    { step: 3, icon: CheckCircle2, label: "Completed", sublabel: "Enjoy your meal!" }
  ];

  // Testimonials
  const reviews = [
    { initials: "RK", name: "Rohan K.", location: "Viman Nagar Regular", rating: 5, quote: "The crust is paper thin but holds the toppings perfectly. Never had a slice this size in Pune." },
    { initials: "PM", name: "Priya M.", location: "FC Road, Student Delivery", rating: 5, quote: "Ordered the 20\" Inferno for our hostel group. Absolutely unreal value for the size." },
    { initials: "AS", name: "Aryan S.", location: "Baner Tech Park Lunch", rating: 5, quote: "The outdoor seating at night is an experience in itself. Pizza + string lights = perfection." },
    { initials: "NK", name: "Neha K.", location: "Koregaon Park Weekend", rating: 4, quote: "Spinato is secretly the best thing on the menu. Crust is genuinely crisp all the way through." },
    { initials: "VD", name: "Vivek D.", location: "Hinjewadi IT Crowd", rating: 5, quote: "20 inches is not a gimmick. It's the real thing. Feeds 4 adults comfortably." },
    { initials: "SM", name: "Sneha M.", location: "Camp, Pune Central", rating: 5, quote: "The Virgin Mojito pairs weirdly perfectly with the garlic bread. Trust me on this." }
  ];

  // Split reviews for 2-row marquee
  const row1Reviews = reviews.slice(0, 3);
  const row2Reviews = reviews.slice(3, 6);

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. HERO SECTION */}
      <section id="hero" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-20">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between min-h-[75vh] gap-12">
          
          {/* Left Column (55% width) */}
          <div className="w-full md:w-[55%] space-y-8 flex flex-col justify-center">
            <div className="space-y-4">
              <span className="text-largo-primary font-bold text-xs uppercase tracking-widest block">
                VIMAN NAGAR&apos;S COZY PIZZA GARDEN
              </span>
              <h1 className="font-display text-6xl sm:text-7xl lg:text-9xl leading-[0.9] text-largo-text-primary uppercase">
                GIANT CRISP <br />
                <span className="text-largo-text-primary">SLICES.</span> <br />
                <span className="text-largo-primary">WARM NIGHT</span> <br />
                <span className="text-largo-primary">VIBES.</span>
              </h1>
            </div>

            {/* Table Sync Card */}
            <div className="bg-largo-card-surface border border-white/10 rounded-xl p-6 shadow-xl max-w-md">
              <h3 className="text-largo-text-muted text-sm font-semibold mb-3">
                Sitting at a table? Enter Table Number
              </h3>
              <form onSubmit={handleSyncTable} className="flex gap-3">
                <input
                  type="text"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  placeholder="00"
                  value={tableInput}
                  onChange={(e) => setTableInput(e.target.value)}
                  className="w-20 bg-largo-bg-base border border-white/10 focus:border-largo-primary focus:ring-1 focus:ring-largo-primary rounded-lg px-3 py-3 text-center font-bold text-xl text-largo-text-primary focus:outline-none transition duration-300"
                  maxLength={3}
                />
                <button
                  type="submit"
                  className="flex-grow bg-largo-primary hover:bg-largo-secondary text-black font-bold py-3 px-6 rounded-lg uppercase tracking-wider text-sm transition duration-300 hover:shadow-lg hover:shadow-largo-primary/25"
                >
                  Sync Order
                </button>
              </form>
              
              {/* Sync Status Notifications */}
              {showSyncedCheck && (
                <div className="text-largo-success text-sm font-bold mt-3 flex items-center space-x-1.5 animate-pulse">
                  <span>✓</span>
                  <span>Table synced!</span>
                </div>
              )}
              {tableId && !showSyncedCheck && (
                <div className="text-largo-success text-sm font-semibold mt-3 flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-largo-success animate-ping" />
                  <span>Table #{tableId} Synced</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column (45% width) - blends with text background */}
          <div className="w-full md:w-[45%] relative min-h-[350px] md:min-h-[500px] h-full rounded-2xl overflow-hidden self-stretch">
            {/* Image */}
            <Image
              src="/assets/restaurant photo 2.png"
              alt="Largo Pizzeria Garden Vibe"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover object-center"
            />
            {/* Blend Overlays */}
            {/* Desktop horizontal fade (left to right) */}
            <div className="hidden md:block absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-largo-bg-base to-transparent" />
            {/* Mobile/All vertical fade (bottom to top) */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-largo-bg-base to-transparent" />
            <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-largo-bg-base to-transparent" />
          </div>

        </div>
      </section>

      {/* 2. MENU PREVIEW SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Title & Categories */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-white/5">
          <div>
            <h2 className="font-display text-5xl text-largo-text-primary tracking-wide">
              The 18–Inch Menu
            </h2>
            <p className="text-largo-text-muted mt-1 text-sm font-medium">
              Crisp monster slices designed for sharing or solo conquest.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex gap-2">
            {["All", "Slices", "Whole Monsters"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`py-2 px-5 rounded-full border text-xs font-semibold uppercase tracking-wider transition duration-300 ${
                  activeCategory === cat
                    ? "bg-largo-primary text-black border-largo-primary"
                    : "border-largo-primary/30 text-largo-primary hover:bg-largo-primary/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Large Main Card (Spans 2 columns on lg, 2 rows) */}
          <div className="lg:col-span-2 relative overflow-hidden bg-largo-card-surface border border-white/5 rounded-2xl min-h-[380px] lg:min-h-[440px] p-8 flex flex-col justify-between group hover:border-largo-primary/20 transition-all duration-300">
            
            {/* Background styled overlay */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/assets/pizza 2.png"
                alt="Inferno Background"
                fill
                className="object-cover opacity-30 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-largo-bg-base via-largo-bg-base/75 to-transparent" />
            </div>

            {/* Top Left Chef's Special Badge */}
            <div className="relative z-10 self-start flex gap-2">
              <span className="bg-largo-primary text-black font-semibold text-xs py-1 px-3.5 rounded-full tracking-wider uppercase">
                CHEF&apos;S SPECIAL
              </span>
              {soldOutItems["inferno"] && (
                <span className="bg-red-500 text-white font-semibold text-xs py-1 px-3.5 rounded-full tracking-wider uppercase">
                  SOLD OUT
                </span>
              )}
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 space-y-6 mt-auto">
              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-3xl font-bold font-display tracking-wide text-largo-text-primary">
                    Inferno (18&quot;)
                  </h3>
                  <span className="text-2xl font-bold text-largo-primary">₹990</span>
                </div>
                <p className="text-sm text-largo-text-muted max-w-lg leading-relaxed">
                  Spiced cottage cheese, fiery green hot sauce, sliced onions, and paprika. Bold spice with full-bodied garden flavor.
                </p>
              </div>

              <button
                disabled={soldOutItems["inferno"]}
                onClick={() => addToCart({ id: "inferno-18", name: "Inferno (18\")", price: 990, category: "Premium Veg" })}
                className="w-full sm:w-auto py-3 px-6 bg-gradient-to-r from-largo-primary to-largo-secondary hover:shadow-lg hover:shadow-largo-primary/20 text-black font-bold rounded-lg flex items-center justify-center space-x-2 transition duration-300 uppercase text-xs tracking-wider disabled:opacity-40 disabled:pointer-events-none"
              >
                <CirclePlus className="w-4 h-4" />
                <span>{soldOutItems["inferno"] ? "Sold Out" : "Add to Order"}</span>
              </button>
            </div>

          </div>

          {/* Right Side 2x2 or Stack of Small Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
            {filteredSmallCards.map((item) => {
              const IconComp = item.icon;
              const baseId = item.id.split("-")[0];
              const isItemSoldOut = soldOutItems[baseId];

              return (
                <div
                  key={item.id}
                  className={`bg-largo-card-surface border rounded-xl p-5 flex flex-col justify-between hover:border-largo-primary/20 transition-all duration-300 group relative overflow-hidden min-h-[160px] ${
                    isItemSoldOut ? "border-red-500/10 opacity-70" : "border-white/5"
                  }`}
                >
                  {item.image && (
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover opacity-20 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-largo-card-surface via-largo-card-surface/80 to-transparent" />
                    </div>
                  )}

                  <div className="relative z-10 flex flex-col justify-between h-full w-full flex-grow">
                    {/* Top: Icon & Price */}
                    <div className="flex justify-between items-start">
                      <div className="p-2.5 rounded-lg bg-largo-primary/10 text-largo-primary border border-largo-primary/10">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-largo-primary font-bold text-lg">₹{item.price}</span>
                    </div>

                  {/* Bottom: Info & Add Button */}
                  <div className="mt-8 flex justify-between items-end gap-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-largo-text-primary leading-snug group-hover:text-largo-primary transition duration-300">
                        {item.name}
                      </h4>
                      <p className="text-xs text-largo-text-muted mt-1 leading-normal">
                        {item.description}
                      </p>
                    </div>

                      {isItemSoldOut ? (
                        <span className="bg-red-500/15 border border-red-500/30 text-red-400 text-[10px] font-extrabold px-2.5 py-1 rounded tracking-wider uppercase flex-shrink-0">
                          Sold Out
                        </span>
                      ) : (
                        <button
                          onClick={() => addToCart(item)}
                          className="w-9 h-9 flex items-center justify-center bg-largo-primary hover:bg-largo-secondary text-black font-bold rounded-full shadow hover:scale-105 transition-all duration-300 flex-shrink-0 cursor-pointer"
                          aria-label={`Add ${item.name} to cart`}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            
            {filteredSmallCards.length === 0 && (
              <div className="col-span-2 flex flex-col items-center justify-center p-8 bg-white/5 border border-dashed border-white/10 rounded-xl text-center">
                <span className="text-sm text-largo-text-muted">No items match this filter category.</span>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 3. LIVE ORDER TRACKER PANEL */}
      <section id="order-tracker" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-largo-card-surface border border-white/5 rounded-[20px] p-8 md:p-10 shadow-2xl space-y-8">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-6">
            <div>
              <h2 className="font-display text-4xl text-largo-text-primary tracking-wide">
                Your Order Tracker
              </h2>
              <p className="text-sm text-largo-text-muted mt-1 font-semibold flex items-center gap-2">
                <span>Largo Pizzeria Pune</span>
                <span className="w-1.5 h-1.5 bg-white/10 rounded-full" />
                <span className="text-largo-primary">Table #{tableId || "—"}</span>
              </p>
            </div>
            
            <button
              onClick={handleCallWaiter}
              className="py-3 px-6 border border-largo-primary/20 hover:border-largo-primary/60 bg-largo-primary/5 hover:bg-largo-primary/10 text-largo-primary font-bold rounded-lg flex items-center space-x-2 transition duration-300 text-xs uppercase tracking-wider"
            >
              <Bell className="w-4 h-4" />
              <span>Call Waiter Assistance</span>
            </button>
          </div>

          {/* Stepper Logic */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 pt-4 relative">
            {trackerStages.map((stage, idx) => {
              const isActive = idx <= orderStep;
              const StageIcon = stage.icon;

              return (
                <div key={stage.step} className="flex flex-row lg:flex-col items-center gap-4 relative">
                  
                  {/* Connector Line (Desktop) */}
                  {idx < 3 && (
                    <div className="hidden lg:block absolute top-6 left-[calc(50%+24px)] right-[calc(-50%+24px)] h-0.5 z-0 bg-white/5">
                      <div 
                        className="h-full bg-gradient-to-r from-largo-primary to-largo-secondary transition-all duration-700" 
                        style={{ width: idx < orderStep ? "100%" : "0%" }}
                      />
                    </div>
                  )}

                  {/* Icon Node */}
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-full border-2 transition-all duration-500 z-10 ${
                      isActive
                        ? "bg-gradient-to-r from-largo-primary to-largo-secondary border-transparent text-black scale-110 shadow-lg shadow-largo-primary/20"
                        : "bg-largo-bg-base border-white/10 text-largo-text-muted"
                    }`}
                  >
                    <StageIcon className="w-5 h-5" />
                  </div>

                  {/* Text Labels */}
                  <div className="flex-1 lg:text-center text-left">
                    <h4
                      className={`text-sm font-semibold transition-colors duration-300 ${
                        isActive ? "text-largo-primary font-bold" : "text-largo-text-muted"
                      }`}
                    >
                      {stage.label}
                    </h4>
                    <p className="text-xs text-largo-text-muted mt-0.5">
                      {stage.sublabel}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Developer Control Interface */}
          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-largo-text-muted">
              ⚠️ <span className="font-semibold text-largo-primary">DEMO CONTROLS:</span> Use these buttons to advance order pipeline stages for verification.
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                disabled={orderStep === 0}
                onClick={() => updateOrderStep(orderStep - 1)}
                className="p-2 rounded bg-white/5 border border-white/10 hover:bg-white/10 text-largo-text-muted hover:text-largo-text-primary disabled:opacity-30 disabled:pointer-events-none transition duration-200"
                aria-label="Previous Stage"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <span className="text-xs font-mono font-bold text-largo-primary bg-black/40 px-3 py-2 rounded border border-white/5">
                Stage {orderStep} of 3
              </span>

              <button
                disabled={orderStep === 3}
                onClick={() => updateOrderStep(orderStep + 1)}
                className="p-2 rounded bg-white/5 border border-white/10 hover:bg-white/10 text-largo-text-muted hover:text-largo-text-primary disabled:opacity-30 disabled:pointer-events-none transition duration-200"
                aria-label="Next Stage"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 4. CUSTOMER REVIEWS SECTION */}
      <section className="space-y-12 overflow-hidden py-10">
        
        {/* Title */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-5xl text-largo-text-primary tracking-wide">
            What Pune Says
          </h2>
          <p className="text-largo-text-muted mt-1 text-sm">
            Real feedback from our outdoor pizza garden benches.
          </p>
        </div>

        {/* PLACEHOLDER REVIEWS: Replace with real Google Reviews before client handoff */}
        <div className="flex flex-col gap-6 w-full overflow-hidden">
          
          {/* Row 1: Scrolling Left */}
          <div className="flex w-[200%] md:w-[150%] animate-marquee-left hover:[animation-play-state:paused] transition-all">
            <div className="flex gap-6 w-1/2 justify-around">
              {row1Reviews.concat(row1Reviews).map((rev, idx) => (
                <div
                  key={`r1-${idx}`}
                  className="bg-largo-card-surface border border-white/5 rounded-xl p-5 min-w-[280px] max-w-[320px] flex flex-col justify-between gap-4 shadow-lg hover:border-largo-primary/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-largo-primary/20 border border-largo-primary/30 flex items-center justify-center font-bold text-sm text-largo-primary">
                      {rev.initials}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-largo-text-primary">{rev.name}</h4>
                      <span className="text-[10px] text-largo-primary font-medium block">{rev.location}</span>
                    </div>
                  </div>

                  <div className="flex gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-largo-primary text-largo-primary" />
                    ))}
                  </div>

                  <p className="text-xs text-largo-text-primary italic leading-relaxed">
                    &quot;{rev.quote}&quot;
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Scrolling Right */}
          <div className="flex w-[200%] md:w-[150%] animate-marquee-right hover:[animation-play-state:paused] transition-all">
            <div className="flex gap-6 w-1/2 justify-around">
              {row2Reviews.concat(row2Reviews).map((rev, idx) => (
                <div
                  key={`r2-${idx}`}
                  className="bg-largo-card-surface border border-white/5 rounded-xl p-5 min-w-[280px] max-w-[320px] flex flex-col justify-between gap-4 shadow-lg hover:border-largo-primary/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-largo-primary/20 border border-largo-primary/30 flex items-center justify-center font-bold text-sm text-largo-primary">
                      {rev.initials}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-largo-text-primary">{rev.name}</h4>
                      <span className="text-[10px] text-largo-primary font-medium block">{rev.location}</span>
                    </div>
                  </div>

                  <div className="flex gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-largo-primary text-largo-primary" />
                    ))}
                  </div>

                  <p className="text-xs text-largo-text-primary italic leading-relaxed">
                    &quot;{rev.quote}&quot;
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
