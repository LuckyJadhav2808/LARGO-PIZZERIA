"use client";

import React, { useEffect, useState } from "react";
import { X, Smartphone, CheckCircle, CreditCard, Landmark, QrCode } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function PaymentModal() {
  const {
    cart,
    tableId,
    paymentOpen,
    setPaymentOpen,
    updatePaymentStatus,
    updateOrderStep,
    placeOrder,
  } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("UPI"); // UPI | Pay at Table | Pay at Reception

  // Prevent scroll when modal is open
  useEffect(() => {
    if (paymentOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [paymentOpen]);

  if (!paymentOpen) return null;

  // Calculate totals
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;

  const handleDemoAppClick = (appName) => {
    window.alert(`[DEMO] Opening ${appName}. In a production environment, this would deep-link to the payment app. Please scan the QR code to complete payment.`);
  };

  const handleConfirmPayment = () => {
    const isUPI = paymentMethod === "UPI";
    const status = isUPI ? "paid" : "pending";
    
    // Sync payment success status & set step to 1 (Baking Crust)
    updatePaymentStatus(isUPI ? "success" : "pending");
    updateOrderStep(1);
    
    // Log the order to the shared orders database with selected method and status
    placeOrder(null, paymentMethod, status);
    
    // Close modal
    setPaymentOpen(false);

    // Alert completion and redirect
    if (isUPI) {
      window.alert("Payment confirmed! Your order has been sent to the kitchen. Redirecting to Live Order Tracker.");
    } else {
      window.alert(`Order sent! Please pay ₹${total} ${paymentMethod === "Pay at Table" ? "at your table" : "at the reception counter"}. Redirecting to tracker.`);
    }
    
    // Navigate to page route and scroll to order tracker
    window.location.href = "/#order-tracker";
    
    // Smooth scroll delay to allow page rendering if needed
    setTimeout(() => {
      const tracker = document.getElementById("order-tracker");
      if (tracker) {
        tracker.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 transition-all duration-300">
      
      {/* Modal Card */}
      <div className="w-full max-w-[420px] bg-largo-card-surface border border-white/5 rounded-[20px] p-8 relative shadow-2xl animate-fade-in-up">
        
        {/* Close Button */}
        <button
          onClick={() => setPaymentOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 text-largo-text-muted hover:text-largo-text-primary transition duration-300"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-display text-largo-primary tracking-wide">Checkout</h2>
          <p className="text-sm text-largo-text-muted mt-1">Largo Pizzeria Garden Order Checkout</p>
        </div>

        {/* Amount Box */}
        <div className="text-center bg-black/30 rounded-xl p-4 mb-6 border border-white/5">
          <span className="text-xs text-largo-text-muted uppercase tracking-wider block">Total Amount Due</span>
          <span className="text-3xl font-bold text-largo-primary mt-1 block font-display tracking-widest">₹{total}</span>
        </div>

        {/* Payment Method Selector Tabs */}
        <div className="grid grid-cols-3 gap-1 bg-black/40 p-1 rounded-lg border border-white/5 mb-6 text-center">
          <button
            onClick={() => setPaymentMethod("UPI")}
            className={`py-2 text-[9px] uppercase font-extrabold rounded-md transition-all flex flex-col items-center justify-center gap-1 ${
              paymentMethod === "UPI"
                ? "bg-largo-primary text-black"
                : "text-largo-text-muted hover:text-largo-text-primary hover:bg-white/5"
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Scan & Pay</span>
          </button>
          <button
            onClick={() => setPaymentMethod("Pay at Table")}
            className={`py-2 text-[9px] uppercase font-extrabold rounded-md transition-all flex flex-col items-center justify-center gap-1 ${
              paymentMethod === "Pay at Table"
                ? "bg-largo-primary text-black"
                : "text-largo-text-muted hover:text-largo-text-primary hover:bg-white/5"
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Pay at Table</span>
          </button>
          <button
            onClick={() => setPaymentMethod("Pay at Reception")}
            className={`py-2 text-[9px] uppercase font-extrabold rounded-md transition-all flex flex-col items-center justify-center gap-1 ${
              paymentMethod === "Pay at Reception"
                ? "bg-largo-primary text-black"
                : "text-largo-text-muted hover:text-largo-text-primary hover:bg-white/5"
            }`}
          >
            <Landmark className="w-3.5 h-3.5" />
            <span>At Counter</span>
          </button>
        </div>

        {/* UPI METHOD VIEW */}
        {paymentMethod === "UPI" && (
          <div className="space-y-6">
            <div className="flex flex-col items-center justify-center">
              <div className="w-[180px] h-[180px] bg-white p-3 rounded-xl shadow-lg border border-largo-primary/20 relative flex items-center justify-center">
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#18181C] text-largo-primary rounded-xl border border-dashed border-largo-primary/30 m-1">
                  <span className="text-3xl">📱</span>
                  <span className="font-display text-base mt-2 tracking-widest">UPI QR CODE</span>
                  <span className="text-[9px] text-largo-text-muted mt-1 uppercase">Scan to complete payment</span>
                </div>
              </div>
              <span className="font-mono text-[10px] text-largo-text-muted mt-3 block bg-black/40 px-3 py-1 rounded border border-white/5 select-all">
                UPI ID: largo.pune@upi
              </span>
            </div>

            {/* App Quick Deep Link Buttons */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleDemoAppClick("Google Pay")}
                className="py-2 rounded-lg border border-white/10 hover:border-largo-primary/40 bg-white/5 hover:bg-white/10 text-[10px] font-bold uppercase tracking-wider flex flex-col items-center gap-1 transition duration-300"
              >
                <Smartphone className="w-4 h-4 text-largo-primary" />
                <span>GPay</span>
              </button>
              <button
                onClick={() => handleDemoAppClick("PhonePe")}
                className="py-2 rounded-lg border border-white/10 hover:border-largo-primary/40 bg-white/5 hover:bg-white/10 text-[10px] font-bold uppercase tracking-wider flex flex-col items-center gap-1 transition duration-300"
              >
                <Smartphone className="w-4 h-4 text-largo-primary" />
                <span>PhonePe</span>
              </button>
              <button
                onClick={() => handleDemoAppClick("Paytm")}
                className="py-2 rounded-lg border border-white/10 hover:border-largo-primary/40 bg-white/5 hover:bg-white/10 text-[10px] font-bold uppercase tracking-wider flex flex-col items-center gap-1 transition duration-300"
              >
                <Smartphone className="w-4 h-4 text-largo-primary" />
                <span>Paytm</span>
              </button>
            </div>
          </div>
        )}

        {/* PAY AT TABLE METHOD VIEW */}
        {paymentMethod === "Pay at Table" && (
          <div className="flex flex-col items-center justify-center py-8 text-center space-y-4 border border-dashed border-white/10 rounded-xl bg-black/20">
            <span className="text-4xl animate-bounce">💵</span>
            <div className="space-y-1">
              <h4 className="font-semibold text-largo-text-primary text-sm">Pay Cash/Card at Table</h4>
              <p className="text-xs text-largo-text-muted max-w-[280px] leading-relaxed px-4">
                You can pay when your meal arrives. A waiter will bring the physical invoice bill and card swipe terminal to **Table #{tableId || "—"}**.
              </p>
            </div>
          </div>
        )}

        {/* PAY AT RECEPTION METHOD VIEW */}
        {paymentMethod === "Pay at Reception" && (
          <div className="flex flex-col items-center justify-center py-8 text-center space-y-4 border border-dashed border-white/10 rounded-xl bg-black/20">
            <span className="text-4xl animate-bounce">🏪</span>
            <div className="space-y-1">
              <h4 className="font-semibold text-largo-text-primary text-sm">Pay at Reception Desk</h4>
              <p className="text-xs text-largo-text-muted max-w-[280px] leading-relaxed px-4">
                Please visit the front checkout desk before or after your meal. Mention **Table #{tableId || "—"}** to pay cash or swipe card at the reception counter.
              </p>
            </div>
          </div>
        )}

        {/* Confirmation Button */}
        <div className="pt-5 border-t border-white/5 mt-6 text-center flex flex-col items-center">
          <button
            onClick={handleConfirmPayment}
            className="w-full py-3 bg-gradient-to-r from-largo-primary to-largo-secondary text-black font-extrabold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center space-x-2 shadow-lg shadow-largo-primary/20 hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <CheckCircle className="w-4 h-4" />
            <span>
              {paymentMethod === "UPI"
                ? "Confirm UPI Payment"
                : paymentMethod === "Pay at Table"
                ? "Send Order (Pay at Table)"
                : "Send Order (Pay at Counter)"}
            </span>
          </button>
          <span className="text-[10px] text-largo-text-muted mt-2 block">
            Clicking confirm logs your order to the kitchen.
          </span>
        </div>

      </div>
    </div>
  );
}
