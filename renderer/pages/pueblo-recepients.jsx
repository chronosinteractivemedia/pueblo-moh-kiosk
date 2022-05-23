import React, {useState, useEffect} from "react"
import SectionLeft from "../components/SectionLeft/SectionLeft.jsx"
import SectionRight from "../components/SectionRight/SectionRight.jsx"
import GalleryPerson from "../components/GalleryPerson/GalleryPerson";
import PersonThumbnail from "../components/GalleryLayouts/PersonThumbnail.jsx";
import GallerySlideShow from "../components/GallerySlideShow/GallerySlideShow.jsx";
import IntroBox from "../components/IntroBox/IntroBox";
import database from "../../database.json"

function pageOne () {
  const [currentRecipient, setCurrentRecipient] = useState(null);
  return(
    <div className="page-flex-row">
      <SectionLeft width={!!currentRecipient ? "wide":"narrow"}>
        { !!currentRecipient ? <GalleryPerson person={currentRecipient} onBack={()=> setCurrentRecipient(null)}/> : <IntroBox dataIndex={0} />}
      </SectionLeft>
      <SectionRight>
        {!!currentRecipient ? <GallerySlideShow layout="person" person={currentRecipient} /> : 
        <GallerySlideShow layout="thumbnails" >
          {database.peopleDatabase.map(person => {
            return(<PersonThumbnail person={person.name} onClick={()=> setCurrentRecipient(person.name)}/>)
          })}
        </GallerySlideShow>}
      </SectionRight>
    </div>
  )
}

export default pageOne


