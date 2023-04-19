import React from "react";
import MembershipPlan from "./MembershiPlan";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import img2 from "../Photos/img2.jpg";

function Membership() {
  const data = window.localStorage.getItem("STATUS_OF_MEMBERSHIP");
  const Status = JSON.parse(data);
  const [membered, setMembered] = useState();
  const [successmsg, setSuccessmsg] = useState(false);

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
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      history.push("/Login");
    }
  };

  // For checking if user is membered or not
  const checkMembership = async () => {
    try {
      const res = await axios.get("/checkMembership", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (res.status === 205) {
        setMembered(false);
      }
      if (res.status === 206) {
        setMembered(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMembership();
    checkMembership();
  }, []);

  if (membered) {
    return (
      <div className="px-96 py-72">
        <h1 className="px-24">
          Congrats you are officially membered of OUR GYM
        </h1>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col relative min-h-screen">
        <div className="relative bg-gray-900">
          <div className="absolute inset-0">
            <img
              className="w-full h-full object-cover"
              src={img2}
              alt="Memberhip header Header"
            />
            <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
          </div>
          <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
              Please choose your desirable Membership plans from below
            </h1>
            <p className="mt-6 max-w-3xl text-xl text-gray-300">
              You can effortlessly become a member of our gym by using Khalti,
              the digital wallet. Simply click on the "Pay with Khalti" button,
              fill out your information, and voila! You will become a member of
              our gym.
            </p>
          </div>
        </div>

        <div className=" xl:flex items-center justify-center gap-2">
          <div>
            <MembershipPlan
              membershipType={"Standered/Month"}
              amount={15000}
              Price={"Rs 150"}
              feature={"Use of locker and shower"}
            />
          </div>

          <div className="mb-10">
            <MembershipPlan
              membershipType={"Basic/Month"}
              amount={10000}
              Price={"Rs 100"}
              feature={""}
            />
          </div>

          <div>
            <MembershipPlan
              membershipType={"Premium/Month"}
              amount={20000}
              Price={"Rs 200"}
              feature={"Access of every facility"}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Membership;
