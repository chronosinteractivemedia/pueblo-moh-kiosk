import react from "react";
import style from "../GallerySlideShow/GallerySlideShow.module.scss"
import Thumbnails from "../GalleryLayouts/Thumbnails"
import Person from "../GalleryLayouts/Person"


function GallerySlideShow ({layout}) {
  return (
    <div className={style.wrapper}>
      {
        layout == "thumbnails" ?  <Thumbnails /> : ''
      }
      {
        layout == "person" ?  <Person person="Carl L. Sitter"/> : ''
      }
      {
        layout == "Three" ?  <div>Three</div> : ''
      }
            {
        layout == "Two" ?  <div>Two</div> : ''
      }
            {
        layout == "One" ?  <div>One</div> : ''
      }
    </div>
  )
}

export default GallerySlideShow