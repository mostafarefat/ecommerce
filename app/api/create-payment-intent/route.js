import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    // 🟢 استقبل الداتا من الـ body
    const { amount } = await req.json();

    // 🟢 تأكد إن فيه مبلغ
    if (!amount) {
      return new Response(JSON.stringify({ error: "Amount is required" }), {
        status: 400,
      });
    }

    // 🟢 إنشاء Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd", // تقدر تغيرها لو عايز عملة تانية
      automatic_payment_methods: { enabled: true },
    });

    // 🟢 رجّع الـ clientSecret
    return new Response(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Stripe error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
}
