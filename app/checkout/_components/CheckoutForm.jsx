"use client";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useCart } from "../../_context/CartContext";
import { useRouter } from "next/navigation";

const CheckoutForm = ({ totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useUser();
  const { cartItems } = useCart();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [clientSecret, setClientSecret] = useState(null);

  // 🟢 Step 1: إنشاء PaymentIntent
  useEffect(() => {
    if (!totalAmount) return;

    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: totalAmount * 100 }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          setErrorMessage("Failed to initialize payment");
        }
      })
      .catch(() => setErrorMessage("Error creating payment intent"));
  }, [totalAmount]);

  // 🟢 Step 2: تنفيذ الدفع
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);
    setErrorMessage("");

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    // 🟢 Step 3: بعد الدفع الناجح
    if (paymentIntent?.status === "succeeded") {
      const email = user?.primaryEmailAddress?.emailAddress || "";
      const username = user?.fullName || "Unknown User";

      // إنشاء الطلب
      await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          username,
          amount: totalAmount,
          products: cartItems.map((p) => p.id),
        }),
      });

      // إرسال الإيميل ✅
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          body: {
            fullName: username,
          },
        }),
      });

      // الانتقال لصفحة النجاح
      router.push("/success");
    }

    setLoading(false);
  };

  if (!clientSecret) {
    return <div className="mt-10 text-center">Loading payment...</div>;
  }

  return (
    <div className="mt-12 mx-4 md:mx-[320px]">
      <form onSubmit={handleSubmit} className="space-y-4">
        <PaymentElement />
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        <button
          disabled={!stripe || loading}
          className="w-full px-4 py-2 text-white transition bg-teal-600 rounded hover:bg-teal-700"
        >
          {loading ? "Processing..." : `Pay $${totalAmount.toFixed(2)}`}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;



