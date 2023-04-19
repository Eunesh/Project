import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ActiveMembers = () => {
  const [userData, setUserData] = useState([]);
  const { userdata, isLoading } = useQuery({
    queryKey: ["userdData"],
    queryFn: async () => {
      const response = await axios.get("/usersData");
      setUserData(response.data);
      return response.data;
    },
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  //   console.log(userData);

  // Getting Acting Member only
  const activeMember = userData.filter((data) => {
    return data.isPaid == true;
  });

  const paymentsData = activeMember.map((d) => {
    const payments = d.payments;
    const lastPayment =
      payments.length > 0 ? payments[payments.length - 1] : payments[0]; // access the last object in the payments array, or the object at index 0 if there is only one object in the array
    return lastPayment;
  });

  return (
    <div className="flex flex-row">
      <div className="basis-1/5">
        <Sidebar />
      </div>
      <div className="bg-white w-full">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Name and Phone number
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Amount(inPaisa)
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Membership Type
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                MembershipStart
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                MembershipEnd
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {paymentsData.map((data) => {
              return (
                <tr key={data._id}>
                  <td className="text-xl px-5">{data.payment_details}</td>
                  <td className="text-xl px-5">{data.amount}</td>
                  <td className="text-xl px-5">{data.Type}</td>
                  <td className="text-xl px-5">
                    {new Date(data.MembershipStart).toLocaleDateString()}
                  </td>
                  <td className="text-xl px-5">
                    {new Date(data.MembershipEnd).toLocaleDateString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveMembers;
