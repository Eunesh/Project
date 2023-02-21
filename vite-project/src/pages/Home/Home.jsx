import React, {useState} from 'react'
import Carousel from './Carousel'
import Card from './Card';
import Steps from './Steps';
import Hero from './hero';

export default function Home() {
  return (
  <main className=' items-start justify-between'>
       
       {/* <Card/> */}
       <Steps/>
       {/* <Hero/> */}
        {/* <div className="artboard artboard-horizontal phone-5">
        <Carousel/>
        </div> */}
      {/* <div className='flex flex-row'>
      <Carousel/>
      
      </div> */}
    </main>
   )
}
