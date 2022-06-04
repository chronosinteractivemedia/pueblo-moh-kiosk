import React, {useState} from "react";
import style from "../Attractions/Attractions.module.scss";
import Image from "../Image/Image";
import ImageSlider from "../ImageSlider/ImageSlider";
import DetailPopup from "../DetailPopup/DetailPopup";
import database from "../../../database.json"
import QrDisplay from "../QrDisplay/QrDisplay";
import { Modal } from "../Modal/Modal";

export default function MultipleAttractionPopup ({attraction}){
  console.log(attraction)
  // to prevent the error in case data doesn't exist
  if (!attraction){
    return null
  }
  return (
    <div>
      <Modal  transparent={false} index={1} onClose={() => console.log('close')}>
        <div className={style.popup_wrapper}>
          <div className={style.popup_detail}>
            <h1>{attraction.name}</h1>
            <p>{attraction.detail}</p>
            <div className={style.popup_qr}>
              <QrDisplay 
                url={"http://www.google.com"}
                description={"Scan QR code for map location"}
                isWhite={false}
                size={87}
              />              
            </div>
          </div>
            <div className={style.popup_media}>
              <div className={style.popup_media_wrapper}>
                {attraction.videos.map(item => (
                  <div className={style.popup_video}>
                    <a className={style.popup_video_playbutton}></a>
                    <div className={style.popup_video_linkarea}>
                      <a>{item.title}</a>
                    </div>
                    <Image 
                    src={item.thumbnail}
                    width={190}
                    height={200}
                    position="relative"
                    />
                  </div>
                ))}
                <div className={style.popup_smimage}>
                  <div className={style.popup_smimage_linkarea}>
                    <a>Enter Gallery</a>
                  </div>
                  <Image 
                    src={attraction.slides[0].image}
                    width={405}
                    height={200}
                    position="relative"
                  />
                </div>
              </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
