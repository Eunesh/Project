import React from "react";
import khalti from "../Photos/khalti.png";
import { useState, useEffect, useReducer, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Khalti from "../Khalti/Khalti";
import Membership_form from "./Membership_form";
import { UserContext } from "../App";
// import KhaltiCheckout from "khalti-checkout-web";
// import { useTransition } from "react"

function Membership() {
  const { state, dispatch } = useContext(UserContext);
  const data = window.localStorage.getItem("STATUS_OF_MEMBERSHIP");
  const Status = JSON.parse(data);
  const [Data, setData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    age: "",
    address: "",
  });

  const handleChange = (event) => {
    setData({
      ...Data,
      [event.target.name]: event.target.value,
    });
  };

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
  const expiredMembership = async () => {
    try {
      const res = await axios.get("/expiredmembership", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      // console.log(res.status);
      if (res.status === 205) {
        dispatch({ type: "MEMBERSHIP", membership: false });
        // console.log("your membership ended")
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    //callMembership();
    getMembership();
    expiredMembership();
  }, []);

  // After Submitting
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { firstName, lastName, phoneNumber, age, address } = Data;
      //console.log(email);
      const res = await axios.post("/membershipInfo", {
        firstName,
        lastName,
        phoneNumber,
        age,
        address,
      });

      console.log(res);
      if (res.status === 200) {
        dispatch({ type: "MEMBERSHIP", membership: true });
        alert("your membership is successfull");
      }
    } catch (err) {
      console.log(err);
      alert("Please Complete your Payment Procedure first");
    }
  };

  if (Status) {
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
        <div className="bg-white rounded overflow-hidden shadow-sm max-w-md mt-6 ml-10 xl:ml-96">
          <div className="py-6 bg-black">
            <div className="font-serif text-xl mb-2 text-white px-36 ">
              Standered/Month
            </div>
            <div className="text-white text-7xl ml-32 font-serif">Rs 100</div>
            <div className="text-white text-xs ml-36 font-serif">
              Great for those who takes wellness
            </div>
            <div className="text-white text-xs ml-52 font-serif">seriously</div>
            <button className="text-white border">Get Started</button>
            <Khalti />
          </div>
          <div className="py-5">
            <div className="font-serif ml-40 mt-6">24/7 Gym access</div>
            <div className="font-serif ml-36 mt-6">
              Use of locker and shower
            </div>
            <div className="font-serif ml-36 mt-6">
              Access to trainer chatroom{" "}
            </div>
          </div>
        </div>

        {/* <div className="absolute bg-black/50 h-screen w-full">
          <div className="flex items-center justify-center mt-20">
            <div className="bg-white w-1/3 rounded-xl  ">
              <div className="flex flex-col max-w-4xl mx-auto bg-white rounded-lg">
                <h1 className="mt-10 ml-32 text-xl text-red-600">
                  Your Basic Information
                </h1>
                <div className="flex flex-row mt-10">
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    onChange={handleChange}
                    placeholder="First Name"
                    className="input input-bordered input-info w-full max-w-xs ml-10 bg-white"
                  />
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="input input-bordered input-info w-full max-w-xs ml-10 mr-10 bg-white "
                  />
                </div>
                <div className="flex flex-row mt-10">
                  <input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    onChange={handleChange}
                    placeholder="Phone number"
                    className="input input-bordered input-info w-full max-w-xs ml-10 bg-white"
                  />
                  <input
                    type="text"
                    name="age"
                    id="age"
                    onChange={handleChange}
                    placeholder="Age"
                    className="input input-bordered input-info w-full max-w-xs ml-10 mr-10 bg-white"
                  />
                </div>
                <div className="flex flex-row mt-10">
                  <input
                    type="text"
                    name="address"
                    id="address"
                    onChange={handleChange}
                    placeholder="Address"
                    className="input input-bordered input-info w-[9.5rem] max-w-xs ml-10 bg-white"
                  />
                </div>

                <button
                  className="btn mt-10 ml-10 mr-10 mb-10"
                  onClick={handleSubmit}
                >
                  Join Membership
                </button>

              </div>
            </div>
          </div>
        </div> */}
        {/* <Membership_form {handleSubmit = handleSubmit()}/> */}
      </div>
    );
  }
}

export default Membership;
