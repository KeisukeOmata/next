import Head from 'next/head'
import Link from 'next/link'

export default function Layout({ children }) {
  const title = 'question'
  const description = 'question service'
  // twitter共有用の画像
  const ogpImageUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/images/card.png`

  return (
    <div>
      <Head>
        <title>{title}</title>
        {/* twitter共有用のmetaタグ */}
        <meta property="og:image" key="ogImage" content={ogpImageUrl} />
        <meta name="twitter:card" key="twitterCard" content="summary" />
        <meta name="twitter:image" key="twitterImage" content={ogpImageUrl} />
        <meta name="description" key="description" content={description} />
        <meta property="og:title" key="ogTItle" content={title} />
        <meta property="og:site_name" key="ogSiteName" content={title} />
        <meta
          property="og:description"
          // keyを指定することで、別のページから上書きできる
          key="ogDescription"
          content={description}
        />
        {/* Material IconsのCSS読み込み */}
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        ></link>
      </Head>
      <div className="wrapper">
        <nav
          className="navbar navbar-expand-lg navbar-light mb-3"
          style={{ backgroundColor: '#e3f2fd' }}
        >
          {/* Bootstrapをあてる箇所をcontainerで囲む */}
          <div className="container">
            <div className="mr-auto">
              <a className="navbar-brand" href="#">
                Navbar
              </a>
            </div>
            <form className="d-flex">
              <button className="btn btn-outline-primary" type="submit">
                Search
              </button>
            </form>
          </div>
        </nav>
        <div className="container">{children}</div>
        {/* footer */}
        <footer className="footer mt-auto text-center py-3 bg-light">
          <div className="container">
            <div>
              <Link href="/terms-of-service">
                <a className="d-inline-block mx-1">利用規約</a>
              </Link>
              <Link href="/privacy-policy">
                <a className="d-inline-block mx-1">プライバシーポリシー</a>
              </Link>
            </div>
            <span className="text-muted">
              Created by{' '}
              <a href="https://twitter.com/mete0la" className="link-info">
                @mete0la
              </a>
            </span>
          </div>
        </footer>
        <nav className="navbar fixed-bottom navbar-light bg-light">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center w-100">
              <i className="material-icons">menu</i>
              <Link href="/questions/received">
                <a>
                  <i className="material-icons">home</i>
                </a>
              </Link>
              <Link href="/users/me">
                <a>
                  <i className="material-icons">person</i>
                </a>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}