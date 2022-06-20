import React, {useEffect, useState} from 'react';
import style from './MediaPlayer.module.scss'
import {Modal} from "../Modal/Modal";
import ImageSlider from "../ImageSlider/ImageSlider";


function VideoPlayer({file}) {
  const [playing, setPlaying] = useState(false);

  return (<>
      <div className={style.link_video} onClick={() => setPlaying(true)}>
        <a>Play Video</a>
      </div>
      {!!playing &&
        <Modal transparent={true} onClose={() => setPlaying(false)}>
          <ImageSlider slides={[{id: 0, video: file, autoplay: true, }]} onClose={() => setPlaying(false)}/>
        </Modal>}
    </>
  )
}

export default VideoPlayer