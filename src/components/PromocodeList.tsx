import React, { useEffect, useState } from 'react'
import { useRootStore } from '../App'

const PromoCodeList: React.FC = () => {
  const { cartStore } = useRootStore()
  const [activePromoCodes, setActivePromoCodes] = useState<string[]>([])

  useEffect(() => {
    const fetchActivePromoCodes = async () => {
      try {
        const promoCodes = await cartStore.getActivePromoCodes()
        localStorage.setItem('promoCodes', promoCodes)
        setActivePromoCodes(promoCodes)
      } catch (error) {
        console.error('Ошибка при загрузке активных промокодов:', error)
      }
    }

    fetchActivePromoCodes()
  }, [])

  return (
    <div style={{ width: '100%', borderTop: '6px solid #333' }}>
      <h2>Active promocodes:</h2>
      <ul style={{ color: '#333' }}>
        {activePromoCodes.map((promoCode) => (
          <li key={promoCode}>{promoCode}</li>
        ))}
      </ul>
    </div>
  )
}

export default PromoCodeList
