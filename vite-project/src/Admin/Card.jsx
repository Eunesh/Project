import React from "react";

const Card = (props) => {
  const users = "Total Users";
  const userCount = 100;
  return (
    <div className="card w-[50vh] h-[30vh] text-primary-content bg-black">
      <div className="card-body ">
        <h2 className="card-title">Total {props.title} </h2>
        <p>{props.Data}</p>
      </div>
    </div>
  );
};

export default Card;
