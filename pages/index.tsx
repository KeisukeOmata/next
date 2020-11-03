// 任意のURLにアクセス
import Link from 'next/link'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout>
      <div className="text-center">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6">
            <h1>My質問サービス</h1>
            <p>ここは質問をしたり回答できるサービスです。</p>
            <Link href="/users/me">
              <a className="btn btn-primary" role="button">
                質問をしてもらう！
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}