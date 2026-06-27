"use client";

import React, { useState, useEffect } from "react";
import { MapPin, Phone, Clock, Navigation, AlertCircle } from "lucide-react";

export default function OutletsPage() {
  const [isOpen, setIsOpen] = useState(true);

  // Check if current Pune time (12 PM - 11 PM) matches open hours
  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      // Convert current time to Indian Standard Time (IST) if needed, but new Date() local on user's system in India works.
      const hours = now.getHours();
      setIsOpen(hours >= 12 && hours < 23);
    };
    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const outlets = [
    {
      id: "viman-nagar",
      name: "Viman Nagar",
      tag: "Original Location",
      address: "Largo Pizzeria, Row House No. 2, Nitron Classic, Opp. Gold Adlabs, Kalyani Nagar Road, Viman Nagar, Pune, Maharashtra 411014",
      phone: "+91 91584 76606",
      hours: "12 PM – 11 PM Daily",
      lastOrder: "Last order at 10:30 PM",
      mapsUrl: "https://maps.google.com/?q=Largo+Pizzeria+Viman+Nagar",
      mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.3557434771694!2d73.9100412!3d18.5580004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c13e2f5bffff%3A0xe54e60155b5f822d!2sLargo%20Pizzeria!5e0!3m2!1sen!2sin!4v1719500000000!5m2!1sen!2sin",
      placeholder: false
    },
    {
      id: "baner",
      name: "Baner",
      tag: "Tech Hub Favourite",
      address: "Largo Pizzeria, Ground Floor, Golden Empire, Baner Road, Near Pancard Club Road, Baner, Pune, Maharashtra 411045",
      phone: "+91 91584 76607",
      hours: "12 PM – 11 PM Daily",
      lastOrder: "Last order at 10:30 PM",
      mapsUrl: "https://maps.google.com/?q=Largo+Pizzeria+Baner",
      mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.1234567890123!2d73.7891234!3d18.5678901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2be123456789f%3A0x123456789abcdef0!2sLargo+Pizzeria+Baner!5e0!3m2!1sen!2sin!4v1719500000000!5m2!1sen!2sin",
      placeholder: true
    },
    {
      id: "koregaon-park",
      name: "Koregaon Park",
      tag: "Weekend Destination",
      address: "Largo Pizzeria, Lane 5, Near Plaza Mall, Koregaon Park, Pune, Maharashtra 411001",
      phone: "+91 91584 76608",
      hours: "12 PM – 11 PM Daily",
      lastOrder: "Last order at 10:30 PM",
      mapsUrl: "https://maps.google.com/?q=Largo+Pizzeria+Koregaon+Park",
      mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.2345678901234!2d73.8891234!3d18.5378901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c123456789ab%3A0x23456789abcdef01!2sLargo+Pizzeria+Koregaon+Park!5e0!3m2!1sen!2sin!4v1719500000000!5m2!1sen!2sin",
      placeholder: true
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="space-y-3">
        <h1 className="font-display text-5xl sm:text-6xl text-largo-text-primary tracking-wide">
          Find Us in Pune
        </h1>
        <p className="text-largo-text-muted text-base sm:text-lg max-w-xl font-medium">
          Three locations. One obsession. Visit our outdoor gardens and share an 18-inch monster thin crust.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {outlets.map((outlet) => (
          <div
            key={outlet.id}
            id={outlet.id}
            className="bg-largo-card-surface border border-white/5 rounded-[20px] p-6 sm:p-8 flex flex-col justify-between gap-6 hover:border-largo-primary/20 transition-all duration-300 shadow-2xl relative scroll-mt-24"
          >
            
            {/* Top Details */}
            <div className="space-y-6">
              
              {/* Location title + tag pill */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-3xl text-largo-text-primary tracking-wide">
                    {outlet.name}
                  </h3>
                  <span className="text-[10px] font-bold text-largo-primary tracking-wider uppercase bg-largo-primary/10 border border-largo-primary/20 rounded px-2.5 py-0.5 mt-1 inline-block">
                    {outlet.tag}
                  </span>
                </div>

                {/* Status Badge */}
                <div className="flex items-center space-x-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${isOpen ? "bg-largo-success animate-pulse" : "bg-red-500"}`} />
                  <span className={`text-sm font-semibold ${isOpen ? "text-largo-success" : "text-red-400"}`}>
                    {isOpen ? "Open Now" : "Closed"}
                  </span>
                </div>
              </div>

              {/* Details stack */}
              <div className="space-y-4 text-sm text-largo-text-muted">
                
                {/* Address */}
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-largo-primary flex-shrink-0 mt-0.5" />
                  <p className="leading-relaxed text-largo-text-primary/90">{outlet.address}</p>
                </div>

                {/* Phone */}
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-largo-primary flex-shrink-0" />
                  <a
                    href={`tel:${outlet.phone.replace(/\s+/g, "")}`}
                    className="text-largo-text-primary hover:text-largo-primary transition font-medium"
                  >
                    {outlet.phone}
                  </a>
                </div>

                {/* Hours */}
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-largo-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-largo-text-primary/90">{outlet.hours}</p>
                    <p className="text-xs text-largo-primary/75 mt-0.5">{outlet.lastOrder}</p>
                  </div>
                </div>

              </div>

              {/* Placeholder warning message */}
              {outlet.placeholder && (
                <div className="flex items-start space-x-2 p-3 bg-largo-primary/5 border border-largo-primary/10 rounded-xl text-largo-primary text-xs">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <p>Address coming soon — call to confirm location.</p>
                </div>
              )}

            </div>

            {/* CTAs & Map Embed */}
            <div className="space-y-4 pt-4 border-t border-white/5 mt-auto">
              
              {/* Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={outlet.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-4 bg-largo-primary hover:bg-largo-secondary text-black text-xs font-bold rounded-lg uppercase tracking-wider flex items-center justify-center space-x-1.5 transition duration-300"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Directions</span>
                </a>
                
                <a
                  href={`tel:${outlet.phone.replace(/\s+/g, "")}`}
                  className="py-2.5 px-4 border border-white/10 hover:border-largo-primary/30 bg-white/5 hover:bg-white/10 text-largo-text-primary hover:text-largo-primary text-xs font-bold rounded-lg uppercase tracking-wider flex items-center justify-center space-x-1.5 transition duration-300"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </a>
              </div>

              {/* Google Map iframe Embed with dark tint CSS filters */}
              <div className="relative w-full h-[240px] rounded-xl overflow-hidden border border-white/5 shadow-inner">
                <iframe
                  src={outlet.mapsEmbed}
                  width="100%"
                  height="100%"
                  style={{ 
                    border: 0,
                    filter: "invert(90%) hue-rotate(180deg) contrast(120%) grayscale(15%)",
                    opacity: 0.8
                  }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${outlet.name} Map Embed`}
                />
              </div>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
