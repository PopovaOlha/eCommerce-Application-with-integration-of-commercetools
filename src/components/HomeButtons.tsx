import { Container, Grid, Paper } from '@mui/material'
import { useEffect, useState } from 'react'
import CategoryList from '../components/CategoriesList'
import { Category } from '../types/interfaces'
import { observer } from 'mobx-react-lite'
import { fetchCategoriesWithHierarchy } from '../utils/commercetoolsApi'

function HomeButton() {
  const [categories, setCategories] = useState<Category[]>([])
  console.log(setCategories)

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
        <Grid container spacing={3}>
          {categories.map((category) => (
            <Grid item key={category.id} xs={12} sm={6} md={4} lg={4}>
              <Paper elevation={3} style={categoryPaperStyle}>
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
