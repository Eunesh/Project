import React from "react";
import profile from "./photo/profile.png";
import { NavLink } from "react-router-dom";

const Card = () => {
  return (
    <div className="px-96 py-6">
      <div className="card w-96 bg-black shadow-xl">
        <figure className="px-10 pt-10">
          <img src={profile} alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-white">Your Information!!</h2>
          <p className="text-white font-light">Name: Unesh</p>
          <p className="text-white font-light">Email: Unesh@gmail.com</p>
          <p className="text-white font-light">MembershipStart: </p>
          <p className="text-white font-light">MembershipEnd: </p>
          <p className="text-white font-light">MembershipType:</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
