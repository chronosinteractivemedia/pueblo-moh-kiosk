import React from 'react';
import style from '../IntroBox/IntroBox.module.scss'
import Scroller from '../Scroller/Scroller.jsx'
import Image from '../Image/Image';
import database from "../../../database.json"
import AudioPlayer from "../MediaPlayer/AudioPlayer"
import VideoPlayer from "../MediaPlayer/VideoPlayer"
import Link from "next/link";


function IntroBox({logo, city, title, description, button, audio, video}) {
  return (
    <div className={style.wrapper}>
      <div className={!!logo ? style.content : style.content_logo}>
        {!!logo &&
          <div className={style.logo}>
            <Image
              src={logo}
              width={240}
              height={240}
              position="relative"
            />
          </div>
        }
        {!!city && <h3>{city}</h3>}
        <h2 dangerouslySetInnerHTML={{__html: title}} />
        <div className={style.outline}></div>
        <div className={style.description}>
          <Scroller>
            <div dangerouslySetInnerHTML={{__html: description}}/>
          </Scroller>
        </div>
        {!!button && <Link href={button.href}><a className={style.buttonLink}>{button.title}</a></Link>}
        {!!audio && <div className={style.mediaLink}> <AudioPlayer file={audio} /> </div>}
        {!!video && <div className={style.mediaLink}> <VideoPlayer file={video} /> </div>}
      </div>
    </div>
  )
}

export default IntroBox