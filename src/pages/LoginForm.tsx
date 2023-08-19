// Registration.tsx
import LoginForm from '../components/RegistrationForm'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

const Registration: React.FC = () => {
  return (
    <div>
      <Link to="/">Вернуться на главную</Link>
      <h2>Авторизация</h2>
      <LoginForm />
    </div>
  )
}

export default observer(Registration)
