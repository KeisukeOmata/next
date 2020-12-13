import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '../types/Product'

type Props = {
  product: Product
}

const ProductCard: React.FC<Props> = ({ product }) => {
  console.log({ product })
  return (
    <>
      <Link href={`items/${product.id}`}>
        <a>
          <Image
            src={product.images[0].src}
            alt={product.title}
            width={500}
            height={500}
          />
          <div>
            <div>{product.vendor}</div>
            <div>{product.title}</div>
            <div>{product.variants[0].price}</div>
          </div>
        </a>
      </Link>
    </>
  )
}

export default ProductCard
