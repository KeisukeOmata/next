import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { TypeItem } from '../../types/TypeItem'
import styles from '../../styles/components/items/Items.module.scss'

const Item: React.FC<{ item: TypeItem }> = ({ item }) => {
  return (
    <div className={styles.item}>
      <Link key={`items-${item.id}`} href={`items/${item.id}`} passHref>
        <a className={styles.item__mainLink}>
          <Image
            src={item.images[0].src}
            alt={item.title}
            quality={100}
            width={500}
            height={500}
          />
          <div className={styles.item__date}>
            <div>{item.title}</div>
            <div>{item.variants[0].price}</div>
          </div>
        </a>
      </Link>
    </div>
  )
}

const Items: React.FC<{ items: TypeItem[] }> = ({ items }) => {
  return (
    <div className={styles.items}>
      {items.map((item, i) => (
        <Item key={`post-item-${i}`} item={item} />
      ))}
    </div>
  )
}

export default Items
