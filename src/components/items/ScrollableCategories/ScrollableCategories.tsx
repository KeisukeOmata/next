import { FC } from 'react'
import { useRecoilState } from 'recoil'
import cn from 'classnames'
import { categories } from 'lib/categories'
import { categoryAtom } from 'lib/atoms'
import s from './ScrollableCategories.module.scss'

export const ScrollableCategories: FC = () => {
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
    </>
  )
}
