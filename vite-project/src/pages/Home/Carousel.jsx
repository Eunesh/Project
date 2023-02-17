import React from 'react'
import gym from './photo/gym.jpg'
import img1 from './photo/img1.jpg'
import img2 from './photo/img2.jpg'
import img3 from './photo/img3.jpg'

const Carousel = () => {
  return (
 <>
 <div className=" mt-20 ml-60 h-96 carousel carousel-vertical rounded-box">
  <div className="carousel-item h-full">
    <img src={img1}/>
  </div> 
  <div className="carousel-item h-full">
    <img src={img2} />
  </div> 
  <div className="carousel-item h-full">
    <img src={img3} />
  </div> 
</div>
</>


  )
}

export default Carousel