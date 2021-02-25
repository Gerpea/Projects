import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { searchQuotes } from '../redux/actions'

const Search = ({ className }) => {
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(searchQuotes(search))
  }, [search])

  return (
    <input
      type='text'
      placeholder='Input symbol'
      onChange={(e) => setSearch(e.target.value)}
      className={`search ${className}`}
    />
  )
}

export default Search
