import React, {useState, useEffect} from "react"
import SectionLeft from "../components/SectionLeft/SectionLeft.jsx"
import GalleryPerson from "../components/GalleryPerson/GalleryPerson";
import IntroBox from "../components/IntroBox/IntroBox";

function pageOne () {
  const [currentRecipient, setCurrentRecipient] = useState(null);
  return(
    <div className="page-flex-row">
      <SectionLeft width={!!currentRecipient ? "wide" : "narrow"}> //children of this are always 100%
        {!!currentRecipient ?
          <GalleryPerson person={currentRecipient} />
          :
          <IntroBox />
        }
      </SectionLeft>
      <SectionRight width={!!currentRecipient ? "narrow" : "wide"}> //children of this are always 100% width
        {!!currentRecipient ?
          <GalleryPersonRightDetails person={currentRecipient} />
          :
          <GalleryPersonSelection setCurrentRecepient={setCurrentRecipient} />
          //inside the above component, when a thumbnail is clicked, the entire json object for that person is passed to setCurrentRecipient
        }
      </SectionRight>
    </div>
  )
}

export default pageOne


//to get object keys
for(let key in jsonOnject){
  console.log(key); //print out each key in object
}

