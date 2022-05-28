import React from "react";
import style from "../Attractions/Attractions.module.scss";
import Image from "../Image/Image";
import database from "../../../database.json"

const featuresAttractions = database.attractions

function Features () {
  return (
    <div className={style.features_wrapper}>
      <h2>Featured Attractions</h2>
      <div className={style.features_cards}>
        {featuresAttractions.filter(item => item.featured === true).map(filteredItem => (
          <div className={style.features_cards_each}>
            <div className={style.features_cards_each_desc}>{filteredItem.name}</div>
            <Image 
              src={filteredItem.photos[0]}
              width={230}
              height={250}
              position="relative"
            />
          </div>
        )).slice(0,6)}
      </div>
    </div>
  )
}

export default Features

