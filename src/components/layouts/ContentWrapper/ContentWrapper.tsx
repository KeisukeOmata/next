import { FC } from 'react'
import s from './ContentWrapper.module.scss'

export const ContentWrapper: FC = ({ children }) => (
  <div className={s.contentWrapper}>{children}</div>
)

export const UndoWrapForScroll: FC = ({ children }) => (
  <div className={s.undoWrapForScroll}>{children}</div>
)
