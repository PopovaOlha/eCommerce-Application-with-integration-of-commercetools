import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PetsIcon from '@mui/icons-material/Pets'
import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    setIsLoggedIn(false)
    navigate('/')
  }

  return (
    <AppBar position="fixed" sx={{ top: 0, left: 0, width: '100%' }}>
      <Toolbar>
        <PetsIcon sx={{ fontSize: 32, marginRight: 10 }} />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Animal Kingdom Market
        </Typography>
        <Button color="inherit" component={Link} to="/registrations">
          Регистрация
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
          <Button color="inherit" component={Link} to="/login">
            Вход
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
