/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react'
import { InferGetStaticPropsType } from 'next'
// import { TypeItem } from '../types/TypeItem'
import {
  ContentWrapper,
  UndoWrapForScroll,
} from '../components/layouts/ContentWrapper'
import ScrollableCategories from '../components/items/ScrollableCategories'
import { useCart } from '../hooks/useCart'
import { shopify } from '../foundations/shopify'
import s from '../styles/pages/index.module.scss'

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
      <section className={s.homeCategories}>
        <ContentWrapper>
          <div className={s.homeSectionTitleContainer}>
            <h2 className={s.homeSectionTitle}>Items</h2>
          </div>
          <div className={s.homeCategoriesContainer}>
            <UndoWrapForScroll>
              <ScrollableCategories items={items} />
            </UndoWrapForScroll>
          </div>
        </ContentWrapper>
      </section>
    </>
  )
}
