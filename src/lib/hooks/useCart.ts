import { useEffect } from 'react'
import { atom, useRecoilState, selector, useRecoilValue } from 'recoil'
import { shopify } from 'lib/shopify'
import { getCheckoutId, setCheckoutId } from 'lib/helpers'
import { Cart } from 'lib/Type'

type useCartType = {
  cart: Cart | null
  quantity: number
  changeQuantity: (skuId: string, quantity: string) => void
  removeItem: (productId: string) => void
  addItem: (skuId: string | number) => Promise<void>
  fetchCart: () => void
}

const cartState = atom<Cart | null>({
  key: 'cartStateKey',
  default: null,
})
const quantityState = selector({
  key: 'quantityStateKey',
  get: ({ get }) =>
    get(cartState)?.lineItems.reduce(
      (accumulator, currentValue) => accumulator + currentValue.quantity,
      0
    ) ?? 0,
})

export const useCart = (): useCartType => {
  const [cart, setCart] = useRecoilState(cartState)
  const quantity = useRecoilValue(quantityState)

  const InitializeCart = () => {
    useEffect(() => {
      const checkoutId = getCheckoutId()
      if (checkoutId) return
      shopify.checkout.create().then((cart) => {
        setCart(cart as Cart)
        setCheckoutId(cart.id)
      })
    }, [])
  }

  InitializeCart()

  const changeQuantity = (skuId: string, quantity: string): void => {
    if (!cart) return
    shopify.checkout
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .updateLineItems(cart.id, [{ id: skuId, quantity: parseInt(quantity) }])
      .then((cart: Cart) => {
        setCart(cart as Cart)
      })
  }

  const removeItem = (productId: string): void => {
    if (!cart) return
    shopify.checkout.removeLineItems(cart.id, [productId]).then((cart) => {
      setCart(cart as Cart)
    })
  }

  const addItem = (skuId: string | number): Promise<void> => {
    return shopify.checkout
      .addLineItems(getCheckoutId(), [
        {
          variantId: skuId,
          quantity: 1,
        },
      ])
      .then((cart) => setCart(cart as Cart))
  }

  const fetchCart = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      const checkoutId = getCheckoutId()
      if (!checkoutId) return
      shopify.checkout.fetch(checkoutId).then((cart) => setCart(cart as Cart))
    }, [])
  }

  return {
    cart,
    quantity,
    changeQuantity,
    removeItem,
    addItem,
    fetchCart,
  }
}
