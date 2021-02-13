import { FC, useState } from 'react'
import { useCart } from 'lib/hooks/useCart'
import { Sku } from 'lib/Type'
import s from 'styles/components/items/AddCart.module.css'
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar'

type Props = {
  skuList: Sku[]
}

export const AddCartButton: FC<Props> = ({ skuList }) => {
  // ポップアップメッセージ
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
      <button
        aria-label="カートに追加する"
        className={s.button}
        onClick={() => addToCart(skuList[0].id)}
      >
        BAGに入れる
      </button>
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
    </>
  )
}
