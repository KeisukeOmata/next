import { FC, useState, useEffect, useRef } from 'react'
import { atom, useRecoilValue } from 'recoil'
import { categoryAtom } from 'components/items/ScrollableCategories'
import Items from 'components/items/Items'
import { TypeItem } from 'types/TypeItem'
import s from 'styles/components/items/ScrollableCategories.module.scss'

type Props = {
  items: TypeItem[]
}

export const itemAtom = atom<string | null>({
  key: 'itemState',
  default: null,
})

const CategoryItems: FC<Props> = ({ items }) => {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLHeadingElement | null>(null)
  const itemState = useRecoilValue(itemAtom)
  const categoryState = useRecoilValue(categoryAtom)

  useEffect(() => {
    if (count == 0) {
      // Focus on main when the parent component is rendered.
      setCount(1)
    } else {
      // Focus on heading element when the child component is rendered.
      ref.current?.focus()
    }
  }, [categoryState])

  if (categoryState == 'ALL') {
    return (
      <>
        <div className={s.categorySectionTitleContainer}>
          <h2 ref={ref} tabIndex={-1}>
            ALL
          </h2>
        </div>
        <div className={s.items}>
          {items
            .slice(0)
            .reverse()
            .map((item, i) => (
              <>
                <Items
                  key={`post-item-${i}`}
                  item={item}
                  focused={itemState == item.id}
                />
              </>
            ))}
        </div>
      </>
    )
  } else if (categoryState === '新着') {
    return (
      <>
        <div className={s.categorySectionTitleContainer}>
          <h2 ref={ref} tabIndex={-1}>
            新着
          </h2>
        </div>
        <div className={s.items}>
          {items
            .slice(-10)
            .reverse()
            .map((item, i) => (
              <>
                <Items
                  key={`post-item-${i}`}
                  item={item}
                  focused={itemState == item.id}
                />
              </>
            ))}
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className={s.categorySectionTitleContainer}>
          <h2 ref={ref} tabIndex={-1} className={s.homeSectionTitle}>
            {categoryState}
          </h2>
        </div>
        <div className={s.items}>
          {items
            .slice(0)
            .reverse()
            .map(
              (item, i) =>
                item.productType == categoryState && (
                  <Items
                    key={`post-item-${i}`}
                    item={item}
                    focused={itemState == item.id}
                  />
                )
            )}
        </div>
      </>
    )
  }
}

export default CategoryItems
