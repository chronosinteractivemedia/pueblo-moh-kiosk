import React from "react"
import style from "./layouts.module.scss"

function Thumbnails ({children}){
  return(
    <div className={style.wrapper_right}> 
      <div className={style.inner_right}>
        <div className={style.wrapper_row}>
          {children}
        </div>    
      </div>
    </div>     
  )
}

export default Thumbnails