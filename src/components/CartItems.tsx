import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import MuiLink from '@material-ui/core/Link'
import { useCart } from '../hooks/useCart'
import { getValueByMatchedNameSelectedOptions } from '../utils/helpers'

const CartItems: React.FC = () => {
  const { cart, changeQuantity, removeItem } = useCart()
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
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => window.open(cart.webUrl)}
                >
                  購入する
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </>
    )
  )
}

export default CartItems
