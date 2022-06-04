import React, {useState, useEffect} from "react"
import bridgeRecipients from "../bridge-data/data.json"
import VetBridge from "../components/VetBridge/VetBridge";
import styles from './veterans-bridge.module.scss';
import {useRouter} from "next/router";
function PuebloRecipients({recipients, detail}) {
  const router = useRouter();
  return (
    <div className="page">
      <div className={styles.title}>Veteran’s Bridge</div>
      <div className={styles.back} onClick={() => router.back()}>&lt; Back</div>
      <VetBridge allVets={recipients} />
    </div>
  )
}

export async function getStaticProps(_context) {
  return {
    props: { recipients: bridgeRecipients }
  }
}

export default PuebloRecipients


