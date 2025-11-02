"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ProductApis from "../../_utils/ProductApis";
import ProductBanner from "./_components/ProductBanner";
import ProductInfo from "./_components/ProductInfo";
import ProductList from "../../components/ProductList";
import BreadCrumb from "../../components/BreadCrumb";

function ProductDetails({ params }) {
  const path = usePathname();
  const [productDetails, setProductDetails] = useState(null);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    async function fetchProduct() {
      const { productId } = await params;
      try {
        const res = await ProductApis.getProductById(productId);
        const product = res.data.data;
        console.log("🎯 Product Details:", product);
        setProductDetails(product);
        // ✅ لاحقًا ممكن نعمل تصنيف معين هنا لو فيه category
        getProductListByCategory();
      } catch (err) {
        console.error("❌ Error fetching product:", err);
      }
    }

    fetchProduct();
  }, [params]);

  const getProductListByCategory = async () => {
    try {
      const res = await ProductApis.getLatestProducts();
      setProductList(res.data.data);
    } catch (err) {
      console.error("❌ Error fetching list:", err);
    }
  };

  if (!productDetails)
    return <p className="mt-10 text-center text-gray-500">Loading...</p>;

  return (
    <div className="px-10 py-8 md:px-28">
      <BreadCrumb path={path} />
      <div className="grid justify-around grid-cols-1 gap-5 mt-10 sm:grid-cols-2">
        <ProductBanner product={productDetails} />
        <ProductInfo product={productDetails} />
      </div>

      <div>
        <h2 className="mt-24 mb-4 text-xl font-semibold">Similar Products</h2>
        <ProductList productList={productList} />
      </div>
    </div>
  );
}

export default ProductDetails;



