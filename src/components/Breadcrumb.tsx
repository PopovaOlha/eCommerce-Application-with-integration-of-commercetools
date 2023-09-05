import React from 'react'
import { Link } from 'react-router-dom'

interface BreadcrumbProps {
  categories: string[]
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ categories }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {categories.map((category, index) => (
          <li key={index}>
            <Link to={`/categories/${category}`}>{category}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Breadcrumb
