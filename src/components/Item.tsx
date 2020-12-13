import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { TypeItem } from '../types/TypeItem'
// import styles from '../styles/components/Item.module.scss'

type Props = {
  item: TypeItem
}

const itemCard: React.FC<Props> = ({ item }) => {
  console.log({ item })
  return (
    <>
      <Link key={`items-${item.id}`} href={`items/${item.id}`} passHref>
        <a>
          <Image
            src={item.images[0].src}
            alt={item.title}
            quality={100}
            width={500}
            height={500}
          />
          <div>
            <div>{item.vendor}</div>
            <div>{item.title}</div>
            <div>{item.variants[0].price}</div>
          </div>
        </a>
      </Link>
    </>
  )
}

export default itemCard
