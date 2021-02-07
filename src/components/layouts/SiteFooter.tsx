import { FC } from 'react'
import { Config } from 'lib/site.config'
import s from 'styles/components/layouts/SiteFooter.module.scss'

export const SiteFooter: FC = () => (
  <footer className={s.siteFooter}>
    <p>© {Config.siteMeta.copyright}</p>
  </footer>
)
