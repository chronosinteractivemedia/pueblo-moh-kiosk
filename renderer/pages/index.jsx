import React, {useState} from "react"
import database from "../../database.json"
import AttractLoops from "../components/AttractLoops/AttractLoops";

function PageId({attractData}) {
  return <div>
    <AttractLoops attracts={attractData} />
  </div>
}

export async function getStaticProps({params}) {
  const attractData = database.attracts;
  return { props: { attractData } }
}

export default PageId


