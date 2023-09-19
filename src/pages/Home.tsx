import { observer } from 'mobx-react'
import '../index.css'
import { useRootStore } from '../App'
import { useSpring, animated } from 'react-spring'
import Footer from '../components/Footer'
import Header from '../components/Header'
import backgroundImageDesktop from '../images/1671769944_kalix-club-p-fon-domashnie.jpg'
import backgroundImageMobile from '../images/1671769944_kalix-club-p-fon-domashnie.jpg'
import SecondHeader from '../components/SecondHeader'
import HomeButton from '../components/HomeButtons'
import SearchBar from '../components/SearchBar'
import { useState } from 'react'
import { Product } from '../types/interfaces'
import ProductCard from '../components/ProductCard'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import PromocodeList from '../components/PromocodeList'

function Home() {
  const { catalogStore } = useRootStore()
  const [foundProduct, setFoundProduct] = useState<Product | null>(null)

  const handleSearch = (query: string) => {
    const found = catalogStore.products.find(
      (product) => product.name && product.name['en-US'] && product.name['en-US'].toLowerCase() === query.toLowerCase()
    )

    setFoundProduct(found || null)
  }

  const backgroundStyle = {
    minHeight: 'calc(100vh - 70px - 64px)',
    marginTop: '-5px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  const backStyleMobyle = {
    minHeight: 'calc(80vh - 70px - 64px)',
    marginTop: '-5px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
  const desktopBackgroundStyle = {
    ...backgroundStyle,
    backgroundImage: `url(${backgroundImageDesktop})`,
  }

  const mobileBackgroundStyle = {
    ...backStyleMobyle,
    backgroundImage: `url(${backgroundImageMobile})`,
  }
  const backButtonIconStyle: React.CSSProperties = {
    marginRight: '0.5rem',
  }

  const backButtonStyle: React.CSSProperties = {
    marginTop: '20px',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#555',
    marginBottom: '1rem',
  }
  const productCardAnimation = useSpring({
    from: { transform: 'translateY(-100%)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 },
    delay: 500,
  })

  const isMobile = window.matchMedia('(max-width: 768px)').matches

  return (
    <div>
      <Header subcategories={[]} />
      <SecondHeader />
      <div style={isMobile ? mobileBackgroundStyle : desktopBackgroundStyle} className="content">
        <SearchBar onSearch={handleSearch} />
        {foundProduct ? (
          <div>
            <Link to="/categories" style={backButtonStyle}>
              <ArrowBackIcon style={backButtonIconStyle} /> To categories
            </Link>
            <animated.div style={productCardAnimation}>
              <ProductCard product={foundProduct} />
            </animated.div>
          </div>
        ) : (
          <h5 style={{ marginLeft: '15px' }}>View Products</h5>
        )}
        <HomeButton />
      </div>
      <PromocodeList />
      <div style={{ overflowX: 'hidden' }}>
        <Footer />
      </div>
    </div>
  )
}

export default observer(Home)
