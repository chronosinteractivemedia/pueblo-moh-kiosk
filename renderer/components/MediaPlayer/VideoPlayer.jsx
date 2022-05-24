import React from 'react';
import style from './MediaPlayer.module.scss'


function VideoPlayer({fileURL}){
  return (
    <div className={style.link_video}>
      <a>Play Video</a>
    </div>
  )
}

export default VideoPlayer