import { FC } from 'react'
import { atom, useRecoilState } from 'recoil'
import cn from 'classnames'
import CategoryItems from 'components/items/CategoryItems'
import { ContentWrapper } from 'components/layouts/ContentWrapper'
import { categories } from 'foundations/categories'
import { TypeItem } from 'types/TypeItem'
import s from 'styles/components/items/ScrollableCategories.module.scss'

type Props = {
  items: TypeItem[]
}

export const categoryAtom = atom<string | null>({
  key: 'categoryStateKey',
  default: '新着',
})

const ScrollableCategories: FC<Props> = ({ items }) => {
  const [categoryState, setCategoryState] = useRecoilState(categoryAtom)

  return (
    <>
      <div className={s.scrollableCategories}>
        {categories.map((category, i) => (
          <div key={`category-${i}`} className={s.scrollableCategory__link}>
            <button
              aria-label={`${category.name}を表示する`}
              className={cn(
                s.scrollableCategory__name,
                categoryState == category.name ? s.chosen : s.notChoose
              )}
              onClick={() => setCategoryState(category.name as string)}
            >
              {category.name}
            </button>
          </div>
        ))}
      </div>
      <ContentWrapper>
        <CategoryItems items={items} />
      </ContentWrapper>
    </>
  )
}

export default ScrollableCategories
