import React from 'react'
import styles from '../../styles/components/layouts/SiteFooter.module.scss'
import { Config } from '../../foundations/site.config'

export const SiteFooter: React.FC = () => (
  <footer className={styles.siteFooter}>
    <p>© {Config.siteMeta.copyright}</p>
  </footer>
)
