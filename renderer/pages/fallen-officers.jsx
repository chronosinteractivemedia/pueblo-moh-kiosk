import React, {useState, useEffect} from "react"
import fallenOfficersData from "../fallen-peace-officers-data/data.json"
import FallenOfficers from "../components/FallenOfficers/FallenOfficers";
import styles from './fallen-officers.module.scss';
import {useRouter} from "next/router";
function PuebloRecipients({recipients, branches, wars}) {
  const router = useRouter();
  return (
    <div className="page">
      <div className={styles.title}>Pueblo latino legacies of courage</div>
      <div className={styles.back} onClick={() => router.back()}>&lt; Back</div>
      <FallenOfficers allVets={recipients} branches={branches} wars={wars} />
    </div>
  )
}

export async function getStaticProps(_context) {
  const clean = fallenOfficersData.map(recipient => {
    return {...recipient, fullName: `${recipient.FirstName} ${recipient.LastName}`}
  })
  return {
    props: { recipients: clean }
  }
}

export default PuebloRecipients


