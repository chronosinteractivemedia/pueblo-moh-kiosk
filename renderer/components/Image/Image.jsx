import React from 'react';
import styles from './Image.module.scss';

export default function Image({src, width, height, position, className}){
	return <div className={`${styles.component} ${className} image`} style={{backgroundImage: `url(${src})`, width: `${width}px`, height:`${height}px`, position:`${position}`}} />
}
