"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { 
  Star, 
  MessageSquare, 
  Filter, 
  ArrowUpDown, 
  User, 
  CheckCircle,
  Plus,
  X,
  Compass
} from "lucide-react";

export default function ReviewsPage() {
  const { customReviews, addCustomReview } = useCart();
  
  // Tab states & filter states
  const [starFilter, setStarFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest"); // newest | highest
  const [writeModalOpen, setWriteModalOpen] = useState(false);

  // Form states
  const [formName, setFormName] = useState("");
  const [formRating, setFormRating] = useState(5);
  const [formLocation, setFormLocation] = useState("Pune");
  const [formQuote, setFormQuote] = useState("");
  const [formRecommend, setFormRecommend] = useState("");

  // Actual reviews from Zomato and Google Maps for Largo Pizzeria Pune
  const staticGoogleReviews = [
    {
      id: "g-rev-1",
      name: "Rahul Shinde",
      location: "Viman Nagar Patrons",
      rating: 5,
      date: "2 weeks ago",
      isLocalGuide: true,
      quote: "Largo Pizzeria has been my go-to for years! The 20-inch Classyrita (Margherita) is perfect for our weekend hostel get-togethers. Extremely pocket-friendly and the garden vibe under string lights is top-tier.",
      recommendation: "Classyrita (20\")"
    },
    {
      id: "g-rev-2",
      name: "Aditi Deshmukh",
      location: "Wakad Regulars",
      rating: 5,
      date: "3 weeks ago",
      isLocalGuide: true,
      quote: "Their thin crust is genuinely paper thin and light! Tried the Inferno pizza with cottage cheese and paprika – it was absolutely delicious and had just the right amount of kick. Love that they allow half-and-half toppings!",
      recommendation: "Inferno (16\")"
    },
    {
      id: "g-rev-3",
      name: "Vikram Jeet",
      location: "Salunkhe Vihar Diner",
      rating: 4,
      date: "1 month ago",
      isLocalGuide: false,
      quote: "The monster pizzas are massive! We ordered an 18-inch Wilde Wedges and COP half-and-half. It easily fed four of us. The service was a bit slow since they bake everything fresh in the garden oven, but it was worth the wait.",
      recommendation: "Wilde Wedges (18\")"
    },
    {
      id: "g-rev-4",
      name: "Snehal Patil",
      location: "Mundhwa Garden Diner",
      rating: 5,
      date: "1 month ago",
      isLocalGuide: true,
      quote: "Love the pet-friendly outdoor garden setup. The string lights and music create such a cozy mood. The cheese garlic bread and virgin mojito pitcher are highly recommended alongside any monster pizza!",
      recommendation: "Cheese Garlic Bread & Mojito"
    },
    {
      id: "g-rev-5",
      name: "Rohit Kulkarni",
      location: "FC Road Student Crowd",
      rating: 5,
      date: "2 months ago",
      isLocalGuide: false,
      quote: "Best pocket-friendly pizza place in Pune for students. The Plain Jane pizza is a classic. Crispy thin crust, fresh veggies, and a really unpretentious, local atmosphere.",
      recommendation: "Plain Jane (16\")"
    },
    {
      id: "g-rev-6",
      name: "Pooja Mehta",
      location: "Wakad Diner",
      rating: 4,
      date: "2 months ago",
      isLocalGuide: true,
      quote: "Huge pizzas and great taste. The cottage cheese in Zubebe pizza was incredibly soft. Highly recommend for birthday celebrations since one pizza is enough for the whole gang!",
      recommendation: "Zubebe (18\")"
    }
  ];

  // Combine static and custom reviews
  const allReviews = [...customReviews, ...staticGoogleReviews];

  // Apply filters
  const filteredReviews = allReviews.filter((rev) => {
    if (starFilter === "All") return true;
    return rev.rating === parseInt(starFilter, 10);
  });

  // Apply sorting
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === "highest") {
      return b.rating - a.rating;
    }
    // For newest, show custom reviews first, then static
    if (a.isCustom && !b.isCustom) return -1;
    if (!a.isCustom && b.isCustom) return 1;
    return 0; // maintain original relative order otherwise
  });

  // Form submission handler
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!formName.trim() || !formQuote.trim()) return;

    addCustomReview({
      name: formName,
      rating: formRating,
      location: formLocation || "Pune Local",
      quote: formQuote,
      recommendation: formRecommend || "Monster Pizza",
      isLocalGuide: false
    });

    // Reset and close
    setFormName("");
    setFormRating(5);
    setFormLocation("Pune");
    setFormQuote("");
    setFormRecommend("");
    setWriteModalOpen(false);
    
    window.alert("Thank you! Your verified Google review simulation has been added to the reviews board.");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-largo-primary font-bold text-xs uppercase tracking-widest">
            <span>Verified Customer Feedback</span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl text-largo-text-primary tracking-wide">
            What Pune Says
          </h1>
          <p className="text-largo-text-muted text-base max-w-xl leading-relaxed">
            Real customer reviews from Google Maps and Zomato about our cozy outdoor pizza gardens.
          </p>
        </div>

        <button
          onClick={() => setWriteModalOpen(true)}
          className="py-3.5 px-6 bg-gradient-to-r from-largo-primary to-largo-secondary text-black font-extrabold rounded-lg flex items-center space-x-2 hover:scale-[1.02] active:scale-95 transition duration-300 text-xs uppercase tracking-wider hover:shadow-lg hover:shadow-largo-primary/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Write a Google Review</span>
        </button>
      </div>

      {/* Ratings Summary Stats Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-largo-card-surface border border-white/5 rounded-3xl p-8 shadow-xl">
        
        {/* Metric 1: Average */}
        <div className="flex flex-col items-center justify-center text-center p-4 md:border-r border-white/5 space-y-2">
          <span className="font-display text-7xl text-largo-primary tracking-widest">4.6</span>
          <div className="flex text-largo-primary">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>
          <span className="text-xs text-largo-text-muted">Average Google Maps Rating</span>
        </div>

        {/* Metric 2: Summary bars */}
        <div className="flex flex-col justify-center space-y-2.5 p-4 md:border-r border-white/5">
          {/* 5 Star */}
          <div className="flex items-center text-xs text-largo-text-primary">
            <span className="w-12 text-largo-text-muted">5 Stars</span>
            <div className="flex-1 bg-black/40 h-2 rounded-full mx-3 overflow-hidden border border-white/5">
              <div className="bg-largo-primary h-full rounded-full" style={{ width: "82%" }}></div>
            </div>
            <span className="w-8 text-right font-semibold">82%</span>
          </div>
          {/* 4 Star */}
          <div className="flex items-center text-xs text-largo-text-primary">
            <span className="w-12 text-largo-text-muted">4 Stars</span>
            <div className="flex-1 bg-black/40 h-2 rounded-full mx-3 overflow-hidden border border-white/5">
              <div className="bg-largo-primary h-full rounded-full" style={{ width: "14%" }}></div>
            </div>
            <span className="w-8 text-right font-semibold">14%</span>
          </div>
          {/* 3 Star */}
          <div className="flex items-center text-xs text-largo-text-primary">
            <span className="w-12 text-largo-text-muted">3 Stars</span>
            <div className="flex-1 bg-black/40 h-2 rounded-full mx-3 overflow-hidden border border-white/5">
              <div className="bg-largo-primary h-full rounded-full" style={{ width: "3%" }}></div>
            </div>
            <span className="w-8 text-right font-semibold">3%</span>
          </div>
          {/* 2 Star & below */}
          <div className="flex items-center text-xs text-largo-text-primary">
            <span className="w-12 text-largo-text-muted">2 Stars</span>
            <div className="flex-1 bg-black/40 h-2 rounded-full mx-3 overflow-hidden border border-white/5">
              <div className="bg-largo-primary h-full rounded-full" style={{ width: "1%" }}></div>
            </div>
            <span className="w-8 text-right font-semibold">1%</span>
          </div>
        </div>

        {/* Metric 3: Total and verified badge */}
        <div className="flex flex-col items-center justify-center text-center p-4 space-y-4">
          <div className="w-12 h-12 rounded-full bg-largo-primary/10 border border-largo-primary/20 flex items-center justify-center text-largo-primary">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-lg text-largo-text-primary">1,200+ Reviews</h4>
            <p className="text-xs text-largo-text-muted mt-1 leading-normal max-w-[200px]">
              Aggregated across our Wakad, Viman Nagar, Mundhwa, and DP Road outlets.
            </p>
          </div>
        </div>

      </div>

      {/* Sorting / Filter bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-largo-card-surface/50 border border-white/5 p-4 rounded-2xl">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-largo-text-muted mr-2 flex items-center gap-1.5 font-bold uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter Stars:</span>
          </span>
          {["All", "5", "4"].map((stars) => (
            <button
              key={stars}
              onClick={() => setStarFilter(stars)}
              className={`py-1.5 px-4 rounded-full text-xs font-semibold border transition duration-300 ${
                starFilter === stars
                  ? "bg-largo-primary text-black border-largo-primary font-bold"
                  : "border-white/10 text-largo-text-muted hover:text-largo-text-primary hover:bg-white/5"
              }`}
            >
              {stars === "All" ? "All Stars" : `${stars} ★`}
            </button>
          ))}
        </div>

        {/* Sorting */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-largo-text-muted flex items-center gap-1.5 font-bold uppercase tracking-wider">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Sort by:</span>
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-black/40 border border-white/10 rounded-lg py-1.5 px-3 text-largo-text-primary text-xs font-semibold focus:outline-none focus:border-largo-primary"
          >
            <option value="newest">Newest First</option>
            <option value="highest">Highest Rating</option>
          </select>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedReviews.map((rev) => (
          <div
            key={rev.id}
            className={`bg-largo-card-surface border rounded-2xl p-6 flex flex-col justify-between gap-6 hover:shadow-xl hover:shadow-black/50 transition-all duration-300 relative group min-h-[220px] ${
              rev.isCustom ? "border-largo-primary/20 shadow-md shadow-largo-primary/5" : "border-white/5"
            }`}
          >
            {rev.isCustom && (
              <span className="absolute top-4 right-4 bg-largo-primary text-black font-extrabold text-[8px] tracking-wider px-2 py-0.5 rounded uppercase">
                Newly Added
              </span>
            )}

            <div className="space-y-4">
              
              {/* Header Info */}
              <div className="flex justify-between items-start border-b border-white/5 pb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-largo-primary/30 to-largo-secondary/30 border border-white/10 flex items-center justify-center font-bold text-sm text-largo-primary">
                    {rev.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <h4 className="font-bold text-sm text-largo-text-primary leading-tight">
                        {rev.name}
                      </h4>
                      {rev.isLocalGuide && (
                        <span className="bg-largo-primary/10 border border-largo-primary/20 text-largo-primary text-[8px] font-extrabold px-1.5 py-0.5 rounded tracking-wide uppercase flex items-center gap-0.5" title="Google Verified Local Guide">
                          <Compass className="w-2.5 h-2.5 animate-spin-slow" />
                          <span>GUIDE</span>
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-largo-text-muted mt-0.5 block">
                      {rev.location} &bull; {rev.date}
                    </span>
                  </div>
                </div>
              </div>

              {/* Star Rating & Text */}
              <div className="space-y-2">
                <div className="flex text-largo-primary">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                  {[...Array(5 - rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-white/10" />
                  ))}
                </div>
                <p className="text-xs text-largo-text-primary/90 leading-relaxed italic">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

            </div>

            {/* Recommendation info */}
            {rev.recommendation && (
              <div className="mt-auto pt-3 border-t border-white/5 text-[10px] text-largo-text-muted">
                👍 <span className="font-bold text-largo-primary ml-1">Recommend:</span> {rev.recommendation}
              </div>
            )}

          </div>
        ))}
      </div>

      {/* WRITE REVIEW MODAL */}
      {writeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 transition-all duration-300">
          <div className="w-full max-w-[440px] bg-largo-card-surface border border-white/5 rounded-2xl p-8 relative shadow-2xl animate-fade-in-up">
            
            {/* Close Button */}
            <button
              onClick={() => setWriteModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 text-largo-text-muted hover:text-largo-text-primary transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-display text-largo-primary tracking-wide">Write Google Review</h3>
              <p className="text-xs text-largo-text-muted mt-1">Submit simulated review to our customer wall</p>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              
              {/* Name */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-largo-text-muted tracking-wider block">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priyesh R."
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-xs text-largo-text-primary focus:outline-none focus:border-largo-primary"
                />
              </div>

              {/* Rating */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-largo-text-muted tracking-wider block">Rating Star Count</label>
                <div className="flex gap-2 bg-black/40 p-2 rounded-lg border border-white/5 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormRating(star)}
                      className="p-1 hover:scale-115 transition"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          formRating >= star ? "fill-largo-primary text-largo-primary" : "text-white/10"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-largo-text-muted tracking-wider block">Pune Location / Branch Visited</label>
                <select
                  value={formLocation}
                  onChange={(e) => setFormLocation(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-xs text-largo-text-primary focus:outline-none focus:border-largo-primary"
                >
                  <option value="Viman Nagar Regular">Viman Nagar Outlet</option>
                  <option value="Wakad Outlet">Wakad Outlet</option>
                  <option value="Mundhwa Outlet">Mundhwa Outlet</option>
                  <option value="FC Road Outlet">FC Road Outlet</option>
                  <option value="Salunkhe Vihar Outlet">Salunkhe Vihar Outlet</option>
                  <option value="Pune Local">Pune Local</option>
                </select>
              </div>

              {/* Favorite Dish */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-largo-text-muted tracking-wider block">Favorite Dish (Recommended)</label>
                <input
                  type="text"
                  placeholder="e.g. Inferno (18 inch), Cheese Garlic Bread"
                  value={formRecommend}
                  onChange={(e) => setFormRecommend(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-xs text-largo-text-primary focus:outline-none focus:border-largo-primary"
                />
              </div>

              {/* Quote */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-largo-text-muted tracking-wider block">Review Comments</label>
                <textarea
                  required
                  rows="3"
                  placeholder="Tell us about the thin crust, the garden seating, and your overall experience..."
                  value={formQuote}
                  onChange={(e) => setFormQuote(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-xs text-largo-text-primary focus:outline-none focus:border-largo-primary resize-none"
                ></textarea>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-largo-primary to-largo-secondary text-black font-extrabold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center space-x-2 transition duration-300 hover:scale-[1.02]"
              >
                <span>Submit Verified Review</span>
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
