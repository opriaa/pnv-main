import { createContext, useContext, useState, useEffect, useCallback } from "react";

const CartContext = createContext(null);

const CART_KEY = "uiop_cart";

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((product, quantity = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.productId === product._id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + quantity };
        return updated;
      }
      return [
        ...prev,
        {
          productId: product._id,
          name: product.name,
          slug: product.slug,
          price: product.discountPrice || product.price,
          originalPrice: product.price,
          unit: product.unit,
          minOrderQty: product.minOrderQty,
          stock: product.stock,
          image: product.images?.[0] || "",
          quantity,
        },
      ];
    });
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    setItems((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity } : i))
    );
  }, []);

  const removeItem = useCallback((productId) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, removeItem, clearCart, totalItems, totalAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
