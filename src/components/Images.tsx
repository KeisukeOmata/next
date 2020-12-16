import React from 'react'
import Image from 'next/image'
import { TypeItem } from '../types/TypeItem'
// import styles from '../styles/components/Detail.module.scss'

type Props = {
  detail: TypeItem
}

const Images: React.FC<Props> = ({ detail }) => {
  return (
    <>
      {detail.images.map((image) => {
        ;<Image
          key={image.id}
          src={image.src}
          alt={detail.title}
          width={100}
          height={100}
        />
      })}
    </>
  )
}

export default Images
