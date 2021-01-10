import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Cart } from '../../types/TypeItem'
import { useCart } from '../../hooks/useCart'
import {
  resetCheckoutId,
  getValueByMatchedNameSelectedOptions,
} from '../../utils/helpers'
import s from '../../styles/components/cart/CartItems.module.scss'

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
        {cart.lineItems.length === 0 ? (
          <div>BAGが空です</div>
        ) : (
          <>
            <h1>BAG</h1>
            {cart.lineItems.map((item) => (
              <div className={s.items} key={item.id}>
                <div className={s.item}>
                  <Link href={`items/${item.variant.product.id}`}>
                    <a>
                      <Image
                        src={item.variant.image.src}
                        alt={item.variant.image.altText ?? ''}
                        width={500}
                        height={500}
                      />
                    </a>
                  </Link>
                </div>
                <div className={s.item}>
                  <div className={s.item__detail}>
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
                  </div>
                  <div className={s.item__detail}>
                    <span>${parseInt(item.variant.price) * item.quantity}</span>
                  </div>
                  <div className={s.item__detail}>
                    <select
                      defaultValue={item.quantity}
                      onChange={(e) => changeQuantity(item.id, e.target.value)}
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
                  </div>
                  <div className={s.item__detail}>
                    <button onClick={() => removeItem(item.id)}>削除</button>
                  </div>
                </div>
              </div>
            ))}
            <div className={s.item}>
              <div className={s.item__price}>
                合計: ${cart.subtotalPrice}(税抜)
              </div>
            </div>
            <div className={s.item}>
              <Link href={`/`}>
                <button
                  className={s.button}
                  onClick={() => moveToShopify(cart)}
                >
                  購入する
                </button>
              </Link>
            </div>
          </>
        )}
      </>
    )
  )
}

export default CartItems
