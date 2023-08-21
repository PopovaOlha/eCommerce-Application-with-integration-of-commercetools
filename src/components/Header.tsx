import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { observer } from 'mobx-react-lite'
import PetsIcon from '@mui/icons-material/Pets'
import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useRootStore } from '../App'

const Header: React.FC = () => {
  const rootStore = useRootStore()
  const { authStore } = rootStore
  const [isLoggedIn, setIsLoggedIn] = useState(authStore.isAuthenticated)
  const [showAlreadyLoggedInModal, setShowAlreadyLoggedInModal] = useState(false)
  const navigate = useNavigate()

  const handleLogin = () => {
    if (!authStore.isAuthenticated && !localStorage.getItem('authData')) {
      authStore.login()
      setIsLoggedIn(true)
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

  return (
    <>
      <AppBar position="fixed" sx={{ top: 0, left: 0, width: '100%' }}>
        <Toolbar>
          <PetsIcon sx={{ fontSize: 32, marginRight: 10 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Animal Kingdom Market
          </Typography>

          <Button color="inherit" onClick={handleLogin}>
            Вход
          </Button>
          {isLoggedIn ? (
            <>
              <Button color="inherit" onClick={handleLogout}>
                Выход
              </Button>
              <Button color="inherit" startIcon={<ShoppingCartIcon />}>
                Корзина
              </Button>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/registrations">
              Регистрация
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Dialog open={showAlreadyLoggedInModal} onClose={handleCloseModal}>
        <DialogTitle>Вы уже залогинились</DialogTitle>
        <DialogContent>
          <Typography>Вы уже авторизованы на сайте.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default observer(Header)
