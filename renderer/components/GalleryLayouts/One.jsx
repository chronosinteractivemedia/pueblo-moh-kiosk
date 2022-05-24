import React from "react";
import style from "../GalleryLayouts/GalleryLayouts.module.scss"
import Image from "../Image/Image";
import database from "../../../database.json"

function findMediaIndex (pageName) {
  return(
    database.mediaGalleries[database.mediaGalleries.findIndex( gallery => gallery.pageTitle === `${pageName}`)]
  )
}

function DetailOne(pageTitle){
  return (
    <div className={style.wrapper_column_two}>
      <div className={style.media_one}>
        <div className={style.gallery_control_background}>
          <div className={style.gallery_control_wrapper}>
            <div className={style.gallery_control_title}>{findMediaIndex(pageTitle).galleries[0].title}</div>
            <h3>{findMediaIndex(pageTitle).galleries[0].type}</h3>
            {findMediaIndex(pageTitle).galleries[0].type.toLowerCase() === "video"? <a  className={style.gallery_control_video}></a> : ''}
            {findMediaIndex(pageTitle).galleries[0].type.toLowerCase() === "gallery"? <a  className={style.gallery_control_gallery}>Enter Gallery</a> : ''}
          </div>
        </div>
        <Image 
          src={findMediaIndex(pageTitle).galleries[0].thumbnail}
          width={932}
          height={621}
          position="relative"
        />
      </div>
    </div>
    ) 
  }

function One({pageTitle}) {
  if(findMediaIndex(pageTitle).galleries.length === 1) {
    return (
    DetailOne(pageTitle)
    )
  } else {
    return (
      <div className={style.warning}><h2>Please specify the correct layout</h2></div>
    )
  }
}


export default One
