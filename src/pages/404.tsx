import React from 'react'
import styles from '../styles/pages/404.module.scss'
import { NextPage } from 'next'
import Link from 'next/link'
import { ContentWrapper } from '../components/layouts/ContentWrapper'
import { PageSEO } from '../components/layouts/PageSEO'

const Custom404: NextPage = () => {
  return (
    <>
      <PageSEO title="404 not found" noindex={true} />
      <div className={styles.error}>
        <ContentWrapper>
          <p className={styles.error__status}>404</p>
          <h1 className={styles.error__message}>Page not found...</h1>
          <nav className={styles.error__actions}>
            <Link href="/" passHref>
              <button aria-label="Topページに戻る" className={styles.button}>
                Topへ
              </button>
            </Link>
          </nav>
        </ContentWrapper>
      </div>
    </>
  )
}

export default Custom404
