import { observer } from 'mobx-react'
import '../index.css'
import Footer from '../components/Footer'
import Header from '../components/Header'

import backgroundImage from '../images/1660766295_41-kartinkin-net-p-fon-dlya-zootovarov-krasivo-45.png'

function Home() {
  const backgroundStyle = {
    minHeight: 'calc(100vh - 70px - 64px)',
    marginTop: '64px',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  return (
    <div>
      <Header subcategories={[]} />
      <div style={backgroundStyle} className="content"></div>
      <Footer />
    </div>
  )
}

export default observer(Home)
