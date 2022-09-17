import React from 'react'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import SearchBar from './SearchComponent/SearchBar.js/SearchBar'

function Search() {
  return (
    <div>
        <Navbar />
        <SearchBar />
        <Footer />
    </div>
  )
}

export default Search