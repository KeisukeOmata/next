/* eslint-disable
  @typescript-eslint/no-var-requires
*/
const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    dest: 'public',
  },
  images: {
    domains: ['cdn.shopify.com'],
  },
})
