"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useUser, UserButton } from "@clerk/nextjs";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../_context/cartContext";
import CartSidebar from "./CartSidebar"; // ✅ استدعاء مكون السلة الجانبية

function Header() {
  const { isSignedIn, isLoaded } = useUser();
  const { cartItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false); // ✅ للتحكم في ظهور السلة

  if (!isLoaded) return null;

  return (
    <header className="relative z-50 bg-white">
      <div className="px-4 mx-auto shadow-md max-w-screen-full sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ✅ Logo */}
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" alt="logo" width={50} height={50} />
            
          </div>

          {/* ✅ Navbar */}
          <nav className="hidden md:block" aria-label="Global">
            <ul className="flex items-center gap-6 text-sm">
              <li><a className="text-gray-600 transition hover:text-teal-600" href="#">Home</a></li>
              <li><a className="text-gray-600 transition hover:text-teal-600" href="#">Explore</a></li>
              <li><a className="text-gray-600 transition hover:text-teal-600" href="#">Products</a></li>
              <li><a className="text-gray-600 transition hover:text-teal-600" href="#">About</a></li>
              <li><a className="text-gray-600 transition hover:text-teal-600" href="#">Contact</a></li>
            </ul>
          </nav>

          {/* ✅ Actions */}
          <div className="flex items-center gap-5">
            {isSignedIn ? (
              <>
                {/* ✅ أيقونة السلة */}
                <div
                  className="relative cursor-pointer"
                  onClick={() => setIsCartOpen(true)} // ← فتح السلة عند الضغط
                >
                  <ShoppingCart className="w-6 h-6 text-teal-600" />
                  {cartItems?.length > 0 && (
                    <span className="absolute -top-2 -right-3 bg-teal-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {cartItems.length}
                    </span>
                  )}
                </div>

                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <div className="flex gap-3">
                <a
                  className="px-5 py-2 text-sm font-medium text-white transition bg-teal-600 rounded-md shadow-sm hover:bg-teal-700"
                  href="/sign-in"
                >
                  Login
                </a>
                <a
                  className="px-5 py-2 text-sm font-medium text-teal-600 transition bg-gray-100 rounded-md hover:bg-gray-200"
                  href="/sign-up"
                >
                  Register
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ✅ Sidebar بتاعة السلة */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}

export default Header;



