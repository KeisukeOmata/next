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
            <a className={styles.siteHeader__logoLink}>
              <button>SKPISM</button>
            </a>
          </Link>
          <div className={styles.siteHeader__links}>
            <Link href={'/'} passHref>
              <a>
                <button>Items</button>
              </a>
            </Link>
            <div className={styles.slash}>/</div>
            <Link href={'/world'} passHref>
              <a>
                <button>World</button>
              </a>
            </Link>
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
