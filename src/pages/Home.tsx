import { observer } from 'mobx-react'
import Footer from '../components/Footer'
import Header from '../components/Header'

function Home() {
  return (
    <div>
      <Header />
      <Footer />
    </div>
  )
}

export default observer(Home)
