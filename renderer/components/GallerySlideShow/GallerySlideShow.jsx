import react from "react";
import style from "../GallerySlideShow/GallerySlideShow.module.scss"
import Frame from "../GalleryLayouts/Frame"
import Person from "../GalleryLayouts/Person"
import Two from "../GalleryLayouts/Two";


function GallerySlideShow ({layout, person, children, pageTitle}) {
  return (
    <div className={style.wrapper}>
      {
        layout == "thumbnails" ? <Frame>{children}</Frame> : ''
      }
      {
        layout == "person" ? <Person person={person}/> : ''
      }
      {
        layout == "two" ? <Two pageTitle={pageTitle} /> : ''
      }
      {
        layout == "one" ? <One pageTitle={pageTitle} /> : ''
      }
    </div>
  )
}

export default GallerySlideShow