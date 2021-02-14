import { ButtonHTMLAttributes } from 'react'
import s from './Button.module.css'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const Button: React.FC<ButtonProps> = ({ ...rest }) => (
  <button className={s.button} {...rest}></button>
)
