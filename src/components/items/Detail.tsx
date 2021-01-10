import React from 'react'
import { TypeItem, Sku } from '../../types/TypeItem'
import Image from 'next/image'
import Slider from './Slider'
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
          <div className={styles.item__left}>
            <Slider>
              {detail.images.map((image, i) => (
                <div key={image.src}>
                  <Image
                    src={image.src}
                    alt={detail.title || 'Product Image'}
                    width={500}
                    height={500}
                    priority={i === 0}
                    quality="85"
                    // 遅延読み込みしない
                    loading={'eager'}
                  />
                </div>
              ))}
            </Slider>
          </div>
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
          <AddCart skuList={detail.variants as Sku[]} />
        </div>
      </div>
    </>
  )
}

export default Detail
