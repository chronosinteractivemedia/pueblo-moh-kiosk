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
    audio.onended = () => {
      setPlaying(false);
    }
    window.navOpenListener = () => setPlaying(false);
    return () => {
      audio.pause();
      window.navOpenListener = undefined;
    }
  }, [file, setAudio, setPlaying]);

  useEffect(() => {
    if (audio) {
      if (playing) audio.play();
      else{
        audio.pause();
        audio.currentTime = 0;
      }
    }
  }, [audio, playing, setPlaying])

  return (
    <div className={style.link_audio} data-playing={playing} onClick={() => setPlaying(!playing)}>
      <a>{playing ? "Stop" : "Play"} Audio</a>
    </div>
  )
}

export default AudioPlayer
