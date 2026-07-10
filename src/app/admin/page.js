"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
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
  XCircle,
  Trash2,
  Edit2,
  PlusCircle,
  Save,
  X,
  Plus
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
    clearAllData,
    
    // Dynamic Menu & Order CRUD State Handlers
    menuItems,
    addMenuItem,
    editMenuItem,
    deleteMenuItem,
    updateOrderDetails
  } = useCart();

  const [activeTab, setActiveTab] = useState("orders"); // orders | menu | assistance

  // 1. Order Editing States (Inline card modifiers)
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editTotalInput, setEditTotalInput] = useState("");
  const [editTableInput, setEditTableInput] = useState("");
  const [editStatusInput, setEditStatusInput] = useState("pending");
  const [editMethodInput, setEditMethodInput] = useState("UPI");

  // Start editing an order
  const startEditingOrder = (order) => {
    setEditingOrderId(order.orderId);
    setEditTotalInput(order.total.toString());
    setEditTableInput(order.tableId || "");
    setEditStatusInput(order.status || "pending");
    setEditMethodInput(order.paymentMethod || "UPI");
  };

  // Save modified order details
  const saveOrderEdits = (orderId) => {
    const parsedTotal = parseFloat(editTotalInput);
    if (isNaN(parsedTotal) || parsedTotal < 0) {
      window.alert("Please enter a valid total amount.");
      return;
    }
    updateOrderDetails(orderId, {
      total: parsedTotal,
      tableId: editTableInput.trim(),
      status: editStatusInput,
      paymentMethod: editMethodInput
    });
    setEditingOrderId(null);
  };

  // 2. Menu Addition Form States
  const [showAddForm, setShowAddForm] = useState(false);
  const [addName, setAddName] = useState("");
  const [addDescription, setAddDescription] = useState("");
  const [addCategory, setAddCategory] = useState("Standard Veg");
  const [addPricingMode, setAddPricingMode] = useState("single"); // single | multi
  const [addSinglePrice, setAddSinglePrice] = useState("");
  const [addSize10, setAddSize10] = useState("");
  const [addSize16, setAddSize16] = useState("");
  const [addSize18, setAddSize18] = useState("");
  const [addSize20, setAddSize20] = useState("");
  const [addBadge, setAddBadge] = useState("");
  const [addSpicy, setAddSpicy] = useState(false);

  // Submit Menu Creation Form
  const handleAddMenuItem = (e) => {
    e.preventDefault();
    if (!addName.trim() || !addDescription.trim()) {
      window.alert("Please enter item name and description.");
      return;
    }

    const itemId = addName.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");
    const imagePath = addCategory === "On The Side" ? "/assets/dish.png" : 
                    (addCategory === "Thirst Quenchers" ? "/assets/drink.png" : "/assets/pizza.png");

    let newItem = {
      id: itemId,
      name: addName.trim(),
      description: addDescription.trim(),
      category: addCategory,
      image: imagePath
    };

    if (addBadge.trim()) newItem.badge = addBadge.trim().toUpperCase();
    if (addSpicy) newItem.spicy = true;

    if (addPricingMode === "single") {
      const priceVal = parseInt(addSinglePrice, 10);
      if (isNaN(priceVal) || priceVal <= 0) {
        window.alert("Please specify a valid price.");
        return;
      }
      newItem.price = priceVal;
    } else {
      const p10 = parseInt(addSize10, 10);
      const p16 = parseInt(addSize16, 10);
      const p18 = parseInt(addSize18, 10);
      const p20 = parseInt(addSize20, 10);
      if (isNaN(p10) || isNaN(p16) || isNaN(p18) || isNaN(p20)) {
        window.alert("Please specify prices for all sizes (10\", 16\", 18\", 20\").");
        return;
      }
      newItem.prices = {
        "10\"": p10,
        "16\"": p16,
        "18\"": p18,
        "20\"": p20
      };
    }

    addMenuItem(newItem);
    
    // Reset Form
    setAddName("");
    setAddDescription("");
    setAddCategory("Standard Veg");
    setAddPricingMode("single");
    setAddSinglePrice("");
    setAddSize10("");
    setAddSize16("");
    setAddSize18("");
    setAddSize20("");
    setAddBadge("");
    setAddSpicy(false);
    setShowAddForm(false);
  };

  // 3. Menu Item Editing States
  const [editingMenuItemId, setEditingMenuItemId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editPricingMode, setEditPricingMode] = useState("single");
  const [editSinglePrice, setEditSinglePrice] = useState("");
  const [editSize10, setEditSize10] = useState("");
  const [editSize16, setEditSize16] = useState("");
  const [editSize18, setEditSize18] = useState("");
  const [editSize20, setEditSize20] = useState("");
  const [editBadge, setEditBadge] = useState("");
  const [editSpicy, setEditSpicy] = useState(false);

  // Start editing a menu item
  const startEditingMenuItem = (item) => {
    setEditingMenuItemId(item.id);
    setEditName(item.name);
    setEditDescription(item.description);
    setEditCategory(item.category);
    setEditBadge(item.badge || "");
    setEditSpicy(!!item.spicy);
    if (item.prices) {
      setEditPricingMode("multi");
      setEditSize10(item.prices["10\""]?.toString() || "");
      setEditSize16(item.prices["16\""]?.toString() || "");
      setEditSize18(item.prices["18\""]?.toString() || "");
      setEditSize20(item.prices["20\""]?.toString() || "");
      setEditSinglePrice("");
    } else {
      setEditPricingMode("single");
      setEditSinglePrice(item.price?.toString() || "");
      setEditSize10("");
      setEditSize16("");
      setEditSize18("");
      setEditSize20("");
    }
  };

  // Save menu item edits
  const saveMenuItemEdits = (itemId) => {
    if (!editName.trim() || !editDescription.trim()) {
      window.alert("Please enter item name and description.");
      return;
    }

    let updatedFields = {
      name: editName.trim(),
      description: editDescription.trim(),
      category: editCategory,
      badge: editBadge.trim() ? editBadge.trim().toUpperCase() : null,
      spicy: editSpicy
    };

    if (editPricingMode === "single") {
      const priceVal = parseInt(editSinglePrice, 10);
      if (isNaN(priceVal) || priceVal <= 0) {
        window.alert("Please specify a valid price.");
        return;
      }
      updatedFields.price = priceVal;
      updatedFields.prices = null; // Clear sizes if switched to single
    } else {
      const p10 = parseInt(editSize10, 10);
      const p16 = parseInt(editSize16, 10);
      const p18 = parseInt(editSize18, 10);
      const p20 = parseInt(editSize20, 10);
      if (isNaN(p10) || isNaN(p16) || isNaN(p18) || isNaN(p20)) {
        window.alert("Please specify prices for all sizes.");
        return;
      }
      updatedFields.prices = {
        "10\"": p10,
        "16\"": p16,
        "18\"": p18,
        "20\"": p20
      };
      updatedFields.price = null; // Clear base price if pizza
    }

    editMenuItem(itemId, updatedFields);
    setEditingMenuItemId(null);
  };

  // Analytics Helpers
  const activeOrders = ordersList.filter((o) => o.step < 3);
  const completedOrdersCount = ordersList.filter((o) => o.step === 3).length;
  const totalRevenueVal = ordersList
    .filter((o) => o.status === "paid")
    .reduce((acc, o) => acc + o.total, 0);

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

  // Mock Table Order Simulator
  const handleSimulateOrder = () => {
    const tableNum = Math.floor(1 + Math.random() * 15).toString().padStart(2, "0");
    const mockItems = [
      { id: "classyrita-18", name: "Classyrita (18\")", price: 770, quantity: 1, category: "Standard Veg" },
      { id: "garlic-bread", name: "Garlic Bread", price: 140, quantity: 2, category: "On The Side" },
      { id: "virgin-mojito", name: "Virgin Mojito", price: 130, quantity: 2, category: "Thirst Quenchers" }
    ];

    const methods = ["UPI", "Pay at Table", "Pay at Reception"];
    const randomMethod = methods[Math.floor(Math.random() * methods.length)];
    const randomStatus = randomMethod === "UPI" ? "paid" : "pending";

    const simulated = {
      orderId: "SIM-" + Math.floor(1000 + Math.random() * 9000),
      tableId: tableNum,
      items: mockItems,
      total: 1310, // subtotal 1250 + GST
      step: 0,
      status: randomStatus,
      paymentMethod: randomMethod,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    placeOrder(simulated, randomMethod, randomStatus);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-white/5 pb-6">
        <div>
          <h1 className="font-display text-5xl text-largo-text-primary tracking-wide">
            Admin & Kitchen Dashboard
          </h1>
          <p className="text-largo-text-muted text-sm font-medium mt-1">
            Real-time content management, order adjustments, and assistance request resolvers.
          </p>
        </div>
        
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
              if (window.confirm("Reset all custom menu items, orders, table statuses, and logs?")) {
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

      {/* Stats Counter Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-largo-card-surface border border-white/5 rounded-2xl p-5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-largo-text-muted uppercase tracking-wider">Total Orders</span>
            <h3 className="text-3xl font-bold text-largo-text-primary">{ordersList.length}</h3>
          </div>
          <div className="p-3 bg-white/5 rounded-xl text-largo-text-muted">
            <ShoppingBag className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-largo-card-surface border border-white/5 rounded-2xl p-5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-largo-text-muted uppercase tracking-wider">Live in Oven</span>
            <h3 className="text-3xl font-bold text-largo-primary">{activeOrders.length}</h3>
          </div>
          <div className="p-3 bg-largo-primary/10 rounded-xl text-largo-primary">
            <Clock className="w-5 h-5 animate-pulse" />
          </div>
        </div>

        <div className="bg-largo-card-surface border border-white/5 rounded-2xl p-5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-largo-text-muted uppercase tracking-wider">Completed</span>
            <h3 className="text-3xl font-bold text-largo-success">{completedOrdersCount}</h3>
          </div>
          <div className="p-3 bg-largo-success/10 rounded-xl text-largo-success">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>

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

      {/* Tabs Control bar */}
      <div className="flex border-b border-white/5">
        <button
          onClick={() => setActiveTab("orders")}
          className={`py-4 px-6 font-semibold text-sm border-b-2 transition duration-300 ${
            activeTab === "orders"
              ? "border-largo-primary text-largo-primary"
              : "border-transparent text-largo-text-muted hover:text-largo-text-primary"
          }`}
        >
          Active Orders Queue ({activeOrders.length})
        </button>
        
        <button
          onClick={() => setActiveTab("assistance")}
          className={`py-4 px-6 font-semibold text-sm border-b-2 transition duration-300 flex items-center space-x-2 ${
            activeTab === "assistance"
              ? "border-largo-primary text-largo-primary"
              : "border-transparent text-largo-text-muted hover:text-largo-text-primary"
          }`}
        >
          <span>Assistance Alerts</span>
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
          Menu Management (CRUD)
        </button>
      </div>

      {/* TAB CONTENT 1: ACTIVE ORDERS WITH INLINE CRUD CONTROL */}
      {activeTab === "orders" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-3xl text-largo-text-primary tracking-wide">Live Orders Queue</h2>
            <span className="text-xs text-largo-text-muted">Updated in real-time</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ordersList.map((order) => {
              const isEditing = editingOrderId === order.orderId;
              const orderStepIndex = order.step;

              return (
                <div
                  key={order.orderId}
                  className="bg-largo-card-surface border border-white/5 rounded-2xl p-6 flex flex-col justify-between gap-6 shadow-xl relative overflow-hidden group hover:border-largo-primary/20 transition-all duration-300"
                >
                  {/* Top Portion */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-start border-b border-white/5 pb-3">
                      <div>
                        <span className="text-xs font-mono font-bold text-largo-primary block">
                          {order.orderId}
                        </span>
                        
                        {isEditing ? (
                          <div className="flex items-center space-x-1 mt-1">
                            <span className="text-xs text-largo-text-muted font-bold">T#:</span>
                            <input
                              type="text"
                              value={editTableInput}
                              onChange={(e) => setEditTableInput(e.target.value)}
                              className="w-16 bg-black/40 border border-white/10 rounded px-1.5 py-0.5 text-xs font-bold focus:outline-none focus:border-largo-primary text-largo-text-primary"
                            />
                          </div>
                        ) : (
                          <h4 className="font-bold text-sm text-largo-text-primary mt-1">
                            Table #{order.tableId || "Takeaway"}
                          </h4>
                        )}
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

                    {/* Payment Control */}
                    {isEditing ? (
                      <div className="bg-black/30 p-3 rounded-lg border border-white/5 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-largo-text-muted">Payment:</span>
                          <select
                            value={editStatusInput}
                            onChange={(e) => setEditStatusInput(e.target.value)}
                            className="bg-black/60 border border-white/10 rounded px-1 py-0.5 text-xs text-largo-text-primary focus:outline-none"
                          >
                            <option value="pending">Pending</option>
                            <option value="paid">Paid</option>
                          </select>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-largo-text-muted">Method:</span>
                          <select
                            value={editMethodInput}
                            onChange={(e) => setEditMethodInput(e.target.value)}
                            className="bg-black/60 border border-white/10 rounded px-1 py-0.5 text-xs text-largo-text-primary focus:outline-none"
                          >
                            <option value="UPI">UPI</option>
                            <option value="Pay at Table">Pay at Table</option>
                            <option value="Pay at Reception">Pay at Counter</option>
                          </select>
                        </div>
                      </div>
                    ) : (
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
                    )}
                  </div>

                  {/* Pricing and Stepper progress actions */}
                  <div className="space-y-4 pt-2 border-t border-white/5 mt-auto">
                    
                    {/* Grand Total Value Modifier */}
                    <div className="flex justify-between items-center text-xs">
                      {isEditing ? (
                        <div className="flex items-center space-x-1">
                          <span className="text-largo-text-muted font-bold">Bill ₹:</span>
                          <input
                            type="number"
                            value={editTotalInput}
                            onChange={(e) => setEditTotalInput(e.target.value)}
                            className="w-20 bg-black/40 border border-white/10 rounded px-1.5 py-0.5 text-xs font-bold focus:outline-none focus:border-largo-primary text-largo-primary"
                          />
                        </div>
                      ) : (
                        <span className="text-largo-text-muted">Total: <b className="text-largo-primary text-sm">₹{order.total}</b></span>
                      )}
                      
                      <span className={`px-2.5 py-1 rounded-full font-bold border text-[10px] uppercase tracking-wider ${getStepColorClass(orderStepIndex)}`}>
                        {getStepText(orderStepIndex)}
                      </span>
                    </div>

                    {/* Editor Action Buttons */}
                    {isEditing ? (
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => saveOrderEdits(order.orderId)}
                          className="py-2 bg-largo-success text-black text-xs font-bold rounded-lg uppercase tracking-wider flex items-center justify-center space-x-1 hover:opacity-90 cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Save</span>
                        </button>
                        <button
                          onClick={() => setEditingOrderId(null)}
                          className="py-2 bg-white/5 border border-white/10 text-largo-text-primary text-xs font-bold rounded-lg uppercase tracking-wider flex items-center justify-center space-x-1 hover:bg-white/10 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Cancel</span>
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        
                        {/* Standard Status toggle buttons */}
                        <div className="grid grid-cols-3 gap-2">
                          <button
                            onClick={() => startEditingOrder(order)}
                            className="py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-largo-text-muted hover:text-largo-text-primary text-[10px] font-bold rounded-lg uppercase tracking-wider transition cursor-pointer flex items-center justify-center space-x-1"
                            title="Edit Bill details"
                          >
                            <Edit2 className="w-3 h-3" />
                            <span>Edit</span>
                          </button>

                          <button
                            onClick={() => cancelSpecificOrder(order.orderId)}
                            className="py-2 bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 hover:border-red-500/40 text-red-400 text-[10px] font-bold rounded-lg uppercase tracking-wider transition cursor-pointer flex items-center justify-center space-x-1"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Cancel</span>
                          </button>

                          {orderStepIndex < 3 ? (
                            <button
                              onClick={() => advanceSpecificOrderStep(order.orderId)}
                              className="py-2 bg-largo-primary hover:bg-largo-secondary text-black text-[10px] font-bold rounded-lg uppercase tracking-wider transition cursor-pointer flex items-center justify-center space-x-1"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Advance</span>
                            </button>
                          ) : (
                            <div className="py-2 text-center text-largo-success font-semibold text-[10px] border border-largo-success/20 bg-largo-success/5 rounded-lg flex items-center justify-center">
                              <span>✓ Done</span>
                            </div>
                          )}
                        </div>

                        {/* Unpaid Action shortcut */}
                        {order.status !== "paid" && (
                          <button
                            onClick={() => markOrderAsPaid(order.orderId)}
                            className="w-full py-2 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/20 hover:border-yellow-500/40 text-yellow-400 text-[10px] font-bold rounded-lg uppercase tracking-wider transition duration-200 cursor-pointer flex items-center justify-center space-x-1.5"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Settle Bill as Paid</span>
                          </button>
                        )}

                      </div>
                    )}

                  </div>
                </div>
              );
            })}

            {ordersList.length === 0 && (
              <div className="col-span-full py-20 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-2xl text-center space-y-4">
                <span className="text-4xl">🧾</span>
                <div>
                  <h4 className="font-semibold text-largo-text-primary">No orders placed yet</h4>
                  <p className="text-xs text-largo-text-muted mt-1">
                    Click &quot;Simulate Table Order&quot; above to populate the kitchen dashboard.
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
                    Waiters will be dispatched here when guests invoke waiter assistance call.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: MENU CRUD OPERATIONS CENTRE */}
      {activeTab === "menu" && (
        <div className="space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-white/5 gap-4">
            <div>
              <h2 className="font-display text-3xl text-largo-text-primary tracking-wide">Menu Database Management</h2>
              <p className="text-xs text-largo-text-muted mt-0.5">
                Add, edit, or delete items. Toggle availability status in real-time.
              </p>
            </div>

            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="py-2.5 px-4 bg-gradient-to-r from-largo-primary to-largo-secondary text-black font-extrabold text-xs rounded-lg uppercase tracking-wider flex items-center justify-center space-x-1.5 shadow hover:scale-[1.02] transition cursor-pointer"
            >
              {showAddForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              <span>{showAddForm ? "Close Form" : "Add New Menu Item"}</span>
            </button>
          </div>

          {/* Add Menu Item Expander Form */}
          {showAddForm && (
            <form
              onSubmit={handleAddMenuItem}
              className="bg-largo-card-surface border border-largo-primary/20 rounded-2xl p-6 space-y-6 max-w-3xl animate-fade-in"
            >
              <h3 className="font-bold text-base text-largo-primary flex items-center space-x-2">
                <PlusCircle className="w-5 h-5" />
                <span>Add Item to Database</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
                
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-largo-text-muted uppercase">Item Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Garlic Mushroom Pizza"
                    value={addName}
                    onChange={(e) => setAddName(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-largo-text-primary focus:outline-none focus:border-largo-primary"
                  />
                </div>

                {/* Category */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-largo-text-muted uppercase">Category</label>
                  <select
                    value={addCategory}
                    onChange={(e) => setAddCategory(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-largo-text-primary focus:outline-none focus:border-largo-primary"
                  >
                    <option value="Standard Veg">Standard Veg Pizza</option>
                    <option value="Premium Veg">Premium Veg Pizza</option>
                    <option value="On The Side">On The Side (Sides)</option>
                    <option value="Thirst Quenchers">Thirst Quenchers (Beverages)</option>
                    <option value="Desserts">Desserts (Sweets)</option>
                  </select>
                </div>

                {/* Description */}
                <div className="col-span-full space-y-1.5">
                  <label className="text-xs font-bold text-largo-text-muted uppercase">Description</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Provide a delicious item summary..."
                    value={addDescription}
                    onChange={(e) => setAddDescription(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-largo-text-primary focus:outline-none focus:border-largo-primary"
                  />
                </div>

                {/* Pricing Mode Toggle */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-largo-text-muted uppercase">Pricing Structure</label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setAddPricingMode("single")}
                      className={`flex-1 py-2 rounded-lg font-bold text-xs border ${
                        addPricingMode === "single"
                          ? "bg-white/10 text-largo-primary border-largo-primary"
                          : "bg-black/20 border-white/5 text-largo-text-muted"
                      }`}
                    >
                      Single Base Price
                    </button>
                    <button
                      type="button"
                      disabled={addCategory === "On The Side" || addCategory === "Thirst Quenchers" || addCategory === "Desserts"}
                      onClick={() => setAddPricingMode("multi")}
                      className={`flex-1 py-2 rounded-lg font-bold text-xs border disabled:opacity-40 disabled:cursor-not-allowed ${
                        addPricingMode === "multi"
                          ? "bg-white/10 text-largo-primary border-largo-primary"
                          : "bg-black/20 border-white/5 text-largo-text-muted"
                      }`}
                    >
                      Multi-Size Prices (Pizza)
                    </button>
                  </div>
                </div>

                {/* Single Price Input */}
                {addPricingMode === "single" ? (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-largo-text-muted uppercase">Price (₹)</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 150"
                      value={addSinglePrice}
                      onChange={(e) => setAddSinglePrice(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-largo-text-primary focus:outline-none focus:border-largo-primary"
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] text-largo-text-muted font-bold">10&quot; Price (₹)</label>
                      <input
                        type="number"
                        placeholder="335"
                        value={addSize10}
                        onChange={(e) => setAddSize10(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs font-bold focus:outline-none focus:border-largo-primary text-largo-text-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-largo-text-muted font-bold">16&quot; Price (₹)</label>
                      <input
                        type="number"
                        placeholder="725"
                        value={addSize16}
                        onChange={(e) => setAddSize16(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs font-bold focus:outline-none focus:border-largo-primary text-largo-text-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-largo-text-muted font-bold">18&quot; Price (₹)</label>
                      <input
                        type="number"
                        placeholder="770"
                        value={addSize18}
                        onChange={(e) => setAddSize18(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs font-bold focus:outline-none focus:border-largo-primary text-largo-text-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-largo-text-muted font-bold">20&quot; Price (₹)</label>
                      <input
                        type="number"
                        placeholder="840"
                        value={addSize20}
                        onChange={(e) => setAddSize20(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs font-bold focus:outline-none focus:border-largo-primary text-largo-text-primary"
                      />
                    </div>
                  </div>
                )}

                {/* Additional Settings */}
                <div className="grid grid-cols-2 gap-4 col-span-full pt-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-largo-text-muted uppercase">Tag Badge (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. NEW, BESTSELLER"
                      value={addBadge}
                      onChange={(e) => setAddBadge(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-xs text-largo-text-primary focus:outline-none focus:border-largo-primary"
                    />
                  </div>

                  <div className="flex items-center space-x-3 pt-6">
                    <input
                      type="checkbox"
                      id="addSpicy"
                      checked={addSpicy}
                      onChange={(e) => setAddSpicy(e.target.checked)}
                      className="w-4 h-4 accent-largo-primary rounded border-white/10 bg-black"
                    />
                    <label htmlFor="addSpicy" className="text-xs font-bold text-largo-text-primary cursor-pointer select-none">
                      Spicy Recipe (Adds Flame Indicator)
                    </label>
                  </div>
                </div>

              </div>

              <div className="flex justify-end space-x-3 border-t border-white/5 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="py-2.5 px-5 bg-white/5 hover:bg-white/10 text-largo-text-primary font-bold rounded-lg transition text-xs uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-6 bg-largo-primary hover:bg-largo-secondary text-black font-extrabold rounded-lg transition text-xs uppercase"
                >
                  Submit Item
                </button>
              </div>
            </form>
          )}

          {/* Menu Items CRUD Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => {
              const isSoldOut = soldOutItems[item.id];
              const isEditing = editingMenuItemId === item.id;

              return (
                <div
                  key={item.id}
                  className={`border rounded-2xl p-5 flex flex-col justify-between gap-5 transition-all duration-300 relative overflow-hidden ${
                    isSoldOut 
                      ? "bg-red-500/5 border-red-500/20" 
                      : "bg-largo-card-surface border-white/5 hover:border-largo-primary/25"
                  }`}
                >
                  {/* Top Portion */}
                  <div className="space-y-3.5">
                    
                    {/* Header: Category and Badge */}
                    <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                      {isEditing ? (
                        <select
                          value={editCategory}
                          onChange={(e) => setEditCategory(e.target.value)}
                          className="bg-black/60 border border-white/10 rounded px-1.5 py-0.5 text-[10px] font-bold text-largo-primary focus:outline-none"
                        >
                          <option value="Standard Veg">Standard Veg</option>
                          <option value="Premium Veg">Premium Veg</option>
                          <option value="On The Side">On The Side</option>
                          <option value="Thirst Quenchers">Thirst Quenchers</option>
                          <option value="Desserts">Desserts</option>
                        </select>
                      ) : (
                        <span className="text-[10px] font-bold text-largo-primary uppercase tracking-wider">
                          {item.category}
                        </span>
                      )}

                      {isEditing ? (
                        <input
                          type="text"
                          placeholder="TAG"
                          value={editBadge}
                          onChange={(e) => setEditBadge(e.target.value)}
                          className="w-12 bg-black/40 border border-white/10 rounded px-1 py-0.5 text-[10px] font-bold text-center text-largo-text-primary focus:outline-none"
                        />
                      ) : (
                        item.badge && (
                          <span className="bg-largo-secondary/15 text-largo-secondary border border-largo-secondary/20 text-[9px] font-black px-1.5 py-0.5 rounded tracking-wide uppercase">
                            {item.badge}
                          </span>
                        )
                      )}
                    </div>

                    {/* Name and Spicy Info */}
                    {isEditing ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-sm font-bold text-largo-text-primary focus:outline-none focus:border-largo-primary"
                        />
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`spicy-${item.id}`}
                            checked={editSpicy}
                            onChange={(e) => setEditSpicy(e.target.checked)}
                            className="accent-largo-primary"
                          />
                          <label htmlFor={`spicy-${item.id}`} className="text-xs text-largo-text-muted font-bold select-none cursor-pointer">
                            Spicy Recipe
                          </label>
                        </div>
                      </div>
                    ) : (
                      <h3 className="font-bold text-base text-largo-text-primary flex items-center gap-1.5 leading-tight">
                        <span>{item.name}</span>
                        {item.spicy && <Flame className="w-4 h-4 text-red-500 fill-red-500 flex-shrink-0" />}
                      </h3>
                    )}

                    {/* Description */}
                    {isEditing ? (
                      <textarea
                        rows={2}
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-largo-text-primary focus:outline-none focus:border-largo-primary"
                      />
                    ) : (
                      <p className="text-xs text-largo-text-muted leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    )}

                    {/* Pricing Display / Pricing Editor */}
                    <div className="bg-black/20 p-3 rounded-xl border border-white/5 space-y-1.5">
                      <span className="text-[10px] text-largo-text-muted uppercase font-bold tracking-wider block">Price Breakdown</span>
                      
                      {isEditing ? (
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => setEditPricingMode("single")}
                              className={`flex-1 py-1 rounded text-[10px] font-bold border ${
                                editPricingMode === "single"
                                  ? "bg-white/10 text-largo-primary border-largo-primary"
                                  : "bg-black/20 border-white/5 text-largo-text-muted"
                              }`}
                            >
                              Single Base
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditPricingMode("multi")}
                              className={`flex-1 py-1 rounded text-[10px] font-bold border ${
                                editPricingMode === "multi"
                                  ? "bg-white/10 text-largo-primary border-largo-primary"
                                  : "bg-black/20 border-white/5 text-largo-text-muted"
                              }`}
                            >
                              Sizes (Pizza)
                            </button>
                          </div>

                          {editPricingMode === "single" ? (
                            <div className="flex items-center space-x-1.5">
                              <span className="text-xs text-largo-text-muted font-bold">₹:</span>
                              <input
                                type="number"
                                value={editSinglePrice}
                                onChange={(e) => setEditSinglePrice(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded px-1.5 py-0.5 text-xs text-largo-text-primary focus:outline-none focus:border-largo-primary"
                              />
                            </div>
                          ) : (
                            <div className="grid grid-cols-2 gap-2 text-[10px]">
                              <div>
                                <span className="text-largo-text-muted">10&quot;: ₹</span>
                                <input
                                  type="number"
                                  value={editSize10}
                                  onChange={(e) => setEditSize10(e.target.value)}
                                  className="w-12 bg-black/40 border border-white/10 rounded px-1 text-largo-text-primary"
                                />
                              </div>
                              <div>
                                <span className="text-largo-text-muted">16&quot;: ₹</span>
                                <input
                                  type="number"
                                  value={editSize16}
                                  onChange={(e) => setEditSize16(e.target.value)}
                                  className="w-12 bg-black/40 border border-white/10 rounded px-1 text-largo-text-primary"
                                />
                              </div>
                              <div>
                                <span className="text-largo-text-muted">18&quot;: ₹</span>
                                <input
                                  type="number"
                                  value={editSize18}
                                  onChange={(e) => setEditSize18(e.target.value)}
                                  className="w-12 bg-black/40 border border-white/10 rounded px-1 text-largo-text-primary"
                                />
                              </div>
                              <div>
                                <span className="text-largo-text-muted">20&quot;: ₹</span>
                                <input
                                  type="number"
                                  value={editSize20}
                                  onChange={(e) => setEditSize20(e.target.value)}
                                  className="w-12 bg-black/40 border border-white/10 rounded px-1 text-largo-text-primary"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-xs font-bold text-largo-text-primary flex flex-wrap gap-x-3 gap-y-1">
                          {item.prices ? (
                            Object.entries(item.prices).map(([sz, pr]) => (
                              <span key={sz} className="font-mono">
                                {sz}: <span className="text-largo-primary">₹{pr}</span>
                              </span>
                            ))
                          ) : (
                            <span className="font-mono text-largo-primary">₹{item.price}</span>
                          )}
                        </div>
                      )}
                    </div>

                  </div>

                  {/* CRUD Action Buttons */}
                  <div className="border-t border-white/5 pt-3.5 mt-auto">
                    {isEditing ? (
                      <div className="grid grid-cols-2 gap-2.5">
                        <button
                          type="button"
                          onClick={() => saveMenuItemEdits(item.id)}
                          className="py-2 px-3 bg-largo-success text-black text-xs font-bold rounded-lg uppercase tracking-wider flex items-center justify-center space-x-1 hover:opacity-90 cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Save</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingMenuItemId(null)}
                          className="py-2 px-3 bg-white/5 border border-white/10 text-largo-text-primary text-xs font-bold rounded-lg uppercase tracking-wider flex items-center justify-center space-x-1 hover:bg-white/10 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Cancel</span>
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-3 text-xs">
                        
                        {/* Sold Out Switch */}
                        <button
                          onClick={() => toggleItemAvailability(item.id)}
                          className="flex items-center space-x-1 hover:opacity-90 transition cursor-pointer"
                          title={isSoldOut ? "Mark Available" : "Mark Sold Out"}
                        >
                          {isSoldOut ? (
                            <span className="text-red-500 font-bold flex items-center space-x-1 bg-red-500/10 px-2.5 py-1.5 rounded-lg border border-red-500/10 text-[10px] uppercase">
                              <ToggleRight className="w-4 h-4 mr-0.5" /> Sold Out
                            </span>
                          ) : (
                            <span className="text-largo-success font-bold flex items-center space-x-1 bg-largo-success/10 px-2.5 py-1.5 rounded-lg border border-largo-success/10 text-[10px] uppercase">
                              <ToggleLeft className="w-4 h-4 mr-0.5" /> Available
                            </span>
                          )}
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => startEditingMenuItem(item)}
                            className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-largo-text-muted hover:text-largo-text-primary transition cursor-pointer"
                            title="Edit Item details"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => {
                              if (window.confirm(`Delete ${item.name} permanently from the menu?`)) {
                                deleteMenuItem(item.id);
                              }
                            }}
                            className="p-2 bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 hover:border-red-500/30 rounded-lg text-red-400 hover:text-red-300 transition cursor-pointer"
                            title="Delete Item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
}
