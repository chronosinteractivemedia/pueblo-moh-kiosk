import React from "react";
import style from "../Attractions/Attractions.module.scss"
import QrDisplay from "../QrDisplay/QrDisplay";

function Header () {
  return(
    <div className={style.header_wrapper}>
      <h1>Pueblo Attractions</h1>
      <div className={style.header_qr}>
        <QrDisplay 
          url = "http://www.google.com"
          description= "Scan QR code to learn more"
          isWhite={true}
        />
      </div>
    </div>
  )
}

export default Header