import { createContext, useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RootStore from './stores/RootStore'
import Registration from './pages/LoginForm'
import Home from './pages/Home'
import RegistrationForm from './pages/RegistrationForm'
import ProductPage from './pages/ProductPage'
import ProductDetailPage from './pages/ProductDetailPage'
import UserProfilePage from './pages/UserProfilePage'
import NotFound from './pages/NotFound'
// import Header from './components/Header'

const RootStoreContext = createContext<RootStore | null>(null)

function App() {
  const rootStore = new RootStore()
  return (
    <BrowserRouter>
      <RootStoreContext.Provider value={rootStore}>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Registration />} />
          <Route path="/registrations" element={<RegistrationForm />} />
          <Route path="/catalog" element={<ProductPage />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/user-profile" element={<UserProfilePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </RootStoreContext.Provider>
    </BrowserRouter>
  )
}

export default App

export function useRootStore() {
  const context = useContext(RootStoreContext)
  if (!context) {
    throw new Error('useRootStore must be used within a RootStoreProvider')
  }
  return context
}
