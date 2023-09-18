import React, { useState, useEffect } from 'react'
import '../styles/slider.scss'

interface Slide {
  eachSlide: string
}

const slides: Slide[] = [
  {
    eachSlide: 'url(https://www.washingtonian.com/wp-content/uploads/2021/01/header.png)',
  },
  {
    eachSlide:
      'url(https://res.cloudinary.com/sagacity/image/upload/c_crop,h_500,w_1000,x_0,y_0/c_limit,dpr_auto,f_auto,fl_lossy,q_80,w_1080/header_ibll99.png)',
  },
  {
    eachSlide: 'url(https://cbd.market/wp-content/uploads/2021/09/cbd-dot-treats-dog-chews-cbd.market.jpg)',
  },
  {
    eachSlide: 'url(https://media.cmsmax.com/syu7sbneqwoxyfrc3bi9s/cbd-pets-1.jpg)',
  },
  {
    eachSlide: 'url(https://www.amny.com/wp-content/uploads/2023/04/header-5.png)',
  },
  {
    eachSlide: 'url(https://www.petage.com/wp-content/uploads/2020/09/Honest-Paws-Family-Shot-002.jpg)',
  },
]

const Slider: React.FC = () => {
  const [active, setActive] = useState<number>(0)
  const [autoplay, setAutoplay] = useState<boolean>(false)
  const max: number = slides.length

  const intervalBetweenSlides = () =>
    autoplay && setActive((prevActive) => (prevActive === max - 1 ? 0 : prevActive + 1))

  useEffect(() => {
    const interval = setInterval(() => intervalBetweenSlides(), 3000) // Интервал переключения слайдов (3 секунды)
    return () => {
      clearInterval(interval)
    }
  }, [autoplay])

  const toggleAutoPlay = () => setAutoplay(!autoplay)

  const nextOne = () => active < max - 1 && setActive((prevActive) => prevActive + 1)

  const prevOne = () => active > 0 && setActive((prevActive) => prevActive - 1)

  const isActive = (value: number) => (active === value ? 'active' : '')

  const setSliderStyles = () => {
    const transition: number = active * -100

    return {
      width: `${slides.length * 100}vw`,
      transform: `translateX(${transition}vw)`,
    }
  }

  const renderSlides = () =>
    slides.map((item, index) => (
      <div className={`each-slide ${isActive(index)}`} key={index} style={{ backgroundImage: item.eachSlide }}></div>
    ))

  const renderDots = () =>
    slides.map((_, index) => (
      <li className={`${isActive(index)} dots`} key={index}>
        <button onClick={() => setActive(index)}>
          <span>&#9679;</span>
        </button>
      </li>
    ))

  const renderPlayStop = () =>
    autoplay ? (
      <svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
      </svg>
    ) : (
      <svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
      </svg>
    )

  const renderArrows = () => (
    <React.Fragment>
      <button type="button" className="arrows prev" onClick={() => prevOne()}>
        <svg fill="#FFFFFF" width="50" height="50" viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </button>
      <button type="button" className="arrows next" onClick={() => nextOne()}>
        <svg fill="#FFFFFF" height="50" viewBox="0 0 24 24" width="50">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </button>
    </React.Fragment>
  )
  return (
    <section className="slider">
      <div className="wrapper" style={setSliderStyles()}>
        {renderSlides()}
      </div>
      {renderArrows()}
      <ul className="dots-container">{renderDots()}</ul>
      <button type="button" className="toggle-play" onClick={toggleAutoPlay}>
        {renderPlayStop()}
      </button>
    </section>
  )
}

export default Slider
