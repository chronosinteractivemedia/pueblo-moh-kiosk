import React from "react";
import style from "../Attractions/Attractions.module.scss";
import Image from "../Image/Image";

const FEATURED_ATTRACTION_LIMIT = 8;
const FEATURED_CARD_WIDTH = 231;
const FEATURED_CARD_HEIGHT = 246;

function Features ({featuresAttractions, onChooseAttraction}) {
  return (
    <div className={style.features_wrapper}>
      <h2>Featured Attractions</h2>
      <div className={style.features_cards}>
        {featuresAttractions.filter(item => item.featured === true).slice(0, FEATURED_ATTRACTION_LIMIT).map(filteredItem => (
          <div key={filteredItem.id} className={style.features_cards_each} onClick={() => onChooseAttraction(filteredItem)}>
            <div className={style.features_cards_each_desc}>{filteredItem.featured_name}</div>
            <Image src={filteredItem.featured_image} width={FEATURED_CARD_WIDTH} height={FEATURED_CARD_HEIGHT} position="relative" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Features
