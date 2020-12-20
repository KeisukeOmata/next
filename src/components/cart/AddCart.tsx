import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import { useCart } from '../../hooks/useCart'
import { Sku, Option } from '../../types/TypeItem'
import styles from '../../styles/components/cart/AddCart.module.scss'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

type Props = {
  colors: Option
  skuList: Sku[]
}

const AddCart: React.FC<Props> = ({ colors, skuList }) => {
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
      {colors.values.map((color) => {
        const filterByColor = skuList.filter((sku) => {
          const colorOption = sku.selectedOptions.find(
            (option) => option.name === 'Color'
          )
          return color.value === colorOption?.value
        })
        return (
          <div key={color.value} className={styles.color}>
            <div>{color.value}</div>
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <Image
                  src={filterByColor[0].image.src}
                  alt={filterByColor[0].image.altText ?? ''}
                  width={100}
                  height={100}
                />
              </Grid>
              <Grid item xs={9}>
                {filterByColor.map((sku) => (
                  <div key={sku.id} className={styles.buttonWrapper}>
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                    >
                      <Grid item xs={6}>
                        <span>{sku.title}</span>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => addToCart(sku.id)}
                        >
                          カートに入れる
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                ))}
              </Grid>
            </Grid>
          </div>
        )
      })}
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={toastClose}
        key={vertical + horizontal}
      >
        <Alert elevation={6} variant="filled" severity="success">
          カートに商品が追加されました
        </Alert>
      </Snackbar>
    </>
  )
}

export default AddCart
