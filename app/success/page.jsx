"use client";
import React, { useEffect } from "react";
import { useCart } from "../_context/cartContext";

export default function SuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart(); // امسح السلة مرة واحدة بس
  }, []); // ← لاحظ الأقواس الفاضية هنا

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
      <p className="mt-4 text-gray-600">Thank you for your purchase 🎉</p>
    </div>
  );
}


