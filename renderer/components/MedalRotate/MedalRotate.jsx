import React, {useEffect, useRef, useState} from 'react';
import styles from './MedalRotate.module.scss';

const SLIDES_COUNT = 3;
const SLIDES_DELAY = 5000;

export default function MedalRotate(){
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if(currentSlide >= SLIDES_COUNT - 1){
        setCurrentSlide(0);
      } else {
        setCurrentSlide(currentSlide + 1);
      }
    }, SLIDES_DELAY);
    return () => clearInterval(interval);
  }, [currentSlide, setCurrentSlide]);

return <div className={styles.component}>
      <ul className={styles.items}>
        <li className={styles.item} data-display={currentSlide === 0}><img src="/images/moh-medal-1.png" alt="" /></li>}
        <li className={styles.item} data-display={currentSlide === 1}><img src="/images/moh-medal-2.png" alt="" /></li>}
        <li className={styles.item} data-display={currentSlide === 2}><img src="/images/moh-medal-3.png" alt="" /></li>}
      </ul>
  </div>
}