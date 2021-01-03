import React from 'react'
import { NextPage } from 'next'
import CartItems from '../../components/cart/CartItems'
import { ContentWrapper } from '../../components/layouts/ContentWrapper'
import { useCart } from '../../hooks/useCart'

const Cart: NextPage = () => {
  const { cart, fetchCart } = useCart()
  fetchCart()
  return (
    <>
      <ContentWrapper>
        <h1>BAG</h1>
        {cart === null ? <div>loading...</div> : <CartItems />}
      </ContentWrapper>
    </>
  )
}

export default Cart
