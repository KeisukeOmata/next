import React from 'react'
import Link from 'next/link'
import { Config } from '../../foundations/site.config'
// import { useCart } from '../../hooks/useCart'
import { ContentWrapper } from './ContentWrapper'
import styles from '../../styles/components/layouts/SiteHeader.module.scss'

const Header: React.FC = () => {
  // const { quantity } = useCart()
  return (
    <header className={styles.siteHeader}>
      <ContentWrapper>
        <div className={styles.siteHeader__inner}>
          <Link href="/" passHref>
            <a className={styles.siteHeader__logoLink}>
              <img
                src="/logo.svg"
                // スクリーンリーダーでWebページを読む人のためにimgのalt属性を指定する
                // 不要な画像にも alt="" を設定する
                // SVGの場合はaria-label属性を指定、画像として使う場合は role="img" を指定
                // SVGをボタンとして使う場合はbuttonタグで囲い、aria-label属性もbuttonで指定
                // <button><svg role="img" aria-label="説明"></svg></button>
                alt={Config.siteMeta.title}
                className={styles.siteHeader__logoImg}
              />
            </a>
          </Link>
          <Link href={'/cart'} passHref>
            <a className={styles.siteHeader__logoLink}>
              <img
                src="/bag.svg"
                // スクリーンリーダーでWebページを読む人のためにimgのalt属性を指定する
                // 不要な画像にも alt="" を設定する
                // SVGの場合はaria-label属性を指定、画像として使う場合は role="img" を指定
                // SVGをボタンとして使う場合はbuttonタグで囲い、aria-label属性もbuttonで指定
                // <button><svg role="img" aria-label="説明"></svg></button>
                alt="cart"
                className={styles.siteHeader__logoImg}
              />
            </a>
            {/* {quantity} */}
          </Link>
        </div>
      </ContentWrapper>
    </header>
  )
}

export default Header
