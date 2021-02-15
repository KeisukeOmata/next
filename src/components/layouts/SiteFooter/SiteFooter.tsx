import { FC } from 'react'
import { Config } from 'lib/site.config'
import s from './SiteFooter.module.scss'

export const SiteFooter: FC = () => (
  <footer className={s.siteFooter}>
    <p>© {Config.copyright}</p>
  </footer>
)
