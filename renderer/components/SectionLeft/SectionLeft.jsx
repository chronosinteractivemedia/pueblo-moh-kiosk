import React from "react";
import style from "../SectionLeft/SectionLeft.module.scss"


function SectionLeft({children, width}) {
  return (
    <div className={style.wrapper} data-width={width} key={Math.random()}>
      {children}
    </div>
  )
}

export default SectionLeft