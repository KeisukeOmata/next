import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { TypeItem } from '../../types/TypeItem'
import styles from '../../styles/components/items/Items.module.scss'

const Items: React.FC<{ item: TypeItem }> = ({ item }) => {
  const { id, images, title, variants } = item

  return (
    <>
      <div className={styles.item}>
        <Link key={`items-${id}`} href={`items/${id}`} passHref>
          <a className={styles.item__mainLink}>
            <Image
              src={images[0].src}
              alt={title || 'Item Image'}
              width={500}
              height={500}
              quality="85"
              // 遅延読み込みしない
              loading={'eager'}
            />
            <div className={styles.item__date}>
              <div>{title}</div>
              <div>¥{variants[0].price}</div>
            </div>
          </a>
        </Link>
      </div>
    </>
  )
}

export default Items
