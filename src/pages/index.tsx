import React from 'react'
// import styles from '../styles/pages/index.module.scss'
import { GetServerSideProps } from 'next'
import { Product } from '../types/Product'
import SearchResult from '../components/SearchResult'
import { client } from '../foundations/client'

type Props = {
  products: Product[]
}

const ProductListPage: React.FC<Props> = ({ products }) => {
  return <SearchResult products={products} />
}

export const getServerSideProps: GetServerSideProps = async () => {
  const products: Product[] = await client.product.fetchAll()
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  }
}

export default ProductListPage
