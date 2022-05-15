import React from 'react';
import style from '../GalleryPersonLink/GalleryPersonLink.module.scss';
import Image from '../Image/Image.jsx';
import Link from 'next/link';

const peopleDatabase =[
  {
    name:'William J. Crawford',
    image:'../../images/people/101-crawford.jpg',
    link:'/wjcrawford',
    bio:''
  },
  {
    name:'Carl L. Sitter',
    image:'../../images/people/103-Carl-1961.jpg',
    link:'/clsitter',
    bio:'Ordered to break through enemy-infested territory to reinforce his battalion 29 November 1950, Capt. Sitter continuously exposed himself to enemy fire as he led his company forward and, despite 25 percent casualties, succeeded in driving through to his objective. He reorganized his depleted units the following morning and led them up a steep frozen hillside under blistering fire, encouraging his troops as casualties occurred and directing forward platoons to drive to the top of the ridge. The enemy launched a vicious counterattack, setting the hill ablaze with mortar and machine-gun fire taking a heavy toll in troops. Capt. Sitter visited each foxhole, deploying reinforcing units consisting of service personnel unfamiliar with infantry tactics into a combat team instilling in every man the determination to hold his position at all costs. With the enemy penetrating his lines in counterattacks requiring hand-to-hand combat, and infiltrating to the command post with hand grenades, he fought gallantly with his men in repulsing and killing the fanatic attackers in each encounter. Painfully wounded in the face, arms, and chest by bursting grenades he refused to be evacuated and continued to fight on until a successful defense of the area was assured. His valiant leadership and superb tactics throughout 36 hours of bitter combat reflect the highest credit upon Capt. Sitter and the U.S. Naval Service.'
  },
  {
    name:'Raymond G. Murphy',
    image:'../../images/people/105-murphy.jpg',
    link:'/rgmurphy',
    bio:''
  },
  {
    name:'Drew D. Dix',
    image:'../../images/people/107-dix.jpg',
    link:'/dddix',
    bio:''
  },
]

function GalleryPersonLink (){
  return (
    <div className={style.wrapper}>
        {peopleDatabase.map(function(personDatabase){
          return (
            <Link 
             href={personDatabase.link}
            >
              <div className={style.wrapper_card}>
                <div className={style.wrapper_image}>
                  <Image 
                    src={personDatabase.image}
                    width='380'
                    height='390'
                    position='relative'
                  />
                </div>
                <div className={style.banner}>
                  <h2>{personDatabase.name}</h2>
                  <div className={style.playbutton}></div>
                </div>
              </div>
            </Link>
          )
        })}
    </div>
  )
}

export default GalleryPersonLink