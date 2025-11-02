// app/_utils/CartApis.js
import axiosClient from "./axiosClient";

const CartApis = {
  // ✅ 1. جلب السلة الخاصة بالمستخدم
  getUserCart: async (email) => {
    return axiosClient.get(
      `/carts?filters[email][$eq]=${email}&populate[products][populate]=*`
    );
  },

  // ✅ 2. إضافة منتج للسلة (مع حذف السلات القديمة)
  addToCart: async (email, productId) => {
    const existingCart = await CartApis.getUserCart(email);
    const carts = existingCart?.data?.data || [];

    // ⚠️ لو فيه أكتر من سلة بنفس الإيميل نحذفهم ونبدأ بسلة واحدة جديدة
    if (carts.length > 1) {
      for (let i = 1; i < carts.length; i++) {
        const oldCartId = carts[i].documentId;
        await axiosClient.delete(`/carts/${oldCartId}`);
      }
    }

    // 🧠 بعد التنظيف ناخد السلة الحالية (لو موجودة)
    const cart = carts[0];
    if (cart) {
      const cartId = cart.documentId;
      const existingProducts = cart.products?.map((p) => p.id) || [];

      // ✅ لو المنتج مش موجود نضيفه
      if (!existingProducts.includes(productId)) {
        const updatedProducts = [...existingProducts, productId];
        return await axiosClient.put(`/carts/${cartId}`, {
          data: { email, products: updatedProducts },
        });
      } else {
        return cart;
      }
    } else {
      // 🟡 لو مفيش سلة أصلاً، نعمل واحدة جديدة
      return await axiosClient.post(`/carts`, {
        data: {
          email,
          products: [productId],
        },
      });
    }
  },

  // ✅ 3. حذف منتج من السلة
  removeFromCart: async (email, productId) => {
    const existingCart = await CartApis.getUserCart(email);
    const cart = existingCart?.data?.data?.[0];

    if (cart) {
      const cartId = cart.documentId;
      const updatedProducts = cart.products
        ?.filter((p) => p.id !== productId)
        .map((p) => p.id);

      return await axiosClient.put(`/carts/${cartId}`, {
        data: { email, products: updatedProducts },
      });
    }
  },

  // ✅ 4. حذف السلة بالكامل (بعد الدفع)
  clearUserCart: async (email) => {
    const existingCart = await CartApis.getUserCart(email);
    const carts = existingCart?.data?.data || [];

    if (carts.length > 0) {
      for (const cart of carts) {
        const cartId = cart.documentId;
        await axiosClient.delete(`/carts/${cartId}`);
      }
    }
  },
};

export default CartApis;


