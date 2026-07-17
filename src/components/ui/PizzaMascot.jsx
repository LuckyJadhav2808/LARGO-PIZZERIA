import React from "react";
import "./PizzaMascot.css";

// Largo Pizzeria mascot — a bobbing, blinking, waving pizza slice.
// Usage: <PizzaMascot size={220} />
export default function PizzaMascot({ size = 220, className = "", isHovered = false }) {
  return (
    <div className={`pizza-mascot-wrap ${className}`}>
      <svg
        width={size}
        height={size * (240 / 220)}
        viewBox="0 0 220 240"
        className="pizza-mascot"
        style={{ overflow: "visible" }}
      >
        <ellipse className="steam-puff" cx="90" cy="30" rx="6" ry="10" fill="#f0997b" opacity="0.5" />
        <ellipse className="steam-puff" cx="110" cy="25" rx="5" ry="9" fill="#f0997b" opacity="0.5" />
        <ellipse className="steam-puff" cx="130" cy="30" rx="6" ry="10" fill="#f0997b" opacity="0.5" />

        <path d="M 110 60 L 190 200 Q 110 230 30 200 Z" fill="#f0a04b" stroke="#b8730a" strokeWidth="3" />
        <path d="M 110 60 L 190 200 Q 110 215 30 200 Z" fill="#f7c26b" />

        <circle cx="70" cy="120" r="10" fill="#d94f2b" />
        <circle cx="120" cy="150" r="10" fill="#d94f2b" />
        <circle cx="95" cy="185" r="9" fill="#d94f2b" />
        <circle cx="140" cy="110" r="9" fill="#d94f2b" />
        <circle cx="60" cy="170" r="8" fill="#d94f2b" />

        <g className={`arm-wave ${isHovered ? "active-wave" : ""}`}>
          <ellipse cx="70" cy="130" rx="8" ry="22" fill="#f7c26b" transform="rotate(-20 70 130)" />
        </g>
        <ellipse cx="150" cy="140" rx="8" ry="20" fill="#f7c26b" transform="rotate(25 150 140)" />

        <ellipse className="pizza-eye" cx="90" cy="110" rx="6" ry="8" fill="#2c1a0d" />
        <ellipse className="pizza-eye" cx="125" cy="118" rx="6" ry="8" fill="#2c1a0d" />

        <path d="M 90 140 Q 108 155 128 142" stroke="#2c1a0d" strokeWidth="4" fill="none" strokeLinecap="round" />

        <circle cx="75" cy="130" r="7" fill="#f0997b" opacity="0.6" />
        <circle cx="140" cy="135" r="7" fill="#f0997b" opacity="0.6" />
      </svg>
    </div>
  );
}
