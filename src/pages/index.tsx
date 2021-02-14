/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { InferGetStaticPropsType } from 'next'
import { PageSEO } from 'components/layouts/PageSEO'
import {
  ContentWrapper,
  UndoWrapForScroll,
} from 'components/layouts/ContentWrapper'
import { ScrollableCategories } from 'components/items/ScrollableCategories'
import { ItemsByCategory } from 'components/items/ItemsByCategory'
import { useCart } from 'lib/hooks/useCart'
import { shopify } from 'lib/shopify'
import { Config } from 'lib/site.config'
import s from 'styles/pages/index.module.scss'

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
      <PageSEO
        title={Config.title}
        description={Config.description}
        path="/"
        ogImageUrl="/brand1.webp"
      />
      <section className={s.homeCategories}>
        <ContentWrapper>
          <div className={s.homeSectionTitleContainer}>
            <h2 className={s.homeSectionTitle}>Items</h2>
          </div>
          <div className={s.homeCategoriesContainer}>
            <UndoWrapForScroll>
              <ScrollableCategories />
            </UndoWrapForScroll>
          </div>
          <ItemsByCategory items={items} />
        </ContentWrapper>
      </section>
    </>
  )
}
