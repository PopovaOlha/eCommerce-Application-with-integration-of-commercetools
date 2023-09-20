// Registration.tsx
import LoginForm from '../components/RegistrationForm'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Registration: React.FC = () => {
  return (
    <div>
      <Header subcategories={[]} />
      <div
        style={{
          marginTop: '64px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100vh - 64px)',
        }}
      >
        <div
          style={{
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            padding: '20px 40px',
          }}
        >
          <Link to="/">Back to the main page</Link>
          <h2>Authorization</h2>
          <LoginForm />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default observer(Registration)
