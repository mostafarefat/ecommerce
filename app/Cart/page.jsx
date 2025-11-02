"use client";
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useCart } from "../_context/CartContext";


export default function CartPage() {
  const { cartItems, removeFromCart } = useCart();
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  // 🧮 حساب السعر الكلي
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.price || 0),
    0
  );

  return (
    <div className="min-h-screen px-6 py-12 bg-gray-50 md:px-20">
      <h1 className="mb-8 text-3xl font-semibold text-center">🛒 Your Cart</h1>

      {cartItems.length > 0 ? (
        <div className="grid gap-10 md:grid-cols-3">
          {/* ✅ قائمة الكورسات */}
          <div className="space-y-4 md:col-span-2">
            {cartItems.map((item) => {
              const imageUrl = item?.banner?.url
                ? `${baseUrl}${item.banner.url}`
                : "/placeholder.png";
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={imageUrl}
                      alt={item.title}
                      width={80}
                      height={80}
                      className="rounded-md"
                    />
                    <div>
                      <h3 className="text-lg font-medium">{item.title}</h3>
                      <p className="text-gray-500">${item.price}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <Trash2 className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              );
            })}
            <p className="mt-10 text-sm text-gray-600 text-">Note: All Item Will Be Send Via Email</p>
          </div>

          {/* ✅ المجموع والخيارات */}
          <div className="p-6 bg-white rounded-lg shadow-md h-fit">
            <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="my-3 border-t"></div>
            <div className="flex justify-between mb-6 text-lg font-medium">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button className="w-full py-3 text-white transition bg-teal-600 rounded-lg hover:bg-teal-700">
                <Link href={"/checkout"}>Checkout</Link>
                
            </button>
            <Link
              href="/"
              className="block mt-4 text-center text-gray-500 hover:text-gray-700"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      ) : (
        <p className="text-lg text-center text-gray-500">
          Your cart is empty 🛒
        </p>
      )}
      
    </div>
  );
}
