import React, {useState} from "react";
import style from "../Attractions/Attractions.module.scss";
import database from "../../../database.json"
import Scroller from "../Scroller/Scroller";

const featuresAttractions = database.attractions

export default function List (){
  const [showAttraction, setShowAttraction] = useState(null)
  return (
    <div className={style.lists_wrapper}>
      <Scroller>
        {featuresAttractions.map(item => (
          <div className={style.lists_each} onClick={() => {setShowAttraction(item.id); console.log(showAttraction)}}>
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
