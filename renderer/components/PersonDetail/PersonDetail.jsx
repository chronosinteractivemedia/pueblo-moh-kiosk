import React, {useEffect} from "react";
import style from "./PersonDetail.module.scss"
import Image from "../Image/Image"
import Link from "next/link"
import Scroller from "../Scroller/Scroller";

function PersonDetail({person, onBack}) {
  useEffect(() => {
    window.trackEvent(`view-recipient: ${person.name}`);
  }, []);
  return (
    <div className={style.wrapper}>
      <div className={style.navlink} onClick={onBack}>&lt;&nbsp;Back</div>
      <div className={style.content}>
        <Scroller>
          <div className={style.detail}>
            <Image
              src={person.image}
              width='178'
              height='247'
              position='relative'
            />
            <div className={style.bio}>
              <h2>{person.name}</h2>
              <div className={style.bio_outline}>
                {person.light_display_text}
              </div>
              <p>{person.bio}</p>
              <p>See the&nbsp;<Link href={`/moh-recipients?p=${person.cmoh_link}`}>Medal of Honor Recipients section</Link>&nbsp;for the full citation.</p>
            </div>
          </div>
          <ul className={style.bio_table}>
            {person.summary.map((personSummary) => <li><h3 className={style.bio_table_title}>{personSummary.name}</h3>
              <span>{personSummary.value}</span></li>)}
          </ul>
        </Scroller>
      </div>
    </div>
  )
}

export default PersonDetail