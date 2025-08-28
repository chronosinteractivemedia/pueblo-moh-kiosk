import React, { useState, useEffect } from "react"
import SectionLeft from "../components/SectionLeft/SectionLeft.jsx"
import SectionRight from "../components/SectionRight/SectionRight.jsx"
import GalleryDisplay from "../components/GalleryDisplay/GalleryDisplay.jsx";
import IntroBox from "../components/IntroBox/IntroBox";
import database from "../../database.json"

const galleryLayoutMap = {
  1: 'one',
  2: 'two'
}
function PageId({ pageData }) {
  const { logo, city, title, description, button, audio, audioAutoplay, media, displayImage, logoOverlay, qrCode } = pageData;
  useEffect(() => { window.trackEvent(`view-internal-page: ${title}`) }, [title]);

  let rightDisplay = null;
  if (media && media.length > 0) {
    rightDisplay = <GalleryDisplay layout={galleryLayoutMap[media.length]} medias={media} />
  } else if (displayImage) {
    rightDisplay = <div className="display-image">
      <img src={displayImage} alt="Display" />
      {!!logoOverlay && <img className="logo-overlay" src={logoOverlay} alt="Logo Overlay" />}
    </div>
  } else rightDisplay = null;

  return (
    <div className="page-flex-row land-layout">
      <SectionLeft>
        <IntroBox {...({ logo, city, title, description, button, audio, audioAutoplay, qrCode })} />
      </SectionLeft>
      <SectionRight>
        { rightDisplay }
      </SectionRight>
    </div>
  )
}

export async function getStaticPaths() {
  return {
    paths: database.pages.map(p => ({ params: { pageId: `${p.id}` } })),
    fallback: false
  }
}
export async function getStaticProps({ params }) {
  const pageData = database.pages.find((p) => parseInt(p.id, 10) === parseInt(params.pageId, 10));
  return { props: { pageData } }
}

export default PageId


