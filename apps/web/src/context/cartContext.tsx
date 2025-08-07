import { createContext, useContext, useState, type ReactNode, useEffect } from "react";
import type { product, CartItem } from '../types/type'

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: product) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('basketCartMadarMarket');
    const parsed = savedCart ? JSON.parse(savedCart) : [];
    return parsed;
  });

  const addToCart = (item: product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const increaseQuantity = (id: number) => {
    setCart((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p))
    );
  };

  const decreaseQuantity = (id: number) => {
    setCart((prev) =>
      prev
        .map((p) =>
          p.id === id ? { ...p, quantity: p.quantity - 1 } : p
        )
        .filter((p) => p.quantity > 0)
    );
  };

  useEffect(()=>{
    if(cart?.length != 0){
      localStorage.setItem('basketCartMadarMarket', JSON.stringify(cart))
    }
  },[cart])

  return (
    <CartContext.Provider
      value={{ cart, addToCart, increaseQuantity, decreaseQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};
