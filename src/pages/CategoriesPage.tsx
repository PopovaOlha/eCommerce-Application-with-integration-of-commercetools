import '../index.css'
import React, { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { observer } from 'mobx-react-lite'
import CategoryList from '../components/CategoriesList'
import { Category } from '../types/interfaces'
import { fetchCategoriesWithHierarchy } from '../utils/commercetoolsApi'
import { Container, Grid, Paper, Typography, Divider, useTheme } from '@mui/material'
import { Link } from 'react-router-dom'
import { useRootStore } from '../App'
function CategoriesPage() {
  const theme = useTheme()
  const [categories, setCategories] = useState<Category[]>([])
  const { catalogStore } = useRootStore()
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const { subCategories } = await fetchCategoriesWithHierarchy()
        setCategories(subCategories)
      } catch (error) {
        console.error('Error loading categories:', error)
      }
    }
    loadCategories()
  }, [])
  useEffect(() => {
    catalogStore.fetchProducts()
  }, [])
  const categoryPaperStyle = {
    marginTop: '60px',
    backgroundColor: '#bbe4e9',
    listStyle: 'none',
    padding: '16px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.03)',
    },
  }

  const categoryLinkStyle: React.CSSProperties = {
    textDecoration: 'none',
    marginTop: '100px',
    marginLeft: '100px',
    textDecorationLine: 'underline',
    display: 'block',
    color: theme.palette.text.primary,
  }
  const dividerStyle: React.CSSProperties = {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  }

  return (
    <div>
      <Header subcategories={[]} />
      <Divider sx={dividerStyle} />
      <Link to="/catalog" style={categoryLinkStyle}>
        <Typography variant="body1">View All Products</Typography>
      </Link>
      <Container style={{ marginTop: '22px' }}>
        <Grid container spacing={3}>
          {categories.map((category) => (
            <Grid item key={category.id} xs={12} sm={6} md={4} lg={3}>
              <Paper elevation={3} style={categoryPaperStyle}>
                <CategoryList categories={[category]} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
      <div style={{ minHeight: 'calc(100vh - 70px - 64px)', marginTop: '64px' }} className="content"></div>
      <Footer />
    </div>
  )
}

export default observer(CategoriesPage)
