"use client";

import React, { useState } from "react";
import { Plus, Minus, Flame, Pizza, Sparkles, HelpCircle, Gift } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

export default function MenuPage() {
  const { cart, addToCart, updateQuantity, soldOutItems } = useCart();
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Standard Veg", "Premium Veg", "On The Side", "Thirst Quenchers", "Desserts"];

  // Pizza items parsed from menu.png
  const pizzas = [
    {
      id: "classyrita",
      name: "Classyrita",
      description: "Tangy San Marzano tomato base, aromatic basil, and fresh mozzarella cheese.",
      category: "Standard Veg",
      prices: { "10\"": 335, "16\"": 725, "18\"": 770, "20\"": 840 },
      image: "/assets/pizza.png"
    },
    {
      id: "peppy-peppers",
      name: "Peppy Peppers",
      description: "Crispy capsicum, mixed bell peppers, and spicy green jalapenos.",
      category: "Standard Veg",
      prices: { "10\"": 335, "16\"": 770, "18\"": 815, "20\"": 885 },
      image: "/assets/pizza 2.png",
      spicy: true
    },
    {
      id: "wilde-wedges",
      name: "Wilde Wedges",
      description: "Sautéed white button mushrooms, red onions, and black olives.",
      category: "Standard Veg",
      prices: { "10\"": 335, "16\"": 760, "18\"": 805, "20\"": 875 },
      image: "/assets/pizza.png"
    },
    {
      id: "red-alert",
      name: "Red Alert",
      description: "Fresh capsicum, spring onions, and a splash of signature red hot sauce.",
      category: "Standard Veg",
      prices: { "10\"": 335, "16\"": 730, "18\"": 775, "20\"": 845 },
      image: "/assets/pizza 2.png",
      spicy: true
    },
    {
      id: "tres-formaggio",
      name: "Tres Formaggio",
      description: "A rich combination of three premium cheeses, garnished with fresh parsley.",
      category: "Standard Veg",
      prices: { "10\"": 335, "16\"": 760, "18\"": 805, "20\"": 875 },
      image: "/assets/pizza.png"
    },
    {
      id: "ocoli",
      name: "Ocoli",
      description: "Sweet golden corn kernels, sliced red onions, and black olives.",
      category: "Standard Veg",
      prices: { "10\"": 335, "16\"": 780, "18\"": 825, "20\"": 895 },
      image: "/assets/20 inch pizza.png"
    },
    {
      id: "cop",
      name: "COP",
      description: "Traditional crunch of capsicum, sliced red onions, and bell pepper toppings.",
      category: "Standard Veg",
      prices: { "10\"": 335, "16\"": 735, "18\"": 780, "20\"": 850 },
      image: "/assets/pizza.png"
    },
    {
      id: "spangle",
      name: "Spangle",
      description: "Fresh garden spinach leaves, sliced mushrooms, and black olives.",
      category: "Standard Veg",
      prices: { "10\"": 335, "16\"": 745, "18\"": 790, "20\"": 860 },
      image: "/assets/20 inch pizza.png"
    },
    {
      id: "plain-jane",
      name: "Plain Jane",
      description: "Sliced tomatoes, capsicum, onions, and black olives.",
      category: "Standard Veg",
      prices: { "10\"": 335, "16\"": 770, "18\"": 815, "20\"": 885 },
      image: "/assets/pizza.png"
    },
    {
      id: "spinato",
      name: "Spinato",
      description: "Sliced tomatoes, fresh spinach, red onions, and paprika seasoning.",
      category: "Standard Veg",
      prices: { "10\"": 335, "16\"": 740, "18\"": 785, "20\"": 855 },
      image: "/assets/pizza 2.png",
      spicy: true
    },
    // Premium Veg
    {
      id: "inferno",
      name: "Inferno",
      description: "Spiced cottage cheese, fiery green hot sauce, sliced onions, and paprika.",
      category: "Premium Veg",
      prices: { "10\"": 405, "16\"": 900, "18\"": 990, "20\"": 1080 },
      image: "/assets/pizza 2.png",
      spicy: true
    },
    {
      id: "cornita",
      name: "Cornita",
      description: "Spiced cottage cheese, button mushrooms, onions, sweet corn, and olives.",
      category: "Premium Veg",
      prices: { "10\"": 405, "16\"": 900, "18\"": 990, "20\"": 1080 },
      image: "/assets/20 inch pizza.png"
    },
    {
      id: "exotica",
      name: "Exotica",
      description: "Soft cottage cheese, sliced zucchini, green bell peppers, and jalapenos.",
      category: "Premium Veg",
      prices: { "10\"": 405, "16\"": 900, "18\"": 990, "20\"": 1080 },
      image: "/assets/pizza.png",
      spicy: true
    },
    {
      id: "sweet-pepinos",
      name: "Sweet Pepinos",
      description: "Sweet corn, green bell pepper, sliced zucchini, mushrooms, and onions.",
      category: "Premium Veg",
      prices: { "10\"": 405, "16\"": 900, "18\"": 990, "20\"": 1080 },
      image: "/assets/pizza 2.png"
    },
    {
      id: "zubebe",
      name: "Zubebe",
      description: "Cottage cheese cubes, sliced zucchini, corn, green jalapenos, and fresh basil.",
      category: "Premium Veg",
      prices: { "10\"": 405, "16\"": 900, "18\"": 990, "20\"": 1080 },
      image: "/assets/20 inch pizza.png",
      spicy: true
    },
    {
      id: "same-difference",
      name: "Same Difference",
      description: "Spiced tandoori cottage cheese, green bell peppers, and paprika flakes.",
      category: "Premium Veg",
      prices: { "10\"": 405, "16\"": 900, "18\"": 990, "20\"": 1080 },
      image: "/assets/pizza.png",
      spicy: true
    }
  ];

  // Sides, beverages, and desserts parsed from menu 2.png
  const otherItems = [
    // On The Side
    { id: "garlic-bread", name: "Garlic Bread", category: "On The Side", price: 140, description: "Toasted baguette slices with whipped garlic butter and herbs.", image: "/assets/dish.png" },
    { id: "cheese-garlic-bread", name: "Cheese Garlic Bread", category: "On The Side", price: 170, description: "Garlic bread loaded and baked with melted mozzarella cheese.", image: "/assets/dish.png" },
    { id: "onion-rings", name: "Onion Rings", category: "On The Side", price: 140, description: "Crispy batter-fried golden onion rings served with dip.", image: "/assets/dish.png" },
    { id: "potato-cheese-cigars", name: "Potato Cheese Cigars", category: "On The Side", price: 170, description: "Crispy pastry rolls filled with spiced potatoes and cheese.", image: "/assets/dish.png" },
    { id: "mozzarella-sticks", name: "Mozzarella Sticks", category: "On The Side", price: 220, description: "Golden fried breaded mozzarella cheese sticks with house dip.", image: "/assets/dish.png" },
    { id: "french-fries", name: "French Fries", category: "On The Side", price: 160, description: "Classic salted potato fries, crispy outside and fluffy inside.", image: "/assets/dish.png", badge: "NEW" },
    { id: "crinkle-fries", name: "Crinkle Fries", category: "On The Side", price: 170, description: "Golden crinkle-cut fries sprinkled with special house seasoning.", image: "/assets/dish.png", badge: "NEW" },
    { id: "herbed-wedges", name: "Herbed Potato Wedges", category: "On The Side", price: 190, description: "Thick potato wedges tossed with garlic, rosemary, and sea salt.", image: "/assets/dish.png", badge: "NEW" },
    { id: "chicken-tenders", name: "Chicken Tenders", category: "On The Side", price: 220, description: "Crispy breaded chicken breast strips served with dipping sauce.", image: "/assets/dish.png" },
    { id: "chicken-cutlets", name: "Chicken Cutlets", category: "On The Side", price: 200, description: "Minced spiced chicken patties, breaded and golden-fried.", image: "/assets/dish.png" },

    // Thirst Quenchers
    { id: "virgin-mojito", name: "Virgin Mojito", category: "Thirst Quenchers", price: 130, description: "Muddled fresh mint, lime wedges, simple syrup, and carbonated water.", image: "/assets/mojito.png" },
    { id: "blue-breeze", name: "Blue Breeze", category: "Thirst Quenchers", price: 130, description: "Chilled blue curaçao syrup mixed with carbonated lemonade.", image: "/assets/drink 2.png" },
    { id: "tropical-fizz", name: "Tropical Fizz", category: "Thirst Quenchers", price: 130, description: "A sweet mix of tropical fruit nectars topped with fizz.", image: "/assets/drink 3.png" },
    { id: "strawberry-fizz", name: "Strawberry Fizz", category: "Thirst Quenchers", price: 130, description: "Sweet strawberry reduction with muddled mint and carbonated tonic.", image: "/assets/mojito 2.png" },
    { id: "kiwi-fizz", name: "Kiwi Fizz", category: "Thirst Quenchers", price: 130, description: "Muddled kiwi pulp topped with chilled sparkling water.", image: "/assets/mojito 3.png" },
    { id: "litchi-fizz", name: "Litchi Fizz", category: "Thirst Quenchers", price: 130, description: "Sweet litchi juice splash with sparkling mineral water.", image: "/assets/drink.png" },
    { id: "iced-tea", name: "Iced Tea", category: "Thirst Quenchers", price: 120, description: "Chilled black tea base. Select Flavor: Peach, Lemon, or Watermelon.", image: "/assets/drink 2.png" },

    // Desserts
    { id: "red-velvet-dessert", name: "Red Velvet Cupcake", category: "Desserts", price: 150, description: "In-house baked from scratch, using original age-old recipes.", image: "/assets/dish.png", badge: "TRY" },
    { id: "blueberry-cheesecake", name: "Blueberry Cheesecake Slice", category: "Desserts", price: 170, description: "Creamy cheesecake on a buttery biscuit base topped with blueberry pulp.", image: "/assets/dish.png", badge: "TRY" }
  ];

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
              Buy 1 Pizza get a **Drink/Dessert/Side FREE**. <br />
              Buy 2 Pizzas get the **3rd Pizza FREE**! (Valid every Thursday on dine-in/takeaway).
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
              **Combo for 1**: 10&quot; Pizza + 1 Drink + 1 Dessert for **₹480** (Save ₹60). <br />
              **Combo for 2**: 2x 10&quot; Pizzas + 1 Drink + 1 Side + 1 Dessert for **₹970** (Save ₹80).
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
