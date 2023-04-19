import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Sidebar from "./Sidebar";
import { ToastContainer, toast } from "react-toastify";

const TrainerDetails = () => {
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
      toast.success("Trainer is Verified ", {
        position: "top-center",
      });

      setTimeout(() => {
        window.location.reload(false);
      }, 2000);
    }
  };

  // for Removing
  const Remove = async (id) => {
    console.log(id);
    const res = await axios.post("/removeTrainers", {
      id,
    });

    if (res.status === 201) {
      toast.success("Trainer is removed", {
        position: "top-center",
      });
      setTimeout(() => {
        window.location.reload(false);
      }, 2000);
    }
  };

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
                Is Verified
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {data.map((item) => {
              return (
                <tr key={item._id}>
                  <td className="text-xl px-5">{item.name}</td>
                  <td className="text-xl  px-5">{item.email}</td>
                  <td className="text-xl  px-5">
                    {item.isVerified.toString()}
                  </td>
                  <td>
                    <button
                      className="px-5 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      onClick={() => verifyId(item._id)}
                    >
                      Verify
                    </button>
                    <button
                      className="px-5 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => Remove(item._id)}
                    >
                      Unverify
                    </button>
                    <ToastContainer />
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

export default TrainerDetails;
