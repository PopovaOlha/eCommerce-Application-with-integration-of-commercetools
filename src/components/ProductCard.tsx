import React, { useEffect, useState } from 'react'
import { Product } from '../types/interfaces'
import { Card, CardContent, CardMedia, Typography, Button, Link as MuiLink } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useRootStore } from '../App'
import { observer } from 'mobx-react-lite'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate()
  const currentLocale = 'en-US'
  const { catalogStore } = useRootStore()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  useEffect(() => {
    catalogStore.fetchProducts()
  }, [catalogStore])

  const handleViewDetails = async () => {
    await catalogStore.getProductById(product.id)
    navigate(`/product/${product.id}`)
  }

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index)
  }

  return (
    <Card
      sx={{
        display: 'flex',
        paddingTop: '20px',
        flexDirection: 'column',
        maxWidth: 300,
        margin: '1rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: 8,
        overflow: 'hidden',
        '&:hover': {
          transition: 'transform 0.3s',
          transform: 'scale(1.05)',
        },
      }}
    >
      <CardMedia component="div" sx={{ width: '50%', alignSelf: 'center' }}>
        <Carousel selectedItem={selectedImageIndex} showThumbs={false} dynamicHeight onClickItem={handleImageClick}>
          {product.imageUrl.map((imageUrl, index) => (
            <div key={index}>
              <img src={imageUrl} alt={`Product Image ${index}`} />
            </div>
          ))}
        </Carousel>
      </CardMedia>
      <CardContent sx={{ padding: '1rem', textAlign: 'center' }}>
        <Typography variant="h6">{product.name[currentLocale]}</Typography>
        <Typography variant="body2">
          {product.description ? product.description[currentLocale] : 'No description available'}
        </Typography>
        <MuiLink component={Button} color="primary" sx={{ marginTop: '1rem' }} onClick={handleViewDetails}>
          View Details
        </MuiLink>
      </CardContent>
    </Card>
  )
}

export default observer(ProductCard)
