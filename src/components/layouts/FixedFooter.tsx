import { FC } from 'react'
import styles from '../../styles/components/layouts/FixedFooter.module.scss'

export const FixedFooter: FC = ({ children }) => {
  return (
    <>
      <div className={styles.fixedFooter}>{children}</div>
    </>
  )
}
