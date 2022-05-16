import React from "react"
import Link from 'next/link';
import style from '../GalleryPersonBio/GalleryPersonBio.module.scss'
import Image from "../Image/Image";

// import GalleryPersonLink from "../components/GalleryPersonLink/GalleryPersonLink.jsx"
// import SectionRight from "../components/SectionRight/SectionRight.jsx"

function GalleryPersonBio () {
  return(
    <div className={style.wrapper}>
      <Link href='/page1/main'>
        <div className={style.navlink}>&lt;&nbsp;Back</div>
      </Link>
      <div className={style.content}>
        <Image 
          src="../../images/people/103-Carl-1961-1.jpg"
          width='178'
          height='247'
          position='relative'
        />
      </div>
    </div>
  )
}

export default GalleryPersonBio