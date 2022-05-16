import React from "react"
import GalleryPersonLink from "../../components/GalleryPersonLink/GalleryPersonLink.jsx"
import IntroBox from "../../components/IntroBox/IntroBox.jsx"
import SectionRight from "../../components/SectionRight/SectionRight.jsx"

function pageOne () {
  return(
    <div className="page-flex-row">
      <IntroBox 
        dataIndex={0}
      />
      <SectionRight>
        <GalleryPersonLink 
          layout='person-link'
          person='all'
        />
      </SectionRight>
    </div>
  )
}
export default pageOne