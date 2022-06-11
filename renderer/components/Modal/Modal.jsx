import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
import styles from "./Modal.module.scss";
import {MdClose} from "react-icons/md";

export function Modal({ children, index = 0, transparent = false, onClose}) {
  useEffect(() => {
      if(window.navOpenListener) window.navOpenListener();
      return() => {
        if(window.navCloseListener) window.navCloseListener();
      }
  }, [])
  const output = (
    <div className={styles.component} data-transparent={transparent}>
      <div className={styles.wrapper}>
        <div className={styles.close} onClick={onClose}>Back <MdClose /></div>
        {children}
      </div>
    </div>
  );

  let container;
  if(typeof window !== 'undefined'){
    container = window?.document?.querySelector(index === 0 ? "#modal0" : "#modal1");
  }
  return container ? ReactDom.createPortal(output, container) : null;
}
