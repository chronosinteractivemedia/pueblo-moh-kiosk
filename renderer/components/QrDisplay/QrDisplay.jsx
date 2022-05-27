import React, { useEffect, useRef } from 'react';
import styles from './QrDisplay.module.scss';
import QRCode from "react-qr-code";

export default function QrDisplay({url, description, isWhite}){
	return <div className={styles.component}>
		<div className={styles.code}>
			<QRCode value={url} size={100} />
		</div>
		<span className={!!isWhite ? styles.desc_white : styles.desc} >
			{description}
		</span>
	</div>
}