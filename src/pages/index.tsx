import React from 'react'
// import styles from '../styles/pages/index.module.scss'
import { NextPage } from 'next'
import { GetStaticProps } from 'next'
import { Product } from '../types/Product'
import SearchResult from '../components/SearchResult'
import { client } from '../foundations/client'

type Props = {
  products: Product[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const products = await client.product.fetchAll()
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
    revalidate: 1,
  }
}

const Home: NextPage<Props> = ({ products }) => {
  return (
    <>
      <SearchResult products={products} />
    </>
  )
}

export default Home
