import { FC } from 'react'
import { Twitter, Instagram, Github } from 'components/icons'
import { ContentWrapper } from 'components/layouts'
import { Config } from 'lib/site.config'
import s from './SiteFooter.module.scss'

export const SiteFooter: FC = () => (
  <footer>
    <ContentWrapper>
      <div className={s.siteFooter}>
        <div className={s.item}>
          <a href={Config.siteURL.twitter} target="_blank" rel="noreferrer">
            <button aria-label="Twitterへのリンク">
              <Twitter />
            </button>
          </a>
          <a
            className="mr-3 ml-3"
            href={Config.siteURL.instagram}
            target="_blank"
            rel="noreferrer"
          >
            <button aria-label="Instagramへのリンク">
              <Instagram />
            </button>
          </a>
          <a href={Config.siteURL.github} target="_blank" rel="noreferrer">
            <button aria-label="Githubへのリンク">
              <Github />
            </button>
          </a>
        </div>
        <div className={s.item}>
          <p>© {Config.copyright}</p>
        </div>
      </div>
    </ContentWrapper>
  </footer>
)
