import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

const Admin = () => {
  const [data, setData] = useState([]);

  const getTrainersData = async () => {
    try {
      const res = await axios.get("/trainersData", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTrainersData();
  }, []);

  // For verification
  const verifyId = async (id) => {
    console.log(id);
    const res = await axios.post("/varifyTrainers", {
      id,
    });

    if (res.status === 201) {
      alert("Trainer is verified");
      window.location.reload(false);
    }
  };

  // for Removing
  const Remove = async (id) => {
    console.log(id);
    const res = await axios.post("/removeTrainers", {
      id,
    });

    if (res.status === 201) {
      alert("Trainer is Removed");
      window.location.reload(false);
    }
  };

  return (
    <div className=" bg-white w-full">
      <h1 className="text-3xl px-[500px] py-10">Trainers data</h1>
      <table className="w-full  border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Id
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Name
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Email
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              isVerified
            </th>
            <th
              scope="col"
              className="px-6 py-4 font-medium text-gray-900"
            ></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {data.map((d) => {
            return (
              <tr>
                <td>{d._id}</td>
                <td>{d.name}</td>
                <td>{d.email}</td>
                <td>{d.isVerified.toString()}</td>
                <button onClick={() => verifyId(d._id)}>Verify</button>
                <button className="px-5" onClick={() => Remove(d._id)}>
                  Remove
                </button>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
