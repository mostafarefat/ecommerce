import axiosClient from "./axiosClient";

const getLatestProducts = () => axiosClient.get("/products?populate=*");

const getProductById = (id) => axiosClient.get(`/products/${id}?populate=*`);

const getProductsByCategory = (category) =>
  axiosClient.get(`/products?filters[category][$eq]=${category}&populate=*`);

//const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);/
const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

export const getProducts = async () => {
  const res = await fetch(`${API_URL}/api/products`);
  return res.json();
};




export default {
  getLatestProducts,
  getProductById,
  getProductsByCategory,
};
