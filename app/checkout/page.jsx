"use client";

import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./_components/CheckoutForm";
import { useCart } from "../_context/CartContext";

// تحميل مفتاح Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function Checkout() {
  const { cartItems } = useCart();
  const [clientSecret, setClientSecret] = useState("");

  // 🧮 نحسب المجموع الكلي من السلة
  const totalAmount = cartItems.reduce((acc, item) => {
    const price = item.attributes?.price || item.price || 0;
    return acc + price;
  }, 0);

  // 🟢 إنشاء PaymentIntent لما الصفحة تفتح أو المجموع يتغير
  useEffect(() => {
    const createPaymentIntent = async () => {
      if (totalAmount <= 0) return;

      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Math.round(totalAmount * 100) }),
      });

      const data = await res.json();
      setClientSecret(data.clientSecret);
    };

    createPaymentIntent();
  }, [totalAmount]);

  if (!clientSecret) return <p>Loading payment...</p>;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm totalAmount={totalAmount} />
    </Elements>
  );
}

export default Checkout;
