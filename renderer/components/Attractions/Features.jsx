import React from "react";
import style from "../Attractions/Attractions.module.scss";
import Image from "../Image/Image";

function Features ({featuresAttractions, onChooseAttraction}) {
  return (
    <div className={style.features_wrapper}>
      <h2>Featured Attractions</h2>
      <div className={style.features_cards}>
        {featuresAttractions.filter(item => item.featured === true).map(filteredItem => (
          <div key={filteredItem.id} className={style.features_cards_each} onClick={() => onChooseAttraction(filteredItem)}>
            <div className={style.features_cards_each_desc}>{filteredItem.featured_name}</div>
            <Image src={filteredItem.featured_image} width={230} height={250} position="relative" />
          </div>
        )).slice(0,6)}
      </div>
    </div>
  )
}

export default Features

