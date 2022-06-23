import React, {useState} from "react";
import style from "../Attractions/Attractions.module.scss";
import Image from "../Image/Image";
import ImageSlider from "../ImageSlider/ImageSlider";
import QrDisplay from "../QrDisplay/QrDisplay";
import { Modal } from "../Modal/Modal";

export default function MultipleAttractionPopup ({attraction, onClose}){
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [videoToShow, setVideoToShow] = useState(null);

  useEffect(() => {
    if(attraction) window.trackEvent(`view-attraction: ${attraction.name}`);
  }, [attraction]);

  // to prevent the error in case data doesn't exist
  if (!attraction){
    return null
  }

  return (
    <div>
      <Modal  transparent={false} index={1} onClose={onClose}>
        <div className={style.popup_wrapper}>
          <div className={style.popup_detail}>
            <h1>{attraction.name}</h1>
            <div dangerouslySetInnerHTML={{__html: attraction.detail}}/>
            {!!attraction.qrcode && <div className={style.popup_qr}>
              <QrDisplay 
                url={attraction.qrcode}
                description={attraction.qrcode_label}
                isWhite={false}
                size={87}
              />              
            </div> }
          </div>
            <div className={style.popup_media}>
              <div className={style.popup_media_wrapper}>
                {attraction.videos.map(item => (
                  <div className={style.popup_video} onClick={() => setVideoToShow(item)}>
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
                <div className={style.popup_smimage} onClick={() => setGalleryOpen(true)}>
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
