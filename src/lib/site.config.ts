export const Config = {
  title: 'e-commerce',
  titleTemplate: '%s - e-commerce Storefront',
  description: 'e-commerce using ISR(Incremental Static Regeneration).',
  canonical:
    process.env.NODE_ENV === 'production'
      ? 'https://e-commerce.keisukeomata.vercel.app/'
      : 'http://localhost:3000',
  copyright: 'Keisuke Omata',
  openGraph: {
    type: 'website',
    locale: 'ja',
    url:
      process.env.NODE_ENV === 'production'
        ? 'https://e-commerce.keisukeomata.vercel.app/'
        : 'http://localhost:3000',
    site_name: 'e-commerce',
    images: [
      {
        url: '/logo.svg',
        width: 500,
        height: 500,
        alt: 'Brand logo.',
      },
    ],
  },
  twitter: {
    handle: '@mete0la',
    site: '@mete0la',
    cardType: 'summary_large_image',
  },
  siteRoot:
    process.env.NODE_ENV === 'production'
      ? 'https://e-commerce.keisukeomata.vercel.app/'
      : 'http://localhost:3000',
}
