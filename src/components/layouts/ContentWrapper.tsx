import { FC } from 'react'
import styles from '../../styles/components/layouts/ContentWrapper.module.scss'

export const ContentWrapper: FC = (props) => {
  return (
    <>
      <div className={styles.contentWrapper}>{props.children}</div>
    </>
  )
}

export const UndoWrapForScroll: FC = (props) => {
  return (
    <>
      <div className={styles.undoWrapForScroll}>{props.children}</div>
    </>
  )
}
