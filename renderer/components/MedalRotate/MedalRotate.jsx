import React, {useEffect, useRef, useState} from 'react';
import styles from './MedalRotate.module.scss';

const SLIDES_COUNT = 3;
const SLIDES_DELAY = 5000;

export default function MedalRotate({ playing }) {
  const [currentSlide, setCurrentSlide] = useState(-1);

  useEffect(() => {
    if(playing){
      setCurrentSlide(0);
    } else {
      setCurrentSlide(-1);
    }
  }, [playing]);

  useEffect(() => {
    let timeout;
    if (currentSlide !== -1) {
      console.log("STARTING INTERVAL");
      timeout = setTimeout(() => {
        console.log("EXEC INTERVAL");
        if (currentSlide >= SLIDES_COUNT - 1) {
          setCurrentSlide(0);
        } else {
          setCurrentSlide(currentSlide + 1);
        }
      }, SLIDES_DELAY);
    }
    return () => {
      if(timeout){
        console.log("unmounting medals");
        clearTimeout(timeout);
      }
    };
  }, [currentSlide, setCurrentSlide]);

  return (
    <div className={styles.component}>
      <ul className={styles.items}>
        <li className={styles.item} data-display={currentSlide === 0}>
          <img src="/images/moh-medal-1.png" alt="" />
        </li>
        <li className={styles.item} data-display={currentSlide === 1}>
          <img src="/images/moh-medal-2.png" alt="" />
        </li>
        <li className={styles.item} data-display={currentSlide === 2}>
          <img src="/images/moh-medal-3.png" alt="" />
        </li>
      </ul>
    </div>
  );
}