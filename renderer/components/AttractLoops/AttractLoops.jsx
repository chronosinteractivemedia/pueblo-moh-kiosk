import React, {useEffect, useRef, useState} from 'react';
import styles from './AttractLoops.module.scss';
import Image from '../Image/Image';
import MedalRotate from "../MedalRotate/MedalRotate";
import {useRouter} from "next/router";

const SLIDE_DELAY_MEDALS = 15000;
const SLIDE_DELAY_IMAGES = 7000;

export default function AttractLoops({attracts}){
  const router = useRouter();
	const currentScreenRef = useRef(-1);
  const [refresh, setRefresh] = useState(0);
	useEffect(() => {
    let timeout;
    function onTimer(){
      const currentScreen = currentScreenRef.current;
      console.log(currentScreen, attracts.slides.length);
      let newScreen;
      if(currentScreen >= attracts.slides.length - 1){
        newScreen = 0;
      } else {
        newScreen = currentScreen + 1;
      }
      console.log('Moving to new screen:', newScreen);
      currentScreenRef.current = newScreen;
      if(attracts.slides[newScreen].type === "medals") {
        timeout = setTimeout(onTimer, SLIDE_DELAY_MEDALS);
        setRefresh(Math.random());
      }
    else {
        timeout = setTimeout(onTimer, SLIDE_DELAY_IMAGES);
        setRefresh(Math.random())
      }
    }
    onTimer();
    return () => clearTimeout(timeout);
	}, []);

  return (
    <div className={styles.component} onClick={() => router.push('/pueblo-recipients')}>
      <div className={styles.content}>
        <div className={styles.heading}>{attracts.title}</div>
        <div className={styles.subheading}>{attracts.subtitle}</div>
        <img className={styles.logo} src="/images/hha-logo.png" alt=""/>
        <div className={styles.button}>Enter</div>
      </div>
      <div className={styles.slides}>
        {attracts.slides.map((slide, idx) => {
          if(slide.type === 'medals') return <div key={idx} className={styles.slide} data-is-active={currentScreenRef.current === idx}><MedalRotate playing={currentScreenRef.current === idx}/></div>
          else if(slide.type === 'image') return <div key={idx} className={styles.slide} data-is-active={currentScreenRef.current === idx}>
            <div className={styles.imageContainer}>
              <Image className={styles.image} src={slide.image} height={1080} width={828}/>
            </div>
          </div>
        })}
      </div>
    </div>
  ); 
}
