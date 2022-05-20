import React, {useState, useEffect} from "react"
import SectionLeft from "../components/SectionLeft/SectionLeft.jsx"

function pageOne () {
  const [leftCategory, setLeftCategory] = useState('intro')
  // parse the entire object later.
  return(
    <div className="page-flex-row">
      <SectionLeft 
        category = {leftCategory}
      />
    </div>
  )
}

export default pageOne