import Client from 'shopify-buy'

export const shopify = Client.buildClient({
  storefrontAccessToken: process.env.API_KEY as string,
  domain: process.env.DOMAIN as string,
  language: 'ja-JP',
})
