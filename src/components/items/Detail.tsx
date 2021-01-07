import React from 'react'
import { TypeItem, Sku } from '../../types/TypeItem'
import Image from 'next/image'
import AddCart from './AddCart'
import styles from '../../styles/components/items/Detail.module.scss'

type Props = {
  detail: TypeItem
}

const Detail: React.FC<Props> = ({ detail }) => {
  return (
    <>
      <h1>Detail</h1>
      <div className={styles.items}>
        <div className={styles.item}>
          <Image
            src={detail.images[0].src}
            alt={detail.title}
            width={500}
            height={500}
          />
        </div>
        <div className={styles.item}>
          <div>Brand: {detail.vendor}</div>
          <div>{detail.title}</div>
          <div>Price: ${detail.variants[0].price}</div>
          <div className={styles.item__description}>
            商品情報
            <br />
            {detail.description}
          </div>
          <div className={styles.item__addCart}>
            <AddCart skuList={detail.variants as Sku[]} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Detail
