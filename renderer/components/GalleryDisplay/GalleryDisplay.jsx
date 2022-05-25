import react from "react";
import style from "./GalleryDisplay.module.scss"
import Frame from "./layouts/Frame"
import RecipientDetail from "./layouts/RecipientDetail"
import Two from "./layouts/Two";
import One from "./layouts/One";


function GalleryDisplay ({layout, person, children, medias}) {
  return (
    <div className={style.wrapper}>
      {(() => {
        switch(layout){
          case "thumbnails": return <Frame>{children}</Frame>;
          case "person": return <RecipientDetail person={person}/>;
          case "two": return <Two medias={medias} />;
          case "one": return <One medias={medias} />;
        }
      })()}
    </div>
  )
}

export default GalleryDisplay
