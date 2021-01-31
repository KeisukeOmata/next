import { FC } from 'react'
import s from 'styles/components/layouts/FixedFooter.module.scss'

export const FixedFooter: FC = ({ children }) => {
  return (
    <>
      <div className={s.fixedFooter}>{children}</div>
    </>
  )
}
