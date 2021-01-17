import React from 'react'
import Link from 'next/link'
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
            <button
              aria-label="このサイトの名前"
              className={styles.siteHeader__logoLink}
            >
              SKPISM
            </button>
          </Link>
          <div className={styles.siteHeader__links}>
            <Link href={'/'} passHref>
              <button aria-label="アイテム一覧を表示する">Items</button>
            </Link>
            <div className={styles.slash}>/</div>
            <Link href={'/world'} passHref>
              <button aria-label="about usを表示する">World</button>
            </Link>
          </div>
          <Link href={'/cart'} passHref>
            <button aria-label="カートを表示する">BAG({quantity})</button>
          </Link>
        </div>
      </ContentWrapper>
    </header>
  )
}

export default Header
