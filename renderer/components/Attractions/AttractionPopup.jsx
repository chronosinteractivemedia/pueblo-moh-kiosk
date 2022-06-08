import React, {useState} from "react";
import style from "../Attractions/Attractions.module.scss";
import Image from "../Image/Image";
import ImageSlider from "../ImageSlider/ImageSlider";
import QrDisplay from "../QrDisplay/QrDisplay";
import { Modal } from "../Modal/Modal";

export default function AttractionPopup ({attraction, onClose}){
  const [galleryOpen, setGalleryOpen] = useState(false);
  return (
    <div>
      <Modal  transparent={false} index={1} onClose={onClose}>
        <div className={style.popup_wrapper}>
          <div className={style.popup_detail}>
            <h1>{attraction.name}</h1>
            <div dangerouslySetInnerHTML={{__html: attraction.detail}}/>
            <div className={style.popup_qr}>
              <QrDisplay 
                url={"http://www.google.com"}
                description={"Scan QR code for map location"}
                isWhite={false}
                size={87}
              />              
            </div>
          </div>
            <div className={style.popup_image_wrapper}>
              <div className={style.popup_image} onClick={() => setGalleryOpen(true)}>
                <div className={style.popup_image_linkarea}>
                  <a>Enter Gallery</a>
                </div>
                <Image 
                  src={attraction.slides[0].image}
                  width={498}
                  height={627}
                  position="relative"
                />
              </div>
            </div>
        </div>
      </Modal>
      {!!galleryOpen && <Modal transparent={true} index={1} onClose={() => setGalleryOpen(false)}>
        <ImageSlider slides={attraction.slides} />
      </Modal>}
    </div>
  )
}
