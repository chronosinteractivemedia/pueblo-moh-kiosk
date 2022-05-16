import React from 'react';
import style from '../IntroBox/IntroBox.module.scss'
import Scroller from '../Scroller/Scroller.jsx'

function IntroBox ({dataIndex}) {
  const database = [
    {
      logo:'',
      city:'Pueblo',
      title : 'Medal of Honor Recipients',
      description:['Pueblo’s four Medal of Honor recipients represent three wars. William Crawford, World War II, Carl Sitter and Raymond (Jerry) Murphy, Korean War and Drew Dix, Vietnam. Their incredibly heroic exploits are representative of the over 16,000 veterans that call Pueblo their hometown and the local culture that nurtured their character such that they would be willing to put their life in mortal danger to save their fellow soldiers. Pueblo’s four Medal of Honor recipients represent three wars. William Crawford, World War II, Carl Sitter and Raymond (Jerry) Murphy, Korean War and Drew Dix, Vietnam. Their incredibly heroic exploits are representative of the over 16,000 veterans that call Pueblo their hometown and the local culture that nurtured their character such that they would be willing to put their life in mortal danger to save their fellow soldiers.', 'Pueblo’s four Medal of Honor recipients represent three wars. William Crawford, World War II, Carl Sitter and Raymond (Jerry) Murphy, Korean War and Drew Dix, Vietnam. Their incredibly heroic exploits are representative of the over 16,000 veterans that call Pueblo their hometown and the local culture that nurtured their character such that they would be willing to put their life in mortal danger to save their fellow soldiers. Pueblo’s four Medal of Honor recipients represent three wars. William Crawford, World War II, Carl Sitter and Raymond (Jerry) Murphy, Korean War and Drew Dix, Vietnam. Their incredibly heroic exploits are representative of the over 16,000 veterans that call Pueblo their hometown and the local culture that nurtured their character such that they would be willing to put their life in mortal danger to save their fellow soldiers.'],
      link:'Play Audio',
      button:'',
      qrcode:''
    }
  ]

  function paragraph (dataIndex) {
    return database[dataIndex].description.map(function (text, index){
      return <p
        key={ index }>
          { text }
        </p>      
    })
  }
  
  return(
    <div className={style.wrapper}>
      <div className={style.content}>
        <h3>{database[dataIndex].city}</h3>
        <h2>{database[dataIndex].title}</h2>
        <div className={style.outline}></div>
        <div className={style.description}>
          <Scroller>
              {paragraph (dataIndex)}
          </Scroller>
        </div>
        <div className={style.link}>
          <a>{database[dataIndex].link}</a>
        </div>
      </div>
    </div>
  )
}

export default IntroBox