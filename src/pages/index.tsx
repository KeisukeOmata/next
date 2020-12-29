import React from 'react'
import { NextPage } from 'next'
import { GetStaticProps } from 'next'
import { TypeItem } from '../types/TypeItem'
import Items from '../components/items/Items'
import { ContentWrapper } from '../components/layouts/ContentWrapper'
import { useCart } from '../hooks/useCart'
import { shopify } from '../foundations/shopify'
// import styles from '../styles/pages/index.module.scss'

type Props = {
  items: TypeItem[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const items = await shopify.product.fetchAll()
  return {
    props: {
      items: JSON.parse(JSON.stringify(items)),
    },
    revalidate: 14400,
  }
}

const Home: NextPage<Props> = ({ items }) => {
  const { fetchCart } = useCart()
  fetchCart()
  return (
    <>
      <section>
        <ContentWrapper>
          <Items items={items} />
        </ContentWrapper>
      </section>
    </>
  )
}

export default Home
