/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CartItems } from 'components/cart/CartItems'
import { PageSEO } from 'components/layouts/PageSEO'
import { ContentWrapper } from 'components/layouts/ContentWrapper'
import { useCart } from 'lib/hooks/useCart'
import { Config } from 'lib/site.config'
import s from 'styles/pages/cart/index.module.scss'

export default function Cart() {
  const { cart, fetchCart } = useCart()
  fetchCart()
  return (
    <>
      <PageSEO title="Cart" path="/cart" ogImageUrl={Config.defaultOGImage} />
      <section className={s.cartCategories}>
        <ContentWrapper>
          {cart === null ? <div>loading...</div> : <CartItems />}
        </ContentWrapper>
      </section>
    </>
  )
}
