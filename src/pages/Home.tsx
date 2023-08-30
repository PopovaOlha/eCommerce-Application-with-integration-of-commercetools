import { observer } from 'mobx-react'
import Footer from '../components/Footer'
import Header from '../components/Header'

function Home() {
  return (
    <div>
      <Header subcategories={[]} />
      <div style={{ minHeight: 'calc(100vh - 70px - 64px)', marginTop: '64px' }} className="content"></div>
      <Footer />
    </div>
  )
}

export default observer(Home)
