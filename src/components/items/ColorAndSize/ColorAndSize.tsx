import { FC, useState } from 'react'
import { TypeItem } from 'lib/Type'
// import s  from './ColorAndSize.module.css'
// useEffectでサイズとカラーの初期値を設定

type props = {
  detail: TypeItem
}

export const ColorAndSize: FC<props> = ({ detail }) => {
  const [colorState, setColorState] = useState<string | null>(null)
  const [sizeState, setsizeState] = useState<string | null>(null)
  const colors = detail.options.find((option) => option.name === 'Color')
  const sizes = detail.options.find((option) => option.name === 'Size')

  return (
    <>
      {colors?.values.map((color, i) => (
        <button
          key={i}
          onClick={() => setColorState(color.value)}
        >
          {color.value}
        </button>
      ))}
      {sizes?.values.map((size, i) => (
        <button
          key={i}
          onClick={() => setsizeState(size.value)}
        >
          {size.value}
        </button>
      ))}
    </>
  )
}