import React, {useState, useEffect} from "react"
import SectionLeft from "../components/SectionLeft/SectionLeft.jsx"
import SectionRight from "../components/SectionRight/SectionRight.jsx"
import PersonDetail from "../components/PersonDetail/PersonDetail";
import PuebloRecipientThumb from "../components/GalleryDisplay/layouts/PuebloRecipientThumb.jsx";
import GalleryDisplay from "../components/GalleryDisplay/GalleryDisplay.jsx";
import IntroBox from "../components/IntroBox/IntroBox";
import database from "../../database.json"

function PuebloRecipients({recipients, detail}) {
  const [currentRecipient, setCurrentRecipient] = useState(null);
  return (
    <div className="page-flex-row">
      <SectionLeft width={!!currentRecipient ? "wide" : "narrow"}>
        {!!currentRecipient ?
          <PersonDetail person={currentRecipient} onBack={() => setCurrentRecipient(null)}/>
          :
          <IntroBox city={detail.city} title={detail.title} description={detail.description} audio={detail.audio} video={detail.video} />}
      </SectionLeft>
      <SectionRight>
        {!!currentRecipient ? <GalleryDisplay layout="person" person={currentRecipient}/> :
          <GalleryDisplay layout="thumbnails">
            {recipients.map(person => {
              return <PuebloRecipientThumb person={person} onClick={() => setCurrentRecipient(person)}/>
            })}
          </GalleryDisplay>}
      </SectionRight>
    </div>
  )
}

export async function getStaticProps(_context) {
  return {
    props: {
      recipients: database.puebloRecipientsDetail.puebloRecipients,
      detail: database.puebloRecipientsDetail
    }
  }
}

export default PuebloRecipients


