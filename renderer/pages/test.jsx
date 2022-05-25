import React, {useState, useEffect} from "react"
import SectionLeft from "../components/SectionLeft/SectionLeft.jsx"
import SectionRight from "../components/SectionRight/SectionRight.jsx"
import PersonDetail from "../components/PersonDetail/PersonDetail";
import GalleryDisplay from "../components/GalleryDisplay/GalleryDisplay.jsx";
import IntroBox from "../components/IntroBox/IntroBox";

function Test (){
  const [category, setCategory] = useState('intro')
  return(
    <div className="page-flex-row">
      <SectionLeft width="narrow" >
        <IntroBox 
          dataIndex={0}
        />
      </SectionLeft>
      <SectionRight>
        <GalleryDisplay
          layout ="two"
          pageTitle="Veteran’s Bridge"
        />
      </SectionRight>
    </div>
  )
}

export function getStaticProps(){

}

export default Test
