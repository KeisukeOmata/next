import React from 'react'
import { useState } from 'react'
import { useCart } from '../../hooks/useCart'
import { Sku } from '../../types/TypeItem'
// import styles from '../../styles/components/items/AddCart.module.scss'
import Button from '@material-ui/core/Button'
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

type Props = {
  skuList: Sku[]
}

const AddCart: React.FC<Props> = ({ skuList }) => {
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
      {console.log(skuList)}
      <Button
        variant="contained"
        color="primary"
        onClick={() => addToCart(skuList[0].id)}
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
      >
        <Alert elevation={6} variant="filled" severity="success">
          BAGに商品が追加されました
        </Alert>
      </Snackbar>
    </>
  )
}

export default AddCart
