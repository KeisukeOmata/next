import { SelectedOption } from 'lib/Type'

export function getCheckoutId(): string {
  return localStorage.getItem('checkoutId') ?? ''
}

export function setCheckoutId(checkoutId: string | number): void {
  localStorage.setItem('checkoutId', String(checkoutId))
}

// Delete checkoutId from local storage
export function resetCheckoutId(): void {
  localStorage.removeItem('checkoutId')
}

export function getColorAndSize(
  options: SelectedOption[],
  name: string
): string {
  return options.find((option) => option.name === name)?.value ?? ''
}

export function getItemPath(id: string): string {
  return `/items/${encodeURIComponent(id)}`
}
