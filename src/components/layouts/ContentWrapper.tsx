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
