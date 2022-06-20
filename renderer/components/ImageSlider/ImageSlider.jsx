import React, {useEffect, useRef, useState} from "react";
import Image from "../Image/Image";
import {imgUrl} from "../../config";
import styles from "./ImageSlider.module.scss";
import {BsChevronLeft, BsChevronRight, BsPause, BsPlay} from "react-icons/bs";
import {FiRefreshCcw} from 'react-icons/fi';

export default function ImageSlider({slides, onClose}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [videoStarted, setVideoStarted] = useState(false);
  const [videoPaused, setVideoPaused] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const videoRef = useRef();

  useEffect(() => {
    if(slides && slides.length === 1 && slides[0].video) window.trackEvent(`view-video: ${slides[0].video}`);
    else if(slides && slides[0] && slides[0].track_id) window.trackEvent(`view-gallery: ${slides[0].video}`);
  }, [slides]);

  useEffect(() => {
    let interval;
    if(videoRef.current){
      if( slides.length === 1){
        videoRef.current.onended = () => {
          if(onClose) onClose();
        }
      }
      interval = setInterval(() => {
        setVideoProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
      }, 33);
    }
    return () => {
      clearInterval(interval);
      setVideoProgress(0);
    }
  },[videoRef, slides, setVideoProgress])

  useEffect(() => {
    let newSlide = currentSlide;
    if (currentSlide < 0) {
      newSlide = slides.length - 1;
    } else if (currentSlide >= slides.length) {
      newSlide = 0;
    }
    if (newSlide !== currentSlide) {
      setCurrentSlide(newSlide);
      setVideoPaused(false);
      setVideoStarted(false);
    }
  }, [currentSlide]);

  useEffect(() => {
    let interval;
    if(videoRef.current){
      if(videoStarted){
        if(!videoPaused){
          videoRef.current.play();
          interval = setInterval(window.interruptResetTimer, 1000);
        } else {
          videoRef.current.pause();
          clearInterval(interval)
        }
      }
    }
    return () => clearInterval(interval);
  }, [videoStarted, videoPaused, videoRef])

  useEffect(() => {
    if(videoRef.current && slides[currentSlide].autoplay){
      setVideoStarted(true);
    }
  }, [videoRef, currentSlide]);

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
              <div className={styles.progress} style={{'width': `${videoProgress}%`}}></div>
              <div className={styles.playIcon}><BsPlay /></div>
              <div className={styles.pauseIcon}><BsPause /></div>
              <div className={styles.restart} onClick={(e) => {
                e.stopPropagation();
                videoRef.current.currentTime = 0
              }}><FiRefreshCcw /></div>
            </div>
          }
          {(slides.length > 1) && <div className={styles.counter}>
            {currentSlide + 1} of {slides.length}
          </div>}
          {!!slide.caption && (
            <div className={styles.desc} dangerouslySetInnerHTML={{__html: slide.caption}} />
          )}
        </div>
      </div>
    </div>
  );
}
