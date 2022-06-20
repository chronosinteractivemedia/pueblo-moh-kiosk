import React, {useState} from "react";
import style from "./layouts.module.scss"
import Image from "../../Image/Image";
import ImageSlider from "../../ImageSlider/ImageSlider";
import {Modal} from "../../Modal/Modal";

function DetailOne(medias, setShowSlides){
  return (
    <div className={style.wrapper_column_two}>
      <div className={style.media_wrapper}>
        <div className={style.media_one} onClick={() => setShowSlides(medias[0].slides)}>
          <div className={style.gallery_control_background}>
            <div className={style.gallery_control_wrapper}>
              <div className={style.gallery_control_title}>{medias[0].title}</div>
              <h3>{medias[0].type}</h3>
              {medias[0].type.toLowerCase() === "video" ? <a className={style.gallery_control_video}></a> : ''}
              {medias[0].type.toLowerCase() === "gallery" ? <a className={style.gallery_control_gallery}>Enter Gallery</a> : ''}
            </div>
          </div>
          <Image 
            src={medias[0].thumbnail}
            width={932}
            height={621}
            position="relative"
          />
        </div>
        <div className={style.media_thumbnail_caption}>{medias[0].thumbnail_caption}</div>
      </div>
    </div>
    ) 
  }

function One({medias}) {
  const [showSlides, setShowSlides] = useState();
  console.log(showSlides);
  if (medias.length === 1) {
    return (<>
      {DetailOne(medias, setShowSlides)}
      {!!showSlides && <Modal transparent={true} index={0} onClose={() => setShowSlides(null)}><ImageSlider slides={showSlides} onClose={() => setShowSlides(null)}/></Modal>}
    </>)
  } else {
    return (
      <div className={style.warning}><h2>Please specify the correct layout</h2></div>
    )
  }
}


export default One
