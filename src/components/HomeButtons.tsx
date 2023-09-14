import { Container, Grid, Paper, useMediaQuery, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import CategoryList from '../components/CategoriesList'
import { Category } from '../types/interfaces'
import { observer } from 'mobx-react-lite'
import { fetchCategoriesWithHierarchy } from '../utils/commercetoolsApi'

function HomeButton() {
  const [categories, setCategories] = useState<Category[]>([])
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

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

  const categoryPaperMobileStyle = {
    ...categoryPaperStyle,
    fontSize: '0.5rem',
    padding: '8px',
    margin: '12px',
  }

  return (
    <div>
      <Container
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          width: '50%',
          transform: 'translate(-50%, -50%)',
          listStyle: 'none',
          padding: '16px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        <Grid container spacing={isMobile ? 1 : 3}>
          {categories.map((category) => (
            <Grid item key={category.id} xs={12} sm={6} md={4} lg={4}>
              <Paper elevation={3} style={isMobile ? categoryPaperMobileStyle : categoryPaperStyle}>
                <CategoryList categories={[category]} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  )
}
export default observer(HomeButton)
