// Registration.tsx
import LoginForm from '../components/RegistrationForm'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

const Registration: React.FC = () => {
  return (
    <div>
      <Link to="/">Back to the main page</Link>
      <h2>Authorization</h2>
      <LoginForm />
    </div>
  )
}

export default observer(Registration)
