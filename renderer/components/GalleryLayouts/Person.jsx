import React from "react";
import style from "../GalleryLayouts/GalleryLayouts.module.scss"
import database from "../../../database.json"
import Image from '../Image/Image.jsx';
import VideoPlayer from "../MediaPlayer/VideoPlayer";
import AudioPlayer from "../MediaPlayer/AudioPlayer";
import QrDisplay from "../QrDisplay/QrDisplay"

function fetchDatabase (person) {
  return(
    database.peopleDatabase[database.peopleDatabase.findIndex( personDatabase => personDatabase.name === `${person}`)]
  )
}

function Person({person}){
  return(
    <div className={style.wrapper_right}> 
      <div className={style.inner_right}>      
        <div className={style.wrapper_column_hallfame}>
          <div className={style.wrapper_column}>
            <Image 
              src={fetchDatabase(person).hallfame_image}
              width='543'
              height='508'
              position='relative'
            />
            <p>{fetchDatabase(person).hallfame_image_caption}</p>
          </div>
          <div className={style.wrapper_sideway}>
            {fetchDatabase(person).media.type.toLowerCase() ==='audio' ? <AudioPlayer fileURL={fetchDatabase(person).media.file} /> : "" }
            {fetchDatabase(person).media.type.toLowerCase() ==='video' ? <VideoPlayer fileURL={fetchDatabase(person).media.file} /> : "" } 
            <QrDisplay 
              url= "#"
              description= "Scan QR code to learn more"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Person