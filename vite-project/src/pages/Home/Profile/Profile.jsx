import React, { useState } from "react";
import profile from "../photo/profile.png";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Updatepassworduser from "./Updatepassworduser";

const Profile = () => {
  const [userData, setUserData] = useState([]); // States for saving that data

  // Fetching logged in User Data
  const { userdata, isLoading } = useQuery({
    queryKey: ["userdData"],
    queryFn: async () => {
      const response = await axios.get("/membership");
      setUserData(response.data);
      return response.data;
    },
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const payment = userData.payments;

  const lastPayment =
    payment.length > 0 ? payment[payment.length - 1] : payment[0]; // access the last object in the payments array, or the object at index 0 if there is only one object in the array

  const MembershipEnd = lastPayment.MembershipEnd;
  const End = new Date(MembershipEnd);
  const MembershipStart = lastPayment.MembershipStart;
  const Start = new Date(MembershipStart);
  const MembershipType = lastPayment.Type;
  const isMember = userData.isPaid;

  return (
    <div className="flex flex-col px-[450px]">
      <div className=" py-8">
        <div className="card bg-black shadow-xl hover:scale-105 transition duration-300">
          <figure className="px-10 pt-10">
            <img src={profile} alt="Shoes" className="rounded-full" />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-white">Your Information!!</h2>
            <p className="text-white font-light">Name: {userData.name}</p>
            <p className="text-white font-light">Email: {userData.email}</p>
            <p className="text-white font-light">
              isMember: {isMember.toString()}
            </p>

            {isMember && (
              <>
                <p className="text-white font-light">
                  MembershipStart: {End.toLocaleDateString()}
                </p>
                <p className="text-white font-light">
                  MembershipEnd: {Start.toLocaleDateString()}
                </p>
                <p className="text-white font-light">
                  MembershipType: {MembershipType}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <Updatepassworduser />
    </div>
  );
};

export default Profile;
