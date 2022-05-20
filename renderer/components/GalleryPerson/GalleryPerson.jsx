import React from "react";
import style from "../GalleryPerson/GalleryPerson.module.scss"
import Image from "../Image/Image"
import Link from "next/link"
import database from "../../../database.json"

function GalleryPerson ({person}){
  return (
    <div className={style.wrapper}>
      <div className={style.navlink}>&lt;&nbsp;Back</div>
      <div className={style.content}>
        <Image 
          src={database.peopleDatabase[database.peopleDatabase.findIndex( personDatabase => personDatabase.name === `${person}`)].image}
          width='178'
          height='247'
          position='relative'
        />
        <div className={style.bio}>
          <h2>{database.peopleDatabase[database.peopleDatabase.findIndex( personDatabase => personDatabase.name === `${person}`)].name}</h2>
          <div className={style.bio_outline}></div>
          <p>{database.peopleDatabase[database.peopleDatabase.findIndex( personDatabase => personDatabase.name === `${person}`)].bio}</p>
          <p>See the&nbsp;<Link href="#">Medal of Honor Recipients section</Link>&nbsp;for the full citation.</p>
        </div>
      </div>        
      <ul className={style.bio_table}>
        {database.peopleDatabase.map(function(personDatabase){
              return (
                <li><span className={style.bio_table_title}></span><span className={style.bio_table_description}></span></li>
              )})}
      </ul>        
    </div>
  )
}

export default GalleryPerson