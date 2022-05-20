import React from "react";
import style from "../GalleryPerson/GalleryPerson.module.scss"
import Image from "../Image/Image"
import Link from "next/link"
import database from "../../../database.json"

function fetchDatabase (person) {
  return(
    database.peopleDatabase[database.peopleDatabase.findIndex( personDatabase => personDatabase.name === `${person}`)]
  )
}

function GalleryPerson ({person, onClick}){
  return (
    <div className={style.wrapper}>
      <div className={style.navlink} onClick={onClick}>&lt;&nbsp;Back</div>
      <div className={style.content}>
        <Image 
          src={fetchDatabase(person).image}
          width='178'
          height='247'
          position='relative'
        />
        <div className={style.bio}>
          <h2>{fetchDatabase(person).name}</h2>
          <div className={style.bio_outline}></div>
          <p>{fetchDatabase(person).bio}</p>
          <p>See the&nbsp;<Link href="#">Medal of Honor Recipients section</Link>&nbsp;for the full citation.</p>
        </div>
      </div>        
      <ul className={style.bio_table}>
      {fetchDatabase(person).summary.map(function(personSummary){ return (<li><h3 className={style.bio_table_title}>{personSummary.name}</h3><span>{personSummary.value}</span></li>)})}
      </ul>        
    </div>
  )
}

export default GalleryPerson