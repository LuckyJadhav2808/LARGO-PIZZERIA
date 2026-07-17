"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import PizzaMascot from "./PizzaMascot";

export function AnimeNavBar({ items, defaultActive = "Home" }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [hoveredTab, setHoveredTab] = useState(null);
  const [activeTab, setActiveTab] = useState(defaultActive);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Synchronize active tab state with router pathname changes
  useEffect(() => {
    const activeItem = items.find((item) => item.url === pathname);
    if (activeItem) {
      setActiveTab(activeItem.name);
    }
  }, [pathname, items]);

  if (!mounted) return null;

  return (
    <div className="flex items-center gap-1 bg-black/40 border border-white/5 py-1 px-1.5 rounded-full relative shadow-inner overflow-visible">
      {items.map((item) => {
        const isActive = activeTab === item.name;
        const isHovered = hoveredTab === item.name;

        return (
          <Link
            key={item.name}
            href={item.url}
            onMouseEnter={() => setHoveredTab(item.name)}
            onMouseLeave={() => setHoveredTab(null)}
            className={`relative cursor-pointer text-[10px] uppercase font-extrabold tracking-widest px-4 py-2.5 rounded-full transition-all duration-300 select-none overflow-visible ${
              isActive 
                ? "text-largo-primary" 
                : "text-largo-text-muted hover:text-largo-text-primary"
            }`}
          >
            {/* Active shine & glow effect */}
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-full -z-10 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0.3, 0.5, 0.3],
                  scale: [1, 1.03, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="absolute inset-0 bg-largo-primary/15 rounded-full blur-sm" />
                <div className="absolute inset-[-4px] bg-largo-primary/10 rounded-full blur-md" />
                <div className="absolute inset-[-8px] bg-largo-secondary/5 rounded-full blur-lg" />
                
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-largo-primary/0 via-largo-primary/15 to-largo-primary/0"
                  style={{
                    animation: "shine 3s ease-in-out infinite"
                  }}
                />
              </motion.div>
            )}

            <span className="relative z-10">{item.name}</span>
      
            {/* Inactive tab hover highlight bubble */}
            <AnimatePresence>
              {isHovered && !isActive && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 bg-white/5 rounded-full -z-10 border border-white/5"
                />
              )}
            </AnimatePresence>

            {/* Float mascot directly over the active tab */}
            {isActive && (
              <motion.div
                layoutId="anime-mascot"
                className="absolute -top-[54px] left-1/2 -translate-x-1/2 pointer-events-none"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              >
                {/* Waving is activated when the active tab container is hovered */}
                <PizzaMascot size={46} isHovered={hoveredTab !== null} />
              </motion.div>
            )}
          </Link>
        );
      })}
    </div>
  );
}
