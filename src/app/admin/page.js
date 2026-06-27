"use client";

import React, { useState } from "react";
import { 
  useCart 
} from "@/context/CartContext";
import { 
  TrendingUp, 
  ShoppingBag, 
  CheckCircle, 
  Clock, 
  Bell, 
  Flame, 
  ChefHat, 
  Utensils, 
  Play,
  RotateCcw,
  ToggleLeft,
  ToggleRight,
  User,
  Coffee,
  Pizza,
  HelpCircle,
  CheckCircle2,
  XCircle
} from "lucide-react";

export default function AdminPage() {
  const {
    ordersList,
    waiterRequests,
    soldOutItems,
    placeOrder,
    markOrderAsPaid,
    advanceSpecificOrderStep,
    cancelSpecificOrder,
    resolveWaiterRequest,
    toggleItemAvailability,
    clearAllData
  } = useCart();

  const [activeTab, setActiveTab] = useState("orders"); // orders | menu | assistance

  // Complete menu items list for toggling availability
  const allMenuItems = [
    { id: "classyrita", name: "Classyrita", category: "Standard Veg" },
    { id: "peppy-peppers", name: "Peppy Peppers", category: "Standard Veg" },
    { id: "wilde-wedges", name: "Wilde Wedges", category: "Standard Veg" },
    { id: "red-alert", name: "Red Alert", category: "Standard Veg" },
    { id: "tres-formaggio", name: "Tres Formaggio", category: "Standard Veg" },
    { id: "ocoli", name: "Ocoli", category: "Standard Veg" },
    { id: "cop", name: "COP", category: "Standard Veg" },
    { id: "spangle", name: "Spangle", category: "Standard Veg" },
    { id: "plain-jane", name: "Plain Jane", category: "Standard Veg" },
    { id: "spinato", name: "Spinato", category: "Standard Veg" },
    
    { id: "inferno", name: "Inferno", category: "Premium Veg" },
    { id: "cornita", name: "Cornita", category: "Premium Veg" },
    { id: "exotica", name: "Exotica", category: "Premium Veg" },
    { id: "sweet-pepinos", name: "Sweet Pepinos", category: "Premium Veg" },
    { id: "zubebe", name: "Zubebe", category: "Premium Veg" },
    { id: "same-difference", name: "Same Difference", category: "Premium Veg" },

    { id: "garlic-bread", name: "Garlic Bread", category: "On The Side" },
    { id: "cheese-garlic-bread", name: "Cheese Garlic Bread", category: "On The Side" },
    { id: "onion-rings", name: "Onion Rings", category: "On The Side" },
    { id: "potato-cheese-cigars", name: "Potato Cheese Cigars", category: "On The Side" },
    { id: "mozzarella-sticks", name: "Mozzarella Sticks", category: "On The Side" },
    { id: "french-fries", name: "French Fries", category: "On The Side" },
    { id: "crinkle-fries", name: "Crinkle Fries", category: "On The Side" },
    { id: "herbed-wedges", name: "Herbed Potato Wedges", category: "On The Side" },
    { id: "chicken-tenders", name: "Chicken Tenders", category: "On The Side" },
    { id: "chicken-cutlets", name: "Chicken Cutlets", category: "On The Side" },

    { id: "virgin-mojito", name: "Virgin Mojito", category: "Thirst Quenchers" },
    { id: "blue-breeze", name: "Blue Breeze", category: "Thirst Quenchers" },
    { id: "tropical-fizz", name: "Tropical Fizz", category: "Thirst Quenchers" },
    { id: "strawberry-fizz", name: "Strawberry Fizz", category: "Thirst Quenchers" },
    { id: "kiwi-fizz", name: "Kiwi Fizz", category: "Thirst Quenchers" },
    { id: "litchi-fizz", name: "Litchi Fizz", category: "Thirst Quenchers" },
    { id: "iced-tea", name: "Iced Tea", category: "Thirst Quenchers" },

    { id: "red-velvet-dessert", name: "Red Velvet Cupcake", category: "Desserts" },
    { id: "blueberry-cheesecake", name: "Blueberry Cheesecake Slice", category: "Desserts" }
  ];

  // Helper stats
  const activeOrders = ordersList.filter((o) => o.step < 3);
  const completedOrdersCount = ordersList.filter((o) => o.step === 3).length;
  const totalRevenueVal = ordersList
    .filter((o) => o.status === "paid")
    .reduce((acc, o) => acc + o.total, 0);

  // Stepper helper
  const getStepText = (step) => {
    switch (step) {
      case 0: return "Oven Preheating";
      case 1: return "Baking Crust";
      case 2: return "Serving to Table";
      case 3: return "Completed";
      default: return "Unknown";
    }
  };

  const getStepColorClass = (step) => {
    switch (step) {
      case 0: return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      case 1: return "text-orange-400 bg-orange-400/10 border-orange-400/20";
      case 2: return "text-largo-primary bg-largo-primary/10 border-largo-primary/20";
      case 3: return "text-largo-success bg-largo-success/10 border-largo-success/20";
      default: return "text-largo-text-muted";
    }
  };

  // Simulate Order Handler
  const handleSimulateOrder = () => {
    const tableNum = Math.floor(1 + Math.random() * 15).toString().padStart(2, "0");
    const mockItems = [
      { id: "classyrita-18", name: "Classyrita (18\")", price: 770, quantity: 1, category: "Standard Veg" },
      { id: "garlic-bread", name: "Garlic Bread", price: 140, quantity: 2, category: "On The Side" },
      { id: "virgin-mojito", name: "Virgin Mojito", price: 130, quantity: 2, category: "Thirst Quenchers" }
    ];

    // Randomize payment methods for simulation
    const methods = ["UPI", "Pay at Table", "Pay at Reception"];
    const randomMethod = methods[Math.floor(Math.random() * methods.length)];
    const randomStatus = randomMethod === "UPI" ? "paid" : "pending";

    const simulated = {
      orderId: "SIM-" + Math.floor(1000 + Math.random() * 9000),
      tableId: tableNum,
      items: mockItems,
      step: 0, // Oven Preheating
      status: randomStatus,
      paymentMethod: randomMethod,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    placeOrder(simulated, randomMethod, randomStatus);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-white/5 pb-6">
        <div>
          <h1 className="font-display text-5xl text-largo-text-primary tracking-wide">
            Admin & Kitchen Dashboard
          </h1>
          <p className="text-largo-text-muted text-sm font-medium mt-1">
            Real-time kitchen stepper control, waiter assistance dispatch, and menu availability toggles.
          </p>
        </div>
        
        {/* Simulator controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSimulateOrder}
            className="py-3 px-5 bg-largo-primary hover:bg-largo-secondary text-black font-bold rounded-lg flex items-center space-x-2 transition duration-300 text-xs uppercase tracking-wider hover:shadow-lg hover:shadow-largo-primary/20 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-black" />
            <span>Simulate Table Order</span>
          </button>
          
          <button
            onClick={() => {
              if (window.confirm("Reset all dashboard stats, order queues, and logs?")) {
                clearAllData();
                window.location.reload();
              }
            }}
            className="p-3 bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 hover:border-red-500/40 text-red-400 rounded-lg transition duration-200"
            title="Reset Board"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Analytics Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Stat 1: Total Orders */}
        <div className="bg-largo-card-surface border border-white/5 rounded-2xl p-5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-largo-text-muted uppercase tracking-wider">Total Orders</span>
            <h3 className="text-3xl font-bold text-largo-text-primary">{ordersList.length}</h3>
          </div>
          <div className="p-3 bg-white/5 rounded-xl text-largo-text-muted">
            <ShoppingBag className="w-5 h-5" />
          </div>
        </div>

        {/* Stat 2: Active Orders */}
        <div className="bg-largo-card-surface border border-white/5 rounded-2xl p-5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-largo-text-muted uppercase tracking-wider">Live in Oven</span>
            <h3 className="text-3xl font-bold text-largo-primary">{activeOrders.length}</h3>
          </div>
          <div className="p-3 bg-largo-primary/10 rounded-xl text-largo-primary">
            <Clock className="w-5 h-5 animate-pulse" />
          </div>
        </div>

        {/* Stat 3: Completed Orders */}
        <div className="bg-largo-card-surface border border-white/5 rounded-2xl p-5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-largo-text-muted uppercase tracking-wider">Completed</span>
            <h3 className="text-3xl font-bold text-largo-success">{completedOrdersCount}</h3>
          </div>
          <div className="p-3 bg-largo-success/10 rounded-xl text-largo-success">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>

        {/* Stat 4: Total Revenue */}
        <div className="bg-largo-card-surface border border-white/5 rounded-2xl p-5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-largo-text-muted uppercase tracking-wider">Total Revenue</span>
            <h3 className="text-3xl font-bold text-largo-primary">₹{totalRevenueVal}</h3>
          </div>
          <div className="p-3 bg-largo-primary/10 rounded-xl text-largo-primary">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Tabs Control */}
      <div className="flex border-b border-white/5">
        <button
          onClick={() => setActiveTab("orders")}
          className={`py-4 px-6 font-semibold text-sm border-b-2 transition duration-300 ${
            activeTab === "orders"
              ? "border-largo-primary text-largo-primary"
              : "border-transparent text-largo-text-muted hover:text-largo-text-primary"
          }`}
        >
          Active Orders ({activeOrders.length})
        </button>
        <button
          onClick={() => setActiveTab("assistance")}
          className={`py-4 px-6 font-semibold text-sm border-b-2 transition duration-300 flex items-center space-x-2 ${
            activeTab === "assistance"
              ? "border-largo-primary text-largo-primary"
              : "border-transparent text-largo-text-muted hover:text-largo-text-primary"
          }`}
        >
          <span>Dine-In Assistance Calls</span>
          {waiterRequests.length > 0 && (
            <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
          )}
          <span className="bg-red-500/10 text-red-400 text-xs px-2 py-0.5 rounded-full font-bold">
            {waiterRequests.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab("menu")}
          className={`py-4 px-6 font-semibold text-sm border-b-2 transition duration-300 ${
            activeTab === "menu"
              ? "border-largo-primary text-largo-primary"
              : "border-transparent text-largo-text-muted hover:text-largo-text-primary"
          }`}
        >
          Menu Inventory & Sold Out Board
        </button>
      </div>

      {/* TAB CONTENT 1: ACTIVE ORDERS */}
      {activeTab === "orders" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-3xl text-largo-text-primary tracking-wide">Live Orders Queue</h2>
            <span className="text-xs text-largo-text-muted">Updated in real-time</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ordersList.map((order) => {
              const orderStepIndex = order.step;

              return (
                <div
                  key={order.orderId}
                  className="bg-largo-card-surface border border-white/5 rounded-2xl p-6 flex flex-col justify-between gap-6 shadow-xl relative overflow-hidden group hover:border-largo-primary/20 transition-all duration-300"
                >
                  
                  {/* Top order metrics */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-start border-b border-white/5 pb-3">
                      <div>
                        <span className="text-xs font-mono font-bold text-largo-primary block">
                          {order.orderId}
                        </span>
                        <h4 className="font-bold text-sm text-largo-text-primary mt-1">
                          Table #{order.tableId}
                        </h4>
                      </div>
                      <span className="text-xs text-largo-text-muted">{order.timestamp}</span>
                    </div>

                    {/* Items List */}
                    <div className="space-y-2 max-h-[140px] overflow-y-auto no-scrollbar">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-xs text-largo-text-primary/95">
                          <span>{item.quantity}x {item.name}</span>
                          <span className="text-largo-text-muted font-mono">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    {/* Payment Status Bar */}
                    <div className="flex justify-between items-center bg-black/25 p-2 rounded-lg text-[10px] border border-white/5">
                      <span className="text-largo-text-muted">Method: <b className="text-largo-text-primary">{order.paymentMethod || "UPI"}</b></span>
                      <div className="flex items-center space-x-1.5 font-bold">
                        {order.status === "paid" ? (
                          <span className="text-largo-success bg-largo-success/10 border border-largo-success/20 px-1.5 py-0.5 rounded uppercase font-bold">
                            Paid
                          </span>
                        ) : (
                          <span className="text-red-400 bg-red-500/10 border border-red-500/20 px-1.5 py-0.5 rounded uppercase font-bold animate-pulse">
                            Unpaid
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Stepper progress actions */}
                  <div className="space-y-4 pt-2 border-t border-white/5 mt-auto">
                    
                    {/* Status Badge */}
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-largo-text-muted">Total: <b className="text-largo-primary text-sm">₹{order.total}</b></span>
                      <span className={`px-2.5 py-1 rounded-full font-bold border text-[10px] uppercase tracking-wider ${getStepColorClass(orderStepIndex)}`}>
                        {getStepText(orderStepIndex)}
                      </span>
                    </div>

                    {/* Unpaid Action Button */}
                    {order.status !== "paid" && (
                      <button
                        onClick={() => markOrderAsPaid(order.orderId)}
                        className="w-full py-2 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/20 hover:border-yellow-500/40 text-yellow-400 text-xs font-bold rounded-lg uppercase tracking-wider transition duration-200 cursor-pointer flex items-center justify-center space-x-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Confirm Cash/Card Payment</span>
                      </button>
                    )}

                    {/* Action buttons */}
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <button
                        onClick={() => cancelSpecificOrder(order.orderId)}
                        className="py-2.5 px-3 bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 hover:border-red-500/40 text-red-400 text-xs font-bold rounded-lg uppercase tracking-wider transition duration-200 cursor-pointer flex items-center justify-center space-x-1.5"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Cancel</span>
                      </button>

                      {orderStepIndex < 3 ? (
                        <button
                          onClick={() => advanceSpecificOrderStep(order.orderId)}
                          className="py-2.5 px-3 bg-largo-primary hover:bg-largo-secondary text-black text-xs font-bold rounded-lg uppercase tracking-wider transition duration-300 cursor-pointer flex items-center justify-center space-x-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Advance</span>
                        </button>
                      ) : (
                        <div className="py-2.5 text-center text-largo-success font-semibold text-xs border border-largo-success/20 bg-largo-success/5 rounded-lg flex items-center justify-center space-x-1">
                          <span>✓ Finished</span>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}

            {ordersList.length === 0 && (
              <div className="col-span-full py-16 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-2xl text-center space-y-4">
                <span className="text-4xl">🧾</span>
                <div>
                  <h4 className="font-semibold text-largo-text-primary">No orders placed yet</h4>
                  <p className="text-xs text-largo-text-muted mt-1">
                    Click &quot;Simulate Table Order&quot; above or place orders from the customer page to populate the kitchen dashboard.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: ASSISTANCE CALLS */}
      {activeTab === "assistance" && (
        <div className="space-y-6 max-w-2xl mx-auto">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-3xl text-largo-text-primary tracking-wide">Dine-In Assistance Queue</h2>
            <span className="bg-red-500/10 text-red-400 text-xs px-2.5 py-0.5 rounded-full font-bold">
              {waiterRequests.length} Active Calls
            </span>
          </div>

          <div className="space-y-4">
            {waiterRequests.map((req) => (
              <div
                key={req.requestId}
                className="bg-largo-card-surface border border-red-500/10 hover:border-red-500/30 rounded-xl p-5 flex items-center justify-between shadow-lg transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-red-500/10 rounded-xl text-red-400 animate-pulse border border-red-500/10">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-largo-text-primary text-base">
                      Table #{req.tableId} requests assistance
                    </h4>
                    <span className="text-xs text-largo-text-muted mt-1 block">
                      ID: {req.requestId} &bull; Call placed at {req.timestamp}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => resolveWaiterRequest(req.requestId)}
                  className="py-2 px-4 border border-largo-success/30 hover:border-largo-success bg-largo-success/5 hover:bg-largo-success/10 text-largo-success font-semibold rounded-lg text-xs uppercase tracking-wider transition duration-300 cursor-pointer"
                >
                  Resolve Alert
                </button>
              </div>
            ))}

            {waiterRequests.length === 0 && (
              <div className="py-16 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-2xl text-center space-y-4">
                <span className="text-4xl">🔔</span>
                <div>
                  <h4 className="font-semibold text-largo-text-primary">No active assistance calls</h4>
                  <p className="text-xs text-largo-text-muted mt-1">
                    When guests click &quot;Call Waiter Assistance&quot; in the order tracker, alerts will log here in real-time.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: MENU AVAILABILITY INVENTORY */}
      {activeTab === "menu" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/5">
            <div>
              <h2 className="font-display text-3xl text-largo-text-primary tracking-wide">Menu Inventory Control</h2>
              <p className="text-xs text-largo-text-muted mt-0.5">Toggle items to Sold Out to disable customer ordering</p>
            </div>
            <span className="text-xs text-largo-primary font-bold">
              {Object.values(soldOutItems).filter(Boolean).length} Items Sold Out
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allMenuItems.map((item) => {
              const isSoldOut = soldOutItems[item.id];

              return (
                <div
                  key={item.id}
                  className={`border rounded-xl p-4 flex items-center justify-between shadow-md transition-all duration-300 ${
                    isSoldOut 
                      ? "bg-red-500/5 border-red-500/20" 
                      : "bg-largo-card-surface border-white/5 hover:border-largo-primary/20"
                  }`}
                >
                  <div className="space-y-0.5 mr-4">
                    <span className="text-[9px] font-bold text-largo-primary uppercase tracking-wider">
                      {item.category}
                    </span>
                    <h4 className="font-semibold text-sm text-largo-text-primary leading-tight">
                      {item.name}
                    </h4>
                  </div>

                  <button
                    onClick={() => toggleItemAvailability(item.id)}
                    className="p-1 rounded-full text-largo-text-muted hover:text-largo-text-primary transition duration-200 cursor-pointer"
                    title={isSoldOut ? "Mark Available" : "Mark Sold Out"}
                  >
                    {isSoldOut ? (
                      <div className="flex items-center text-red-500 font-semibold text-xs space-x-1.5 bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20">
                        <ToggleRight className="w-5 h-5" />
                        <span>Sold Out</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-largo-success font-semibold text-xs space-x-1.5 bg-largo-success/10 px-3 py-1.5 rounded-lg border border-largo-success/20">
                        <ToggleLeft className="w-5 h-5" />
                        <span>Available</span>
                      </div>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
