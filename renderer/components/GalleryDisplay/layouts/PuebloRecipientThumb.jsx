import React from "react"
import style from "./layouts.module.scss"
import Image from '../../Image/Image.jsx';

function PuebloRecipientThumb ({person, onClick}){
  return (
    <a onClick={onClick}>
      <div className={style.wrapper_card}>
        <div className={style.wrapper_image}>
          <Image 
            src={person.image}
            width='380'
            height='390'
            position='relative'
          />
        </div>
        <div className={style.banner}>
          <h2>{person.name}</h2>
          <div className={style.playbutton}></div>
        </div>
      </div>
    </a>
  )
}

export default PuebloRecipientThumb