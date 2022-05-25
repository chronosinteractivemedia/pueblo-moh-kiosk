import React, {useEffect, useRef, useState} from 'react';
import style from './MediaPlayer.module.scss'


function AudioPlayer({file}) {
  const [playing, setPlaying] = useState(false);
  const [audio, setAudio] = useState();
  console.log('audio');
  useEffect(() => {
    const audio = document.createElement('AUDIO');
    audio.src = file;
    setAudio(audio);
  }, [setAudio]);

  useEffect(() => {
    if (audio) {
      if (playing) audio.play();
      else audio.pause();
    }
  }, [audio, playing, setPlaying])

  return (
    <div className={style.link_audio} data-playing={playing} onClick={() => setPlaying(!playing)}>
      <a>{playing ? "Pause" : "Play"} Audio</a>
    </div>
  )
}

export default AudioPlayer
