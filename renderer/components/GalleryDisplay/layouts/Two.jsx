import React, {useState} from "react";
import style from "./layouts.module.scss"
import Image from "../../Image/Image";
import ImageSlider from "../../ImageSlider/ImageSlider";
import {Modal} from "../../Modal/Modal";

function DetailTwo(medias, setShowSlides) {
  return (
    <div className={style.wrapper_column_two}>
      <div className={style.media} onClick={() => setShowSlides(medias[0].slides)}>
        <div className={style.gallery_control_background}>
          <div className={style.gallery_control_wrapper}>
            <div className={style.gallery_control_title}>{medias[0].title}</div>
            <h3>{medias[0].type}</h3>
            {medias[0].type.toLowerCase() === "video" ?
              <a className={style.gallery_control_video}></a>
              :
              <a className={style.gallery_control_gallery}>Enter Gallery</a>
            }
          </div>
        </div>
        <Image
          src={medias[0].thumbnail}
          width={890}
          height={422}
          position="relative"
        />
      </div>
      <div className={style.media} onClick={() => setShowSlides(medias[1].slides)}>
        <div className={style.gallery_control_background}>
          <div className={style.gallery_control_wrapper}>
            <div className={style.gallery_control_title}>{medias[1].title}</div>
            <h3>{medias[1].type}</h3>
            {medias[1].type.toLowerCase() === "video" ?
              <a className={style.gallery_control_video}></a>
              :
              <a className={style.gallery_control_gallery}>Enter Gallery</a>
            }
          </div>
        </div>
        <Image
          src={medias[1].thumbnail}
          width={890}
          height={422}
          position="relative"
        />
      </div>
    </div>
  )
}

function Two({medias}) {
  const [showSlides, setShowSlides] = useState();
  if (medias.length === 2) {
    return (<>
      {DetailTwo(medias, setShowSlides)}
      {!!showSlides && <Modal transparent={true} index={0} onClose={() => setShowSlides(null)}><ImageSlider slides={showSlides} /></Modal>}
    </>)
  } else {
    return (
      <div className={style.warning}><h2>Please specify the correct layout</h2></div>
    )
  }
}


export default Two