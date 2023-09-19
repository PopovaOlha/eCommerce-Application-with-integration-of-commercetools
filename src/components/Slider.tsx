import React, { useState, useEffect } from 'react'
import '../styles/slider.scss'
import '../styles/slider-mobile.scss'

interface Player {
  title: string
  desc: string
  image: string
  promocode: string
}

interface CarouselSlideItemProps {
  pos: number
  idx: number
  activeIdx: number
}

const slideWidth = 30

const _items: { player: Player }[] = [
  {
    player: {
      title: 'Pedigree food.',
      desc: 'PEDIGREE complete and balanced dog food for adult dogs',
      image: 'https://cdn.shopify.com/s/files/1/0086/0795/7054/files/pedigree_pawsome.png?v=1659956072',
      promocode: 'SAVE20CART',
    },
  },
  {
    player: {
      title: 'Nutritions Meals',
      desc: 'Better food with fresher, simpler, all-natural ingredients.',
      image: 'https://images-eu.ssl-images-amazon.com/images/G/31/img22/Pets/kmargso/pedigree_450X450.jpg',
      promocode: 'SAVE5CART',
    },
  },
  {
    player: {
      title: 'Royal Canin',
      desc: 'It comes with deliciously nutritious recipe and variety of formats & flavors that your dogs will surely love.',
      image: ' https://lzd-img-global.slatic.net/g/ff/kf/S49c5e68731f444079196803c2650d4faW.jpg_360x360q75.jpg_.webp',
      promocode: 'SAVE10CART',
    },
  },
  {
    player: {
      title: 'Pedigree for puppies',
      desc: '100% complete & balanced nutrition with 38 essential nutrients',
      image: 'https://etimg.etb2bimg.com/photo/83146078.cms',
      promocode: 'SAVE20CART',
    },
  },
  {
    player: {
      title: 'Royal Canin Puppi',
      desc: 'From X-Small to Giant formulas, Royal Canin offers precise nutrition for your dog.',
      image: 'https://media.zooplus.com/bilder/2/400/rc_spt_wet_mediumpuppy_b1_page_01_2.jpg',
      promocode: 'SAVE5CART',
    },
  },
]

const length = _items.length
_items.push(..._items)

const sleep = (ms = 0) => {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

interface ItemStyles {
  transform: string
  filter?: string
  opacity?: number
}

const createItem = (position: number, idx: number) => {
  const item = {
    styles: {
      transform: `translateX(${position * slideWidth}rem)`,
    },
    player: _items[idx].player,
  } as {
    styles: ItemStyles
    player: {
      title: string
      desc: string
      image: string
    }
  }

  switch (position) {
    case length - 1:
    case length + 1:
      item.styles = { ...item.styles, filter: 'grayscale(1)' }
      break
    case length:
      break
    default:
      item.styles = { ...item.styles, opacity: 0 }
      break
  }

  return item
}

const CarouselSlideItem: React.FC<CarouselSlideItemProps> = ({ pos, idx }) => {
  const item = createItem(pos, idx)

  return (
    <li className="carousel__slide-item" style={item.styles}>
      <div className="carousel__slide-item-img-link">
        <img src={item.player.image} alt={item.player.title} />
      </div>
      <div className="carousel-slide-item__body">
        <h4>{item.player.title}</h4>
        <p>{item.player.desc}</p>
      </div>
    </li>
  )
}

const keys = Array.from(Array(_items.length).keys())

const Carousel: React.FC = () => {
  const [items, setItems] = useState<number[]>(keys)
  const [isTicking, setIsTicking] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const bigLength = items.length

  const prevClick = (jump = 1) => {
    if (!isTicking) {
      setIsTicking(true)
      setItems((prev) => {
        return prev.map((_, i) => prev[(i + jump) % bigLength])
      })
    }
  }

  const nextClick = (jump = 1) => {
    if (!isTicking) {
      setIsTicking(true)
      setItems((prev) => {
        return prev.map((_, i) => prev[(i - jump + bigLength) % bigLength])
      })
    }
  }

  const handleDotClick = (idx: number) => {
    if (idx < activeIdx) prevClick(activeIdx - idx)
    if (idx > activeIdx) nextClick(idx - activeIdx)
  }

  useEffect(() => {
    if (isTicking) sleep(300).then(() => setIsTicking(false))
  }, [isTicking])

  useEffect(() => {
    setActiveIdx((length - (items[0] % length)) % length)
  }, [items])

  return (
    <div className="carousel__wrap">
      <div className="carousel__inner">
        <button className="carousel__btn carousel__btn--prev" onClick={() => prevClick()}>
          <i className="carousel__btn-arrow carousel__btn-arrow--left" />
        </button>
        <div className="carousel__container">
          <ul className="carousel__slide-list">
            {items.map((pos, i) => (
              <CarouselSlideItem key={i} idx={i} pos={pos} activeIdx={activeIdx} />
            ))}
          </ul>
        </div>
        <button className="carousel__btn carousel__btn--next" onClick={() => nextClick()}>
          <i className="carousel__btn-arrow carousel__btn-arrow--right" />
        </button>
        <div className="carousel__dots">
          {items.slice(0, length).map((i) => (
            <button key={i} onClick={() => handleDotClick(i)} className={i === activeIdx ? 'dot active' : 'dot'} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Carousel
