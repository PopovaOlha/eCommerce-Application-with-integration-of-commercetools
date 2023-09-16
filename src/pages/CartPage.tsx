import { observer } from 'mobx-react-lite'
import Header from '../components/Header'
import '../index.css'
import { useRootStore } from '../App'
import { Product } from '../types/interfaces'
import { Container, Card, CardContent, CardActions, Typography, IconButton, Grid } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

const CartPage = () => {
  const { cartStore, catalogStore } = useRootStore()

  const cartItems = cartStore.cartItems.map((item) => {
    const product: Product | undefined = catalogStore.getProductById(item.productId)
    if (product) {
      return (
        <Card key={item.productId} className="cart-item">
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                {product.imageUrl.map((image, index) => (
                  <img key={index} src={image} alt={`Product Image ${index}`} className="product-image" />
                ))}
              </Grid>
              <Grid item xs={9}>
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
                  Total Price: ${(item.totalPrice / 100).toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <IconButton aria-label="Remove" color="error" onClick={() => cartStore.removeFromCart(item.productId)}>
              <DeleteIcon />
            </IconButton>
            <IconButton
              aria-label="Increase Quantity"
              onClick={() => cartStore.updateCartItemQuantity(item.productId, item.quantity + 1)}
            >
              <AddIcon />
            </IconButton>
            <IconButton
              aria-label="Decrease Quantity"
              onClick={() => cartStore.updateCartItemQuantity(item.productId, item.quantity - 1)}
            >
              <RemoveIcon />
            </IconButton>
          </CardActions>
        </Card>
      )
    } else {
      return null
    }
  })

  return (
    <Container>
      <Header subcategories={[]} />
      <Grid container spacing={2} className="cart-container">
        {cartItems}
      </Grid>
    </Container>
  )
}

export default observer(CartPage)
