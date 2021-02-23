import { FC, ButtonHTMLAttributes } from 'react'
import s from './Button.module.css'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const Button: FC<ButtonProps> = ({ ...rest }) => (
  <button className={s.button} {...rest}></button>
)
