import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { TypeItem } from '../../types/TypeItem'
import styles from '../../styles/components/items/Items.module.scss'

const Item: React.FC<{ item: TypeItem }> = (props) => {
  const { id, images, title, variants } = props.item
  return (
    <div className={styles.item}>
      <Link key={`items-${id}`} href={`items/${id}`} passHref>
        <a className={styles.item__mainLink}>
          <Image
            src={images[0].src}
            alt={title}
            quality={100}
            width={500}
            height={500}
          />
          <div className={styles.item__date}>
            <div>{title}</div>
            <div>{variants[0].price}</div>
          </div>
        </a>
      </Link>
    </div>
  )
}

const Items: React.FC<{ items: TypeItem[] }> = ({ items }) => {
  return (
    <>
      <h1>Items</h1>
      <div className={styles.items}>
        {items.map((item, i) => (
          <Item key={`post-item-${i}`} item={item} />
        ))}
      </div>
    </>
  )
}

export default Items
