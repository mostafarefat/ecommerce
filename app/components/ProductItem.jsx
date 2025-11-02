import React from 'react'
import Image from 'next/image'
import { List } from 'lucide-react'
import Link from 'next/link'

function ProductItem({ product }) {
  const attrs = product?.attributes || product
  const bannerUrl = attrs?.banner?.data?.attributes?.url || attrs?.banner?.url
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
  const imageUrl = bannerUrl ? (bannerUrl.startsWith('http') ? bannerUrl : `${baseUrl}${bannerUrl}`) : '/placeholder.png'

  return (
    <Link
      href={`/product-details/${product?.documentId || product?.id}`}
      className='p-1 border-teal-400 rounded-lg hover:border hover:shadow-md hover:cursor-pointer'
    >
      <Image
        src={imageUrl}
        alt={attrs?.title || 'banner-card'}
        width={400}
        height={350}
        className='rounded-t-lg h-[170px] object-cover'
      />

      <div className='flex items-center justify-between p-3 rounded-b-lg bg-gray-50'>
        <div>
          <h2 className='text-[12px] font-medium line-clamp-1'>
            {attrs?.title}
          </h2>
          <h2 className='text-[10px] text-gray-400 flex gap-1 items-center'>
            <List className='w-4 h-4' /> {attrs?.category || 'General'}
          </h2>
        </div>
        <h2>{attrs?.price}$</h2>
      </div>
    </Link>
  )
}

export default ProductItem 
