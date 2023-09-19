import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchProductOfCategories } from '../utils/commercetoolsApi'
import { Product } from '../types/interfaces'
import { Card, CardContent, CardMedia, Typography, Button, Link as MuiLink, Box, IconButton } from '@mui/material'
import { Carousel } from 'react-responsive-carousel'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useRootStore } from '../App'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link } from 'react-router-dom'
import Header from '../components/Header'

const SubcategoryPage: React.FC = () => {
  const navigate = useNavigate()
  const { categoryId } = useParams()
  const { catalogStore, cartStore, headerStore } = useRootStore()
  const [products, setProducts] = useState<Product[]>([])
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0)
  const [, setSelectedProduct] = useState<Product | null>(null)
  const [isAddedToCartMap, setIsAddedToCartMap] = useState<{ [productId: string]: boolean }>({})
  const product: Product = products[selectedImageIndex] || {}

  useEffect(() => {
    if (categoryId) {
      loadProductsForCategory(categoryId)
    }
  }, [categoryId])

  const loadProductsForCategory = async (categoryId: string) => {
    try {
      const productDetails = await fetchProductOfCategories(categoryId)
      setProducts(productDetails)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const handleAddToCart = async (productId: string) => {
    console.log(productId)
    if (!isAddedToCartMap[productId]) {
      console.log('productId:', productId)
      await cartStore.createCart()
      cartStore.addToCart(productId)
      headerStore.setCartCount(headerStore.cartCount + 1)
      setIsAddedToCartMap((prevState) => ({
        ...prevState,
        [productId]: true, // Устанавливаем для данного продукта значение true
      }))
    }
  }

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index)
  }

  useEffect(() => {
    catalogStore.fetchProducts()
  }, [catalogStore])

  const handleViewDetails = (selectedProduct: Product) => {
    setSelectedProduct(selectedProduct)
    navigate(`/product/${selectedProduct.id}`, { state: { product, productDiscount: product.discount } })
  }

  const iconStyle = {
    border: '1px solid grey',
    borderRadius: '50%',
    padding: '5px',
    marginLeft: '20px',
    '&:hover': {
      backgroundColor: '#555',
      position: 'absolute',
      boxShadow: '0 2px 60px #0000003d',
      border: '1px solid #eaeaea',
    },
  }
  const backButtonIconStyle: React.CSSProperties = {
    marginRight: '0.5rem',
  }
  const backButtonStyle: React.CSSProperties = {
    marginTop: '80px',
    paddingLeft: '25px',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#555',
    marginBottom: '1rem',
  }

  return (
    <div>
      <Header subcategories={[]} />
      <Link to="/" style={backButtonStyle}>
        <ArrowBackIcon style={backButtonIconStyle} /> Back to main page
      </Link>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          position: 'relative',
          justifyContent: 'center',
          marginTop: '50px',
        }}
      >
        {products.map((product) => (
          <Card
            key={product.id}
            // onClick={() => handleImageClick(products.indexOf(product))}
            sx={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              width: '300px',
              height: '400px',
              margin: '0 auto',
              padding: '15px',
              background: '#fff',
              borderRadius: '12px',
              border: '1px solid #eaeaea',
              overflow: 'hidden',
              transition: 'all .5s ease',
              '&:hover': {
                boxShadow: '0 2px 60px #0000003d',
                border: '1px solid #eaeaea',
                zIndex: '10000',
                height: 'auto',
              },
            }}
          >
            <CardMedia component="div">
              <Carousel
                selectedItem={selectedImageIndex}
                showThumbs={false}
                dynamicHeight
                onClickItem={handleImageClick}
              >
                {product.imageUrl.map((imageUrl, index) => (
                  <div key={index}>
                    <img
                      src={imageUrl}
                      alt={`Product Image ${index}`}
                      className="product"
                      style={{ width: '30%', height: 'auto' }}
                    />
                  </div>
                ))}
              </Carousel>
            </CardMedia>
            <CardContent sx={{ padding: '1rem', textAlign: 'center' }}>
              <Typography variant="h6" fontWeight="bold" fontSize="15px">
                {product.name['en-US']}
              </Typography>
              <Typography variant="body2" fontSize="10px">
                {product.description ? product.description['en-US'] : 'No description available'}
              </Typography>
              <Box display="flex" alignItems="center" justifyContent="center" sx={{ marginTop: '0.5rem' }}>
                <Typography variant="body2" fontSize="12px" fontWeight="bold">
                  Price:{' '}
                </Typography>
                {product.discount === null ? (
                  <Typography variant="body2" fontSize="12px">
                    {product.price.map((price) => (price / 100).toFixed(2)).join(', ')} USD{' '}
                    <IconButton
                      color="inherit"
                      style={iconStyle}
                      onClick={() => handleAddToCart(product.id)}
                      disabled={isAddedToCartMap[product.id]}
                    >
                      <ShoppingCartIcon sx={{ color: '#333' }} />
                    </IconButton>
                  </Typography>
                ) : (
                  <>
                    <Typography variant="body2" fontSize="12px" className="text-decoration">
                      {product.price.map((price) => (price / 100).toFixed(2)).join(', ')} USD
                    </Typography>
                    <Typography variant="body2" fontSize="12px" color="red" marginLeft="5px">
                      {product.discount !== null ? (product.discount! / 100).toFixed(2) : ''} USD{' '}
                      <IconButton
                        color="inherit"
                        style={iconStyle}
                        onClick={() => handleAddToCart(product.id)}
                        disabled={isAddedToCartMap[product.id]}
                      >
                        <ShoppingCartIcon sx={{ color: '#333' }} />
                      </IconButton>
                    </Typography>
                  </>
                )}
              </Box>
              <MuiLink
                component={Button}
                color="primary"
                sx={{ marginTop: '0.1rem' }}
                onClick={() => handleViewDetails(product)}
              >
                View Details
              </MuiLink>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
export default SubcategoryPage
