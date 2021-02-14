import { FC } from 'react'

type Props = {
  width: string
  height: string
}

export const Skeleton: FC<Props> = ({ width, height }) => (
  <span
    style={{
      minWidth: width,
      minHeight: height,
    }}
  ></span>
)
