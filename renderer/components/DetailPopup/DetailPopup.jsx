import React from 'react';
import styles from './DetailPopup.module.scss';
import Scroller from "../Scroller/Scroller";

export default function DetailPopup({children}){
  return <Modal >
    <div className={styles.component}>
    {children}
  </div>
  </Modal>
}
export function DetailPopupLeft({children}){
  return <div className={styles.left}>
    <Scroller>
      {children}
    </Scroller>
  </div>
}
export function DetailPopupRight({children}){
  return <div className={styles.right}>{children}</div>
}
