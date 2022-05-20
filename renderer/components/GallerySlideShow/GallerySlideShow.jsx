import react from "react";
import style from "../GallerySlideShow/GallerySlideShow.module.scss"
import Frame from "../GalleryLayouts/Frame"
import Person from "../GalleryLayouts/Person"


function GallerySlideShow ({layout, person, children}) {
  return (
    <div className={style.wrapper}>
      {
        layout == "thumbnails" ?  <Frame>{children}</Frame> : ''
      }
      {
        layout == "person" ?  <Person person={person}/> : ''
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