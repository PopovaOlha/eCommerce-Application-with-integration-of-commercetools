// Registration.tsx
import LoginForm from '../components/RegistrationForm'
import { Link } from 'react-router-dom'

const Registration = () => {
  return (
    <div>
      <Link to="/">Вернуться на главную</Link>
      <h2>Регистрация</h2>
      <LoginForm />
    </div>
  )
}

export default Registration
