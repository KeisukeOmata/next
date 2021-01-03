import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import { TypeItem } from '../../types/TypeItem'
// import styles from '../../styles/components/items/Images.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Pagination } from 'swiper'

SwiperCore.use([Navigation, Pagination])

type Props = {
  detail: TypeItem
}

const Images: React.FC<Props> = ({ detail }) => {
  const [swiperIndex, setSwiperIndex] = useState<SwiperCore | null>(null)
  const slideTo = (index: number) => {
    if (!swiperIndex) return
    swiperIndex.slideTo(index)
  }
  return (
    <>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        onSwiper={(swiper) => setSwiperIndex(swiper)}
      >
        {detail.images.map((image) => {
          return (
            <SwiperSlide key={image.id}>
              <Image
                src={image.src}
                alt={detail.title}
                width={500}
                height={500}
                // 遅延読み込みしない
                loading={'eager'}
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
      {detail.images.map((image, index) => {
        return (
          <Image
            onClick={() => slideTo(index)}
            key={image.id}
            src={image.src}
            alt={detail.title}
            width={100}
            height={100}
          />
        )
      })}
    </>
  )
}

export default Images
