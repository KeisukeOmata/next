/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { InferGetStaticPropsType, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { ItemDetail } from 'components/items'
import { ContentWrapper, PageSEO } from 'components/layouts'
import { shopify } from 'lib/shopify'
import { useCart } from 'lib/hooks/useCart'
import { getItemPath } from 'lib/helpers'
import s from 'styles/pages/items/[id].module.scss'

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  try {
    const id = params?.id
    if (!id) throw new Error('idが取得できません')
    const detail = await shopify.product.fetch(id as string)
    return {
      props: { detail: JSON.parse(JSON.stringify(detail)) },
      revalidate: 200,
    }
  } catch (err) {
    return { props: { errors: err.message } }
  }
}

export default function DetailPage({
  detail,
  errors,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { fetchCart } = useCart()
  fetchCart()
  const router = useRouter()
  if (router.isFallback) {
    return <div>loading...</div>
  }
  if (errors) return <div>error</div>
  return (
    <>
      <PageSEO
        title={detail.title}
        path={getItemPath(detail.id)}
        description={detail.description}
        ogImageUrl={detail.images[0].src}
      />
      <section className={s.itemCategories}>
        <ContentWrapper>
          <ItemDetail detail={detail} />
        </ContentWrapper>
      </section>
    </>
  )
}
