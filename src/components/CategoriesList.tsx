import React, { useState, useEffect } from 'react'
import { fetchProductOfCategories } from '../utils/commercetoolsApi'
import { Card, CardContent, CardMedia, Typography, Button, Link as MuiLink, Box, IconButton } from '@mui/material'
import { Category, Product } from '../types/interfaces'
import { Carousel } from 'react-responsive-carousel'
import { useRootStore } from '../App'
import { useNavigate } from 'react-router-dom'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

interface CategoryListProps {
  categories: Category[]
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  const { catalogStore } = useRootStore()
  const navigate = useNavigate()
  const [selectedCategoryId] = useState<string | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0)
  const [isProductListOpen, setIsProductListOpen] = useState(false)
  // console.log(setSelectedCategoryId)

  useEffect(() => {
    if (selectedCategoryId) {
      loadProductsForCategory(selectedCategoryId)
      setIsProductListOpen(true)
    }
  }, [selectedCategoryId])

  useEffect(() => {
    catalogStore.fetchProducts()
  }, [catalogStore])

  const product: Product = products[selectedImageIndex] || {}

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`, { state: { productDiscount: product.discount } })
  }

  const loadProductsForCategory = async (categoryId: string) => {
    try {
      const productDetails = await fetchProductOfCategories(categoryId)
      setProducts(productDetails)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const handleCategoryClick = (categoryId: string) => {
    const subcategoryUrl = `/subcategory/${categoryId}`
    navigate(subcategoryUrl)
  }

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index)
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

  return (
    <div>
      <ul>
        {categories.map((category) => (
          <li key={category.id} style={{ listStyleType: 'none' }}>
            <button onClick={() => handleCategoryClick(category.id)}>{category.name['en-US']}</button>
          </li>
        ))}
      </ul>
      {selectedCategoryId && isProductListOpen && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', position: 'relative' }}>
          {products.map((product) => (
            <Card
              key={product.id}
              sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                width: '250px',
                height: '350px',
                margin: 0,
                padding: '15px 15px 20px',
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
                      <IconButton color="inherit" style={iconStyle}>
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
                        <IconButton color="inherit" style={iconStyle}>
                          <ShoppingCartIcon sx={{ color: '#333' }} />
                        </IconButton>
                      </Typography>
                    </>
                  )}
                </Box>
                <MuiLink component={Button} color="primary" sx={{ marginTop: '0.1rem' }} onClick={handleViewDetails}>
                  View Details
                </MuiLink>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoryList
