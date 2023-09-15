import { useState, useEffect } from 'react'
import { Drawer, Button } from '@mui/material'
import CategoryList from '../components/CategoriesList'
import { Category } from '../types/interfaces'
import { observer } from 'mobx-react-lite'
import { fetchCategoriesWithHierarchy } from '../utils/commercetoolsApi'

function AdaptiveButton() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

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
  }, [])

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={toggleDrawer}
        sx={{
          margin: '16px',
          padding: '10px 16px',
          fontSize: '10px',
          display: { xs: 'block', sm: 'none' },
          color: '#333',
        }}
      >
        More Categories
      </Button>
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
            backgroundColor: '#f9f9f9',
            textAlign: 'center',
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
              color: '#333',
            }}
          >
            Close Categories
          </Button>
          <CategoryList categories={categories} />
        </div>
      </Drawer>
    </div>
  )
}

export default observer(AdaptiveButton)
