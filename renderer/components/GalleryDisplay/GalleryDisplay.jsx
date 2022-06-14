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
          case "thumbnails": return <Frame key={Math.random()}>{children}</Frame>;
          case "person": return <RecipientDetail key={Math.random()} person={person}/>;
          case "two": return <Two key={Math.random()} medias={medias} />;
          case "one": return <One  key={Math.random()} medias={medias} />;
        }
      })()}
    </div>
  )
}

export default GalleryDisplay
