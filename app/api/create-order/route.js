import axios from "axios";

export async function POST(req) {
  try {
    const { email, username, amount, products } = await req.json();

    // 🟢 تحقق إن كل الحقول المطلوبة موجودة
    if (!email || !username || !amount || !Array.isArray(products) || !products.length) {
      return new Response(
        JSON.stringify({ error: "Missing or invalid required fields" }),
        { status: 400 }
      );
    }

    // 🟢 إرسال الطلب إلى Strapi
    const strapiResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/orders`,
      {
        data: {
          email,
          username,
          amount,
          products,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_REST_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // ✅ إرجاع نجاح للفرونت
    return new Response(
      JSON.stringify({
        message: "Order created successfully",
        order: strapiResponse.data,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error creating order:", error.response?.data || error.message);

    return new Response(
      JSON.stringify({
        error: error.response?.data?.error || "Failed to create order in Strapi",
      }),
      { status: error.response?.status || 500 }
    );
  }
}
