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
        width="wide"
      >
        {/* <IntroBox 
          dataIndex={0}
        /> */}
        <GalleryPerson person="Carl L. Sitter" />
      </SectionLeft>
      <SectionRight>

        <GallerySlideShow 
          layout ="person"
        />
      </SectionRight>
    </div>
  )
}

export default Test