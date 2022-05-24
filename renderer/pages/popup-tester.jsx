import React, {useState} from 'react';
import {Modal} from '../components/Modal/Modal';
import ImageSlider from "../components/ImageSlider/ImageSlider";
import DetailPopup, {DetailPopupLeft, DetailPopupRight} from "../components/DetailPopup/DetailPopup";
import IntroBox from "../components/IntroBox/IntroBox";
import Scroller from "../components/Scroller/Scroller";

const exampleSlides = [
  {
    id: 0,
    image: "https://picsum.photos/1200/1800.jpg?random=1",
    caption: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi iure nobis quidem soluta temporibus voluptatem voluptatibus? Exercitationem fugiat molestiae quis!"
  },
  {
    id: 1,
    image: "https://picsum.photos/1200/800.jpg?random=2",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    caption: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi iure nobis quidem soluta temporibus voluptatem voluptatibus? Exercitationem fugiat molestiae quis!"
  },
  {id: 2, image: "https://picsum.photos/1800/800.jpg?random=3"},
  {
    id: 3,
    image: "https://picsum.photos/1200/800.jpg?random=4",
    caption: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi iure nobis quidem soluta temporibus voluptatem voluptatibus? Exercitationem fugiat molestiae quis!"
  }
]

const singleVideoSlide = [
  {
    id: 1,
    image: "https://picsum.photos/1200/800.jpg?random=2",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  },
]

const singleImageSlide = [
  {
    id:1,
    image: "https://picsum.photos/1200/800.jpg",
  }
]

export default function PopupTester() {
  const [showData, setShowData] = useState(null);
  const [showDetails, setDetails] = useState(null);
  return <>
    <button onClick={() => setShowData(exampleSlides)}>Open Slideshow</button>
    <button onClick={() => setShowData(singleVideoSlide)}>Open Single Video</button>
    <button onClick={() => setShowData(singleImageSlide)}>Open Single Image</button>
    <button onClick={() => setDetails(true)}>Open Detail Example One</button>
    {!!showData && <Modal onClose={() => setShowData(null)} transparent={true}>
      <ImageSlider slides={showData} />
    </Modal>}
    {!!showDetails && <Modal onClose={() => {setDetails(null)}}>
      <DetailPopup>
        <DetailPopupLeft>
            <h2>Lorem Ipsum</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem dicta dolores labore molestiae
              recusandae? Accusantium alias aliquam aut consectetur consequatur cumque dolores ducimus eaque eius est ex
              facere hic nobis nulla numquam odit officiis perferendis, quae quaerat quam quas quibusdam quo repellat
              similique suscipit totam vel veniam. Dolore eligendi et iure laudantium magnam, maiores obcaecati sed!
              Dignissimos incidunt sunt totam? Aliquam, at autem blanditiis consequatur culpa, cumque debitis dolorem
              est incidunt ipsa laborum modi molestiae nam nesciunt non numquam odio optio quae, quaerat recusandae sunt
              suscipit temporibus tenetur unde ut! Facere in libero quidem tenetur vitae. Cupiditate debitis nostrum
              quibusdam.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam consectetur corporis dolores magni
              numquam officia! Assumenda delectus doloremque, est fuga libero quae veritatis voluptas. Architecto atque,
              commodi dignissimos eaque, esse ipsam mollitia nemo quos sapiente similique soluta voluptate voluptatem
              voluptatibus. Aspernatur, aut commodi eaque eos ipsa nihil nobis odio. Blanditiis dolor dolores iusto
              laudantium necessitatibus nostrum nulla quibusdam recusandae similique! Ab blanditiis cumque, debitis eos
              expedita maxime minus molestiae numquam officia quas recusandae reprehenderit sapiente vel? Ab aspernatur
              aut excepturi explicabo fuga, nobis perferendis praesentium recusandae. A, ab aspernatur at autem
              consectetur corporis deleniti dolor ducimus esse est eum excepturi facere fuga in, ipsam labore laboriosam
              magni minima nam nemo nesciunt nisi nostrum odio omnis quam qui quidem quisquam quo quos repellat
              reprehenderit repudiandae saepe sapiente similique tenetur voluptate voluptatum. Ab, adipisci consequatur
              cumque doloremque error ex facere laudantium obcaecati quam quia quo rem tempora. A ab accusantium aliquam
              atque consectetur deleniti doloribus enim, eos error, excepturi id incidunt ipsam iste nobis numquam odio
              qui quod repudiandae soluta tempore. Alias at qui reiciendis. Ad alias autem consectetur debitis eligendi
              in ipsam iusto laudantium nisi nostrum odio, omnis pariatur praesentium, quaerat, tempore vel voluptatum.
              Aliquam cum labore maiores numquam repellat tempore.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aperiam assumenda corporis, distinctio ex
              exercitationem in, ipsam iste libero magnam maxime minus modi officiis recusandae, tenetur ut voluptas. Ad
              aliquid animi, consequuntur esse excepturi facilis hic ipsum magnam neque obcaecati odit officia possimus
              provident quasi, repudiandae tempora ut voluptas voluptate? Amet asperiores expedita harum incidunt
              laboriosam laudantium maxime minus obcaecati, omnis pariatur quidem reiciendis sed sequi similique unde,
              vel voluptate? Blanditiis cupiditate dolor reprehenderit suscipit? Aspernatur doloremque eum repellat
              sequi.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A commodi, corporis et fuga, fugit modi nam
              necessitatibus nesciunt nihil qui quisquam quo, sit temporibus ut voluptatibus? A ab aperiam beatae
              consequuntur doloremque earum eligendi esse, ex illum impedit laborum, magni molestiae nobis nulla numquam
              provident quas qui quia quibusdam quidem quod reiciendis sunt unde veritatis voluptatibus. Consectetur
              cupiditate delectus dolor nostrum tempora veritatis vero voluptates! Accusantium adipisci aperiam
              asperiores consequatur doloribus hic, ipsum maiores provident quod repellendus saepe ullam voluptas.
              Accusamus ad adipisci assumenda autem beatae, consequatur consequuntur cum cupiditate doloremque,
              doloribus earum eos error fuga hic inventore ipsa minus necessitatibus neque officia quibusdam quo
              recusandae sapiente sequi sit soluta suscipit temporibus totam ullam unde ut voluptate voluptates
              voluptatibus voluptatum!</p>
        </DetailPopupLeft>
        <DetailPopupRight>
          <h2>Some details, photo, or something</h2>
        </DetailPopupRight>
      </DetailPopup>
      </Modal>}
  </>
}
