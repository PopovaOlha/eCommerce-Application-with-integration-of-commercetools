import { observer } from 'mobx-react'
import '../index.css'
import Footer from '../components/Footer'
import Header from '../components/Header'

import backgroundImageDesktop from '../images/1660766295_41-kartinkin-net-p-fon-dlya-zootovarov-krasivo-45.png'
import backgroundImageMobile from '../images/1671769944_kalix-club-p-fon-domashnie.jpg'

function Home() {
  const backgroundStyle = {
    minHeight: 'calc(100vh - 70px - 64px)',
    marginTop: '64px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  const desktopBackgroundStyle = {
    ...backgroundStyle,
    backgroundImage: `url(${backgroundImageDesktop})`, // Desktop background image
  }

  const mobileBackgroundStyle = {
    ...backgroundStyle,
    backgroundImage: `url(${backgroundImageMobile})`, // Mobile background image
  }

  // Define a media query for mobile screens (adjust max-width as needed)
  const isMobile = window.matchMedia('(max-width: 768px)').matches

  return (
    <div>
      <Header subcategories={[]} />
      <div style={isMobile ? mobileBackgroundStyle : desktopBackgroundStyle} className="content"></div>
      <Footer />
    </div>
  )
}

export default observer(Home)
