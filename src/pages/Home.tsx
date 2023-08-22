import { observer } from 'mobx-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

function Home() {
  return (
    <div>
      <Header />
      <Footer />
    </div>
  )
}

export default observer(Home)
