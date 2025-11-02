"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import CartApis from "../_utils/CartApis";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useUser();
  const [cartItems, setCartItems] = useState([]);
  const [cartLoaded, setCartLoaded] = useState(false); // 🧠 حماية من التحميل المتكرر

  // ✅ تحميل السلة من localStorage أول ما الصفحة تفتح
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // ✅ تحميل السلة من Strapi أول مرة فقط بعد تسجيل الدخول
  useEffect(() => {
    if (cartLoaded || !user?.primaryEmailAddress?.emailAddress) return;

    const fetchCart = async () => {
      try {
        const email = user.primaryEmailAddress.emailAddress;
        const res = await CartApis.getUserCart(email);

        if (res?.data?.data?.length > 0) {
          const products = res.data.data[0].products || [];

          if (products.length > 0) {
            setCartItems(products);
            localStorage.setItem("cartItems", JSON.stringify(products));
          } else {
            setCartItems([]);
            localStorage.removeItem("cartItems");
          }
        } else {
          setCartItems([]);
          localStorage.removeItem("cartItems");
        }

        setCartLoaded(true); // ✅ ضمان إنه مش هيعيد التحميل تاني
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };

    fetchCart();
  }, [user?.primaryEmailAddress?.emailAddress, cartLoaded]);

  // ✅ تحديث localStorage لما تتغير السلة
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ إضافة منتج للسلة
  const addToCart = async (product) => {
    if (!user) return alert("Please sign in first!");

    const email = user.primaryEmailAddress.emailAddress;
    const alreadyInCart = cartItems.some((item) => item.id === product.id);
    if (alreadyInCart) {
      alert("Product already in cart!");
      return;
    }

    const updatedCart = [...cartItems, product];
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));

    await CartApis.addToCart(email, product.id);
  };

  // ✅ حذف منتج من السلة
  const removeFromCart = async (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));

    if (user) {
      const email = user.primaryEmailAddress.emailAddress;
      await CartApis.removeFromCart(email, id);
    }
  };

  // ✅ تفريغ السلة بالكامل بعد الدفع
  const clearCart = async () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");

    if (user) {
      const email = user.primaryEmailAddress.emailAddress;
      try {
        await CartApis.clearUserCart(email);
      } catch (err) {
        console.error("Error clearing user cart:", err);
      }
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);





