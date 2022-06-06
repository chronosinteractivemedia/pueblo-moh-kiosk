import React, {useState} from "react";
import style from "../Attractions/Attractions.module.scss";
import Scroller from "../Scroller/Scroller";


export default function List ({areaAttractions, onChooseAttraction}){
  return (
    <div className={style.lists_wrapper}>
      <Scroller>
        {areaAttractions.map(item => (
          <div className={style.lists_each} onClick={() => {onChooseAttraction(item)}}>
            {item.walkable === true ? <div className={style.lists_walkicon} /> : <div className={style.lists_walkicon_blank} /> }
            <div className={style.lists_each_detail} >
              <h3>{item.name}</h3>
              <p>{item.descptn}</p>              
            </div>
          </div>
        ))}
      </Scroller>
    </div>
  )
}
