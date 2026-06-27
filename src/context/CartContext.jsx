"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [tableId, setTableId] = useState("");
  const [orderStep, setOrderStep] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState("pending");
  
  // Admin & Kitchen States
  const [ordersList, setOrdersList] = useState([]);
  const [waiterRequests, setWaiterRequests] = useState([]);
  const [soldOutItems, setSoldOutItems] = useState({});
  const [customReviews, setCustomReviews] = useState([]);

  // UI helper states
  const [cartOpen, setCartOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);

  // Sync state from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedCart = localStorage.getItem("largo_cart");
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }

        const storedTableId = localStorage.getItem("largo_table_id");
        if (storedTableId) {
          setTableId(storedTableId);
        }

        const storedOrderStep = localStorage.getItem("largo_order_step");
        if (storedOrderStep) {
          setOrderStep(parseInt(storedOrderStep, 10));
        }

        const storedPaymentStatus = localStorage.getItem("largo_payment_status");
        if (storedPaymentStatus) {
          setPaymentStatus(storedPaymentStatus);
        }

        const storedOrders = localStorage.getItem("largo_orders_list");
        if (storedOrders) {
          setOrdersList(JSON.parse(storedOrders));
        }

        const storedWaiters = localStorage.getItem("largo_waiter_requests");
        if (storedWaiters) {
          setWaiterRequests(JSON.parse(storedWaiters));
        }

        const storedSoldOut = localStorage.getItem("largo_sold_out_items");
        if (storedSoldOut) {
          setSoldOutItems(JSON.parse(storedSoldOut));
        }

        const storedCustomReviews = localStorage.getItem("largo_custom_reviews");
        if (storedCustomReviews) {
          setCustomReviews(JSON.parse(storedCustomReviews));
        }
      } catch (error) {
        console.error("Error reading localStorage:", error);
      }
    }
  }, []);

  // Reusable addToCart logic
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((i) => i.id === item.id);
      let newCart;
      if (existingIndex > -1) {
        newCart = prevCart.map((i, idx) =>
          idx === existingIndex ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        newCart = [...prevCart, { ...item, quantity: 1 }];
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("largo_cart", JSON.stringify(newCart));
      }
      return newCart;
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item.id !== itemId);
      if (typeof window !== "undefined") {
        localStorage.setItem("largo_cart", JSON.stringify(newCart));
      }
      return newCart;
    });
  };

  const updateQuantity = (itemId, delta) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((i) => i.id === itemId);
      if (existingIndex === -1) return prevCart;

      let newCart = prevCart.map((item, idx) => {
        if (idx === existingIndex) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: newQty };
        }
        return item;
      });

      // Filter out items with quantity <= 0
      newCart = newCart.filter((item) => item.quantity > 0);

      if (typeof window !== "undefined") {
        localStorage.setItem("largo_cart", JSON.stringify(newCart));
      }
      return newCart;
    });
  };

  const syncTable = (id) => {
    setTableId(id);
    if (typeof window !== "undefined") {
      localStorage.setItem("largo_table_id", id);
    }
  };

  const updateOrderStep = (step) => {
    setOrderStep(step);
    if (typeof window !== "undefined") {
      localStorage.setItem("largo_order_step", step.toString());
    }
  };

  const updatePaymentStatus = (status) => {
    setPaymentStatus(status);
    if (typeof window !== "undefined") {
      localStorage.setItem("largo_payment_status", status);
    }
  };

  // Order List Placement
  const placeOrder = (customOrder = null, paymentMethodVal = "UPI", statusVal = "paid") => {
    const finalCart = customOrder ? customOrder.items : cart;
    const finalTableId = customOrder ? customOrder.tableId : (tableId || "Takeaway");
    const subtotal = finalCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const gst = Math.round(subtotal * 0.05);
    const total = subtotal + gst;

    const newOrder = customOrder || {
      orderId: "ORD-" + Math.floor(1000 + Math.random() * 9000),
      tableId: finalTableId,
      items: [...finalCart],
      subtotal,
      gst,
      total,
      status: statusVal,
      paymentMethod: paymentMethodVal,
      step: 1, // Baking Crust
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setOrdersList((prev) => {
      const updated = [newOrder, ...prev];
      if (typeof window !== "undefined") {
        localStorage.setItem("largo_orders_list", JSON.stringify(updated));
      }
      return updated;
    });

    if (!customOrder) {
      setCart([]);
      if (typeof window !== "undefined") {
        localStorage.removeItem("largo_cart");
      }
    }
  };

  // Mark order as paid in admin panel
  const markOrderAsPaid = (orderId) => {
    setOrdersList((prev) => {
      const updated = prev.map((ord) => {
        if (ord.orderId === orderId) {
          return { ...ord, status: "paid" };
        }
        return ord;
      });
      if (typeof window !== "undefined") {
        localStorage.setItem("largo_orders_list", JSON.stringify(updated));
      }
      return updated;
    });
  };

  // Advance Order Step (Kitchen Dashboard actions)
  const advanceSpecificOrderStep = (orderId, forceStep = null) => {
    setOrdersList((prev) => {
      const updated = prev.map((ord) => {
        if (ord.orderId === orderId) {
          const nextStep = forceStep !== null ? forceStep : Math.min(ord.step + 1, 3);
          
          // Sync with the active table session stepper if matching
          if (ord.tableId === tableId) {
            setOrderStep(nextStep);
            if (typeof window !== "undefined") {
              localStorage.setItem("largo_order_step", nextStep.toString());
            }
          }
          return { ...ord, step: nextStep };
        }
        return ord;
      });
      if (typeof window !== "undefined") {
        localStorage.setItem("largo_orders_list", JSON.stringify(updated));
      }
      return updated;
    });
  };

  // Cancel order in admin panel
  const cancelSpecificOrder = (orderId) => {
    setOrdersList((prev) => {
      const updated = prev.filter((ord) => ord.orderId !== orderId);
      if (typeof window !== "undefined") {
        localStorage.setItem("largo_orders_list", JSON.stringify(updated));
      }
      return updated;
    });
  };

  // Add Waiter Request
  const addWaiterRequest = (tId) => {
    const newReq = {
      requestId: "REQ-" + Math.floor(1000 + Math.random() * 9000),
      tableId: tId || "Bar",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "pending"
    };

    setWaiterRequests((prev) => {
      const updated = [newReq, ...prev];
      if (typeof window !== "undefined") {
        localStorage.setItem("largo_waiter_requests", JSON.stringify(updated));
      }
      return updated;
    });
  };

  // Resolve Waiter Request
  const resolveWaiterRequest = (reqId) => {
    setWaiterRequests((prev) => {
      const updated = prev.filter((req) => req.requestId !== reqId);
      if (typeof window !== "undefined") {
        localStorage.setItem("largo_waiter_requests", JSON.stringify(updated));
      }
      return updated;
    });
  };

  // Toggle Menu Item Sold-Out Status
  const toggleItemAvailability = (itemId) => {
    setSoldOutItems((prev) => {
      const updated = { ...prev, [itemId]: !prev[itemId] };
      if (typeof window !== "undefined") {
        localStorage.setItem("largo_sold_out_items", JSON.stringify(updated));
      }
      return updated;
    });
  };

  // Add Custom Customer Review
  const addCustomReview = (review) => {
    const newReview = {
      id: "REV-" + Math.floor(1000 + Math.random() * 9000),
      date: "Today",
      isCustom: true,
      ...review
    };

    setCustomReviews((prev) => {
      const updated = [newReview, ...prev];
      if (typeof window !== "undefined") {
        localStorage.setItem("largo_custom_reviews", JSON.stringify(updated));
      }
      return updated;
    });
  };

  const clearAllData = () => {
    setCart([]);
    setTableId("");
    setOrderStep(0);
    setPaymentStatus("pending");
    setCartOpen(false);
    setPaymentOpen(false);
    setOrdersList([]);
    setWaiterRequests([]);
    setSoldOutItems({});
    setCustomReviews([]);
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        tableId,
        orderStep,
        paymentStatus,
        ordersList,
        waiterRequests,
        soldOutItems,
        cartOpen,
        paymentOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        syncTable,
        updateOrderStep,
        updatePaymentStatus,
        placeOrder,
        markOrderAsPaid,
        advanceSpecificOrderStep,
        cancelSpecificOrder,
        addWaiterRequest,
        resolveWaiterRequest,
        toggleItemAvailability,
        customReviews,
        addCustomReview,
        clearAllData,
        setCartOpen,
        setPaymentOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
