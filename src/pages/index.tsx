/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react'
import { InferGetStaticPropsType } from 'next'
// import { TypeItem } from '../types/TypeItem'
import Items from '../components/items/Items'
import { ContentWrapper } from '../components/layouts/ContentWrapper'
import { useCart } from '../hooks/useCart'
import { shopify } from '../foundations/shopify'
// import styles from '../styles/pages/index.module.scss'

// items: TypeItem[]
// type Props = InferGetStaticPropsType<typeof getStaticProps>

export async function getStaticProps() {
  const items = await shopify.product.fetchAll()
  return {
    props: {
      items: JSON.parse(JSON.stringify(items)),
    },
    revalidate: 14400,
  }
}

export default function Home({
  items,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { fetchCart } = useCart()
  fetchCart()
  return (
    <>
      <ContentWrapper>
        <Items items={items} />
      </ContentWrapper>
    </>
  )
}
