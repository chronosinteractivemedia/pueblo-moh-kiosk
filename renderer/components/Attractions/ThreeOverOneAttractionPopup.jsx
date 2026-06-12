import React, {useEffect, useState} from "react";
import style from "../Attractions/Attractions.module.scss";
import Image from "../Image/Image";
import ImageSlider from "../ImageSlider/ImageSlider";
import QrDisplay from "../QrDisplay/QrDisplay";
import { Modal } from "../Modal/Modal";

export default function ThreeOverOneAttractionPopup ({attraction, onClose}){
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [videoToShow, setVideoToShow] = useState(null);
  const videos = attraction?.videos?.slice(0, 3) || [];

  useEffect(() => {
    if(attraction) window.trackEvent(`view-attraction: ${attraction.name}`);
  }, [attraction]);

  if (!attraction){
    return null
  }

  return (
    <div>
      <Modal transparent={false} index={1} onClose={onClose}>
        <div className={style.threeOverOne_wrapper}>
          <div className={style.threeOverOne_detail}>
            <h1>{attraction.name}</h1>
            <div dangerouslySetInnerHTML={{__html: attraction.detail}}/>
          </div>
          {!!attraction.qrcode && <div className={style.threeOverOne_qr}>
            <QrDisplay
              url={attraction.qrcode}
              description={attraction.qrcode_label}
              isWhite={false}
              size={87}
            />
          </div>}
          <div className={style.threeOverOne_media}>
            {videos.map(item => (
              <div key={item.id} className={style.threeOverOne_video} onClick={() => setVideoToShow(item)}>
                <a className={style.threeOverOne_video_playbutton}></a>
                <div className={style.threeOverOne_video_linkarea}>
                  <a>{item.title}</a>
                </div>
                <Image
                  src={item.thumbnail}
                  width={187}
                  height={314}
                  position="relative"
                />
              </div>
            ))}
            <div className={style.threeOverOne_gallery} onClick={() => setGalleryOpen(true)}>
              <div className={style.threeOverOne_gallery_linkarea}>
                <a>Enter Gallery</a>
              </div>
              <Image
                src={attraction.slides[0].image}
                width={593}
                height={317}
                position="relative"
              />
            </div>
          </div>
        </div>
      </Modal>
      {!!galleryOpen && <Modal transparent={true} index={1} onClose={() => setGalleryOpen(false)}>
        <ImageSlider slides={attraction.slides} />
      </Modal>}
      {!!videoToShow && <Modal transparent={true} index={1} onClose={() => setVideoToShow(null)}>
        <ImageSlider slides={[
          {
            id: 0,
            video: videoToShow.file,
            autoplay: true
          },
        ]} onClose={() => setVideoToShow(null)} />
      </Modal>}
    </div>
  )
}
