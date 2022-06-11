import React, { useEffect, useState } from "react";
import style from "./layouts.module.scss"
import Image from '../../Image/Image.jsx';
import VideoPlayer from "../../MediaPlayer/VideoPlayer";
import AudioPlayer from "../../MediaPlayer/AudioPlayer";
import QrDisplay from "../../QrDisplay/QrDisplay"
import {ipcRenderer} from 'electron';

function RecipientDetail({person}){
  useEffect(() => {
    if(person.lightingCommand){
      console.log('sending lighting command: ', person.lightingCommand);
      ipcRenderer.send('send-serial-command', person.lightingCommand);
    }
    return () => {
      console.log('sending lighting command: ', 'X0401');
      ipcRenderer.send('send-serial-command', 'X0401');
    }
  }, []);
  return(
    <div className={style.wrapper_right}> 
      <div className={style.inner_right}>      
        <div className={style.wrapper_column_hallfame}>
          <div className={style.wrapper_column}>
            <div className={style.detailrecipient_border}>
              <Image 
                src={person.hallfame_image}
                width='543'
                height='508'
                position='relative'
              />
            </div>
            <p>{person.hallfame_image_caption}</p>
          </div>
          <div className={style.wrapper_sideway}>
            {person.media.type.toLowerCase() ==='audio' ? <AudioPlayer file={person.media.file} /> : "" }
            {person.media.type.toLowerCase() ==='video' ? <VideoPlayer file={person.media.file} /> : "" }
            {!!person.qrcode && <QrDisplay
              isWhite={true}
              url={person.qrcode}
              description= {person.qrcode_label}
              size={85}
            />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipientDetail