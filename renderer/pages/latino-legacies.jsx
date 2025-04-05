import React, {useState, useEffect} from "react"
import latinoLegacies from "../latino-data/data.json"
import LatinoLegacies from "../components/LatinoLegacies/LatinoLegacies";
import styles from './latino-legacies.module.scss';
import {useRouter} from "next/router";
function PuebloRecipients({recipients, branches, wars}) {
  const router = useRouter();
  return (
    <div className="page">
      <div className={styles.title}>Pueblo latino legacies of courage</div>
      <div className={styles.back} onClick={() => router.back()}>&lt; Back</div>
      <LatinoLegacies allVets={recipients} branches={branches} wars={wars} />
    </div>
  )
}

export async function getStaticProps(_context) {
  const clean = latinoLegacies.map(recipient => {
    return {...recipient, fullName: `${recipient.FirstName} ${recipient.LastName}`}
  })
  return {
    props: { recipients: clean }
  }
}

export default PuebloRecipients



