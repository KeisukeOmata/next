import Image from 'next/image'
import { FC, useState } from 'react'
import { Button, Slider } from 'components/ui'
import { TypeItem } from 'lib/Type'
import { useCart } from 'lib/hooks/useCart'
import s from './ItemDetail.module.scss'
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar'

type Props = {
  detail: TypeItem
}

export const ItemDetail: FC<Props> = ({ detail }) => {
  type ToastState = {
    open: boolean
  } & SnackbarOrigin
  const [toastState, setToastState] = useState<ToastState>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  })
  const { vertical, horizontal, open } = toastState
  const toastClose = () => {
    setToastState({ ...toastState, open: false })
  }
  // カートに追加
  const { addItem } = useCart()
  const addToCart = async (skuId: string | number) => {
    await addItem(skuId)
    setToastState({ ...toastState, open: true })
  }

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
          <Button
            type="button"
            aria-label="BAGに入れる"
            onClick={() => addToCart(detail.variants[0].id)}
          >
            BAGに入れる
          </Button>
          <Snackbar
            autoHideDuration={2000}
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={toastClose}
            key={vertical + horizontal}
            // クリックするとSnackbarが消えなくなる問題を修正
            onClick={toastClose}
            message="BAGに商品が追加されました"
          ></Snackbar>
        </div>
      </div>
    </>
  )
}
