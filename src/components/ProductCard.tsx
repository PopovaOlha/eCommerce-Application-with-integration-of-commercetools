import React, { useEffect } from 'react'
import { Product } from '../types/interfaces'
import { Card, CardContent, CardMedia, Typography, Button, Link as MuiLink } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useRootStore } from '../App'
import { observer } from 'mobx-react-lite'

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate()
  const currentLocale = 'en-US'
  const { catalogStore } = useRootStore()

  useEffect(() => {
    catalogStore.fetchProducts()
  }, [catalogStore])

  const handleViewDetails = async () => {
    await catalogStore.getProductById(product.id)
    navigate(`/product/${product.id}`)
  }

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 300,
        margin: '1rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: 8,
        overflow: 'hidden',
        transition: 'transform 0.2s',
        transform: 'scale(1.05)',
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: '50%', alignSelf: 'center', paddingTop: '1rem', objectFit: 'cover' }}
        image={product.imageUrl}
        alt={product.name[currentLocale]}
      />
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
