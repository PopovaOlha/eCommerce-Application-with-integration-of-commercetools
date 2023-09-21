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
// import { Box, Container, Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Slider from '../components/Slider'
import PromocodeList from '../components/PromocodeList'
// import PromocodeList from '../components/PromocodeList'

function Home() {
  const { catalogStore } = useRootStore()
  const [foundProduct, setFoundProduct] = useState<Product | null>(null)
  // const [filteredProducts, setFilteredProducts] = useState<Product[]>(catalogStore.products)

  const handleSearch = (query: string) => {
    const found = catalogStore.products.find(
      (product) => product.name && product.name['en-US'] && product.name['en-US'].toLowerCase() === query.toLowerCase()
    )

    // const filteredResults = catalogStore.products.filter(
    //   (product) => product.name && product.name['en-US'] && product.name['en-US'].includes(query.toLowerCase())
    // )

    setFoundProduct(found || null)
    // setFilteredProducts(filteredResults)
  }

  const backgroundStyle = {
    width: '90%',
    margin: '0 auto',
    height: '80vh', // Устанавливаем высоту 50% от высоты видимой области (viewport height)
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
      <SearchBar onSearch={handleSearch} />
      <div style={isMobile ? mobileBackgroundStyle : desktopBackgroundStyle} className="content">
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
        {/* <Container maxWidth="lg">
          <Box mt={10}>
            <Grid container spacing={isMobile ? 2 : 3}>
              {filteredProducts.map((product, index) => (
                <Grid key={`${product.id}-${index}`} item xs={12} sm={6} md={4} lg={4}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container> */}
        <div style={{ marginTop: '40px' }}>
          <HomeButton />
        </div>
      </div>

      <div style={{ borderBottom: '80px' }}>
        <div style={{ textAlign: 'center', fontSize: '30px' }}>
          <PromocodeList />
        </div>
        <Slider />
      </div>
      <Footer />
    </div>
  )
}

export default observer(Home)
