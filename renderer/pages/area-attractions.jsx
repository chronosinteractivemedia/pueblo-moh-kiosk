import React from "react"
import Header from "../components/Attractions/Header"
import SearchBar from "../components/Attractions/SearchBar"
import Features from "../components/Attractions/Features"
import List from "../components/Attractions/List"

function AreaAttractions () {
  return(
    <div>
      <Header />
      <SearchBar />
      <div className="page-flex-row" style={{backgroundColor:"#1E2934", position:"absolute"}}>
        <Features /> 
        <List />
      </div>
    </div>
  )
}

export default AreaAttractions