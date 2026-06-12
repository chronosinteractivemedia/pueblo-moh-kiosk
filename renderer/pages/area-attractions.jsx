import React, {useEffect, useState} from "react"
import Header from "../components/Attractions/Header"
import SearchBar from "../components/Attractions/SearchBar"
import Features from "../components/Attractions/Features"
import List from "../components/Attractions/List"
import AttractionPopup from "../components/Attractions/AttractionPopup"
import MultipleAttractionPopup from "../components/Attractions/MultipleAttractionPopup"
import ThreeOverOneAttractionPopup from "../components/Attractions/ThreeOverOneAttractionPopup"
import database from "../../database.json"

function AreaAttractions ({areaAttractions, attractionsLanding}) {
  const [currentAttraction, setCurrentAttraction] = useState();
  const [filterWalkable, setFilterWalkable] = useState(false);
  const [filterType, setFilterType] = useState('All');
  const [displayList, setDisplayList] = useState([]);
  const currentAttractionHasVideos = currentAttraction?.videos?.length > 0;
  const useThreeOverOnePopup = currentAttractionHasVideos && currentAttraction.use_3_over_1 === true;

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
      {!!currentAttraction && !currentAttractionHasVideos && <AttractionPopup attraction={currentAttraction} onClose={() => setCurrentAttraction(null)} />}
      {!!currentAttraction && currentAttractionHasVideos && !useThreeOverOnePopup && <MultipleAttractionPopup attraction={currentAttraction} onClose={() => setCurrentAttraction(null)} />}
      {!!currentAttraction && useThreeOverOnePopup && <ThreeOverOneAttractionPopup attraction={currentAttraction} onClose={() => setCurrentAttraction(null)} />}
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
