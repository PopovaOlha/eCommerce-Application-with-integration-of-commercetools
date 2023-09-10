import React from 'react'
import { Link, useLocation } from 'react-router-dom'

interface BreadcrumbProps {
  categories: string[]
  isSearchPage: boolean
  searchQuery?: string
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ categories, isSearchPage }) => {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)
  const breadcrumbs = []

  breadcrumbs.push(
    <li key="home">
      <Link to="/">•Home•</Link>
    </li>
  )

  pathnames.forEach((pathname, index) => {
    const url = `/${pathnames.slice(0, index + 1).join('/')}`
    const category = categories.find((cat) => `/${cat}` === url)

    breadcrumbs.push(
      <li key={url}>
        {isSearchPage && index === pathnames.length - 1 ? 'search' : <Link to={url}>{category || pathname}</Link>}
      </li>
    )
  })

  return (
    <nav style={{ marginTop: '80px' }}>
      <ul style={{ display: 'flex', gap: '2px', paddingLeft: '10px', listStyleType: 'none' }}>{breadcrumbs}</ul>
    </nav>
  )
}

export default Breadcrumb
