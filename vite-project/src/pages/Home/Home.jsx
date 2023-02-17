import React, {useState} from 'react'
import Carousel from './Carousel'
import Card from './Card';
import Steps from './Steps';
import img1 from './photo/img1.jpg'

export default function Home() {
  return (
  <main className=' container mx-auto items-start justify-between'>
   <section className="px-3 py-5 bg-neutral-100 lg:py-10">
    <div className="grid lg:grid-cols-2 items-center justify-items-center gap-5">
    <div className="order-2 lg:order-1 flex flex-col justify-center items-center">
      <p className="text-4xl font-bold md:text-7xl text-orange-600">WELCOME TO</p>
      <p className="text-4xl font-bold md:text-7xl">OUR GYM</p>
      <p className="mt-2 text-sm md:text-lg">Seize the opportunity! It's time to get in<br/>the best shape of your life.</p>
      <button className="text-lg md:text-2xl bg-black text-white py-2 px-5 mt-10 hover:bg-zinc-800">JOIN NOW</button>
    </div>
    <div className="order-1 lg:order-2">
      <img className="h-80 w-80 object-cover lg:w-[500px] lg:h-[500px]" src={img1} alt=""/>
    </div>
  </div>
</section>
      
    
         <Card/>
        {/* <div className="artboard artboard-horizontal phone-5">
        <Carousel/>
        </div> */}
      <div className='flex flex-row'>
      <Carousel/>
      {/* <Steps/> */}
      </div>
    </main>
   )
}
