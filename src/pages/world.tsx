/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Image from 'next/image'
import cn from 'classnames'
import { PageSEO } from 'components/layouts/PageSEO'
import { ContentWrapper } from 'components/layouts/ContentWrapper'
import { useCart } from 'hooks/useCart'
import s from 'styles/pages/world.module.scss'

export default function World() {
  const { fetchCart } = useCart()
  fetchCart()
  return (
    <>
      <PageSEO title="World" path="/world" />
      <section className={s.worldCategories}>
        <ContentWrapper>
          <div className={s.worldSectionTitleContainer}>
            <h2>World</h2>
          </div>
          <div className={s.items}>
            <div className={cn(s.item, s.order1)}>
              <Image
                src="/brand1.webp"
                alt="Brandの画像1"
                quality="85"
                width={500}
                height={500}
              />
            </div>
            <div className={cn(s.item, s.order2)}>
              <p className={s.item__date}>
                ブランドは元々、牧場の所有者が自分の家畜などに焼印を施し、他者の家畜と区別するために行われた行為を表す北欧の言葉に由来していると言われている。商標法で保護されている「ブランド」も、同じような商品を見分けるために製造元が取り付けていた商標やマーク、タグ、デザインなどの付属物に過ぎない。しかし、その商品が優れていた結果広く使われるに従い、付属物が「商品が良質だ」「使い勝手が良い」等といった判断基準を消費者に連想させるような働きをするようになる。また、その製品やサービスが品質やコンプライアンスの面で社会的信用を失った場合はその逆もある。
              </p>
            </div>
            <div className={cn(s.item, s.order4)}>
              <p className={s.item__date}>
                商品を現すイメージを確立した後は、付属物自体（ブランド自体）が重要な意味を持つようになった。それが商品やサービスとは離れて、地域を越えて独り歩きする力を持つ場合もある。例えばTHXはルーカス・フィルムのAV音響の1部門として始まったが、そのブランド力の強さからスピンアウトし、後に外資企業含めて数回にわたる買収の対象となった。
              </p>
            </div>
            <div className={cn(s.item, s.order3)}>
              <Image
                src="/brand2.webp"
                alt="Brandの画像2"
                quality="85"
                width={500}
                height={500}
              />
            </div>
            <div className={cn(s.item, s.order5)}>
              <Image
                src="/brand3.webp"
                alt="Brandの画像3"
                quality="85"
                width={500}
                height={500}
              />
            </div>
            <div className={cn(s.item, s.order6)}>
              <p className={s.item__date}>
                一方、国の経済状況によっては、国家の関与によりブランド力が低下、消滅することがある。日本の例では、1939年、第二次世界大戦勃発に伴うインフレーション抑制を目的とした価格統制令（先立つ物価停止令）により公定価格が設定、製品によってブランド単位で価格が固定化された。その後、石鹸の例では1940年[1]に、ビールの例では1943年に製品そのものの規格化や製造会社の統合が進み、戦後、生産体制が回復するまでブランドが消滅することとなった[2]。
              </p>
            </div>
          </div>
        </ContentWrapper>
      </section>
    </>
  )
}
