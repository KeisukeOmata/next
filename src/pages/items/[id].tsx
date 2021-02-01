/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { InferGetStaticPropsType, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import Detail from 'components/items/Detail'
import { ContentWrapper } from 'components/layouts/ContentWrapper'
import { PageSEO } from 'components/layouts/PageSEO'
import { shopify } from 'foundations/shopify'
import { useCart } from 'hooks/useCart'
import { getItemPath } from 'utils/helpers'
import s from 'styles/pages/items/[id].module.scss'

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
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
      <PageSEO title={detail.title} path={getItemPath(detail.id)} />
      <section className={s.itemCategories}>
        <ContentWrapper>
          <Detail detail={detail} />
        </ContentWrapper>
      </section>
    </>
  )
}
