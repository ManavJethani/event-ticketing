import React from 'react'
import { EVENT_PAGE } from '../constants'

const SearchBar = ({ searchCallback }) => {
    return <div>
        <input placeholder={EVENT_PAGE.SEARCH_BAR_PLACEHOLDER} className='search-input' onChange={searchCallback} />
    </div>
}

export default SearchBar