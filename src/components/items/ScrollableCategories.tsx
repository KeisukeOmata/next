import React from 'react'
import { atom, useRecoilState } from 'recoil'
import cn from 'classnames'
import s from '../../styles/components/items/ScrollableCategories.module.scss'

import { categories } from '../../foundations/categories'
import Items from './Items'
import { TypeItem } from '../../types/TypeItem'
import { ContentWrapper } from '../layouts/ContentWrapper'

const categoryAtom = atom<string | null>({
  key: 'categoryState',
  default: 'ALL',
})

const ScrollableCategories: React.FC<{ items: TypeItem[] }> = ({ items }) => {
  const [categoryState, setCategoryState] = useRecoilState(categoryAtom)

  return (
    <>
      <div className={s.scrollableCategories}>
        {categories.map((category, i) => (
          <div key={`category-${i}`}>
            <div className={s.scrollableCategory__link}>
              <button
                className={cn(
                  s.scrollableCategory__name,
                  categoryState == category.name ? s.chosen : s.notChoose
                )}
                onClick={() => setCategoryState(category.name as string)}
              >
                {category.name}
              </button>
            </div>
          </div>
        ))}
      </div>
      <ContentWrapper>
        {categoryState == 'ALL' ? (
          <>
            <h1>ALL</h1>
            <div className={s.items}>
              {items
                .slice(0)
                .reverse()
                .map((item, i) => (
                  <Items key={`post-item-${i}`} item={item} />
                ))}
            </div>
          </>
        ) : (
          <>
            <h1>{categoryState}</h1>
            <div className={s.items}>
              {items
                .slice(0)
                .reverse()
                .map(
                  (item, i) =>
                    item.productType == categoryState && (
                      <Items key={`post-item-${i}`} item={item} />
                    )
                )}
            </div>
          </>
        )}
      </ContentWrapper>
    </>
  )
}

export default ScrollableCategories
