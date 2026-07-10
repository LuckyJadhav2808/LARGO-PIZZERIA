"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const DEFAULT_MENU_ITEMS = [
  // Pizzas (Standard Veg)
  {
    id: "classyrita",
    name: "Classyrita",
    description: "Tangy San Marzano tomato base, aromatic basil, and fresh mozzarella cheese.",
    category: "Standard Veg",
    prices: { "10\"": 335, "16\"": 725, "18\"": 770, "20\"": 840 },
    image: "/assets/pizza.png"
  },
  {
    id: "peppy-peppers",
    name: "Peppy Peppers",
    description: "Crispy capsicum, mixed bell peppers, and spicy green jalapenos.",
    category: "Standard Veg",
    prices: { "10\"": 335, "16\"": 770, "18\"": 815, "20\"": 885 },
    image: "/assets/pizza 2.png",
    spicy: true
  },
  {
    id: "wilde-wedges",
    name: "Wilde Wedges",
    description: "Sautéed white button mushrooms, red onions, and black olives.",
    category: "Standard Veg",
    prices: { "10\"": 335, "16\"": 760, "18\"": 805, "20\"": 875 },
    image: "/assets/pizza.png"
  },
  {
    id: "red-alert",
    name: "Red Alert",
    description: "Fresh capsicum, spring onions, and a splash of signature red hot sauce.",
    category: "Standard Veg",
    prices: { "10\"": 335, "16\"": 730, "18\"": 775, "20\"": 845 },
    image: "/assets/pizza 2.png",
    spicy: true
  },
  {
    id: "tres-formaggio",
    name: "Tres Formaggio",
    description: "A rich combination of three premium cheeses, garnished with fresh parsley.",
    category: "Standard Veg",
    prices: { "10\"": 335, "16\"": 760, "18\"": 805, "20\"": 875 },
    image: "/assets/pizza.png"
  },
  {
    id: "ocoli",
    name: "Ocoli",
    description: "Sweet golden corn kernels, sliced red onions, and black olives.",
    category: "Standard Veg",
    prices: { "10\"": 335, "16\"": 780, "18\"": 825, "20\"": 895 },
    image: "/assets/20 inch pizza.png"
  },
  {
    id: "cop",
    name: "COP",
    description: "Traditional crunch of capsicum, sliced red onions, and bell pepper toppings.",
    category: "Standard Veg",
    prices: { "10\"": 335, "16\"": 735, "18\"": 780, "20\"": 850 },
    image: "/assets/pizza.png"
  },
  {
    id: "spangle",
    name: "Spangle",
    description: "Fresh garden spinach leaves, sliced mushrooms, and black olives.",
    category: "Standard Veg",
    prices: { "10\"": 335, "16\"": 745, "18\"": 790, "20\"": 860 },
    image: "/assets/20 inch pizza.png"
  },
  {
    id: "plain-jane",
    name: "Plain Jane",
    description: "Sliced tomatoes, capsicum, onions, and black olives.",
    category: "Standard Veg",
    prices: { "10\"": 335, "16\"": 770, "18\"": 815, "20\"": 885 },
    image: "/assets/pizza.png"
  },
  {
    id: "spinato",
    name: "Spinato",
    description: "Sliced tomatoes, fresh spinach, red onions, and paprika seasoning.",
    category: "Standard Veg",
    prices: { "10\"": 335, "16\"": 740, "18\"": 785, "20\"": 855 },
    image: "/assets/pizza 2.png",
    spicy: true
  },
  // Premium Veg
  {
    id: "inferno",
    name: "Inferno",
    description: "Spiced cottage cheese, fiery green hot sauce, sliced onions, and paprika.",
    category: "Premium Veg",
    prices: { "10\"": 405, "16\"": 900, "18\"": 990, "20\"": 1080 },
    image: "/assets/pizza 2.png",
    spicy: true
  },
  {
    id: "cornita",
    name: "Cornita",
    description: "Spiced cottage cheese, button mushrooms, onions, sweet corn, and olives.",
    category: "Premium Veg",
    prices: { "10\"": 405, "16\"": 900, "18\"": 990, "20\"": 1080 },
    image: "/assets/20 inch pizza.png"
  },
  {
    id: "exotica",
    name: "Exotica",
    description: "Soft cottage cheese, sliced zucchini, green bell peppers, and jalapenos.",
    category: "Premium Veg",
    prices: { "10\"": 405, "16\"": 900, "18\"": 990, "20\"": 1080 },
    image: "/assets/pizza.png",
    spicy: true
  },
  {
    id: "sweet-pepinos",
    name: "Sweet Pepinos",
    description: "Sweet corn, green bell pepper, sliced zucchini, mushrooms, and onions.",
    category: "Premium Veg",
    prices: { "10\"": 405, "16\"": 900, "18\"": 990, "20\"": 1080 },
    image: "/assets/pizza 2.png"
  },
  {
    id: "zubebe",
    name: "Zubebe",
    description: "Cottage cheese cubes, sliced zucchini, corn, green jalapenos, and fresh basil.",
    category: "Premium Veg",
    prices: { "10\"": 405, "16\"": 900, "18\"": 990, "20\"": 1080 },
    image: "/assets/20 inch pizza.png",
    spicy: true
  },
  {
    id: "same-difference",
    name: "Same Difference",
    description: "Spiced tandoori cottage cheese, green bell peppers, and paprika flakes.",
    category: "Premium Veg",
    prices: { "10\"": 405, "16\"": 900, "18\"": 990, "20\"": 1080 },
    image: "/assets/pizza.png",
    spicy: true
  },
  // On The Side
  { id: "garlic-bread", name: "Garlic Bread", category: "On The Side", price: 140, description: "Toasted baguette slices with whipped garlic butter and herbs.", image: "/assets/dish.png" },
  { id: "cheese-garlic-bread", name: "Cheese Garlic Bread", category: "On The Side", price: 170, description: "Garlic bread loaded and baked with melted mozzarella cheese.", image: "/assets/dish.png" },
  { id: "onion-rings", name: "Onion Rings", category: "On The Side", price: 140, description: "Crispy batter-fried golden onion rings served with dip.", image: "/assets/dish.png" },
  { id: "potato-cheese-cigars", name: "Potato Cheese Cigars", category: "On The Side", price: 170, description: "Crispy pastry rolls filled with spiced potatoes and cheese.", image: "/assets/dish.png" },
  { id: "mozzarella-sticks", name: "Mozzarella Sticks", category: "On The Side", price: 220, description: "Golden fried breaded mozzarella cheese sticks with house dip.", image: "/assets/dish.png" },
  { id: "french-fries", name: "French Fries", category: "On The Side", price: 160, description: "Classic salted potato fries, crispy outside and fluffy inside.", image: "/assets/dish.png", badge: "NEW" },
  { id: "crinkle-fries", name: "Crinkle Fries", category: "On The Side", price: 170, description: "Golden crinkle-cut fries sprinkled with special house seasoning.", image: "/assets/dish.png", badge: "NEW" },
  { id: "herbed-wedges", name: "Herbed Potato Wedges", category: "On The Side", price: 190, description: "Thick potato wedges tossed with garlic, rosemary, and sea salt.", image: "/assets/dish.png", badge: "NEW" },
  { id: "chicken-tenders", name: "Chicken Tenders", category: "On The Side", price: 220, description: "Crispy breaded chicken breast strips served with dipping sauce.", image: "/assets/dish.png" },
  { id: "chicken-cutlets", name: "Chicken Cutlets", category: "On The Side", price: 200, description: "Minced spiced chicken patties, breaded and golden-fried.", image: "/assets/dish.png" },
  // Thirst Quenchers
  { id: "virgin-mojito", name: "Virgin Mojito", category: "Thirst Quenchers", price: 130, description: "Muddled fresh mint, lime wedges, simple syrup, and carbonated water.", image: "/assets/mojito.png" },
  { id: "blue-breeze", name: "Blue Breeze", category: "Thirst Quenchers", price: 130, description: "Chilled blue curaçao syrup mixed with carbonated lemonade.", image: "/assets/drink 2.png" },
  { id: "tropical-fizz", name: "Tropical Fizz", category: "Thirst Quenchers", price: 130, description: "A sweet mix of tropical fruit nectars topped with fizz.", image: "/assets/drink 3.png" },
  { id: "strawberry-fizz", name: "Strawberry Fizz", category: "Thirst Quenchers", price: 130, description: "Sweet strawberry reduction with muddled mint and carbonated tonic.", image: "/assets/mojito 2.png" },
  { id: "kiwi-fizz", name: "Kiwi Fizz", category: "Thirst Quenchers", price: 130, description: "Muddled kiwi pulp topped with chilled sparkling water.", image: "/assets/mojito 3.png" },
  { id: "litchi-fizz", name: "Litchi Fizz", category: "Thirst Quenchers", price: 130, description: "Sweet litchi juice splash with sparkling mineral water.", image: "/assets/drink.png" },
  { id: "iced-tea", name: "Iced Tea", category: "Thirst Quenchers", price: 120, description: "Chilled black tea base. Select Flavor: Peach, Lemon, or Watermelon.", image: "/assets/drink 2.png" },
  // Desserts
  { id: "red-velvet-dessert", name: "Red Velvet Cupcake", category: "Desserts", price: 150, description: "In-house baked from scratch, using original age-old recipes.", image: "/assets/dish.png", badge: "TRY" },
  { id: "blueberry-cheesecake", name: "Blueberry Cheesecake Slice", category: "Desserts", price: 170, description: "Creamy cheesecake on a buttery biscuit base topped with blueberry pulp.", image: "/assets/dish.png", badge: "TRY" }
];

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
  const [menuItems, setMenuItems] = useState([]);

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

        const storedMenu = localStorage.getItem("largo_menu_items");
        if (storedMenu) {
          setMenuItems(JSON.parse(storedMenu));
        } else {
          setMenuItems(DEFAULT_MENU_ITEMS);
          localStorage.setItem("largo_menu_items", JSON.stringify(DEFAULT_MENU_ITEMS));
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
    const cleanedId = id ? id.toString().trim() : "";
    setTableId(cleanedId);
    if (typeof window !== "undefined") {
      if (cleanedId) {
        localStorage.setItem("largo_table_id", cleanedId);
      } else {
        localStorage.removeItem("largo_table_id");
      }
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

  // Create new menu item
  const addMenuItem = (item) => {
    setMenuItems((prev) => {
      const updated = [...prev, item];
      if (typeof window !== "undefined") {
        localStorage.setItem("largo_menu_items", JSON.stringify(updated));
      }
      return updated;
    });
  };

  // Update existing menu item
  const editMenuItem = (itemId, updatedItem) => {
    setMenuItems((prev) => {
      const updated = prev.map((item) => (item.id === itemId ? { ...item, ...updatedItem } : item));
      if (typeof window !== "undefined") {
        localStorage.setItem("largo_menu_items", JSON.stringify(updated));
      }
      return updated;
    });
  };

  // Delete menu item
  const deleteMenuItem = (itemId) => {
    setMenuItems((prev) => {
      const updated = prev.filter((item) => item.id !== itemId);
      if (typeof window !== "undefined") {
        localStorage.setItem("largo_menu_items", JSON.stringify(updated));
      }
      return updated;
    });
  };

  // Direct edit handler for active order details (for owner CRUD control)
  const updateOrderDetails = (orderId, updatedFields) => {
    setOrdersList((prev) => {
      const updated = prev.map((ord) => {
        if (ord.orderId === orderId) {
          const newOrder = { ...ord, ...updatedFields };
          
          // Sync with current order step tracking if matching current table session
          if (newOrder.tableId === tableId && updatedFields.step !== undefined) {
            setOrderStep(updatedFields.step);
            if (typeof window !== "undefined") {
              localStorage.setItem("largo_order_step", updatedFields.step.toString());
            }
          }
          if (newOrder.tableId === tableId && updatedFields.status !== undefined) {
            setPaymentStatus(updatedFields.status === "paid" ? "success" : "pending");
            if (typeof window !== "undefined") {
              localStorage.setItem("largo_payment_status", updatedFields.status === "paid" ? "success" : "pending");
            }
          }
          return newOrder;
        }
        return ord;
      });
      if (typeof window !== "undefined") {
        localStorage.setItem("largo_orders_list", JSON.stringify(updated));
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
        menuItems,
        addMenuItem,
        editMenuItem,
        deleteMenuItem,
        updateOrderDetails,
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
