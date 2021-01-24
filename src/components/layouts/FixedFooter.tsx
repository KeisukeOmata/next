import { FC } from 'react'
import styles from '../../styles/components/layouts/FixedFooter.module.scss'

export const FixedFooter: FC = (props) => {
  return (
    <>
      <div className={styles.fixedFooter}>{props.children}</div>
    </>
  )
}
