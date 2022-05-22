import react from "react";
import style from "../GallerySlideShow/GallerySlideShow.module.scss"
import Frame from "../GalleryLayouts/Frame"
import Person from "../GalleryLayouts/Person"
import Two from "../GalleryLayouts/Two";


function GallerySlideShow ({layout, person, children, pageTitle}) {
  return (
    <div className={style.wrapper}>
      {
        layout == "thumbnails" ?  <Frame>{children}</Frame> : ''
      }
      {
        layout == "person" ?  <Person person={person}/> : ''
      }
      {
        layout == "three" ?  <div>Three</div> : ''
      }
            {
        layout == "two" ?  <Two pageTitle={pageTitle} /> : ''
      }
            {
        layout == "one" ?  <div>One</div> : ''
      }
    </div>
  )
}

export default GallerySlideShow