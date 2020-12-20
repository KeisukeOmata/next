import React from 'react'
import { NextPage } from 'next'
import CartItems from '../../components/CartItems'
import { useCart } from '../../hooks/useCart'

const Cart: NextPage = () => {
  const { cart, fetchCart } = useCart()
  fetchCart()
  return (
    <>
      <h1>ショッピングカート</h1>
      {cart === null ? <div>loading...</div> : <CartItems />}
    </>
  )
}

export default Cart
