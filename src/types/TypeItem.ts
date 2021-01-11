import {
  Option as SdkOption,
  ProductVariant as SdkProductVariant,
  Product as SdkProduct,
  Cart as SdkCart,
} from 'shopify-buy'

export type SelectedOption = {
  name: string
  value: string
}

export type Sku = {
  selectedOptions: SelectedOption[]
  image: {
    altText?: string | null
  }
  product: {
    id: string
  }
} & SdkProductVariant

export type Option = SdkOption

export type TypeItem = {
  productType: string | null
} & SdkProduct

type lineItem = {
  id: string
  title: string
  quantity: number
  variant: Sku
}

export type Cart = {
  lineItems: lineItem[]
  webUrl: string
} & SdkCart
