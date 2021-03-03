import { FC, ButtonHTMLAttributes } from 'react'
import cn from 'classnames'
import s from './Button.module.css'

type props = {
  shape: 'square' | 'circle'
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button: FC<props> = ({ shape, ...rest }) => (
  <button
    className={cn(shape == 'square' ? s.square : s.circle)}
    {...rest}
  ></button>
)
