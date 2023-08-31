import MenuIcon from '@mui/icons-material/Menu'
import { observer } from 'mobx-react-lite'
import PetsIcon from '@mui/icons-material/Pets'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import React, { useState } from 'react'
import { Person } from '@mui/icons-material'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useRootStore } from '../App'
import { HeaderProps } from '../types/interfaces'

const Header: React.FC<HeaderProps> = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const rootStore = useRootStore()
  const { authStore } = rootStore
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(authStore.isAuthenticated)
  const [showAlreadyLoggedInModal, setShowAlreadyLoggedInModal] = useState<boolean>(false)
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleLogin = () => {
    if (!authStore.isAuthenticated && !localStorage.getItem('authData')) {
      navigate('/login')
    } else {
      setShowAlreadyLoggedInModal(true)
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
      <AppBar sx={{ width: '100%', backgroundColor: '#fff' }}>
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
                <ListItem button onClick={() => navigate('/categories')}>
                  <ListItemText primary="Categories"></ListItemText>
                </ListItem>
                <List>
                  <ListItem button onClick={() => navigate('/')}>
                    <ListItemText primary="Home"></ListItemText>
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
                  <ListItem button>
                    <Link to="*">Cart</Link>
                  </ListItem>
                  <ListItem button onClick={() => navigate('/user-profile')}>
                    <ListItemText primary="User" />
                  </ListItem>
                </List>
              </Drawer>
              <IconButton color="inherit">
                <ShoppingCartIcon sx={{ color: '#333' }} />
              </IconButton>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate('/categories')} sx={{ color: '#333' }}>
                Categories
              </Button>
              <Button color="inherit" onClick={() => navigate('/')} sx={{ color: '#333' }}>
                Home
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
              <IconButton color="inherit">
                <ShoppingCartIcon sx={{ color: '#333' }} />
                <Link to="*">Cart</Link>
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
