import Link from 'next/link'
import Image from 'next/image'
import { FC, useEffect, useRef } from 'react'
import { TypeItem } from 'lib/Type'
import { useRecoil } from 'lib/hooks/useRecoil'
import s from './Item.module.scss'

type Props = {
  item: TypeItem
  focused: boolean
}

export const Item: FC<Props> = ({ item, focused }) => {
  const { id, images, title, variants } = item
  const ref = useRef<HTMLButtonElement | null>(null)
  const { setFocusItemState } = useRecoil()

  useEffect(() => {
    if (ref.current && focused) {
      ref.current.focus()
    }
  }, [focused])

  return (
    <>
      <div className={s.item}>
        <Link key={`items-${id}`} href={`/items/${id}`} passHref>
          <button
            ref={ref}
            tabIndex={-1}
            onClick={() => setFocusItemState(id)}
            aria-label={`${title}のページを表示する`}
            className={s.item__mainLink}
          >
            <Image
              src={images[0]?.src}
              alt={title || 'Item Image'}
              width={500}
              height={500}
              quality="85"
            />
            <div className={s.item__date}>
              <p>{title}</p>
              <p>¥{variants[0].price}</p>
            </div>
          </button>
        </Link>
      </div>
    </>
  )
}
