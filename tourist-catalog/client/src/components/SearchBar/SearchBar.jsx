import React, { useState } from 'react'
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaUsers } from 'react-icons/fa'
import './SearchBar.css'

const SearchBar = ({ onSearch }) => {
  const [searchData, setSearchData] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  })

  const handleChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(searchData)
  }

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <div className="search-group">
          <FaMapMarkerAlt className="search-icon" />
          <input
            type="text"
            name="location"
            placeholder="Куда поедем?"
            value={searchData.location}
            onChange={handleChange}
          />
        </div>
        
        <div className="search-group">
          <FaCalendarAlt className="search-icon" />
          <input
            type="date"
            name="checkIn"
            value={searchData.checkIn}
            onChange={handleChange}
          />
        </div>
        
        <div className="search-group">
          <FaCalendarAlt className="search-icon" />
          <input
            type="date"
            name="checkOut"
            value={searchData.checkOut}
            onChange={handleChange}
          />
        </div>
        
        <div className="search-group">
          <FaUsers className="search-icon" />
          <input
            type="number"
            name="guests"
            placeholder="Гости"
            min="1"
            value={searchData.guests}
            onChange={handleChange}
          />
        </div>
        
        <button type="submit" className="btn btn-primary">
          <FaSearch /> Найти
        </button>
      </form>
    </div>
  )
}

export default SearchBar