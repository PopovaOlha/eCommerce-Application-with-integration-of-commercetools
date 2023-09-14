import { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
  Box,
  Link,
  List,
  ListItem,
  ListItemText,
  Drawer,
} from '@mui/material'
import PetsIcon from '@mui/icons-material/Pets'
import PhoneIcon from '@mui/icons-material/Phone'

import MenuIcon from '@mui/icons-material/Menu'
import { Link as RouterLink } from 'react-router-dom'

const Header = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen)
  }

  return (
    <>
      <AppBar sx={{ width: '100%', backgroundColor: '#fff' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Link component={RouterLink} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <PetsIcon sx={{ fontSize: isMobile ? 24 : 32, color: '#333' }} />
          </Link>

          {isMobile ? (
            <>
              <IconButton color="inherit" aria-label="menu" onClick={handleDrawerToggle} sx={{ marginRight: 1 }}>
                <MenuIcon sx={{ color: '#333' }} />
              </IconButton>
            </>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Link component={RouterLink} to="/delivery" sx={{ color: '#333', mr: 2, textDecoration: 'none' }}>
                Shipping and payment
              </Link>
              <Link component={RouterLink} to="/return" sx={{ color: '#333', mr: 2, textDecoration: 'none' }}>
                Return
              </Link>
              <Link component={RouterLink} to="/contacts" sx={{ color: '#333', mr: 2, textDecoration: 'none' }}>
                Contacts
              </Link>
              <Link component={RouterLink} to="/catalog" sx={{ color: '#333', mr: 2, textDecoration: 'none' }}>
                Catalog
              </Link>
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                <PhoneIcon sx={{ color: '#333', mr: 1 }} />
                <Typography variant="body2">+123 456 789</Typography>
              </Box>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {isMobile && (
        <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
          <List>
            <ListItem button onClick={handleDrawerToggle}>
              <ListItemText primary="Close menu" />
            </ListItem>
            <ListItem button component={RouterLink} to="/">
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={RouterLink} to="/delivery">
              <ListItemText primary="Shipping and payment" />
            </ListItem>
            <ListItem button component={RouterLink} to="/return">
              <ListItemText primary="Return" />
            </ListItem>
            <ListItem button component={RouterLink} to="/contacts">
              <ListItemText primary="Contacts" />
            </ListItem>
            <ListItem button component={RouterLink} to="/catalog">
              <ListItemText primary="Catalog" />
            </ListItem>
            <ListItem>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PhoneIcon sx={{ color: '#333', mr: 1 }} />
                <Typography variant="body2">+123 456 789</Typography>
              </Box>
            </ListItem>
          </List>
        </Drawer>
      )}
    </>
  )
}

export default Header
