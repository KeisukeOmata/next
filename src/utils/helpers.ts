import { SelectedOption } from '../types/TypeItem'

export function getCheckoutId(): string {
  return localStorage.getItem('checkoutId') ?? ''
}

export function setCheckoutId(checkoutId: string | number): void {
  localStorage.setItem('checkoutId', String(checkoutId))
}

export function getValueByMatchedNameSelectedOptions(
  options: SelectedOption[],
  name: string
): string {
  return options.find((option) => option.name === name)?.value ?? ''
}
