// stores/index.tsport
import { createContext, useContext } from 'react'
import RootStore from './stores/RootStore'
import LoginForm from './components/RegistrationForm'

const RootStoreContext = createContext<RootStore | null>(null)

function App() {
  const rootStore = new RootStore()
  return (
    <RootStoreContext.Provider value={rootStore}>
      {/*  */}
      <LoginForm />
    </RootStoreContext.Provider>
  )
}

export default App

export function useRootStore() {
  const context = useContext(RootStoreContext)
  if (!context) {
    throw new Error('useRootStore must be used within a RootStoreProvider')
  }
  return context
}
