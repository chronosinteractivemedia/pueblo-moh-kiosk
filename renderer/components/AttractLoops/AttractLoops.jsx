import React, { useEffect, useState } from 'react';
import styles from './AttractLoops.module.scss';
import Image from '../Image/Image';
import { imgUrl } from '../../config';


export default function AttractLoops(){

  const screens = [
    // dummy screen data gere
    {image: {url: '/noimageyet.jpg'}},
    
  ];

	const [currentScreen, setCurrentScreen] = useState();
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		setCurrentScreen(screens[currentIndex]);
		const interval = setInterval(() => {
			if(screens[currentIndex+1]){
				setCurrentIndex(currentIndex + 1);
			} else {
				setCurrentIndex(0);
			}
		},15000);
		return () => clearInterval(interval);
	}, [currentIndex]);

	if(!currentScreen) return null;

  return (
    <div className={styles.component}>
      <div className={styles.imageContainer}>
        <div className={styles.image} key={currentScreen.image.url}>
          <Image
            loader={({src}) => src}
            src={`${imgUrl}${currentScreen.image.url}`}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  ); 
}
