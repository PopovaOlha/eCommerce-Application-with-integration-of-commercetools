import { observer } from 'mobx-react-lite'
import Header from '../components/Header'
import '../index.css'
import { useRootStore } from '../App'
import { Product, CartItem } from '../types/interfaces'
import { Container, Card, CardContent, CardActions, Typography, IconButton, Grid, Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { Carousel } from 'react-responsive-carousel'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import api from '../api/axios'

import { commercetoolsConfig } from '../commercetoolsConfig'

const CartPage = () => {
  const { cartStore, catalogStore, headerStore } = useRootStore()
  const [cartItemsLocal, setCartItemsLocal] = useState<CartItem[]>([])
  const [promoCodeInput, setPromoCodeInput] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      await cartStore.createCart()
      const cartId: string = localStorage.getItem('cartId')!
      await cartStore.getCurrentCartState(cartId)

      const items = localStorage.getItem('cartItem')!
      const parsedItems: CartItem[] = JSON.parse(items)
      setCartItemsLocal(parsedItems)
    }

    fetchData()
  }, [cartStore])
  const handleApplyPromoCode = async () => {
    if (promoCodeInput) {
      // cartStore.applyPromoCode(promoCodeInput)
      setPromoCodeInput('')
      try {
        const cartId: string = localStorage.getItem('cartId')!

        const currentCartState = await cartStore.getCurrentCartState(cartId)
        const requestData = {
          version: currentCartState.version,
          actions: [
            {
              action: 'addDiscountCode',
              code: promoCodeInput,
            },
          ],
        }
        await api.post(`${commercetoolsConfig.api}/${commercetoolsConfig.projectKey}/me/carts/${cartId}`, requestData)

        // Обновляем состояние корзины
        await cartStore.getCurrentCartState(cartId)

        // Обновляем состояние cartItemsLocal
        const items = localStorage.getItem('cartItem')!
        const parsedItems: CartItem[] = JSON.parse(items)
        setCartItemsLocal(parsedItems)
      } catch (error) {
        console.error('Произошла ошибка при применении промокода:', error)
      }
    } else {
      alert('Недействительный промокод')
    }
  }

  const calculateTotalPrice = () => {
    let total = 0

    cartItemsLocal.forEach((item) => {
      const product: Product | undefined = catalogStore.getProductById(item.productId)

      if (product) {
        let price = 0

        if (item.discount) {
          price = item.discount
        } else if (typeof item.discountPrice === 'number') {
          price = item.discountPrice
        } else {
          price = item.price
        }

        total += (price * item.quantity) / 100
      }
    })

    return total
  }
  const handleRemoveFromCart = async (productId: string) => {
    await cartStore.removeFromCart(productId)

    // Обновляем cartItemsLocal без использования флага
    const updatedCartItems = cartItemsLocal.filter((item) => item.productId !== productId)
    setCartItemsLocal(updatedCartItems)

    headerStore.decrementCartCount()
  }
  const handleClearCart = async () => {
    try {
      const cartId: string = localStorage.getItem('cartId')!

      const currentCartState = await cartStore.getCurrentCartState(cartId)
      await api.delete(
        `${commercetoolsConfig.api}/${commercetoolsConfig.projectKey}/me/carts/${cartId}?version=${currentCartState.version}`
      )
      localStorage.removeItem('cartId')
      localStorage.removeItem('cartItem')
      headerStore.setCartCount(0)

      setCartItemsLocal([])
    } catch (error) {
      console.error('Произошла ошибка при обновлении количества товара в корзине:', error)
    }
  }
  const handleupdateCartItemQuantity = async (productId: string, quantity: number) => {
    try {
      const cartItemToUpdate = cartItemsLocal.find((item) => item.productId === productId)

      if (!cartItemToUpdate) {
        console.error('Товар не найден в корзине.')
        return
      }

      let updatedCartItem: CartItem
      if (cartItemToUpdate.discount) {
        updatedCartItem = {
          ...cartItemToUpdate,
          quantity: quantity,
          totalPrice: cartItemToUpdate.discount * quantity,
        }
      } else if (typeof cartItemToUpdate.discountPrice === 'number') {
        updatedCartItem = {
          ...cartItemToUpdate,
          quantity: quantity,
          totalPrice: cartItemToUpdate.discountPrice * quantity,
        }
      } else {
        updatedCartItem = {
          ...cartItemToUpdate,
          quantity: quantity,
          totalPrice: cartItemToUpdate.price * quantity,
        }
      }

      // Обновляем корзину на сервере
      await cartStore.updateCartItemQuantity(productId, quantity)

      // Проверяем, если количество товара меньше или равно нулю, то удаляем товар из массива
      if (quantity <= 0) {
        const updatedCartItems = cartItemsLocal.filter((item) => item.productId !== productId)
        setCartItemsLocal(updatedCartItems)
        headerStore.decrementCartCount()
      } else {
        // В противном случае, обновляем cartItemsLocal с обновленными данными
        const updatedCartItems = cartItemsLocal.map((item) => {
          if (item.productId === productId) {
            return updatedCartItem
          }
          return item
        })

        setCartItemsLocal(updatedCartItems)
      }
    } catch (error) {
      console.error('Произошла ошибка при обновлении количества товара в корзине:', error)
    }
  }
  const hasItemsInCart = cartItemsLocal!.some((item) => item !== null)
  const cartItems = cartItemsLocal.map((item) => {
    const product: Product | undefined = catalogStore.getProductById(item.productId)
    if (product) {
      return (
        <>
          <Card key={item.productId} className="cart-item">
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <Carousel showThumbs={false} dynamicHeight>
                    {product.imageUrl.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Product Image ${index}`}
                        className="product-image"
                        style={{ width: '100%', maxWidth: '300px', height: '150px' }}
                      />
                    ))}
                  </Carousel>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <Typography variant="h6" gutterBottom>
                    {product.name['en-US']}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Quantity: {item.quantity}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Price per unit: ${(item.price / 100).toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {item.discount
                      ? `Discount: $${(item.discount / 100).toFixed(2)}`
                      : `Discount Price: ${
                          typeof item.discountPrice === 'string'
                            ? item.discountPrice
                            : `$${(item.discountPrice / 100).toFixed(2)}`
                        }`}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Total Price: ${(item.totalPrice / 100).toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <IconButton aria-label="Remove" color="error" onClick={() => handleRemoveFromCart(item.productId)}>
                <DeleteIcon />
              </IconButton>
              <IconButton
                aria-label="Increase Quantity"
                onClick={() => handleupdateCartItemQuantity(item.productId, item.quantity + 1)}
              >
                <AddIcon />
              </IconButton>
              <IconButton
                aria-label="Decrease Quantity"
                onClick={() => handleupdateCartItemQuantity(item.productId, item.quantity - 1)}
              >
                <RemoveIcon />
              </IconButton>
            </CardActions>
          </Card>
        </>
      )
    } else {
      return null
    }
  })

  return (
    <div>
      <Header subcategories={[]} />
      <Container>
        <Grid key={1} container spacing={2} className="cart-container">
          <div
            style={{
              display: 'inherit',
              margin: '50px auto auto auto',
              marginTop: '50px',
            }}
          >
            <div style={{ padding: '20px 40px' }}>
              <Button variant="outlined" color="primary">
                <Link to="/catalog">CONTINUE SHOPPING</Link>
              </Button>
              <div>
                <input
                  type="text"
                  placeholder="Enter promotional code"
                  value={promoCodeInput}
                  onChange={(e) => setPromoCodeInput(e.target.value)}
                  className="cart-input"
                />
                <button onClick={handleApplyPromoCode}>Apply</button>
              </div>
            </div>
            {hasItemsInCart && (
              <div className="cart-buttons">
                <div>Total Price: ${calculateTotalPrice().toFixed(2)}</div>
                <Button variant="contained" color="primary">
                  Сheckout
                </Button>
                <button onClick={handleClearCart}>Clear Cart</button>
              </div>
            )}
          </div>
          {cartItems}
        </Grid>
      </Container>
    </div>
  )
}

export default observer(CartPage)
