/* eslint-disable jsx-a11y/no-onchange */
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { useCart } from 'hooks/useCart'
import { resetCheckoutId } from 'utils/helpers'
import { Cart } from 'types/TypeItem'
import s from 'styles/components/cart/CartItems.module.scss'

const CartItems: FC = () => {
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
          <div className={s.cartSectionTitleContainer}>
            <h2>BAGが空です</h2>
          </div>
        ) : (
          <>
            <div className={s.cartSectionTitleContainer}>
              <h2>BAG</h2>
            </div>
            {cart.lineItems.map((item) => (
              <div className={s.items} key={item.id}>
                <div className={s.item}>
                  <Link href={`/items/${item.variant.product.id}`}>
                    <button aria-label={`${item.title}のページを表示する`}>
                      <Image
                        src={item.variant.image.src}
                        alt={item.variant.image.altText || 'Item Image'}
                        width={500}
                        height={500}
                        quality="85"
                        // 遅延読み込みしない
                        loading={'eager'}
                      />
                    </button>
                  </Link>
                </div>
                <div className={s.item}>
                  <div className={s.item__detail}>
                    <p>{item.title}</p>
                    {/* <div>
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
                    </div> */}
                  </div>
                  <div className={s.item__detail}>
                    <p>¥{item.variant.price}</p>
                  </div>
                  <div className={s.item__detail}>
                    個数：
                    <select
                      defaultValue={item.quantity}
                      onChange={(e) => changeQuantity(item.id, e.target.value)}
                    >
                      {[...Array(10).keys()].map((number) => {
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
                    <p>
                      小計： ¥{parseInt(item.variant.price) * item.quantity}
                    </p>
                  </div>
                  <br></br>
                  <div className={s.item__detail}>
                    <button
                      aria-label="カートから商品を削除する"
                      className={s.button2}
                      onClick={() => removeItem(item.id)}
                    >
                      削除
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className={s.item}>
              <p className={s.item__price}>合計: ¥{cart.subtotalPrice}</p>
            </div>
            <div className={s.item}>
              <Link href={`/`}>
                <button
                  aria-label="お会計に進む"
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
