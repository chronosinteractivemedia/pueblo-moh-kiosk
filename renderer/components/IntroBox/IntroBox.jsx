import React from 'react';
import style from '../IntroBox/IntroBox.module.scss'
import Scroller from '../Scroller/Scroller.jsx'
import Image from '../Image/Image';
import database from "../../../database.json"
import AudioPlayer from "../MediaPlayer/AudioPlayer"
import VideoPlayer from "../MediaPlayer/VideoPlayer"


function IntroBox ({dataIndex, onButton}) {

  function paragraph (dataIndex) {
    return database.introPages[dataIndex].description.map(function (text, index){
      return <p
        key={ index }>
          { text }
        </p>      
    })
  }
  
  return(
    <div className={style.wrapper}>
      <div className={ database.introPages[dataIndex].logo ==="" ? style.content : style.content_logo }>
        {database.introPages[dataIndex].logo !== "" ?
          <div className={style.logo}>
            <Image
              src = {database.introPages[dataIndex].logo}
              width = {240}
              height = {240}
              position = "relative"
            />
          </div> : ""  
        }
        <h3>{database.introPages[dataIndex].city}</h3>
        <h2>{database.introPages[dataIndex].title}</h2>
        <div className={style.outline}></div>

        <div className={style.description}>
          <Scroller>
              {paragraph (dataIndex)}
          </Scroller>
        </div>
        
        {database.introPages[dataIndex].button !== "" ? 
        <div className={style.buttonLink}>{database.introPages[dataIndex].button.title}</div> : 
        ""}
        {database.introPages[dataIndex].media.type.toLowerCase()==="audio" ? 
          <div className={style.mediaLink}>
            <AudioPlayer />
          </div> : ""
        }
        {database.introPages[dataIndex].media.type.toLowerCase()==="video" ? 
          <div className={style.mediaLink}>
            <VideoPlayer />
          </div> : "" 
        }          
      </div>
    </div>
  )
}

export default IntroBox