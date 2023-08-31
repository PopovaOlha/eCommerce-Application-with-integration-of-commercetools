import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { Container, List, ListItem, ListItemText, Typography, Drawer, Divider, useTheme } from '@mui/material'

interface Subcategory {
  id: number
  name: string
}

interface CategoriesPageProps {
  subcategories: Subcategory[]
}

const CategoriesPage: React.FC<CategoriesPageProps> = ({ subcategories }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const theme = useTheme()

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open)
  }

  const categoryLinkStyle: React.CSSProperties = {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  }

  const categoryItemStyle: React.CSSProperties = {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  }

  const dividerStyle: React.CSSProperties = {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  }

  return (
    <Container maxWidth="md">
      <Header subcategories={subcategories.map((subcategory) => subcategory.name)} />
      <List sx={{ mt: 10 }}>
        {subcategories.map((subcategory) => (
          <Link key={subcategory.id} to={`/categories/${subcategory.name}`} style={categoryLinkStyle}>
            <ListItem disableGutters button style={categoryItemStyle}>
              <ListItemText primary={subcategory.name} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider sx={dividerStyle} />
      <Link to="/catalog" style={categoryLinkStyle}>
        <Typography variant="body1">View All Products</Typography>
      </Link>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          {subcategories.map((subcategory) => (
            <Link key={subcategory.id} to={`/categories/${subcategory.name}`} style={categoryLinkStyle}>
              <ListItem disableGutters button style={categoryItemStyle}>
                <ListItemText primary={subcategory.name} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </Container>
  )
}

export default CategoriesPage
