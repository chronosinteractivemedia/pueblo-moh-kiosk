import React from "react";
import style from "../Attractions/Attractions.module.scss";
import Image from "../Image/Image";
import ImageSlider from "../ImageSlider/ImageSlider";
import DetailPopup from "../DetailPopup/DetailPopup";
import database from "../../../database.json"

function AttractionPopup ({attractionId}){
  return (
    <div>
      <Modal  transparent={false} index={0} onClose={() => setShowSlides(null)}>
        {/* <DetailPopup>
          // set width and height here
        </DetailPopup> */}
      </Modal>
    </div>
  )
}