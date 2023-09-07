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

    // Здесь мы фильтруем товары по имени и формируем список подсказок (suggestions).
    // Мы также устанавливаем флаг isDropdownOpen, чтобы открыть выпадающее окно.

    const filteredSuggestions = catalogStore.products
      .filter((product) => product.name['en-US'].includes(query.toLowerCase()))
      .map((product) => product.name['en-US'])

    setSuggestions(filteredSuggestions)
    setDropdownOpen(true)
  }

  const handleSearchClick = () => {
    // При нажатии на кнопку поиска вызываем обработчик onSearch с текущим запросом.
    onSearch(searchQuery)
    // Закрываем выпадающее окно.
    setDropdownOpen(false)
  }

  const handleSuggestionClick = (suggestion: string) => {
    // При клике на подсказку:
    // - Заполняем поле поиска выбранной подсказкой.
    setSearchQuery(suggestion)
    // - Закрываем выпадающее окно.
    setDropdownOpen(false)
    // - Вызываем обработчик onSearch с выбранной подсказкой для выполнения поиска.
    onSearch(suggestion)
  }

  return (
    <div>
      <TextField variant="outlined" placeholder="Search products..." value={searchQuery} onChange={handleInputChange} />
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
