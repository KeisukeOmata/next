import React from 'react'
import Link from 'next/link'
import { Config } from '../../foundations/site.config'
import { useCart } from '../../hooks/useCart'
import { ContentWrapper } from './ContentWrapper'
import styles from '../../styles/components/layouts/SiteHeader.module.scss'

const Header: React.FC = () => {
  const { quantity } = useCart()
  return (
    <header className={styles.siteHeader}>
      <ContentWrapper>
        <div className={styles.siteHeader__inner}>
          <Link href="/" passHref>
            <a className={styles.siteHeader__logoLink}>
              <button>SKPISM</button>
            </a>
          </Link>
          <div className={styles.siteHeader__links}>
            {Config.headerLinks.map((link, i) => {
              // keyを作成
              const key = `header-link-${i}`
              // サイト内リンクの場合
              if (link.href.startsWith('/')) {
                return (
                  <Link key={key} href={link.href} passHref>
                    <a className={styles.siteHeader__link}>{link.title}</a>
                  </Link>
                )
              }
              // サイト外リンクの場合
              return (
                <a
                  key={key}
                  href={link.href}
                  className={styles.siteHeader__link}
                >
                  {link.title}
                </a>
              )
            })}
          </div>
          <Link href={'/cart'} passHref>
            <a>
              <button>BAG({quantity})</button>
            </a>
          </Link>
        </div>
      </ContentWrapper>
    </header>
  )
}

export default Header
