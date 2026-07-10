"use client";

import React, { useRef, useEffect, useState } from "react";
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  AlertTriangle, 
  ArrowLeft, 
  QrCode, 
  Smartphone, 
  CheckCircle,
  CreditCard,
  ChevronRight
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const {
    cart,
    tableId,
    cartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    syncTable,
    updatePaymentStatus,
    updateOrderStep,
    placeOrder,
  } = useCart();

  const drawerRef = useRef(null);

  // States
  const [checkoutStep, setCheckoutStep] = useState(0); // 0 = Review Cart, 1 = Choose Payment & Pay
  const [paymentMethod, setPaymentMethod] = useState("UPI"); // UPI | Pay at Table | Pay at Reception
  const [selectedUpiApp, setSelectedUpiApp] = useState("GPay"); // GPay | PhonePe | Paytm
  const [showUpiQr, setShowUpiQr] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Inline Table Sync States in Drawer
  const [drawerTableInput, setDrawerTableInput] = useState("");
  const [isEditingDrawerTable, setIsEditingDrawerTable] = useState(false);
  const [drawerTableError, setDrawerTableError] = useState("");

  // Sync state with tableId on mount
  useEffect(() => {
    if (tableId) {
      setDrawerTableInput(tableId);
    } else {
      setDrawerTableInput("");
    }
  }, [tableId]);

  // Reset checkout step when drawer is opened/closed
  useEffect(() => {
    if (!cartOpen) {
      setCheckoutStep(0);
      setShowUpiQr(false);
      setIsPlacingOrder(false);
    }
  }, [cartOpen]);

  const handleDrawerTableSync = (e) => {
    e.preventDefault();
    const val = parseInt(drawerTableInput.trim(), 10);
    if (isNaN(val) || val <= 0 || val > 99) {
      setDrawerTableError("Enter 1-99");
      return;
    }
    setDrawerTableError("");
    syncTable(val.toString());
    setIsEditingDrawerTable(false);
  };

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

  // Final Order Placement Execution
  const handleConfirmAndPay = () => {
    setIsPlacingOrder(true);
    
    // Simulate minor network delay for premium feel
    setTimeout(() => {
      const isUPI = paymentMethod === "UPI";
      const status = isUPI ? "paid" : "pending";
      
      // Update Context States
      updatePaymentStatus(isUPI ? "success" : "pending");
      updateOrderStep(1); // oven preheating
      
      // Push order to global admin order pool
      placeOrder(null, paymentMethod, status);
      
      setIsPlacingOrder(false);
      setCartOpen(false);

      if (isUPI) {
        window.alert(`Payment of ₹${total} received! Your order has been sent to the kitchen.`);
      } else {
        window.alert(`Order placed successfully! Please pay ₹${total} ${paymentMethod === "Pay at Table" ? "at your table" : "at the reception counter"}.`);
      }

      // Navigate to order tracker on homepage
      window.location.href = "/#order-tracker";
      setTimeout(() => {
        const tracker = document.getElementById("order-tracker");
        if (tracker) {
          tracker.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end cart-overlay bg-black/70 backdrop-blur-sm transition-all duration-300">
      
      {/* Drawer Body - Full screen on mobile, 440px wide sidebar on desktop */}
      <div
        ref={drawerRef}
        className="w-full sm:w-[440px] h-full bg-largo-bg-surface border-l border-white/5 flex flex-col shadow-2xl relative animate-slide-in-right"
      >
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {checkoutStep === 1 ? (
              <button
                onClick={() => setCheckoutStep(0)}
                className="p-1 -ml-1 rounded-full hover:bg-white/10 text-largo-primary transition"
                aria-label="Back to Cart"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            ) : (
              <ShoppingBag className="w-5 h-5 text-largo-primary" />
            )}
            <h2 className="text-xl font-bold tracking-wide">
              {checkoutStep === 1 ? "Select Payment" : "Your Order"}
            </h2>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="p-1.5 rounded-full hover:bg-white/10 text-largo-text-muted hover:text-largo-text-primary transition duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Main Area */}
        <div className="flex-grow overflow-y-auto px-6 py-5 space-y-5 no-scrollbar">
          
          {/* STEP 1: REVIEW CART ITEMS */}
          {checkoutStep === 0 && (
            <>
              {/* Table Sync Warning/Info */}
              <div className="p-4 rounded-xl border border-white/5 bg-largo-card-surface/50">
                {(tableId && !isEditingDrawerTable) ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-largo-success text-sm font-semibold">
                      <span className="w-2 h-2 rounded-full bg-largo-success animate-ping" />
                      <span>Seated at Table {tableId}</span>
                    </div>
                    <div className="flex space-x-2 text-xs">
                      <button
                        onClick={() => setIsEditingDrawerTable(true)}
                        className="text-largo-primary hover:underline font-bold cursor-pointer"
                      >
                        Change
                      </button>
                      <span className="text-white/10">|</span>
                      <button
                        onClick={() => {
                          syncTable("");
                          setDrawerTableInput("");
                          setDrawerTableError("");
                        }}
                        className="text-red-400 hover:text-red-300 font-bold cursor-pointer"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2 text-largo-primary">
                      <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="text-xs font-bold uppercase tracking-wider">Sync Table Number</h4>
                        <p className="text-[10px] text-largo-text-muted mt-0.5">
                          Required for dine-in delivery or waiter billing.
                        </p>
                      </div>
                    </div>

                    <form onSubmit={handleDrawerTableSync} className="flex gap-2">
                      <input
                        type="text"
                        pattern="[0-9]*"
                        inputMode="numeric"
                        placeholder="00"
                        value={drawerTableInput}
                        onChange={(e) => {
                          setDrawerTableInput(e.target.value);
                          if (drawerTableError) setDrawerTableError("");
                        }}
                        className="w-14 bg-black/40 border border-white/10 rounded-lg p-2 text-center font-bold text-sm text-largo-text-primary focus:outline-none focus:border-largo-primary"
                        maxLength={2}
                      />
                      <button
                        type="submit"
                        className="flex-grow py-2 px-4 bg-largo-primary hover:bg-largo-secondary text-black font-extrabold text-[10px] uppercase tracking-wider rounded-lg transition cursor-pointer"
                      >
                        Confirm Table
                      </button>
                      {isEditingDrawerTable && (
                        <button
                          type="button"
                          onClick={() => {
                            setIsEditingDrawerTable(false);
                            setDrawerTableInput(tableId || "");
                            setDrawerTableError("");
                          }}
                          className="py-2 px-3 bg-white/5 hover:bg-white/10 text-largo-text-primary font-bold text-[10px] uppercase rounded-lg cursor-pointer"
                        >
                          Cancel
                        </button>
                      )}
                    </form>
                    {drawerTableError && (
                      <p className="text-red-400 text-[10px] font-semibold animate-pulse">{drawerTableError}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Items List */}
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-largo-text-muted">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-largo-text-primary">Your cart is empty</h3>
                    <p className="text-xs text-largo-text-muted mt-1 max-w-[200px] leading-normal mx-auto">
                      Add delicious monster slices and mocktails to start your order.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-largo-card-surface border border-white/5 relative overflow-hidden group hover:border-largo-primary/20 transition-all duration-300"
                    >
                      <div className="flex-1 mr-4">
                        <span className="text-[10px] font-bold text-largo-primary tracking-wider uppercase opacity-80 block">
                          {item.category}
                        </span>
                        <h3 className="font-semibold text-largo-text-primary leading-tight mt-0.5 text-sm">
                          {item.name}
                        </h3>
                        <p className="text-largo-primary font-semibold text-xs mt-1">
                          ₹{item.price}
                        </p>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="flex items-center border border-white/10 rounded-lg bg-black/20">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1.5 hover:bg-white/5 text-largo-text-muted hover:text-largo-text-primary transition"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-largo-text-primary">
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

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1.5 text-largo-text-muted hover:text-red-500 hover:bg-red-500/10 rounded-lg transition"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* STEP 2: CHOOSE PAYMENT & PAY */}
          {checkoutStep === 1 && (
            <div className="space-y-6">
              
              {/* Grand Total Recap Banner */}
              <div className="bg-largo-card-surface border border-largo-primary/10 rounded-2xl p-5 text-center space-y-1.5 shadow-md">
                <span className="text-[10px] text-largo-text-muted font-bold uppercase tracking-wider block">Amount Payable</span>
                <span className="text-3xl font-extrabold text-largo-primary font-display tracking-widest">₹{total}</span>
                <span className="text-[9px] text-largo-text-muted block leading-none">Includes 5% SGST/CGST charges</span>
              </div>

              {/* Payment Methods Options */}
              <div className="space-y-3">
                <span className="text-[10px] uppercase font-extrabold text-largo-text-muted tracking-wider block px-1">Select Payment Mode</span>
                
                {/* UPI Option */}
                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod("UPI");
                    setShowUpiQr(false);
                  }}
                  className={`w-full p-4 rounded-xl border text-left flex items-start space-x-3.5 transition-all duration-300 cursor-pointer ${
                    paymentMethod === "UPI"
                      ? "bg-largo-primary/5 border-largo-primary"
                      : "bg-largo-card-surface border-white/5 hover:bg-white/5"
                  }`}
                >
                  <div className={`p-2 rounded-lg ${paymentMethod === "UPI" ? "bg-largo-primary text-black" : "bg-white/5 text-largo-text-muted"}`}>
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-largo-text-primary">Instant UPI Pay</h4>
                      <span className="bg-largo-primary/10 text-largo-primary text-[8px] font-extrabold px-1.5 py-0.5 rounded tracking-wide uppercase">Popular</span>
                    </div>
                    <p className="text-xs text-largo-text-muted mt-1 leading-snug">
                      Pay via Google Pay, PhonePe, Paytm, or scan QR code.
                    </p>
                  </div>
                </button>

                {/* Pay at Table (Only if table is synced) */}
                <button
                  type="button"
                  disabled={!tableId}
                  onClick={() => {
                    setPaymentMethod("Pay at Table");
                    setShowUpiQr(false);
                  }}
                  className={`w-full p-4 rounded-xl border text-left flex items-start space-x-3.5 transition-all duration-300 ${
                    !tableId 
                      ? "opacity-45 cursor-not-allowed bg-white/5 border-dashed border-white/5" 
                      : paymentMethod === "Pay at Table"
                        ? "bg-largo-primary/5 border-largo-primary cursor-pointer"
                        : "bg-largo-card-surface border-white/5 hover:bg-white/5 cursor-pointer"
                  }`}
                >
                  <div className={`p-2 rounded-lg ${paymentMethod === "Pay at Table" ? "bg-largo-primary text-black" : "bg-white/5 text-largo-text-muted"}`}>
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-largo-text-primary">Pay at Table</h4>
                    <p className="text-xs text-largo-text-muted mt-1 leading-snug">
                      {!tableId 
                        ? "Sync table number first to use Pay at Table." 
                        : `Pay cash/card to your waiter at Table #${tableId} later.`
                      }
                    </p>
                  </div>
                </button>

                {/* Pay at Counter / Reception */}
                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod("Pay at Reception");
                    setShowUpiQr(false);
                  }}
                  className={`w-full p-4 rounded-xl border text-left flex items-start space-x-3.5 transition-all duration-300 cursor-pointer ${
                    paymentMethod === "Pay at Reception"
                      ? "bg-largo-primary/5 border-largo-primary"
                      : "bg-largo-card-surface border-white/5 hover:bg-white/5"
                  }`}
                >
                  <div className={`p-2 rounded-lg ${paymentMethod === "Pay at Reception" ? "bg-largo-primary text-black" : "bg-white/5 text-largo-text-muted"}`}>
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-largo-text-primary">Pay at Counter (Cash/Card)</h4>
                    <p className="text-xs text-largo-text-muted mt-1 leading-snug">
                      Place order and settle bill directly at the garden reception counter.
                    </p>
                  </div>
                </button>

              </div>

              {/* UPI Sub-Section (If UPI active) */}
              {paymentMethod === "UPI" && (
                <div className="space-y-4 bg-black/30 border border-white/5 p-5 rounded-2xl animate-fade-in">
                  
                  {/* Select App List */}
                  <div className="grid grid-cols-3 gap-2">
                    {["GPay", "PhonePe", "Paytm"].map((app) => (
                      <button
                        key={app}
                        type="button"
                        onClick={() => {
                          setSelectedUpiApp(app);
                          setShowUpiQr(false);
                        }}
                        className={`py-2.5 rounded-lg text-center font-bold text-xs border transition cursor-pointer ${
                          selectedUpiApp === app && !showUpiQr
                            ? "bg-white/10 text-largo-primary border-largo-primary"
                            : "bg-black/20 border-white/5 text-largo-text-muted hover:text-largo-text-primary"
                        }`}
                      >
                        {app}
                      </button>
                    ))}
                  </div>

                  <div className="text-center text-white/20 text-xs font-semibold uppercase">&mdash; or &mdash;</div>

                  {/* QR Toggle Button */}
                  <button
                    type="button"
                    onClick={() => setShowUpiQr(!showUpiQr)}
                    className={`w-full py-3 rounded-lg border font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition cursor-pointer ${
                      showUpiQr 
                        ? "bg-largo-primary/10 border-largo-primary text-largo-primary font-extrabold"
                        : "bg-black/40 border-white/10 text-largo-text-primary hover:bg-black/60"
                    }`}
                  >
                    <QrCode className="w-4 h-4" />
                    <span>{showUpiQr ? "Hide QR Code" : "Show Merchant QR Code"}</span>
                  </button>

                  {/* Merchant QR Mock Representation */}
                  {showUpiQr && (
                    <div className="flex flex-col items-center justify-center space-y-4 pt-3 border-t border-white/5 animate-fade-in">
                      {/* Styled CSS QR Code Box */}
                      <div className="w-44 h-44 bg-white p-3.5 rounded-xl flex flex-col justify-between items-center relative shadow-lg">
                        <div className="w-full flex justify-between">
                          <div className="w-10 h-10 border-4 border-black rounded-sm flex items-center justify-center"><div className="w-4 h-4 bg-black"></div></div>
                          <div className="w-10 h-10 border-4 border-black rounded-sm flex items-center justify-center"><div className="w-4 h-4 bg-black"></div></div>
                        </div>
                        {/* Center Brand Dot */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-black rounded-md flex items-center justify-center text-[8px] font-black text-largo-primary select-none">
                          LARGO
                        </div>
                        <div className="w-full flex justify-between items-end">
                          <div className="w-10 h-10 border-4 border-black rounded-sm flex items-center justify-center"><div className="w-4 h-4 bg-black"></div></div>
                          {/* Mock tiny qr points */}
                          <div className="w-10 h-10 flex flex-wrap gap-1 p-1">
                            <div className="w-2.5 h-2.5 bg-black"></div><div className="w-2.5 h-2.5 bg-black"></div>
                            <div className="w-2.5 h-2.5 bg-black"></div><div className="w-2.5 h-2.5 bg-black"></div>
                          </div>
                        </div>
                      </div>
                      <p className="text-[10px] text-largo-text-muted text-center max-w-[220px]">
                        Scan the code from any UPI app (GPay, PhonePe, Paytm, BHIM) to settle your bill.
                      </p>
                    </div>
                  )}

                </div>
              )}

            </div>
          )}

        </div>

        {/* Footer Checkout Summary */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-white/5 bg-largo-card-surface space-y-4">
            
            {/* Review Step Footer Summary */}
            {checkoutStep === 0 && (
              <>
                <div className="space-y-1.5 text-xs text-largo-text-muted">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (5%)</span>
                    <span>₹{gst}</span>
                  </div>
                  <div className="border-t border-white/5 pt-2 flex justify-between items-end">
                    <span className="font-bold text-largo-text-primary text-sm">Grand Total</span>
                    <span className="text-xl font-extrabold text-largo-primary leading-none">₹{total}</span>
                  </div>
                </div>

                <button
                  onClick={() => setCheckoutStep(1)}
                  className="w-full py-4 bg-gradient-to-r from-largo-primary to-largo-secondary text-black hover:shadow-lg hover:shadow-largo-primary/10 rounded-lg font-extrabold text-center tracking-wide flex items-center justify-center space-x-1.5 transition duration-300 cursor-pointer text-sm uppercase"
                >
                  <span>Select Payment & Pay</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}

            {/* Payment Step Footer Execution */}
            {checkoutStep === 1 && (
              <button
                onClick={handleConfirmAndPay}
                disabled={isPlacingOrder}
                className="w-full py-4 bg-gradient-to-r from-largo-primary to-largo-secondary text-black hover:shadow-lg hover:shadow-largo-primary/10 rounded-lg font-extrabold text-center tracking-wide flex items-center justify-center space-x-2 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm uppercase"
              >
                {isPlacingOrder ? (
                  <span>Processing Order...</span>
                ) : (
                  <span>
                    {paymentMethod === "UPI" ? `Confirm Payment — ₹${total}` : `Place Dine-In Order — ₹${total}`}
                  </span>
                )}
              </button>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
