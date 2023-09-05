import '../index.css'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { observer } from 'mobx-react-lite'
import CategoryList from '../components/CategoriesList'
import { Category } from '../types/interfaces'
import { useEffect, useState } from 'react'
import { fetchCategoriesWithHierarchy } from '../utils/commercetoolsApi'
import { Container, Grid, Paper } from '@mui/material'

function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])

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

  const categoryPaperStyle = {
    marginTop: '80px',
    backgroundColor: '#333',
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

  return (
    <div>
      <Header subcategories={[]} />
      <Container style={{ marginTop: '32px' }}>
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
