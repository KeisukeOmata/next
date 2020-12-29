import React from 'react'
import { NextPage } from 'next'
import { useCart } from '../hooks/useCart'
// import styles from '../styles/pages/world.module.scss'

const World: NextPage = () => {
  const { fetchCart } = useCart()
  fetchCart()
  return (
    <>
      <h1 className="title">WORLD</h1>
    </>
  )
}

export default World
