import React from 'react'
import { Link } from 'react-router-dom'

const NotFound: React.FC = () => {
  return (
    <div>
      <Link to="/">Back to the main page</Link>
      <h2>404 - Page not found</h2>
      <p>sorry, the requested page was not exist</p>
    </div>
  )
}

export default NotFound
