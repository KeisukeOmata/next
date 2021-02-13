import Image from 'next/image'
import { FC } from 'react'
import { AddCartButton } from 'components/ui/AddCartButton'
import { Slider } from 'components/ui/Slider'
import { TypeItem, Sku } from 'lib/Type'
import s from 'styles/components/items/Detail.module.scss'

type Props = {
  detail: TypeItem
}

export const ItemDetail: FC<Props> = ({ detail }) => {
  return (
    <>
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
          <AddCartButton skuList={detail.variants as Sku[]} />
        </div>
      </div>
    </>
  )
}
