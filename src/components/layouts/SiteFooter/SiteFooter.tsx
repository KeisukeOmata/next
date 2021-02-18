import { FC } from 'react'
import { Github, Twitter, Instagram } from 'components/icons'
import { Config } from 'lib/site.config'
import s from './SiteFooter.module.scss'

export const SiteFooter: FC = () => (
  <footer className={s.siteFooter}>
    <Github />
    <Twitter />
    <Instagram />
    <p>© {Config.copyright}</p>
  </footer>
)
