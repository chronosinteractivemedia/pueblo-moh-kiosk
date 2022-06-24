import React, {useEffect, useState} from "react"
import database from "../../database.json"
import styles from "./moh-recipients.module.scss"
import {ipcRenderer} from 'electron';
import QrDisplay from "../components/QrDisplay/QrDisplay";

function MohRecipients({}) {
  const [offline, setOffline] = useState(false);
  useEffect(() => {
    window.trackEvent('view-cmoh');
    if (!window.appIsOnline) {
      setOffline(true);
    } else {
      setOffline(false);
      const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      const person = params.p;
      window.navOpenListener = () => {
        ipcRenderer.send("hide-external");
      };
      window.navCloseListener = () => {
        ipcRenderer.send("show-external", person, true);
      };
      ipcRenderer.send("show-external", person);
      return () => {
        window.navOpenListener = undefined;
        window.navCloseListener = undefined;
        ipcRenderer.send("hide-external");
      };
    }
  }, []);



  if (offline)
    return (
      <div className={styles.page}>
        <div className={styles.offlineContainer}>
          <div className={styles.content}>
            <h1>Database Currently Unavailable</h1>
            <p>Internet access is currently not available. To view the database on your phone instead, simply scan the QR code below.</p>
            <QrDisplay 
              url="https://www.cmohs.org/kiosk/explore"
              description="Scan QR code to view" 
              isWhite={true}
              size={84} 
            />
          </div>
          <div className={styles.offlineImage}>
            <img src="/images/cmoh-offline.png" alt="" />
          </div>
        </div>
      </div>
    );
  else
    return (
      <div className={styles.page}>
        <div className={styles.frameContainer}></div>
      </div>
    );
}

export async function getStaticProps({ params }) {
  const areaAttractions = database.attractions;
  return { props: { areaAttractions } };
}

export default MohRecipients;
