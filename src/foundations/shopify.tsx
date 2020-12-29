import Client from 'shopify-buy'

export const shopify = Client.buildClient({
  storefrontAccessToken: 'dd4d4dc146542ba7763305d71d1b3d38',
  domain: 'graphql.myshopify.com',
  language: 'ja-JP',
})
