import { atom } from 'recoil'

export const categoryAtom = atom<string>({
  key: 'categoryStateKey',
  default: '新着',
})

export const focusItemAtom = atom<string | null>({
  key: 'itemStateKey',
  default: null,
})
