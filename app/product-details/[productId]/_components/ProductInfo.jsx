"use client";
import React from "react";
import { BadgeCheck, ShoppingCart, AlertOctagon } from "lucide-react";
import { useCart } from "../../../_context/CartContext"; 

function ProductInfo({ product }) {
  const { addToCart } = useCart(); // ✅ دالة الإضافة من الـcontext

  const descriptionText =
    product?.description?.[0]?.children?.[0]?.text || "No description available";

  const handleAddToCart = () => {
    addToCart(product); // ✅ يضيف المنتج فعليًا في السلة العامة
    console.log(`Added ${product?.title} to cart`);
  };

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-[22px] font-semibold">{product?.title}</h2>
      <h2 className="text-[13px] text-gray-500">{descriptionText}</h2>

      <h2 className="text-[12px] text-gray-500 flex gap-2 mt-2 items-center">
        {product?.instantDelivery ? (
          <>
            <BadgeCheck className="w-5 h-5 text-green-500" />
            <span>Eligible For Instant Delivery</span>
          </>
        ) : (
          <>
            <AlertOctagon className="w-5 h-5 text-red-500" />
            <span>Not Eligible For Instant Delivery</span>
          </>
        )}
      </h2>

      <h2 className="text-[24px] text-primary mt-2">$ {product?.price}</h2>

      {/* ✅ الزرار بدون عدد */}
      <button
        onClick={handleAddToCart}
        className="flex items-center justify-center gap-2 p-3 text-white transition bg-teal-500 rounded-lg hover:bg-teal-600"
      >
        <ShoppingCart className="w-5 h-5" />
        Add To Cart
      </button>
    </div>
  );
}

export default ProductInfo;

