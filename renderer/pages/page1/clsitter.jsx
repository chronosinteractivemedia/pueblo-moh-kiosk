import React from "react"
import GalleryPersonLink from "../../components/GalleryPersonLink/GalleryPersonLink.jsx"
import GalleryPersonBio from "../../components/GalleryPersonBio/GalleryPersonBio"
import SectionRight from "../../components/SectionRight/SectionRight"

function Clsitter() {
  return(
    <div className="page-flex-row">
      <GalleryPersonBio />
      <SectionRight>
      <GalleryPersonLink 
          layout='hall-of-fame'
          person='Carl L. Sitter'
        />        
      </SectionRight>
    </div>
  )

}

export default Clsitter