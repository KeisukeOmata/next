import { FC } from 'react'
import { atom, useRecoilState } from 'recoil'
import cn from 'classnames'
import s from '../../styles/components/items/ScrollableCategories.module.scss'
import { categories } from '../../foundations/categories'
import { TypeItem } from '../../types/TypeItem'
import CategoryItems from './CategoryItems'
import { ContentWrapper } from '../layouts/ContentWrapper'

type Props = {
  items: TypeItem[]
}

const categoryAtom = atom<string | null>({
  key: 'categoryState',
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
        <CategoryItems categoryState={categoryState as string} items={items} />
      </ContentWrapper>
    </>
  )
}

export default ScrollableCategories
