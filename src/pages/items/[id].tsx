import { GetStaticProps, GetStaticPaths } from 'next'
import { NextPage } from 'next'
import { shopify } from '../../foundations/shopify'
import { TypeItem } from '../../types/TypeItem'
import { useRouter } from 'next/router'
import Detail from '../../components/Detail'
// import styles from '../../styles/pages/items/[id].module.scss'

type Props = {
  detail: TypeItem
  errors?: any
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
})

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = params?.id
    if (!id) throw new Error('idが取得できません')
    const detail = await shopify.product.fetch(id as string)
    return {
      props: { detail: JSON.parse(JSON.stringify(detail)) },
      revalidate: 1,
    }
  } catch (err) {
    return { props: { errors: err.message } }
  }
}

const DetailPage: NextPage<Props> = ({ detail, errors }) => {
  const router = useRouter()
  if (router.isFallback) {
    return <div>loading...</div>
  }
  if (errors) return <div>error</div>
  return (
    <>
      <Detail detail={detail} />
    </>
  )
}

export default DetailPage
