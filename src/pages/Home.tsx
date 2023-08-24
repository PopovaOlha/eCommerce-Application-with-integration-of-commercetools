import { observer } from 'mobx-react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <Link to="/catalog">Catalog</Link>
      <Header />
      <Footer />
    </div>
  )
}

export default observer(Home)
