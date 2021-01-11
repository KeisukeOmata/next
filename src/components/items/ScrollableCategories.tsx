import React, { useState } from 'react'
import styles from '../../styles/components/items/ScrollableCategories.module.scss'
import { categories } from '../../foundations/categories'
import Items from './Items'
import { TypeItem } from '../../types/TypeItem'
import { ContentWrapper } from '../layouts/ContentWrapper'

const ScrollableCategories: React.FC<{ items: TypeItem[] }> = ({ items }) => {
  const [category, setCategory] = useState('ALL')

  return (
    <>
      <div className={styles.scrollableCategories}>
        {categories.map((category, i) => (
          <div key={`category-${i}`}>
            <div className={styles.scrollableCategory__link}>
              <button
                className={styles.scrollableCategory__name}
                onClick={(event) => setCategory(event.target.innerHTML)}
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
              {items.map((item, i) => (
                <Items key={`post-item-${i}`} item={item} />
              ))}
            </div>
          </>
        ) : (
          <>
            <h1>{category}</h1>
            <div className={styles.items}>
              {items.map(
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
