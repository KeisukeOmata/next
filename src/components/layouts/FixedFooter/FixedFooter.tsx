import { FC } from 'react'
import s from './FixedFooter.module.scss'

export const FixedFooter: FC = ({ children }) => (
  <div className={s.fixedFooter}>{children}</div>
)
