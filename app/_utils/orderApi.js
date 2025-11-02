import axiosClient from "./axiosClient";

const OrderApis = {
  // إنشاء أوردر جديد بعد الدفع الناجح
  createOrder: (email, username, amount, products) => {
    return axiosClient.post("/orders", {
      data: {
        email,
        username,
        amount,
        products,
      },
    });
  },

  // جلب الأوردرات الخاصة بمستخدم معين
  getUserOrders: (email) => {
    return axiosClient.get(
      `/orders?filters[email][$eq]=${email}&populate[products][populate]=*`
    );
  },
};

export default OrderApis;
