import React, {useEffect, useState} from "react"
import database from "../../database.json"
import styles from "./moh-recipients.module.scss"

function MohRecipients ({}) {
  return(
    <div className={styles.page}>
      <div className={styles.frameContainer}>
        <iframe className={styles.frame} src="//www.cmohs.org/kiosk/explore" frameBorder="0" />
      </div>
    </div>
  )
}


export async function getStaticProps({params}) {
  const

areaAttractions = database.attractions;
return { props: { areaAttractions } }
}
export default MohRecipients
