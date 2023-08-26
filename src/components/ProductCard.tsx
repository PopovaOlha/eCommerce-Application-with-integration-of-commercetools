import React from 'react'
import '../index.css'
import { Product } from '../types/interfaces'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

const cardStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '300px',
  margin: '1rem',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  overflow: 'hidden',
  transition: 'transform 0.2s',
  transform: 'scale(1.05)',
}

const imageStyle: React.CSSProperties = {
  width: '50%',
  alignSelf: 'center',
  objectFit: 'cover',
}

const detailsStyle: React.CSSProperties = {
  padding: '1rem',
  textAlign: 'center',
}

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate()
  const currentLocale = 'en-US'

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`)
  }

  return (
    <Card style={cardStyle}>
      <CardMedia component="img" style={imageStyle} image={product.imageUrl} alt={product.name[currentLocale]} />
      <CardContent style={detailsStyle}>
        <Typography variant="h6">{product.name[currentLocale]}</Typography>
        <Typography variant="body2">
          {product.description ? product.description[currentLocale] : 'No description available'}
        </Typography>
        <Button variant="contained" color="primary" className="product_button" onClick={handleViewDetails}>
          View Details
        </Button>
      </CardContent>
    </Card>
  )
}

export default ProductCard
