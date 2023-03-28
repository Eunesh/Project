import React from "react";
import MembershipPlan from "./MembershiPlan";
import Alert from "./Alerts/Alert";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

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
      // console.log(res.status);
      if (res.status === 205) {
        setMembered(false);
        // dispatch({ type: "MEMBERSHIP", membership: false });
        // // console.log("your membership ended")
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
      <div className="mt-56">
        <h1 className="px-20">
          Congrats you are officially membered of OUR GYM
        </h1>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col relative min-h-screen">
        {/* {successmsg &&<Alert/>} */}
        <div className="mt-20">
          <a className="text-xl px-44 xl:px-96 xl:ml-32">Princing and Plan</a>
        </div>

        <div className=" xl:flex items-center justify-center gap-5">
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
          {/* {ShowModel && <Membership_form change={handleChange} submit={handleSubmit} />} */}
        </div>
      </div>
    );
  }
}

export default Membership;
