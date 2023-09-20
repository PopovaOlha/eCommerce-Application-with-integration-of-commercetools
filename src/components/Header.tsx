import React, { useState } from 'react'
import {
  Button,
  IconButton,
  Toolbar,
  Typography,
  AppBar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import PetsIcon from '@mui/icons-material/Pets'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import MenuIcon from '@mui/icons-material/Menu'
import Person from '@mui/icons-material/Person'
import { HeaderProps } from '../types/interfaces'
import { fetchCategoriesWithHierarchy } from '../utils/commercetoolsApi'
import { useRootStore } from '../App'
import { Link as RouterLink } from 'react-router-dom'

const Header: React.FC<HeaderProps> = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { cartStore } = useRootStore()
  const rootStore = useRootStore()
  const { authStore, headerStore } = rootStore
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem('user'))
  const [showAlreadyLoggedInModal, setShowAlreadyLoggedInModal] = useState<boolean>(false)
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleLogin = () => {
    if (!authStore.isAuthenticated && !localStorage.getItem('user')) {
      navigate('/login')
    } else {
      setShowAlreadyLoggedInModal(true)
    }
  }

  const handleCartButtonClick = async () => {
    const cartId: string = localStorage.getItem('cartId')!

    navigate('/cart')
    await cartStore.createCart()
    await cartStore.getCurrentCartState(cartId)
  }

  const handleCategoriesLinkClick = async () => {
    try {
      const categories = await fetchCategoriesWithHierarchy()
      console.log(categories)
      navigate('/categories')
    } catch (error) {
      console.error('Error loading categories:', error)
    }
  }

  const handleLogout = () => {
    authStore.logout()
    setIsLoggedIn(false)
    localStorage.clear()
    navigate('/')
  }

  const handleCloseModal = () => {
    setShowAlreadyLoggedInModal(false)
  }

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen)
  }

  return (
    <>
      <AppBar sx={{ width: '100%', backgroundColor: '#fff', position: 'relative' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <PetsIcon sx={{ fontSize: isMobile ? 24 : 32, color: '#333' }} />
            <Typography
              variant={isMobile ? 'h6' : 'h4'}
              sx={{
                color: '#333',
                ml: 1,
                fontFamily: 'cursive',
                fontWeight: 'bold',
                textDecoration: 'none',
                animation: 'bounce 2s infinite',
              }}
              className="animated-title"
            >
              PetWorld Store
            </Typography>
          </Link>

          {isMobile ? (
            <>
              <IconButton color="inherit" aria-label="menu" onClick={handleDrawerToggle} sx={{ marginRight: 1 }}>
                <MenuIcon sx={{ color: '#333' }} />
              </IconButton>
              <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
                <List>
                  <ListItem button onClick={handleDrawerToggle}>
                    <ListItemText primary="Close menu" />
                  </ListItem>
                  <ListItem button onClick={() => navigate('/')}>
                    <ListItemText primary="Home" />
                  </ListItem>
                  <ListItem button onClick={handleCategoriesLinkClick}>
                    <ListItemText primary="Categories" />
                  </ListItem>
                  {isLoggedIn ? (
                    <>
                      <ListItem button onClick={handleLogout}>
                        <ListItemText primary="Logout" />
                      </ListItem>
                    </>
                  ) : (
                    <ListItem button onClick={handleLogin}>
                      <ListItemText primary="Login" />
                    </ListItem>
                  )}
                  {!isLoggedIn && (
                    <ListItem button component={Link} to="/registrations">
                      <ListItemText primary="Register" />
                    </ListItem>
                  )}
                  <IconButton color="inherit" onClick={handleCartButtonClick}>
                    <ShoppingCartIcon sx={{ color: '#333' }} />
                    <span className="cart-counter" style={{ color: 'red' }}>
                      {headerStore.cartCount}
                    </span>
                  </IconButton>
                  <ListItem button onClick={() => navigate('/user-profile')}>
                    <ListItemText primary="User" />
                  </ListItem>
                </List>
              </Drawer>
              <IconButton color="inherit" onClick={handleCartButtonClick}>
                <ShoppingCartIcon sx={{ color: '#333' }} />
                <span className="cart-counter" style={{ color: 'red' }}>
                  {headerStore.cartCount}
                </span>
              </IconButton>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate('/')} sx={{ color: '#333', marginLeft: '10px' }}>
                Home
              </Button>
              <Button color="inherit" onClick={() => navigate('/about')} sx={{ color: 'blue', marginLeft: '10px' }}>
                About us
              </Button>
              <Button color="inherit" onClick={handleCategoriesLinkClick} sx={{ color: '#333' }}>
                <RouterLink to="/categories">Categories</RouterLink>
              </Button>
              <Button color="inherit" onClick={handleLogin} sx={{ color: '#333' }}>
                Login
              </Button>
              {isLoggedIn ? (
                <>
                  <Button color="inherit" onClick={handleLogout} sx={{ color: '#333' }}>
                    Logout
                  </Button>
                  <Button color="inherit" onClick={() => navigate('/user-profile')} sx={{ color: '#333' }}>
                    <Person sx={{ marginRight: '0.5rem' }} /> User
                  </Button>
                </>
              ) : (
                <Button color="inherit" component={Link} to="/registrations" sx={{ color: '#333' }}>
                  Register
                </Button>
              )}
              <IconButton color="inherit" onClick={handleCartButtonClick}>
                <ShoppingCartIcon sx={{ color: '#333' }} />
                <span className="cart-counter" style={{ color: 'red' }}>
                  {headerStore.cartCount}
                </span>
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Dialog open={showAlreadyLoggedInModal} onClose={handleCloseModal}>
        <DialogTitle>You are already logged in</DialogTitle>
        <DialogContent>
          <Typography>You are already authenticated on the website.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default observer(Header)
