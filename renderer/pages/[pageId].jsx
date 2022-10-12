import React, {useState, useEffect} from "react"
import SectionLeft from "../components/SectionLeft/SectionLeft.jsx"
import SectionRight from "../components/SectionRight/SectionRight.jsx"
import GalleryDisplay from "../components/GalleryDisplay/GalleryDisplay.jsx";
import IntroBox from "../components/IntroBox/IntroBox";
import database from "../../database.json"

const galleryLayoutMap = {
  1: 'one',
  2: 'two'
}
function PageId({pageData}) {
  const {logo, city, title, description, button, audio, audioAutoplay, media} = pageData;
  useEffect(() => {window.trackEvent(`view-internal-page: ${title}`)}, [title]);
  return (
    <div className="page-flex-row">
        <SectionLeft>
          <IntroBox {...({logo, city, title, description, button, audio, audioAutoplay})} />
        </SectionLeft>
      <SectionRight>
        <GalleryDisplay layout={galleryLayoutMap[media.length]} medias={media} />
      </SectionRight>
    </div>
  )
}

export async function getStaticPaths() {
  return {
    paths: database.pages.map(p => ({params: {pageId: `${p.id}`}})),
    fallback: false
  }
}
export async function getStaticProps({params}) {
  const pageData = database.pages.find((p) => parseInt(p.id, 10) === parseInt(params.pageId, 10));
  return { props: { pageData } }
}

export default PageId


