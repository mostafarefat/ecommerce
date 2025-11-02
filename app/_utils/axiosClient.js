import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_REST_API_KEY;
const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const apiUrl = `${strapiUrl.replace(/\/$/, "")}/api`;

const axiosClient = axios.create({
  baseURL: apiUrl,
});

if (apiKey) {
  axiosClient.defaults.headers.common["Authorization"] = `Bearer ${apiKey}`;
}

export default axiosClient;
