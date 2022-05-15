import React from 'react';
import style from '../SectionRight/SectionRight.module.scss'

function SectionRight({children}) {
  return (
    <div  className={style.wrapper}>
      <div className={style.inner}>
        {children}
      </div>
    </div>
  )
}

export default SectionRight