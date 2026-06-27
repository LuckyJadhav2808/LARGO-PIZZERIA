"use client";

import React from "react";
import Image from "next/image";
import { TreePine, Lightbulb, Flame, Users } from "lucide-react";

export default function StoryPage() {
  const spaceFeatures = [
    {
      icon: TreePine,
      title: "Open-Air Garden",
      description: "Dine under Pune's night sky. Our space is enclosed by natural bamboo fencing and lush, creeping green ivy."
    },
    {
      icon: Lightbulb,
      title: "String Light Canopy",
      description: "Warm Edison string lights laced through trees overhead, creating a cozy and welcoming neighborhood glow."
    },
    {
      icon: Flame,
      title: "Wood-Fired Passion",
      description: "Every 18-inch monster crust is kissed by real wood fire. Quick-charred at 450 degrees for ultimate crunch."
    },
    {
      icon: Users,
      title: "Long Bench Seating",
      description: "Traditional long wooden communal benches. Built for big groups, loud conversations, and shared slices."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. STORY HERO */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Full-bleed background */}
        <Image
          src="/assets/restaurant photo 2.png"
          alt="Largo Night Garden Seating"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px]" />
        
        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 space-y-4">
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl tracking-wider text-largo-text-primary uppercase leading-none">
            The Legend of the 18-Inch Crust
          </h1>
          <p className="font-body italic text-lg sm:text-xl text-largo-text-muted max-w-xl mx-auto">
            “Born in Pune. Built for sharing.”
          </p>
        </div>
      </section>

      {/* 2. EDITORIAL BODY SECTION */}
      <section className="bg-largo-bg-surface py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-16">
          
          {/* Three Editorial Blocks */}
          <div className="space-y-12">
            
            <div className="space-y-4">
              <h2 className="font-display text-4xl text-largo-primary tracking-wide">
                Where it all started
              </h2>
              <p className="text-largo-text-primary/95 text-base sm:text-lg leading-relaxed font-light">
                In 2018, Largo Pizzeria opened as a small, unpretentious outdoor kitchen tucked away in a quiet lane of Viman Nagar, Pune. We didn&apos;t want to create another corporate, fast-food joint. We wanted a cozy, laidback corner that felt local, warm, and inviting. We set up white brick walls, laced string lights through the trees, crafted long benches, and fired up the oven.
              </p>
            </div>

            <hr className="border-largo-primary/20 w-24" />

            <div className="space-y-4">
              <h2 className="font-display text-4xl text-largo-primary tracking-wide">
                The Obsession with 18 Inches
              </h2>
              <p className="text-largo-text-primary/95 text-base sm:text-lg leading-relaxed font-light">
                Why 18 inches? Because we believe pizza is communal. It&apos;s meant to be shared over laughs, arguments, and cold floats under an open sky. But making a thin crust that size without it getting soggy or folding under weight is an art. We spent months tweaking hydration ratios, testing flour types, and regulating temperature. The result? A crust that&apos;s paper-thin, holds its toppings perfectly, and has a satisfying crack in every single bite.
              </p>
            </div>

            <hr className="border-largo-primary/20 w-24" />

            <div className="space-y-4">
              <h2 className="font-display text-4xl text-largo-primary tracking-wide">
                Pune&apos;s Night Garden Culture
              </h2>
              <p className="text-largo-text-primary/95 text-base sm:text-lg leading-relaxed font-light">
                Today, Largo has become a staple of Pune&apos;s late-night food culture. Whether it&apos;s college students from KP sharing a slice after classes, families sitting down on our wooden benches in Baner, or regular locals catching up under the glowing string lights in Viman Nagar—the garden is always alive with warmth, night breezes, and fresh wood-fired monsters.
              </p>
            </div>

          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-white/5 group">
              <Image
                src="/assets/restaurant photo 1.png"
                alt="Largo Exterior Entryway"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-white/5 group">
              <Image
                src="/assets/restaurant photo 4.png"
                alt="Largo Table Setting Close-up"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </div>

        </div>
      </section>

      {/* 3. SPACE FEATURES GRID */}
      <section className="bg-largo-card-surface py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Section Header */}
          <div className="text-center space-y-3">
            <h2 className="font-display text-4xl sm:text-5xl text-largo-text-primary tracking-wide">
              The Space
            </h2>
            <p className="text-sm text-largo-text-muted max-w-sm mx-auto">
              Our outlets are designed to be an escape from the city hustle.
            </p>
          </div>

          {/* 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {spaceFeatures.map((feat, idx) => {
              const IconComp = feat.icon;
              return (
                <div
                  key={idx}
                  className="bg-largo-bg-base border border-white/5 rounded-2xl p-6 space-y-4 hover:border-largo-primary/20 transition-all duration-300 group"
                >
                  <div className="p-3 bg-largo-primary/10 rounded-xl text-largo-primary w-fit border border-largo-primary/10 group-hover:bg-largo-primary/20 transition duration-300">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display text-2xl text-largo-text-primary tracking-wide group-hover:text-largo-primary transition duration-300">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-largo-text-muted leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
}
