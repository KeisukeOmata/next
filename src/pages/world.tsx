/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Image from 'next/image'
import cn from 'classnames'
import { ContentWrapper } from 'components/layouts/ContentWrapper'
import { useCart } from 'hooks/useCart'
import s from 'styles/pages/world.module.scss'

export default function World() {
  const { fetchCart } = useCart()
  fetchCart()
  return (
    <>
      <section className={s.worldCategories}>
        <ContentWrapper>
          <div className={s.worldSectionTitleContainer}>
            <h2>World</h2>
          </div>
          <div className={s.items}>
            <div className={cn(s.item, s.order1)}>
              <Image
                src="/brand.webp"
                alt="Brandの画像1"
                quality="85"
                width={500}
                height={500}
                // 遅延読み込みしない
                loading={'eager'}
              />
            </div>
            <div className={cn(s.item, s.order2)}>
              <p className={s.item__date}>
                あらゆるものに縛られ、抑圧される社会と一線を画し、自分自身を取り戻すための服。
                その人自身のアイデンティティからなる白昼夢のように、持つ人の個性に合わせて表情が変化するアイテムを展開。
              </p>
            </div>
            <div className={cn(s.item, s.order4)}>
              <p className={s.item__date}>
                国内外から厳選されたヴィンテージアイテムと、再構築され新たなアイテムとして生まれ変わった
                一点物を取り扱う Vintage Select Bland。
              </p>
            </div>
            <div className={cn(s.item, s.order3)}>
              <Image
                src="/brand2.jpg"
                alt="Brandの画像2"
                quality="85"
                width={500}
                height={500}
                // 遅延読み込みしない
                loading={'eager'}
              />
            </div>
            <div className={cn(s.item, s.order5)}>
              <Image
                src="/brand3.webp"
                alt="Brandの画像3"
                quality="85"
                width={500}
                height={500}
                // 遅延読み込みしない
                loading={'eager'}
              />
            </div>
            <div className={cn(s.item, s.order6)}>
              <p className={s.item__date}>
                10年後も美しいBAGを目指して使い込むほどに艶を増す上質な本革を使用。
                MADE IN
                JAPANにこだわり、優れた職人によって作られたシンプルで長く寄り添う小物を展開。
              </p>
            </div>
          </div>
        </ContentWrapper>
      </section>
    </>
  )
}
