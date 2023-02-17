import React from 'react'
import small from './photo/small.jpg'
import { NavLink } from "react-router-dom";

const Card = () => {
  return (
<div className="card lg:card-side bg-base-100 shadow-xl mt-20 ml-24 w-10/12">
  <figure><img src={small} alt="Album"/></figure>
  <div className="card-body">
    <h2 className="card-title text-white">Our<br/>GYM</h2>
    <p className='text-white '>Seize the opportunity! It's time to get in<br/>the best shape of your life.</p>
    <div className="card-actions justify-end">
        <NavLink to='/signUp'>
        <button className="btn btn-primary">Join</button>
        </NavLink>
    </div>
  </div>
</div>

  )
}

export default Card