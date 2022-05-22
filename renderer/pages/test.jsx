import React, {useState, useEffect} from "react"
import SectionLeft from "../components/SectionLeft/SectionLeft.jsx"
import SectionRight from "../components/SectionRight/SectionRight.jsx"
import GalleryPerson from "../components/GalleryPerson/GalleryPerson";
import GallerySlideShow from "../components/GallerySlideShow/GallerySlideShow.jsx";
import IntroBox from "../components/IntroBox/IntroBox";

function Test (){
  const [category, setCategory] = useState('intro')
  return(
    <div className="page-flex-row">
      <SectionLeft
        width="narrow"
      >
        <IntroBox 
          dataIndex={2}
        />
      </SectionLeft>
      
      <SectionRight>
        <GallerySlideShow 
          layout ="two"
          pageTitle="home of heroes"
        />
      </SectionRight>
    </div>
  )
}

export default Test