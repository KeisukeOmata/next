export const Config = {
  siteMeta: {
    title: 'e-commerce',
    copyright: 'Keisuke Omata',
    description: 'e-commerce using ISR(Incremental Static Regeneration).',
  },
  siteRoot:
    process.env.NODE_ENV === 'production'
      ? 'https://e-commerce.keisukeomata.vercel.app/'
      : 'http://localhost:3000',
  headerLinks: [
    {
      title: 'Shop',
      href: '/',
    },
    {
      title: 'World',
      href: '/world',
    },
  ],
}
