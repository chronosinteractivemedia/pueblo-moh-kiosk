import React from 'react';
import style from './MediaPlayer.module.scss'


function AudioPlayer({fileURL}){
  return (
    <div className={style.link_audio}>
      <a>Play Audio</a>
    </div>
  )
}
export default AudioPlayer