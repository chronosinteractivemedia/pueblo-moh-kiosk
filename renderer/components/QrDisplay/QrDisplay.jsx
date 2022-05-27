import React, { useEffect, useRef } from 'react';
import styles from './QrDisplay.module.scss';
import QRCode from "react-qr-code";

export default function QrDisplay({url, description, isWhite, size}){
	return <div className={styles.component}>
		<div className={styles.code} style={{width:`${size}px`, height:`${size}px`}}>
			<QRCode value={url} size={size} />
		</div>
		<span className={!!isWhite ? styles.desc_white : styles.desc} style={{maxWidth:`${size}px`}}>
			{description}
		</span>
	</div>
}