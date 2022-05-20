import React from "react";
import style from "../SectionLeft/SectionLeft.module.scss"
import Introbox from "../IntroBox/IntroBox"
import GalleryPerson from "../GalleryPerson/GalleryPerson";

function SectionLeft({children, width}) {
  return <div className={style.component} data-size={width}>
    <div className={styles.wrapper}>
      {children}
    </div>
  </div>
}

export default SectionLeft