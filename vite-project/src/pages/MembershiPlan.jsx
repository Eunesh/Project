import React from 'react'
import Khalti from "../Khalti/Khalti";
const MembershipPlan = (props) => {
  return (
    <div className="bg-white rounded overflow-hidden shadow-sm max-w-md mt-6 ml-10 xl:ml-96">
          <div className="py-6 bg-black">
            <div className="font-serif text-xl mb-2 text-white px-36 ">
              {props.membershipType}
            </div>
            <div className="text-white text-7xl ml-32 font-serif">{props.Price}</div>
            <div className="text-white text-xs ml-36 font-serif">
              Great for those who takes wellness
            </div>
            <div className="text-white text-xs ml-52 font-serif">seriously</div>
            {/* <button onClick={()=> setShowModel(true)}  className="text-white border">Get Started</button> */}
            <Khalti amount={props.amount}/>
          </div>
          <div className="py-5">
            <div className="font-serif ml-40 mt-6">24/7 Gym access</div>
            <div className="font-serif ml-36 mt-6">
              {props.feature}
            </div>
            <div className="font-serif ml-36 mt-6">
              Access to trainer chatroom{" "}
            </div>
          </div>
        </div>
  )
}

export default MembershipPlan