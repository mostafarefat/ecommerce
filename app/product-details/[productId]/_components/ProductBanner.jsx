import Image from "next/image";
import React from "react";

function ProductBanner({ product }) {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  const imageUrl = product?.banner?.url
    ? `${baseUrl}${product.banner.url}`
    : "/placeholder.png";

  return (
    <div>
      <Image
        src={imageUrl}
        alt={product?.title || "product image"}
        width={400}
        height={400}
        className="rounded-lg"
      />
    </div>
  );
}

export default ProductBanner;
