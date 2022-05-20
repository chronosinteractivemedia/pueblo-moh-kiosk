import React, {useState, useEffect} from "react"
import style from "../GalleryLayouts/GalleryLayouts.module.scss"
import database from "../../../database.json"
import Image from '../Image/Image.jsx';

function fetchDatabase (person) {
  return(
    database.peopleDatabase[database.peopleDatabase.findIndex( personDatabase => personDatabase.name === `${person}`)]
  )
}

function PersonThumbnail ({person, onClick}){
  const [currentRecipient, setCurrentRecipient] = useState(null);
  return (
    <a onClick={onClick}>
      <div className={style.wrapper_card}>
        <div className={style.wrapper_image}>
          <Image 
            src={fetchDatabase (person).image}
            width='380'
            height='390'
            position='relative' onClick={() => alert(fetchDatabase (person).name)}
          />
        </div>
        <div className={style.banner}>
          <h2>{fetchDatabase (person).name}</h2>
          <div className={style.playbutton}></div>
        </div>
      </div>
    </a>
  )
}

export default PersonThumbnail