import Link from 'next/link'
import { FC } from 'react'
import { ContentWrapper } from 'components/layouts/ContentWrapper'
import { DarkMode } from 'components/ui/DarkMode'
import { useCart } from 'lib/hooks/useCart'
import s from 'styles/components/layouts/SiteHeader.module.scss'

export const SiteHeader: FC = () => {
  const { quantity } = useCart()
  return (
    <header className={s.siteHeader}>
      <ContentWrapper>
        <div className={s.siteHeader__inner}>
          <Link href="/" passHref>
            <button
              aria-label="このサイトの名前"
              className={s.siteHeader__logoLink}
            >
              Brand
            </button>
          </Link>
          <div className={s.siteHeader__links}>
            <Link href={'/'} passHref>
              <button aria-label="アイテム一覧を表示する">Items</button>
            </Link>
            <div className={s.slash}>/</div>
            <Link href={'/world'} passHref>
              <button aria-label="about usを表示する">World</button>
            </Link>
            <div className={s.slash}>/</div>
            <DarkMode />
          </div>
          <Link href={'/cart'} passHref>
            <button aria-label="カートを表示する">BAG({quantity})</button>
          </Link>
        </div>
      </ContentWrapper>
    </header>
  )
}
