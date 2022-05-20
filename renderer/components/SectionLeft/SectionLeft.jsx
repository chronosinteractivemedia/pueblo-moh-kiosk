import React from "react";
import style from "../SectionLeft/SectionLeft.module.scss"
import Introbox from "../IntroBox/IntroBox"
import GalleryPerson from "../GalleryPerson/GalleryPerson";

function SectionLeft({category}) {
  if (category=="intro"){
    return(
      <div className={style.wrapper}>
        <Introbox 
          dataIndex={0}
        />
      </div>
    )
  } else if (category=="person"){
    return (
      <div className={style.wrapper}>
        <GalleryPerson
          person="Carl L. Sitter"
        />
        {/* This Galleryperson will take the onclick from section right and pass data to argument name in <GalleryPerson /> it should also pass the category as "person" */}
      </div>
    )
  } else {
    return false
  }
}

export default SectionLeft