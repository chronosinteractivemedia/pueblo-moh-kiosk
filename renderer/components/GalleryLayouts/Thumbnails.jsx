import react from "react"
import style from "../GalleryLayouts/GalleryLayouts.module.scss"
import Image from "../Image/Image"
import database from "../../../database.json"

function Thumbnails (){
  return(
    <div className={style.wrapper_right}> 
      <div className={style.inner_right}>
        <div className={style.wrapper_row}>
          { database.peopleDatabase.map(function(personDatabase){
            return (
              <a 
                href= "#"
              >
                <div className={style.wrapper_card}>
                  <div className={style.wrapper_image}>
                    <Image 
                      src={personDatabase.image}
                      width='380'
                      height='390'
                      position='relative'
                    />
                  </div>
                  <div className={style.banner}>
                    <h2>{personDatabase.name}</h2>
                    <div className={style.playbutton}></div>
                  </div>
                </div>
              </a>
            )
          })}
        </div>    
      </div>
    </div>     
  )
}

export default Thumbnails