import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Cart } from '../../types/TypeItem'
import { useCart } from '../../hooks/useCart'
import {
  resetCheckoutId,
  getValueByMatchedNameSelectedOptions,
} from '../../utils/helpers'
// import styles from '../../styles/components/cart/CartItems.module.scss'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import MuiLink from '@material-ui/core/Link'

const CartItems: React.FC = () => {
  const { cart, changeQuantity, removeItem } = useCart()
  // Shopify画面へ遷移
  const moveToShopify = (cart: Cart): void => {
    window.open(cart.webUrl)
    // ローカルストレージのcheckoutIdを削除
    resetCheckoutId()
  }

  return (
    cart && (
      <>
        <Grid container spacing={3}>
          {cart.lineItems.length === 0 ? (
            <div>カートが空です</div>
          ) : (
            <>
              <Grid item xs={12} lg={8}>
                {cart.lineItems.map((item) => (
                  <Grid container spacing={3} key={item.id}>
                    <Grid item xs={3}>
                      <Image
                        src={item.variant.image.src}
                        alt={item.variant.image.altText ?? ''}
                        width={300}
                        height={300}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Link href={`items/${item.variant.product.id}`}>
                        <MuiLink color="inherit">
                          <div>商品名: {item.title}</div>
                          <div>
                            カラー:{' '}
                            {getValueByMatchedNameSelectedOptions(
                              item.variant.selectedOptions,
                              'Color'
                            )}
                          </div>
                          <div>
                            サイズ:{' '}
                            {getValueByMatchedNameSelectedOptions(
                              item.variant.selectedOptions,
                              'Size'
                            )}
                          </div>
                        </MuiLink>
                      </Link>
                    </Grid>
                    <Grid item xs={3}>
                      <span>
                        ${parseInt(item.variant.price) * item.quantity}
                      </span>
                      <select
                        defaultValue={item.quantity}
                        onChange={(e) =>
                          changeQuantity(item.id, e.target.value)
                        }
                      >
                        {[...Array(5).keys()].map((number) => {
                          const value = number + 1
                          return (
                            <option key={value} value={value}>
                              {value}
                            </option>
                          )
                        })}
                      </select>
                    </Grid>
                    <Grid item xs={2}>
                      <MuiLink
                        component="button"
                        variant="body2"
                        onClick={() => removeItem(item.id)}
                      >
                        削除
                      </MuiLink>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
              <Grid item xs={12} lg={4}>
                <div>合計: ${cart.subtotalPrice}(税抜)</div>
                <Link href={`/`}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => moveToShopify(cart)}
                  >
                    購入する
                  </Button>
                </Link>
              </Grid>
            </>
          )}
        </Grid>
      </>
    )
  )
}

export default CartItems
