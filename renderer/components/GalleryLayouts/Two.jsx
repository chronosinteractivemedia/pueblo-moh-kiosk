import React from "react";
import style from "../GalleryLayouts/GalleryLayouts.module.scss"
import Image from "../Image/Image";
import database from "../../../database.json"

function findMediaIndex (pageName) {
  return(
    database.mediaGalleries[database.mediaGalleries.findIndex( gallery => gallery.pageTitle === `${pageName}`)]
  )
}

function Two({pageTitle}){
  return (
    <div className={style.wrapper_column_two}>
      <div className={style.media}>
        {/* put condition to find type of media */}
        <div className={style.gallery_control_background}>
          <div className={style.gallery_control_title}>{findMediaIndex(pageTitle).galleries[0].title}</div>
          <h3>{findMediaIndex(pageTitle).galleries[0].type}</h3>
          <h3>This </h3>
          {findMediaIndex(pageTitle).galleries[0].type.toLowerCase() === "video"? <a  className={style.gallery_control_video}></a> : ''}
          {findMediaIndex(pageTitle).galleries[0].type.toLowerCase() === "gallery"? <a  className={style.gallery_control_gallery}>Enter Gallery</a> : ''}
        </div>
        <Image 
          src={findMediaIndex(pageTitle).galleries[0].thumbnail}
          width={890}
          height={422}
          position="relative"
        />
      </div>
      <div className={style.media}>
      <div className={style.gallery_control_background}>
          <div className={style.gallery_control_title}>{findMediaIndex(pageTitle).galleries[1].title}</div>
          <h3>{findMediaIndex(pageTitle).galleries[1].type}</h3>
          {findMediaIndex(pageTitle).galleries[1].type.toLowerCase() === "video"? <a  className={style.gallery_control_video}>Video</a> : ''}
          {findMediaIndex(pageTitle).galleries[1].type.toLowerCase() === "gallery"? <a  className={style.gallery_control_gallery}>Enter Gallery</a> : ''}          
        </div>          
      <Image 
          src={findMediaIndex(pageTitle).galleries[1].thumbnail}
          width={890}
          height={422}
          position="relative"
        />
      </div>
    </div>
  )
}

export default Two