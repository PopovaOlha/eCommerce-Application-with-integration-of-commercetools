import { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import UserImg from '../assets/user.png'
import '../styles/user-profile.scss'

interface Address {
  city: string
  country: string
  postalCode: string
  state: string
  streetName: string
}

interface User {
  firstName: string
  lastName: string
  dateOfBirth: string
  addresses: Address[]
}

const UserProfilePage = () => {
  const [user, setUser] = useState<User | null>(null)

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
        <div className="user-info">
          <div className="user__block">
            <div className="user-photo">
              <img src={UserImg} alt="user-photo" />
            </div>
          </div>

          <div className="user__data">
            <div className="user-data__list">
              <div className="user-data__item">
                <p className="title">Name:</p> <p>{user && user?.firstName}</p>
              </div>
              <div className="user-data__item">
                <p className="title">Last Name:</p> <p>{user && user?.lastName}</p>
              </div>
              <div className="user-data__item">
                <p className="title">Date of birth:</p>{' '}
                {/* <p>{user && user?.dateOfBirth.split('-').reverse().join('-')}</p> */}
                {/* Here we still don't have dateOfBirth in the customer object which we get from commercetools*/}
                <p>{user && user?.dateOfBirth}</p>
              </div>
              <button className="profile-button" type="button">
                Edit profile
              </button>
            </div>
          </div>
        </div>
        <div className="addresses">
          <div className="addresses__list">
            <div className="addresses__item">
              <p className="title address-title">Billing adress:</p>
              <div className="adress_list">
                <div className="address__item">
                  <p className="subtitle">City:</p> <p>{user && user?.addresses[0].city}</p>
                </div>
                <div className="address__item">
                  <p className="subtitle">Country:</p> <p>{user && user?.addresses[0].country}</p>
                </div>
                <div className="address__item">
                  <p className="subtitle">Postal code:</p> <p>{user && user?.addresses[0].postalCode}</p>
                </div>
                <div className="address__item">
                  <p className="subtitle">State:</p> <p>{user && user?.addresses[0].state}</p>
                </div>
                <div className="address__item">
                  <p className="subtitle">Street:</p> <p>{user && user?.addresses[0].streetName}</p>
                </div>
              </div>
            </div>

            <div className="addresses__item">
              <p className="title address-title">Shipping Address</p>
              <div>
                <div className="address__item">
                  <p className="subtitle">City:</p> <p>{user && user?.addresses[0].city}</p>
                </div>
                <div className="address__item">
                  <p className="subtitle">Country:</p> <p>{user && user?.addresses[0].country}</p>
                </div>
                <div className="address__item">
                  <p className="subtitle">Postal code:</p> <p>{user && user?.addresses[0].postalCode}</p>
                </div>
                <div className="address__item">
                  <p className="subtitle">State:</p> <p>{user && user?.addresses[0].state}</p>
                </div>
                <div className="address__item">
                  <p className="subtitle">Street:</p> <p>{user && user?.addresses[0].streetName}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default observer(UserProfilePage)
