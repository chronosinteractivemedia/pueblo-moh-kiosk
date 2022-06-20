import React, {useEffect, useState} from "react"
import Header from "../components/Attractions/Header"
import SearchBar from "../components/Attractions/SearchBar"
import Features from "../components/Attractions/Features"
import List from "../components/Attractions/List"
import AttractionPopup from "../components/Attractions/AttractionPopup"
import MultipleAttractionPopup from "../components/Attractions/MultipleAttractionPopup"
import database from "../../database.json"
import { isRegExp } from "lodash"

function AreaAttractions ({areaAttractions, attractionsLanding}) {
  const [currentAttraction, setCurrentAttraction] = useState();
  const [filterWalkable, setFilterWalkable] = useState(false);
  const [filterType, setFilterType] = useState('All');
  const [displayList, setDisplayList] = useState([]);

  useEffect(() => {window.trackEvent('view-attractions')}, []);

  useEffect(() => {
    console.log(filterType);
    if(areaAttractions){
      let filtered = [...areaAttractions];

      if(filterWalkable){
        filtered = filtered.filter(item => item.walkable);
      }
      if(filterType !== 'All'){
        filtered =  filtered.filter(item => item.types.includes(filterType))
      }
      setDisplayList(filtered);
    }
  }, [areaAttractions, filterWalkable, filterType]);

  return(
    <div>
      {!!currentAttraction && !currentAttraction.videos && <AttractionPopup attraction={currentAttraction} onClose={() => setCurrentAttraction(null)} />}
      {!!currentAttraction && !!currentAttraction.videos && <MultipleAttractionPopup attraction={currentAttraction} onClose={() => setCurrentAttraction(null)} />}
      <div>
        <Header attractionsLanding={attractionsLanding} />
        <SearchBar onSetWalkable={setFilterWalkable} onSetType={setFilterType}/>
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
  let attractionsLanding = database.attractionsLanding;
  return { props: { areaAttractions, attractionsLanding } }
}


export default AreaAttractions