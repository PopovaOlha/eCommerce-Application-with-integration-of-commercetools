import { observer } from 'mobx-react'
import Header from '../components/Header'

function Home() {
  return (
    <div>
      <Header />
    </div>
  )
}

export default observer(Home)
