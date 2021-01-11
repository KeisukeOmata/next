import React from 'react'
import styles from '../../styles/components/layouts/ContentWrapper.module.scss'

export const ContentWrapper: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  return (
    <>
      <div className={styles.contentWrapper}>{props.children}</div>
    </>
  )
}

export const UndoWrapForScroll: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  return (
    <>
      <div className={styles.undoWrapForScroll}>{props.children}</div>
    </>
  )
}
