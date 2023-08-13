import { createContext, useContext } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import RootStore from './stores/RootStore'
import Registration from './pages/Registration';
import Home from './pages/Home'

const RootStoreContext = createContext<RootStore | null>(null)

function App() {
  const rootStore = new RootStore()
  return (
    <BrowserRouter>
    <RootStoreContext.Provider value={rootStore}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registrations" element={<Registration />} />
      </Routes>
    </RootStoreContext.Provider>
    </BrowserRouter>
  )
}

export default App;

export function useRootStore() {
  const context = useContext(RootStoreContext)
  if (!context) {
    throw new Error('useRootStore must be used within a RootStoreProvider')
  }
  return context
}