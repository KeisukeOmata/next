import { FC } from 'react'
import s from 'styles/components/layouts/ContentWrapper.module.scss'

export const ContentWrapper: FC = ({ children }) => {
  return (
    <>
      <div className={s.contentWrapper}>{children}</div>
    </>
  )
}

export const UndoWrapForScroll: FC = ({ children }) => {
  return (
    <>
      <div className={s.undoWrapForScroll}>{children}</div>
    </>
  )
}
