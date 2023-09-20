import React, { useEffect, useState } from 'react'
import '../index.css'
import { Product } from '../types/interfaces'
import { Card, CardContent, CardMedia, Typography, Button, Link as MuiLink, Box, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useRootStore } from '../App'
import { observer } from 'mobx-react-lite'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import DeleteIcon from '@mui/icons-material/Delete'
interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate()
  const currentLocale = 'en-US'
  const { catalogStore, cartStore, headerStore } = useRootStore()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isAddedToCart, setIsAddedToCart] = useState(false)

  useEffect(() => {
    catalogStore.fetchProducts()
  }, [catalogStore])

  const handleViewDetails = async () => {
    await catalogStore.getProductById(product.id)
    navigate(`/product/${product.id}`, { state: { productDiscount: product.discount } })
  }

  const handleAddToCart = async (productId: string) => {
    if (!isAddedToCart) {
      const cartItem = JSON.parse(localStorage.getItem('cartItem')!)
      console.log('productId:', productId)
      await cartStore.createCart()
      cartStore.addToCart(productId)
      setIsAddedToCart(true)
      console.log(cartItem)
      if (cartItem === null || !cartItem.some((item: { productId: string }) => item.productId === productId)) {
        headerStore.setCartCount(headerStore.cartCount + 1)
      }
    }
  }
  const handleRemoveFromCart = async (productId: string) => {
    await cartStore.removeFromCart(productId)

    // Обновляем cartItemsLocal без использования флага
    // const updatedCartItems = cartItemsLocal.filter((item) => item.productId !== productId)
    // setCartItemsLocal(updatedCartItems)

    headerStore.decrementCartCount()
    setIsAddedToCart(false)
  }

  const iconStyle = {
    border: '1px solid grey',
    borderRadius: '50%',
    padding: '10px',
    marginLeft: '20px',
    '&:hover': {
      backgroundColor: '#555',
      position: 'absolute',
      boxShadow: '0 2px 60px #0000003d',
      border: '1px solid #eaeaea',
    },
  }

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index)
  }

  const mediaStyle: React.CSSProperties = {
    width: '40%',
    alignSelf: 'center',
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', position: 'relative' }}>
      <Card
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
        <CardMedia component="div" sx={mediaStyle}>
          <Carousel selectedItem={selectedImageIndex} showThumbs={false} dynamicHeight onClickItem={handleImageClick}>
            {product.imageUrl &&
              product.imageUrl.map((imageUrl, index) => (
                <div key={index}>
                  <img src={imageUrl} alt={`Product Image ${index}`} className="product" />
                </div>
              ))}
          </Carousel>
        </CardMedia>
        <CardContent sx={{ padding: '1rem', textAlign: 'center' }}>
          <Typography variant="h6" fontWeight={'bold'} fontSize={'15px'}>
            {product.name[currentLocale]}
          </Typography>
          <Typography variant="body2" fontSize={'10px'}>
            {product.description ? product.description[currentLocale] : 'No description available'}
          </Typography>
          <Box display="flex" alignItems="center" justifyContent="center" sx={{ marginTop: '0.5rem' }}>
            <Typography variant="body2" fontSize="12px" fontWeight={'bold'}>
              Price:{' '}
            </Typography>
            {product.discount === null ? (
              <Typography variant="body2" fontSize="12px">
                {product.price.map((price) => (price / 100).toFixed(2)).join(', ')} USD{' '}
                <IconButton
                  color="inherit"
                  style={iconStyle}
                  onClick={() => handleAddToCart(product.id)}
                  disabled={isAddedToCart}
                >
                  <ShoppingCartIcon sx={{ color: '#333' }} />
                </IconButton>
                {isAddedToCart && (
                  <IconButton
                    color="error"
                    style={iconStyle}
                    onClick={() => handleRemoveFromCart(product.id)} // Добавляем обработчик для удаления товара
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Typography>
            ) : (
              <>
                <Typography variant="body2" fontSize="12px" className="text-decoration">
                  {product.price.map((price) => (price / 100).toFixed(2)).join(', ')} USD
                </Typography>
                <Typography variant="body2" fontSize="12px" color={'red'} marginLeft={'5px'}>
                  {product.discount !== null ? (product.discount! / 100).toFixed(2) : ''} USD{' '}
                  <IconButton
                    color="inherit"
                    style={iconStyle}
                    onClick={() => handleAddToCart(product.id)}
                    disabled={isAddedToCart}
                  >
                    <ShoppingCartIcon sx={{ color: '#333' }} />
                  </IconButton>
                  {isAddedToCart && (
                    <IconButton
                      color="error"
                      style={iconStyle}
                      onClick={() => handleRemoveFromCart(product.id)} // Добавляем обработчик для удаления товара
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Typography>
              </>
            )}
          </Box>
          <MuiLink component={Button} color="primary" sx={{ marginTop: '0.1rem' }} onClick={handleViewDetails}>
            View Details
          </MuiLink>
        </CardContent>
      </Card>
    </div>
  )
}

export default observer(ProductCard)
