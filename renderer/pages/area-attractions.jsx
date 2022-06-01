import React from "react"
import Header from "../components/Attractions/Header"
import SearchBar from "../components/Attractions/SearchBar"
import Features from "../components/Attractions/Features"
import List from "../components/Attractions/List"
import DetailPopup from "../components/DetailPopup/DetailPopup"

function AreaAttractions ({areaAttraction}) {
  return(
    <div>
      <div>
        <Header />
        <SearchBar />
        <div className="page-flex-row" style={{backgroundColor:"#1E2934", position:"absolute"}}>
          <Features /> 
          <List />
        </div>
      </div>  
    </div>
  )
}


export async function getStaticProps({params}) {
  const areaAttraction = database.attractions;
  return { props: { areaAttraction } }
}


export default AreaAttractions