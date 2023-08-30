// Registration.tsx
import LoginForm from '../components/RegistrationForm'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

const Registration: React.FC = () => {
  return (
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
        className="login-wrapper"
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
  )
}

export default observer(Registration)
