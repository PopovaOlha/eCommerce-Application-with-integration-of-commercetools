import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// const clearLocalStorage = () => {
//   localStorage.clear()
// }

// window.addEventListener('beforeunload', clearLocalStorage)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
