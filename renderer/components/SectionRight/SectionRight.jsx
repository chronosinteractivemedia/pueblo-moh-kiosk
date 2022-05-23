import React from "react";
import style from "../SectionRight/SectionRight.module.scss"


function SectionRight({children}) {
  return (
    <div className={style.wrapper}>
      {children}
    </div>
  )
}
export default SectionRight