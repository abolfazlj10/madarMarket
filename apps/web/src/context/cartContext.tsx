import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { product, CartItem } from '../types/type';
import toast from "react-hot-toast";
import moment from "jalali-moment";

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: product) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  submitOrder: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'basketCartMadarMarket';

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      return [];
    }
  });

  const updateCartAndStorage = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart));
  };

  const addToCart = (item: product) => {
    const existing = cart.find((p) => p.id === item.id);
    let newCart: CartItem[];

    if (existing) {
      newCart = cart.map((p) =>
        p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
      );
    } else {
      newCart = [...cart, { ...item, quantity: 1 }];
    }
    updateCartAndStorage(newCart);
  };

  const increaseQuantity = (id: number) => {
    const newCart = cart.map((p) =>
      p.id === id ? { ...p, quantity: p.quantity + 1 } : p
    );
    updateCartAndStorage(newCart);
  };

  const decreaseQuantity = (id: number) => {
    const newCart = cart
      .map((p) =>
        p.id === id ? { ...p, quantity: p.quantity - 1 } : p
      )
      .filter((p) => p.quantity > 0);
    updateCartAndStorage(newCart);
  };

  const submitOrder = () => {
    const orders = localStorage.getItem('orderMadarmarket')
    if(orders){
      const ordersParse = JSON.parse(orders)
      const orderStructure = {
        id: ordersParse.length + 1,
        orders: cart,
        date: moment().locale('fa').format('YYYY/MM/DD')
      }
      console.log(orderStructure)
    }
    // setCart([])
    // localStorage.setItem('basketCartMadarMarket', JSON.stringify([]))
    // toast.success('سفارش شما با موفقیت ثبت شد.')
  }
  useEffect(()=>{
    submitOrder()
  },[])

  return (
    <CartContext.Provider
      value={{ cart, addToCart, increaseQuantity, decreaseQuantity, submitOrder }}
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