import Image from 'next/image'
import React, { FC } from 'react'
import { toast } from 'react-toastify'
import { Button, Slider, Toast } from 'components/ui'
import { TypeItem } from 'lib/Type'
import { useCart } from 'lib/hooks/useCart'
import s from './ItemDetail.module.scss'

type Props = {
  detail: TypeItem
}

export const ItemDetail: FC<Props> = ({ detail }) => {
  const { addItem } = useCart()
  const addToCart = async (skuId: string | number) => {
    await addItem(skuId)
    // Show toast
    toast('BAGに追加しました')
  }

  return (
    <>
      <Toast />
      <div className={s.itemSectionTitleContainer}>
        <h2>{detail.title}</h2>
      </div>
      <div className={s.items}>
        <div className={s.item}>
          <div className={s.item__left}>
            <Slider>
              {detail.images.map((image, i) => (
                <div key={image.src}>
                  <Image
                    src={image.src}
                    alt={detail.title || 'Item Image'}
                    width={500}
                    height={500}
                    priority={i === 0}
                    quality="85"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className={s.item}>
          <p>{detail.vendor}</p>
          <p>{detail.title}</p>
          <p>¥{detail.variants[0].price}</p>
          <br />
          <article
            className={s.item__description}
            dangerouslySetInnerHTML={{
              __html: `${detail.descriptionHtml}`,
            }}
          />
          <Button
            type="button"
            aria-label="BAGに入れる"
            onClick={() => addToCart(detail.variants[0].id)}
          >
            BAGに入れる
          </Button>
        </div>
      </div>
    </>
  )
}
