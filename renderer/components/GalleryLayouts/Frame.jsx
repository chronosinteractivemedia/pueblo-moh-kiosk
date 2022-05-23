import react from "react"
import style from "../GalleryLayouts/GalleryLayouts.module.scss"
import Image from "../Image/Image"
import database from "../../../database.json"

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