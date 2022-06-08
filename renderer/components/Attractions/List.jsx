import React, {useState} from "react";
import style from "../Attractions/Attractions.module.scss";
import Scroller from "../Scroller/Scroller";


export default function List ({areaAttractions, onChooseAttraction}){
  areaAttractions = [...areaAttractions]; //copy so we can sort without efecting the original list
  areaAttractions.sort((a,b) => {
    if(a.name > b.name) return 1;
    else if(a.name < b.name) return -1;
    else return 0;
  });
  return (
    <div className={style.lists_wrapper}>
      <Scroller darkBg={true}>
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
