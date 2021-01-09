import Client from 'shopify-buy'

export const shopify = Client.buildClient({
  storefrontAccessToken: '998272c4d685c2c33ed1e8095ceaf5ba',
  domain: 'omatakeisuke.myshopify.com',
  language: 'ja-JP',
})
