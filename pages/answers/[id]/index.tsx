import Layout from '../../../components/Layout'
import Head from 'next/head'
import { Props } from '../../../types/Props'
import { Answer } from '../../../types/Answer'

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

  return (
    <Layout>
      <Head>
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
          </>
        </div>
      </div>
    </Layout>
  )
}
