import React, {useState} from "react"
import Header from "../components/Attractions/Header"
import SearchBar from "../components/Attractions/SearchBar"
import Features from "../components/Attractions/Features"
import List from "../components/Attractions/List"
import AttractionPopup from "../components/Attractions/AttractionPopup"
import database from "../../database.json"

function AreaAttractions ({areaAttractions}) {
  console.log("Hi there")
  return(
    <div>
      <div style={{position:"absolute"}}>
        <AttractionPopup 
          attraction={areaAttractions[0]}
        />
      </div>
      <div>
        <Header />
        <SearchBar />
        <div className="page-flex-row" style={{backgroundColor:"#1E2934", position:"absolute", height:"100%"}}>
          <Features /> 
          <List 
            onList={() => {console.log(areaAttractions[1].name)}}
          />
        </div>
      </div>  
    </div>
  )
}


export async function getStaticProps({params}) {
  const areaAttractions = database.attractions;
  return { props: { areaAttractions } }
}


export default AreaAttractions