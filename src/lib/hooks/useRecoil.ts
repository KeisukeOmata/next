import { atom, useRecoilValue, useSetRecoilState } from 'recoil'

type useRecoilType = {
  getCategoryState: () => string
  getfocusItemState: () => string | null
  setCategoryState: (categoruState: string) => void
  setFocusItemState: (focusItemState: string | null) => void
}

const categoryAtom = atom<string>({
  key: 'categoryAtomKey',
  default: '新着',
})

const focusItemAtom = atom<string | null>({
  key: 'focusItemAtomKey',
  default: null,
})

export const useRecoil = (): useRecoilType => {
  const categoryState = useRecoilValue(categoryAtom)
  const focusItemState = useRecoilValue(focusItemAtom)
  const setCategoryStateToRecoil = useSetRecoilState(categoryAtom)
  const setFocusItemStateToRecoil = useSetRecoilState(focusItemAtom)

  const getCategoryState = (): string => {
    return categoryState
  }

  const getfocusItemState = (): string | null => {
    return focusItemState
  }

  const setCategoryState = (categoryState: string): void => {
    setCategoryStateToRecoil(categoryState)
  }

  const setFocusItemState = (focusItemState: string | null): void => {
    setFocusItemStateToRecoil(focusItemState)
  }

  return {
    getCategoryState,
    getfocusItemState,
    setCategoryState,
    setFocusItemState,
  }
}
