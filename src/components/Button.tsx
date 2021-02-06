import * as React from 'react'

type Props = {
  text: string
}

const button: React.FC<Props> = ({ text }: Props) => (
  <button aria-label={`${text}`}>{text}</button>
)

export default button
