const promo = ['SAVE5CART', 'SAVE10CART', 'SAVE20CART']

const PromoCodeList: React.FC = () => {
  return (
    <div style={{ width: '100%', borderTop: '6px solid #333' }}>
      <h2>Active promocodes:</h2>
      <ul style={{ color: '#333' }}>
        {promo.map((promoCode: string) => (
          <li style={{ color: '#333', display: 'block', fontWeight: 'bold' }} key={promoCode}>
            {promoCode}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PromoCodeList
