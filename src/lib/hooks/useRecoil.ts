import { atom, useRecoilValue, useSetRecoilState } from 'recoil'

type useRecoilType = {
  getCategoryState: () => string
  getFocusItemState: () => string | null
  getItemIdState: () => string | null
  setCategoryState: (categoryState: string) => void
  setFocusItemState: (focusItemState: string | null) => void
  setItemIdState: (itemIdState: string | null) => void
}

const categoryAtom = atom<string>({
  key: 'categoryAtomKey',
  default: '新着',
})

const focusItemAtom = atom<string | null>({
  key: 'focusItemAtomKey',
  default: null,
})

const itemIdAtom = atom<string | null>({
  key: 'itemIdAtomKey',
  default: null,
})

export const useRecoil = (): useRecoilType => {
  const categoryState = useRecoilValue(categoryAtom)
  const focusItemState = useRecoilValue(focusItemAtom)
  const itemIdState = useRecoilValue(itemIdAtom)
  const setCategoryStateToRecoil = useSetRecoilState(categoryAtom)
  const setFocusItemStateToRecoil = useSetRecoilState(focusItemAtom)
  const setItemIdStateToRecoil = useSetRecoilState(itemIdAtom)

  const getCategoryState = (): string => {
    return categoryState
  }

  const getFocusItemState = (): string | null => {
    return focusItemState
  }

  const getItemIdState = (): string | null => {
    return itemIdState
  }

  const setCategoryState = (categoryState: string): void => {
    setCategoryStateToRecoil(categoryState)
  }

  const setFocusItemState = (focusItemState: string | null): void => {
    setFocusItemStateToRecoil(focusItemState)
  }

  const setItemIdState = (itemIdState: string | null): void => {
    setItemIdStateToRecoil(itemIdState)
  }

  return {
    getCategoryState,
    getFocusItemState,
    getItemIdState,
    setCategoryState,
    setFocusItemState,
    setItemIdState,
  }
}
