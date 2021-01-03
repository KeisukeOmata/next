import React from 'react'
import { NextPage } from 'next'
import Image from 'next/image'
import { useCart } from '../hooks/useCart'
import styles from '../styles/pages/world.module.scss'
import { ContentWrapper } from '../components/layouts/ContentWrapper'

const World: NextPage = () => {
  const { fetchCart } = useCart()
  fetchCart()
  return (
    <>
      <ContentWrapper>
        <h1>World</h1>
        <div className={styles.items}>
          <div className={styles.item}>
            <Image
              src="/brand.webp"
              alt="World"
              quality={100}
              width={500}
              height={500}
            />
          </div>
          <div className={styles.item}>
            <div className="item__date">
              あらゆるものに縛られ、抑圧される社会と一線を画し、自分自身を取り戻すための服。
              その人自身のアイデンティティからなる白昼夢のように、持つ人の個性に合わせて表情が変化するアイテムを展開。
            </div>
          </div>
          <div className={styles.item}>
            <div className="item__date">
              国内外から厳選されたヴィンテージアイテムと、再構築され新たなアイテムとして生まれ変わった
              一点物を取り扱う Vintage Select Bland。
            </div>
          </div>
          <div className={styles.item}>
            <Image
              src="/brand2.jpg"
              alt="World2"
              quality={100}
              width={500}
              height={500}
            />
          </div>
        </div>
      </ContentWrapper>
    </>
  )
}

export default World
