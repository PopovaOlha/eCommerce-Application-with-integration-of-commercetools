import { useState, useEffect } from 'react'
import { Drawer, Container, Grid, Paper, Typography, Button } from '@mui/material'
import CategoryList from '../components/CategoriesList'
import { Category } from '../types/interfaces'
import { observer } from 'mobx-react-lite'
import { fetchCategoriesWithHierarchy } from '../utils/commercetoolsApi'

function HomeButton() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

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

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleCategoryClick = (categoryId: string) => {
    console.log(`Category clicked with ID: ${categoryId}`)
  }

  return (
    <div>
      {!isMobile && (
        <Container
          sx={{
            listStyle: 'none',
            padding: '16px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            gap: '20px',
            justifyContent: 'space-between',
          }}
        >
          {categories.map((category) => (
            <Grid item key={category.id} xs={12} sm={6} md={4} lg={4}>
              <Paper
                elevation={3}
                onClick={() => handleCategoryClick(category.id)}
                sx={{
                  padding: '16px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '8px' }}
                ></Typography>
                <CategoryList categories={[category]} />
              </Paper>
            </Grid>
          ))}
        </Container>
      )}

      <Drawer
        anchor="top"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: '100%',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            transition: 'transform 0.2s ease-in-out',
            transformOrigin: 'top center',
          },
        }}
      >
        <div style={{ padding: '16px' }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={toggleDrawer}
            sx={{
              margin: '0 auto',
              display: { xs: 'block', sm: 'none' },
            }}
          >
            Close Categories
          </Button>
          <h2>Categories</h2>
          <CategoryList categories={categories} />
        </div>
      </Drawer>
    </div>
  )
}

export default observer(HomeButton)
