import React from 'react';
import style from '../IntroBox/IntroBox.module.scss'
import Scroller from '../Scroller/Scroller.jsx'
import database from "../../../database.json"


function IntroBox ({dataIndex}) {

  function paragraph (dataIndex) {
    return database.introPages[dataIndex].description.map(function (text, index){
      return <p
        key={ index }>
          { text }
        </p>      
    })
  }
  
  return(
    <div className={style.wrapper}>
      <div className={style.content}>
        <h3>{database.introPages[dataIndex].city}</h3>
        <h2>{database.introPages[dataIndex].title}</h2>
        <div className={style.outline}></div>
        <div className={style.description}>
          <Scroller>
              {paragraph (dataIndex)}
          </Scroller>
        </div>
        <div className={style.link}>
          <a>{database.introPages[dataIndex].link}</a>
        </div>
      </div>
    </div>
  )
}

export default IntroBox