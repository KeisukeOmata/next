import { FC } from 'react'

interface Props {
  width: string
  height: string
}

const Skeleton: FC<Props> = ({ width, height }) => {
  return (
    <span
      style={{
        minWidth: width,
        minHeight: height,
      }}
    ></span>
  )
}

export default Skeleton
