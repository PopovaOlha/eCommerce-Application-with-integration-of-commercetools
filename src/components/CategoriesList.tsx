import React, { useState, useEffect } from 'react'
import { fetchProductOfCategories } from '../utils/commercetoolsApi'
import { Card, CardContent, CardMedia, Typography, Button, Link as MuiLink, Box } from '@mui/material'
import { Category, Product } from '../types/interfaces'
import { Carousel } from 'react-responsive-carousel'
import { useRootStore } from '../App'
import { useNavigate } from 'react-router-dom'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

interface CategoryListProps {
  categories: Category[]
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  const { categoryStore } = useRootStore()
  const navigate = useNavigate()
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0)

  useEffect(() => {
    if (selectedCategoryId) {
      loadProductsForCategory(selectedCategoryId)
    }
  }, [selectedCategoryId])

  const loadProductsForCategory = async (categoryId: string) => {
    try {
      const productDetails = await fetchProductOfCategories(categoryId)
      setProducts(productDetails)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategoryId(categoryId)
  }

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index)
  }

  const handleViewDetails = async () => {
    if (selectedCategoryId) {
      await categoryStore.getProductById(selectedCategoryId)
      navigate(`/product/${selectedCategoryId}`)
    }
  }

  return (
    <div>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <button onClick={() => handleCategoryClick(category.id)}>{category.name['en-US']}</button>
          </li>
        ))}
      </ul>
      {selectedCategoryId && (
        <div>
          {products.map((product) => (
            <Card
              key={product.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: 300,
                height: 430,
                margin: '1rem',
                paddingTop: '20px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                borderRadius: 8,
                overflow: 'hidden',
                '&:hover': {
                  transition: 'transform 0.3s',
                  transform: 'scale(1.05)',
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
                      {product.price.map((price) => (price / 100).toFixed(2)).join(', ')} USD
                    </Typography>
                  ) : (
                    <>
                      <Typography variant="body2" fontSize="12px" className="text-decoration">
                        {product.price.map((price) => (price / 100).toFixed(2)).join(', ')} USD
                      </Typography>
                      <Typography variant="body2" fontSize="12px" color="red" marginLeft="5px">
                        {product.discount !== null ? (product.discount! / 100).toFixed(2) : ''} USD
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
