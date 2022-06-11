import React, {useEffect, useState} from "react"
import database from "../../database.json"
import styles from "./moh-recipients.module.scss"
import {ipcRenderer} from 'electron';
import { useRouter } from "next/router";
function MohRecipients ({}) {
  useEffect(() => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });

    const person = params.p;

    window.navOpenListener = () => {
      ipcRenderer.send('hide-external');
    };
    window.navCloseListener = () => {
      ipcRenderer.send('show-external', person, true);
    };

    ipcRenderer.send('show-external', person);
    return () => {
      window.navOpenListener = undefined;
      window.navCloseListener = undefined;
      ipcRenderer.send('hide-external');
    };
  }, []);
  return(
    <div className={styles.page}>
      <div className={styles.frameContainer}>
      </div>
    </div>
  )
}

export async function getStaticProps({params}) {
  const areaAttractions = database.attractions;
  return { props: { areaAttractions } }
}

export default MohRecipients
