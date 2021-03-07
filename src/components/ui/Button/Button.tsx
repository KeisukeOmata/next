import { FC, ButtonHTMLAttributes } from 'react'
import cn from 'classnames'
import s from './Button.module.css'

type props = {
  color?: string
  shape: 'square' | 'circle'
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button: FC<props> = ({ color, shape, ...rest }) => {
  let colorClass: string
  switch (color) {
    case 'Black':
      colorClass = s.black
      break
    case 'Brown':
      colorClass = s.brown
      break
    case 'Charcoal':
      colorClass = s.charcoal
      break
    case 'Chocolate':
      colorClass = s.chocolate
      break
    case 'Grey':
      colorClass = s.grey
      break
    case 'Light Grey':
      colorClass = s.lightGrey
      break
    case 'Taupe Marl':
      colorClass = s.taupeMarl
      break
    case 'Ink':
      colorClass = s.ink
      break
    case 'Light Grey Marl':
      colorClass = s.lightGreyMarl
      break
    case 'Cadet Green':
      colorClass = s.red
      break
    case 'Cinder Marl':
      colorClass = s.cinderMarl
      break
    case 'Taupe':
      colorClass = s.taupe
      break
    case 'Military':
      colorClass = s.military
      break
    case 'Grey Marl':
      colorClass = s.greyMarl
      break
    case 'Deep Ocean':
      colorClass = s.deepOcean
      break
    case 'Vintage Black':
      colorClass = s.vintageBlack
      break
    case 'Chalk White':
      colorClass = s.chalkWhite
      break
    case 'Nights':
      colorClass = s.nights
      break
    case 'Optic White':
      colorClass = s.opticWhite
      break
    case 'Tempest Blue':
      colorClass = s.tempestBlue
      break
    case 'Olive Green':
      colorClass = s.oliveGreen
      break
    case 'Putty':
      colorClass = s.blue
      break
    default:
      colorClass = s.default
      break
  }

  return (
    <button
      className={cn(colorClass, shape == 'square' ? s.square : s.circle)}
      {...rest}
    ></button>
  )
}
