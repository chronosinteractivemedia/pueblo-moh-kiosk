import React from "react";
import style from "../GalleryLayouts.module.scss"

function one ({pageTitle}){
  return (
    <div className={style.wrapper_column_one}>
      <div className={style.media}>
        {/* put condition to find type of media */}
        <div className={style.gallery_control_background}>
          <div className={style.gallery_control_title}>{findMediaIndex(pageTitle).galleries[0].title}</div>
          <h3>{findMediaIndex(pageTitle).galleries[0].type}</h3>
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
    </div>
  )
}