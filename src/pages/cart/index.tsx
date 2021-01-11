/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react'
import CartItems from '../../components/cart/CartItems'
import { ContentWrapper } from '../../components/layouts/ContentWrapper'
import { useCart } from '../../hooks/useCart'
import s from '../../styles/pages/cart/index.module.scss'

export default function Cart() {
  const { cart, fetchCart } = useCart()
  fetchCart()
  return (
    <>
      <section className={s.cartCategories}>
        <ContentWrapper>
          {cart === null ? <div>loading...</div> : <CartItems />}
        </ContentWrapper>
      </section>
    </>
  )
}
