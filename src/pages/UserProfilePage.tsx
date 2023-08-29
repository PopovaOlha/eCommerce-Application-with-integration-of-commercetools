import { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import UserImg from '../assets/user.png'

const UserProfilePage = () => {
  const [user, setUser] = useState<object | null>(null)

  useEffect(() => {
    const { customer } = JSON.parse(localStorage.getItem('user')!)
    console.log('hello:', customer)
    setUser(customer)
    console.log('userData', customer)
  }, [])
  return (
    <div>
      <Header />
      <div className="user-profile__wrapper">
        <div className="user__block">
          <div className="user-photo">
            <img src={UserImg} alt="user-photo" />
          </div>
        </div>

        <div className="user-data">
          <ul className="user-data__list">
            <li>Name: {user && user?.firstName}</li>
            <li>Last Name : {user && user?.lastName}</li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default observer(UserProfilePage)
