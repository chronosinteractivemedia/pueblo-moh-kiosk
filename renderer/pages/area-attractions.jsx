import React, {useEffect, useState} from "react"
import Header from "../components/Attractions/Header"
import SearchBar from "../components/Attractions/SearchBar"
import Features from "../components/Attractions/Features"
import List from "../components/Attractions/List"
import AttractionPopup from "../components/Attractions/AttractionPopup"
import MultipleAttractionPopup from "../components/Attractions/MultipleAttractionPopup"
import database from "../../database.json"

function AreaAttractions ({areaAttractions}) {
  const [currentAttraction, setCurrentAttraction] = useState();
  const [filterWalkable, setFilterWalkable] = useState(false);
  const [displayList, setDisplayList] = useState([]);

  useEffect(() => {
    if(areaAttractions){
      if(filterWalkable){
        setDisplayList(areaAttractions.filter(item => item.walkable));
      } else {
        setDisplayList(areaAttractions);
      }
    }
  }, [areaAttractions, filterWalkable]);

  return(
    <div>
      {!!currentAttraction && !currentAttraction.videos && <AttractionPopup attraction={currentAttraction} onClose={() => setCurrentAttraction(null)} />}
      {!!currentAttraction && !!currentAttraction.videos && <MultipleAttractionPopup attraction={currentAttraction} onClose={() => setCurrentAttraction(null)} />}
      <div>
        <Header />
        <SearchBar onSetWalkable={setFilterWalkable} />
        <div className="page-flex-row" style={{backgroundColor:"#1E2934", position:"absolute", height:"100%", width: "100%"}}>
          <Features featuresAttractions={areaAttractions} onChooseAttraction={setCurrentAttraction} />
          <List areaAttractions={displayList} onChooseAttraction={setCurrentAttraction} />
        </div>
      </div>  
    </div>
  )
}


export async function getStaticProps({params}) {
  let areaAttractions = database.attractions;
  return { props: { areaAttractions } }
}


export default AreaAttractions