import React from "react";
import style from "./layouts.module.scss"
import database from "../../../../database.json"
import Image from '../../Image/Image.jsx';
import VideoPlayer from "../../MediaPlayer/VideoPlayer";
import AudioPlayer from "../../MediaPlayer/AudioPlayer";
import QrDisplay from "../../QrDisplay/QrDisplay"

function RecipientDetail({person}){
  return(
    <div className={style.wrapper_right}> 
      <div className={style.inner_right}>      
        <div className={style.wrapper_column_hallfame}>
          <div className={style.wrapper_column}>
            <Image 
              src={person.hallfame_image}
              width='543'
              height='508'
              position='relative'
            />
            <p>{person.hallfame_image_caption}</p>
          </div>
          <div className={style.wrapper_sideway}>
            {person.media.type.toLowerCase() ==='audio' ? <AudioPlayer file={person.media.file} /> : "" }
            {person.media.type.toLowerCase() ==='video' ? <VideoPlayer file={person.media.file} /> : "" }
            {!!person.qrcode && <QrDisplay
              url={person.qrcode} description= "Scan QR code to learn more"
            />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipientDetail