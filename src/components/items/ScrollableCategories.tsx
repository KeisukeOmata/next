import React from 'react'
import { atom, useRecoilState } from 'recoil'
import styles from '../../styles/components/items/ScrollableCategories.module.scss'
import { categories } from '../../foundations/categories'
import Items from './Items'
import { TypeItem } from '../../types/TypeItem'
import { ContentWrapper } from '../layouts/ContentWrapper'

const categoryState = atom<string | null>({
  key: 'categoryState',
  default: 'ALL',
})

const ScrollableCategories: React.FC<{ items: TypeItem[] }> = ({ items }) => {
  const [category, setCategory] = useRecoilState(categoryState)

  return (
    <>
      <div className={styles.scrollableCategories}>
        {categories.map((category, i) => (
          <div key={`category-${i}`}>
            <div className={styles.scrollableCategory__link}>
              <button
                className={styles.scrollableCategory__name}
                onClick={() => setCategory(category.name as string)}
              >
                {category.name}
              </button>
            </div>
          </div>
        ))}
      </div>
      <ContentWrapper>
        {category == 'ALL' ? (
          <>
            <h1>ALL</h1>
            <div className={styles.items}>
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
            <h1>{category}</h1>
            <div className={styles.items}>
              {items
                .slice(0)
                .reverse()
                .map(
                  (item, i) =>
                    item.productType == category && (
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
