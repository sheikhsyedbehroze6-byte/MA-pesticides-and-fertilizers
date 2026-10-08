import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'ma_pesticides_spray_cart_v1';
const FARMER_STORAGE_KEY = 'ma_pesticides_farmer_info_v1';

// Standard price estimation helper based on formulation type & typical valley MRPs
// eslint-disable-next-line react-refresh/only-export-components
export function estimateProductPrice(product) {
  if (product.approxPrice) {
    return {
      mrp: Math.round(product.approxPrice * 1.25),
      discounted: product.approxPrice
    };
  }

  const nameLower = (product.name || '').toLowerCase();
  const typeLower = (product.type || '').toLowerCase();

  let mrp = 850;

  if (nameLower.includes('luna')) {
    mrp = 1850;
  } else if (nameLower.includes('alika')) {
    mrp = 1150;
  } else if (nameLower.includes('superstar') || nameLower.includes('dodeine') || nameLower.includes('dodine')) {
    mrp = 950;
  } else if (nameLower.includes('antracol')) {
    mrp = 800;
  } else if (nameLower.includes('cyclone') || nameLower.includes('505')) {
    mrp = 650;
  } else if (nameLower.includes('filpostar') || nameLower.includes('proponib')) {
    mrp = 750;
  } else if (nameLower.includes('hmo') || nameLower.includes('mineral oil') || nameLower.includes('tree spray')) {
    mrp = 1400;
  } else if (typeLower.includes('bio-stimulant') || typeLower.includes('tonic') || nameLower.includes('neo+')) {
    mrp = 700;
  } else if (typeLower.includes('herbicide')) {
    mrp = 600;
  } else if (typeLower.includes('adjuvant') || typeLower.includes('spreader')) {
    mrp = 350;
  } else if (typeLower.includes('fertilizer') || nameLower.includes('vermicompost')) {
    mrp = 450;
  }

  // 20% discount on print price (standard MA Pesticides valley discount)
  const discounted = Math.round(mrp * 0.8);

  return { mrp, discounted };
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState(null);

  const [farmerInfo, setFarmerInfo] = useState(() => {
    try {
      const saved = localStorage.getItem(FARMER_STORAGE_KEY);
      return saved
        ? JSON.parse(saved)
        : {
            name: '',
            phone: '',
            district: 'Srinagar',
            deliveryType: 'pickup', // 'pickup' | 'delivery'
            note: ''
          };
    } catch {
      return {
        name: '',
        phone: '',
        district: 'Srinagar',
        deliveryType: 'pickup',
        note: ''
      };
    }
  });

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      /* ignore storage errors */
    }
  }, [cartItems]);

  // Sync farmer info to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(FARMER_STORAGE_KEY, JSON.stringify(farmerInfo));
    } catch {
      /* ignore storage errors */
    }
  }, [farmerInfo]);

  // Lock body scroll when cart drawer is open on mobile
  useEffect(() => {
    if (isCartOpen) {
      document.body.classList.add('cart-drawer-open');
    } else {
      document.body.classList.remove('cart-drawer-open');
    }
    return () => {
      document.body.classList.remove('cart-drawer-open');
    };
  }, [isCartOpen]);

  const updateFarmerInfo = (field, value) => {
    setFarmerInfo(prev => ({ ...prev, [field]: value }));
  };

  const addToCart = (product, quantity = 1, options = {}) => {
    const { mrp, discounted } = estimateProductPrice(product);
    const calculatedNote = options.calculatedNote || null;
    const itemKey = `${product.id}-${calculatedNote || 'standard'}`;

    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.itemKey === itemKey);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      }
      return [
        ...prev,
        {
          itemKey,
          id: product.id,
          name: product.name,
          type: product.type || 'Crop Chemical',
          composition: product.composition || '',
          dosage: product.dosage || '',
          image: product.image,
          mrp,
          price: discounted,
          quantity: Math.max(1, quantity),
          calculatedNote
        }
      ];
    });

    setLastAddedItem(product.name);
    setTimeout(() => setLastAddedItem(null), 3000);

    if (options.openDrawer) {
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (itemKey) => {
    setCartItems(prev => prev.filter(item => item.itemKey !== itemKey));
  };

  const updateQuantity = (itemKey, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemKey);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.itemKey === itemKey ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  const mrpTotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.mrp * item.quantity, 0);
  }, [cartItems]);

  const savings = Math.max(0, mrpTotal - subtotal);

  // Pre-generate pre-filled WhatsApp order message
  const generateWhatsAppMessage = () => {
    if (cartItems.length === 0) return '';

    const lines = [];
    lines.push(`🌿 *ORDER INQUIRY — MA PESTICIDES & FERTILIZERS*`);
    lines.push(`📍 *Location:* Tengpora Bypass, Batamaloo, Srinagar`);
    lines.push(`----------------------------------------`);

    if (farmerInfo.name.trim()) {
      lines.push(`👤 *Farmer/Customer:* ${farmerInfo.name.trim()}`);
    }
    lines.push(`🍏 *District / Valley Area:* ${farmerInfo.district}`);
    lines.push(
      `📦 *Fulfillment:* ${
        farmerInfo.deliveryType === 'delivery'
          ? '🚚 Orchard / Valley Transport Dispatch'
          : '🏬 Shop Counter Pickup (Tengpora Bypass)'
      }`
    );

    if (farmerInfo.note.trim()) {
      lines.push(`📝 *Note:* ${farmerInfo.note.trim()}`);
    }

    lines.push(`----------------------------------------`);
    lines.push(`📋 *REQUESTED ITEMS (${totalItems} Units):*`);

    cartItems.forEach((item, index) => {
      let itemLine = `${index + 1}. *${item.name}* (Qty: ${item.quantity})`;
      if (item.composition) {
        itemLine += `\n   ↳ _${item.composition}_`;
      }
      if (item.calculatedNote) {
        itemLine += `\n   ↳ 🎯 _Tank Requirement: ${item.calculatedNote}_`;
      }
      itemLine += `\n   ↳ Est. Price: ₹${(item.price * item.quantity).toLocaleString('en-IN')} (20% off MRP)`;
      lines.push(itemLine);
    });

    lines.push(`----------------------------------------`);
    lines.push(`💰 *Est. Total Value:* ~₹${subtotal.toLocaleString('en-IN')}`);
    lines.push(`🏷️ *20% Valley Farmer Discount Included*`);
    lines.push(`----------------------------------------`);
    lines.push(
      `Salam Sheikh Behroze / Mohammad Afzal! Please confirm current batch availability, seal date, and arrange counter pickup or dispatch. Thank you!`
    );

    return lines.join('\n');
  };

  const getWhatsAppUrl = () => {
    const msg = generateWhatsAppMessage();
    return `https://wa.me/919906541321?text=${encodeURIComponent(msg)}`;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems,
        subtotal,
        mrpTotal,
        savings,
        isCartOpen,
        setIsCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        farmerInfo,
        updateFarmerInfo,
        generateWhatsAppMessage,
        getWhatsAppUrl,
        lastAddedItem
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
