"use client";
import Image from "next/image";
import { X, Trash2 } from "lucide-react";
import { useCart } from "../_context/cartContext";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartSidebar({ isOpen, onClose }) {
  const { cartItems, removeFromCart } = useCart();
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);

  // ✅ التحكم في الظهور والانيميشن
  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      // نضيف تأخير بسيط قبل تشغيل الانيميشن عشان يكون بنفس نعومة القفل
      const openTimer = setTimeout(() => setAnimate(true), 30);
      return () => clearTimeout(openTimer);
    } else {
      setAnimate(false);
      // نخلي الإخفاء بعد الانيميشن بـ300ms
      const closeTimer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(closeTimer);
    }
  }, [isOpen]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0  bg-black/30 transition-opacity duration-300 ease-in-out ${
        animate ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        className={`fixed top-0 right-0 mt-14 mr-16 w-[350px] bg-gray-100 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out ${
          animate ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ✅ Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-600 hover:text-black" />
          </button>
        </div>

        {/* ✅ Cart Content */}
        <div className="p-4 space-y-4 max-h-[250px] overflow-y-auto">
          {cartItems?.length > 0 ? (
            cartItems.map((item) => {
              const imageUrl = item?.banner?.url
                ? `${baseUrl}${item.banner.url}`
                : "/placeholder.png";
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 border rounded-lg shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={imageUrl}
                      alt={item.title}
                      width={60}
                      height={60}
                      className="rounded-md"
                    />
                    <div>
                      <h3 className="text-sm font-medium">{item.title}</h3>
                      <p className="text-xs text-gray-500">${item.price}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <Trash2 className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500">Your cart is empty 🛒</p>
          )}
        </div>

        {/* ✅ Footer Buttons */}
        <div>
          <button className="block mx-auto my-4">
            <Link
              href={"/Cart"}
              className="px-20 py-3 text-white bg-teal-600 rounded-lg"
            >
              View My Cart
            </Link>
          </button>
          <button className="block mx-auto mb-3">
            <Link href={"/"} className="text-gray-500 border-b">
              Continue Shopping
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
