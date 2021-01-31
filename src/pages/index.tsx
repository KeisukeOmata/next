/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { InferGetStaticPropsType } from 'next'
import { PageSEO } from 'components/layouts/PageSEO'
import {
  ContentWrapper,
  UndoWrapForScroll,
} from 'components/layouts/ContentWrapper'
import ScrollableCategories from 'components/items/ScrollableCategories'
import { useCart } from 'hooks/useCart'
import { shopify } from 'foundations/shopify'
import { Config } from 'foundations/site.config'
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
        title={Config.siteMeta.title}
        description={Config.siteMeta.description}
        path="/"
        removeSiteNameFromTitle={true}
      />
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
