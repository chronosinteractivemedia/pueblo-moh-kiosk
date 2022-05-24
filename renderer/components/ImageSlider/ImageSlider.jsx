import React, {useEffect, useRef, useState} from "react";
import Image from "../Image/Image";
import {imgUrl} from "../../config";
import styles from "./ImageSlider.module.scss";
import {BsChevronLeft, BsChevronRight, BsPause, BsPlay} from "react-icons/bs";

export default function ImageSlider({slides}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [videoStarted, setVideoStarted] = useState(false);
  const [videoPaused, setVideoPaused] = useState(false);
  const videoRef = useRef();
  useEffect(() => {
    let newSlide = currentSlide;
    if (currentSlide < 0) {
      newSlide = slides.length - 1;
    } else if (currentSlide >= slides.length) {
      newSlide = 0;
    }
    console.log(newSlide);
    if (newSlide !== currentSlide) {
      setCurrentSlide(newSlide);
      setVideoPaused(false);
      setVideoStarted(false);
    }
  }, [currentSlide]);

  useEffect(() => {
    if(videoRef.current){
      if(videoStarted){
        if(!videoPaused){
          videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      }

    }
  }, [videoStarted, videoPaused, videoRef])

  function toggleVideoPlay(){
    if(videoStarted){
      setVideoPaused(!videoPaused);
    } else {
      setVideoStarted(true);
    }
  }

  const slide = slides[currentSlide];
  if(!slide) return null;
  return (
    <div className={styles.component}>
      {(slides.length > 1) && (<>
        <div className={styles.prev} onClick={() => setCurrentSlide(currentSlide - 1)}><BsChevronLeft/></div>
        <div className={styles.next} onClick={() => setCurrentSlide(currentSlide + 1)}><BsChevronRight/></div>
      </>)}
      <div className={styles.slider} data-length={slides.length}>
        <div
          key={slide.id}
          className={`${styles.slide} ${styles.isActive}`}
        >
          {!slide.video ?
            <img src={slide.image} alt={slide.caption}/>
            :
            <div className={`${styles.videoPlayer} ${videoStarted ? styles.videoStarted : ''} ${videoPaused ? styles.videoPaused : ''}`}
                 onClick={() => toggleVideoPlay()}
                 style={{backgroundImage: `url(${slide.image})`}}>
              <video ref={videoRef} src={slide.video} autoPlay={false} controls={false}/>
              <div className={styles.playIcon}><BsPlay /></div>
              <div className={styles.pauseIcon}><BsPause /></div>
            </div>
          }
          {(slides.length > 1) && <div className={styles.counter}>
            {currentSlide + 1} of {slides.length}
          </div>}
          {!!slide.caption && (
            <div className={styles.desc}>
              {slide.caption}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
