import { observer } from 'mobx-react-lite'
import { useRootStore } from '../App'
import { Product } from '../types/interfaces'
import Header from '../components/Header'

function CartPage() {
  const { cartStore, catalogStore } = useRootStore()

  const calculateTotalPrice = () => {
    let total = 0
    cartStore.cartItems.forEach((item) => {
      const product: Product | undefined = catalogStore.getProductById(item.productId)
      if (product) {
        total += (product.price[0] * item.quantity) / 100
      }
    })
    return total
  }

  return (
    <div>
      <Header subcategories={[]} />
      <ul style={{ margin: '80px 40px' }}>
        {cartStore.cartItems.map((item) => (
          <li key={item.productId}>
            Product ID: {item.productId} <br />
            Quantity: {item.quantity} <br />
            <button onClick={() => cartStore.removeFromCart(item.productId)}>Remove</button>
            <button onClick={() => cartStore.updateCartItemQuantity(item.productId, item.quantity + 1)}>+</button>
            <button onClick={() => cartStore.updateCartItemQuantity(item.productId, item.quantity - 1)}>-</button>
          </li>
        ))}
      </ul>
      <div>Total Price: ${calculateTotalPrice().toFixed(2)}</div>
    </div>
  )
}

export default observer(CartPage)
