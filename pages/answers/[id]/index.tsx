import Layout from '../../../components/Layout'
import Head from 'next/head'
import { Props } from '../../../types/Props'
import { Answer } from '../../../types/Answer'
import TwitterShareButton from '../../../components/TwitterShareButton'

// 必ずサーバサイドで呼ばれる
// APIを取得
export async function getServerSideProps({ query }) {
  const res = await fetch(process.env.API_URL + `/api/answers/${query.id}`)
  const json = await res.json()
  // 取得した値をpropsとして返す
  return { props: json }
}

// metaタグに指定するdescriptionを作成
function getDescription(answer: Answer) {
  const body = answer.body.trim().replace(/[ \r\n]/g, '')
  if (body.length < 140) {
    return body
  }
  return body.substring(0, 140) + '...'
}

// 取得したAPIからページを作成
export default function AnswersShow(props: Props) {
  // metaタグに指定するdescriptionを作成する
  const description = getDescription(props.answer)
  // Twitterシェア用のmetaタグに設定するURL
  // 環境変数から取得する(httpから始まる必要がある)
  const ogpImageUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/api/answers/${props.answer.id}/ogp`

  return (
    <Layout>
      <Head>
        {/* Twitterシェア用のmetaタグ */}
        <meta property="og:image" key="ogImage" content={ogpImageUrl} />
        <meta name="twitter:card" key="twitterCard" content="summary_large_image" />
        <meta name="twitter:image" key="twitterImage" content={ogpImageUrl} />
        <meta name="description" key="description" content={description} />
        <meta
          property="og:description"
          key="ogDescription"
          content={description}
        />
      </Head>
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <>
            <div className="card">
              <div className="card-body">{props.question.body}</div>
            </div>
            <section className="text-center mt-4">
              <h2 className="h4">回答</h2>
              <div className="card">
                <div className="card-body text-left">{props.answer.body}</div>
              </div>
            </section>
            <div className="my-3 d-flex justify-content-center">
              <TwitterShareButton
                url={`${process.env.NEXT_PUBLIC_WEB_URL}/answers/${props.answer.id}`}
                text={props.answer.body}
              ></TwitterShareButton>
            </div>
          </>
        </div>
      </div>
    </Layout>
  )
}
