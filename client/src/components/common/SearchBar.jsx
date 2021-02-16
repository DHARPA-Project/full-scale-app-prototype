import React, {useState, useRef, useEffect} from 'react'
import PropTypes from 'prop-types'

import MagnifyingGlassIcon from '../common/icons/MagnifyingGlassIcon'

import './SearchBar.scss'

const SearchBar = ({handleUserQuery, userQuery, searchDelay, placeholder}) => {
    let [query, setQuery] = useState('')

    const timeoutRef = useRef()

    useEffect(() => setQuery(userQuery), [userQuery])

    const handleSearchInput = event => {
        const newQuery = event.target.value.trim() === '' ? '' : event.target.value
        // save search input to component state
        setQuery(newQuery)
        // clear previous timeout if new keyboard input within short timespan (e.g. under 300ms)
        clearTimeout(timeoutRef.current)
        // set timeout to delay saving user input to Redux store to prevent overly frequent store calls
        timeoutRef.current = setTimeout(() => handleUserQuery(newQuery), searchDelay)
    }

    const handleSubmit = event => {
        event.preventDefault()
        handleUserQuery(query)
    }

    return (
        <form className="searchbar-form" onSubmit={handleSubmit}>
            <label className="searchbar-label">
                <input
                    type="search"
                    className="searchbar-input"
                    placeholder={placeholder}
                    value={query}
                    onChange={handleSearchInput}
                />
                <MagnifyingGlassIcon />
            </label>
        </form>
    )
}

SearchBar.propTypes = {
    handleUserQuery: PropTypes.func.isRequired,
    userQuery: PropTypes.string.isRequired,
    searchDelay: PropTypes.number,
    placeholder: PropTypes.string
}

SearchBar.defaultProps = {
    placeholder: 'search...',
    searchDelay: 0 // delay between input keystroke & initializing search to prevent searching repeatedly after every letter
}

export default SearchBar
