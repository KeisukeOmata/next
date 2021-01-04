import {
  NextPage,
  GetStaticPaths,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from 'next'
import { shopify } from '../../foundations/shopify'
// import { TypeItem } from '../../types/TypeItem'
import { useCart } from '../../hooks/useCart'
import { useRouter } from 'next/router'
import Detail from '../../components/items/Detail'
import { ContentWrapper } from '../../components/layouts/ContentWrapper'
// import styles from '../../styles/pages/items/[id].module.scss'

// detail: TypeItem
// errors?: any
type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: 'blocking',
})

export const getStaticProps = async (context: GetStaticPropsContext) => {
  try {
    const id = context.params?.id
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

const DetailPage: NextPage<Props> = ({ detail, errors }) => {
  const { fetchCart } = useCart()
  fetchCart()
  const router = useRouter()
  if (router.isFallback) {
    return <div>loading...</div>
  }
  if (errors) return <div>error</div>
  return (
    <>
      <ContentWrapper>
        <Detail detail={detail} />
      </ContentWrapper>
    </>
  )
}

export default DetailPage
