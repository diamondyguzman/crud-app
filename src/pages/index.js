import React from 'react';

import HomeStyles from '../styles/Home.module.css';
import HeroStyles from '../styles/Hero.module.css';
import Image from 'next/image';

export default function HomePage(){
  

  return(
    <>
    <div className={HeroStyles.hero}></div>
      <div className={HomeStyles.wrapper}>
        <h1 className={HomeStyles.greeting}>Welcome<span className={HomeStyles.name}> {firebase.currentUser.displayName  || ' '} </span></h1>

        <div className={HomeStyles.about}>
            <div className={HomeStyles.aboutImage}>
              <Image
              src="/images/smokeytrees.jpg"
              alt="Bird"
              width={400}
              height={300}
              
              />
            </div>

            <div className={HomeStyles.aboutInfo}>
              <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit asperiores, eos nostrum consequatur, accusamus ea quos recusandae nihil blanditiis nulla, praesentium autem id rerum. Id corporis hic consectetur est ipsum! nihil blanditiis nulla, praesentium autem id rerum. Id corporis hic consectetur est ipsum! nihil blanditiis nulla, praesentium autem id rerum. Id corporis hic consectetur est ipsum!

              </div>
            </div>

          
        </div> 

        <div className={HomeStyles.about}>
          <div className={HomeStyles.aboutInfo}>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit asperiores, eos nostrum consequatur, accusamus ea quos recusandae nihil blanditiis nulla, praesentium autem id rerum. Id corporis hic consectetur est ipsum! nihil blanditiis nulla, praesentium autem id rerum. Id corporis hic consectetur est ipsum! nihil blanditiis nulla, praesentium autem id rerum. Id corporis hic consectetur est ipsum!</div>
          </div>

          <div className={HomeStyles.aboutImage}>
          <Image
           src="/images/bird.jpg"
           alt="Bird"
           width={400}
           height={300}
          
           />
          </div> 

        </div>      
      </div>
    </>
  )
}