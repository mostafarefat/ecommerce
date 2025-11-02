import axiosClient from "./axiosClient";

const getLatestProducts = () => axiosClient.get("/products?populate=*");

const getProductById = (id) => axiosClient.get(`/products/${id}?populate=*`);

const getProductsByCategory = (category) =>
  axiosClient.get(`/products?filters[category][$eq]=${category}&populate=*`);

const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);


export default {
  getLatestProducts,
  getProductById,
  getProductsByCategory,
};
