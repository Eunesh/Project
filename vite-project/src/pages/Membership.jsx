import React from "react";
import khalti from "../Photos/khalti.png";
import MembershipPlan from "./MembershiPlan"
import { useState, useEffect, useReducer, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Khalti from "../Khalti/Khalti";
// import Membership_form from "./Membership_form";
import { UserContext } from "../App";
// import KhaltiCheckout from "khalti-checkout-web";
// import { useTransition } from "react"

function Membership() {
  const { state, dispatch, } = useContext(UserContext);
  const data = window.localStorage.getItem("STATUS_OF_MEMBERSHIP");
  const Status = JSON.parse(data);
  // const [Data, setData] = useState({
  //   firstName: "",
  //   lastName: "",
  //   phoneNumber: "",
  //   age: "",
  //   address: "",
  // });
  // const [ShowModel, setShowModel] = useState(false)
  const [membered, setMembered] = useState();
 

  // const handleChange = (event) => {
  //   setData({
  //     ...Data,
  //     [event.target.name]: event.target.value,
  //   });
  // };

  axios.defaults.withCredentials = true; //making axios with credentials true for cookies

  const history = useHistory();

  // getting data to see if users is login or not
  const getMembership = async () => {
    try {
      const res = await axios.get("/membership", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      //console.log(res.status);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      history.push("/Login");
    }
  };

  // For checking expired Membership and changing state
  // const expiredMembership = async () => {
  //   try {
  //     const res = await axios.get("/expiredmembership", {
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     // console.log(res.status);
  //     if (res.status === 205) {
  //       setMembered(false);
  //       // dispatch({ type: "MEMBERSHIP", membership: false });
  //       // // console.log("your membership ended")
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };


    // For checking if user is membered or not
    const checkMembership = async () => {
      try {
        const res = await axios.get("/checkMembership", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        // console.log(res.status);
        if (res.status === 205) {
          setMembered(false);
          // dispatch({ type: "MEMBERSHIP", membership: false });
          // // console.log("your membership ended")
        }
        if(res.status === 206){
          setMembered(true);
        }
      } catch (err) {
        console.log(err);
      }
    };



  useEffect(() => {
    //callMembership();
    getMembership();
    checkMembership();
    // expiredMembership();
  }, []);

  // After Submitting
  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const { firstName, lastName, phoneNumber, age, address } = Data;
  //     //console.log(email);
  //     const res = await axios.post("/membershipInfo", {
  //       firstName,
  //       lastName,
  //       phoneNumber,
  //       age,
  //       address,
  //     });

  //     console.log(res);
  //     if (res.status === 200) {
  //       dispatch({ type: "MEMBERSHIP", membership: true });
  //       window.localStorage.setItem('USERNAME', JSON.stringify(firstName))
  //       alert("your membership is successfull");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     alert("Please Complete your Payment Procedure first");
  //   }
  // };


  // const DetailsModule = ()=>{
  //   <Membership_form change={handleChange} submit={handleSubmit} />
    

  // }

  if (membered) {
    return (
      <div className="mt-56">
        <h1 className="px-20">
          Congrats you are officially membered of OUR GYM
        </h1>
      </div>
    );
  } else {
    return (
    
      <div className="flex flex-col relative">
        <div className="mt-40">
          <a className="text-xl px-44 xl:px-96 xl:ml-32">Princing and Plan</a>
        </div>
        {/* <div className="flex flex-row"> */}
        <MembershipPlan membershipType={"Standered/Month"} amount={15000} Price={"Rs 150"} feature={"Use of locker and shower"}/>
        <MembershipPlan membershipType={"Basic/Month"} amount={10000} Price={"Rs 100"} feature={""}/>
        <MembershipPlan membershipType={"Premium/Month"} amount={20000} Price={"Rs 200"} feature={"Access of every facility"}/>
         {/* {ShowModel && <Membership_form change={handleChange} submit={handleSubmit} />} */}
        {/* </div> */}
      </div>
    );
  }
}

export default Membership;
