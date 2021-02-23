import { FC } from 'react'
import cn from 'classnames'
import { categories } from 'lib/categories'
import { useRecoil } from 'lib/hooks/useRecoil'
import s from './ScrollableCategories.module.scss'

export const ScrollableCategories: FC = () => {
  const { getCategoryState, setCategoryState } = useRecoil()
  const categoryState = getCategoryState()

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
