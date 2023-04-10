import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const UserDetails = () => {
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

  const Remove = async (id) => {
    console.log(id);
    const res = await axios.post("/deleteUser", {
      id,
    });

    if (res.status === 200) {
      alert("User is Removed");
      window.location.reload(false);
    }
  };

  //   console.log(userData);

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
                Name
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Email
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Is Member
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {userData.map((data) => {
              return (
                <tr key={data._id}>
                  <td className="text-xl px-5">{data.name}</td>
                  <td className="text-xl  px-5">{data.email}</td>
                  <td className="text-xl  px-5">{data.isPaid.toString()}</td>
                  <td>
                    <button
                      className="px-5 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => Remove(data._id)}
                    >
                      Remove
                    </button>
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

export default UserDetails;
