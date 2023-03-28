import React from "react";
import Khalti from "../Khalti/Khalti";
const MembershipPlan = (props) => {
  return (
    <div className="py-10">
      <div className="flex justify-center items-center">
        <div className="py-6 bg-black ">
          <div className="font-serif text-xl mb-2 text-white px-36 ">
            {props.membershipType}
          </div>
          <div className="text-white text-7xl ml-32 font-serif">
            {props.Price}
          </div>
          <div className="text-white text-xs ml-36 font-serif">
            Great for those who takes wellness
          </div>
          <div className="text-white text-xs ml-52 font-serif">seriously</div>
          {/* <button onClick={()=> setShowModel(true)}  className="text-white border">Get Started</button> */}
          <Khalti amount={props.amount} />
        </div>
      </div>

      <div>
        <div className="py-5 space-y-5">
          <div className="font-serif ml-40">24/7 Gym access</div>
          <div className="font-serif ml-40">{props.feature}</div>
          <div className="font-serif ml-40">Access to trainer chatroom </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipPlan;
