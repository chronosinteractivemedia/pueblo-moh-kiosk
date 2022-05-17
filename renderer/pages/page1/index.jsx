import React from "react"
import GalleryPersonLink from "../../components/GalleryPersonLink/GalleryPersonLink.jsx"
import IntroBox from "../../components/IntroBox/IntroBox.jsx"

function pageOne () {
  return(
    <div className="page-flex-row">
      <IntroBox 
        dataIndex={0}
      />
      <GalleryPersonLink 
        layout='person-link'
        person='all'
      />
    </div>
  )
}
export default pageOne