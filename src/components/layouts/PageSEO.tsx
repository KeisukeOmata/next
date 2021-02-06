import Head from 'next/head'
import { FC } from 'react'
import { Config } from 'foundations/site.config'

type Props = {
  title: string
  path?: string
  description?: string
  ogImageUrl?: string
  removeSiteNameFromTitle?: boolean
}

export const PageSEO: FC<Props> = ({
  path,
  title,
  description,
  ogImageUrl,
  removeSiteNameFromTitle,
}) => {
  const pageUrl = `${Config.siteRoot}${path || ''}`

  return (
    <Head>
      <title>
        {removeSiteNameFromTitle
          ? title
          : `${title} | ${Config.siteMeta.title}`}
      </title>
      <meta property="og:title" content={title} />
      <meta property="og:url" content={pageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:site" content={Config.siteMeta.title} />
      <meta property="og:image" content={ogImageUrl || '/logo.svg'} />
      {!!description && (
        <>
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
        </>
      )}
      {path && <link rel="canonical" href={pageUrl} />}
    </Head>
  )
}
