import { FC } from 'react'
import styles from '../../styles/components/layouts/ContentWrapper.module.scss'

export const ContentWrapper: FC = ({ children }) => {
  return (
    <>
      <div className={styles.contentWrapper}>{children}</div>
    </>
  )
}

export const UndoWrapForScroll: FC = ({ children }) => {
  return (
    <>
      <div className={styles.undoWrapForScroll}>{children}</div>
    </>
  )
}
