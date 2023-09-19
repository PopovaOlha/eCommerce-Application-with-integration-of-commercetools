import React, { useState } from 'react'
import { TextField, IconButton, Paper, List, ListItem, ListItemText } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useRootStore } from '../App'

interface SearchBarProps {
  onSearch: (query: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const { catalogStore } = useRootStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isDropdownOpen, setDropdownOpen] = useState(false)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    setSearchQuery(query)

    if (query.trim() === '') {
      setSuggestions([])
      setDropdownOpen(false)
      return
    }

    const filteredSuggestions = catalogStore.products
      .filter((product) => product.name['en-US'].toLowerCase().startsWith(query.toLowerCase()))
      .map((product) => product.name['en-US'].toLowerCase())

    setSuggestions(filteredSuggestions)
    setDropdownOpen(true)
  }

  const handleSearchClick = () => {
    onSearch(searchQuery)
    setDropdownOpen(false)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion)
    setDropdownOpen(false)
    onSearch(suggestion)
  }

  return (
    <div>
      <TextField
        variant="outlined"
        placeholder="Search products..."
        value={searchQuery}
        onChange={handleInputChange}
        style={{ width: '50%', margin: '15px', backgroundColor: 'white', borderRadius: '8px' }}
      />
      <IconButton onClick={handleSearchClick} aria-label="Search">
        <SearchIcon />
      </IconButton>
      {isDropdownOpen && (
        <Paper elevation={3} style={{ position: 'absolute', width: '100%' }}>
          <List>
            {suggestions.map((suggestion) => (
              <ListItem key={suggestion} button onClick={() => handleSuggestionClick(suggestion)}>
                <ListItemText primary={suggestion} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </div>
  )
}

export default SearchBar
