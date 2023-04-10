import React, { useState, useEffect } from "react";
import Card from "./Card";
import Sidebar from "./Sidebar";
import { TiHomeOutline } from "react-icons/ti";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BarGraph from "./BarGraph";
import DoughnutChart from "./DoughnutChart";
import { useHistory } from "react-router-dom";

const AdminDashboard = () => {
  const [trainersData, setTrainersData] = useState([]);
  const [userData, setUserData] = useState([]);
  const history = useHistory();

  // checking if Admin has that admin token or not
  const getAdmin = async () => {
    try {
      const res = await axios.get("/adminAuthentication", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      // console.log(res);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      history.push("/Login");
    }
  };

  useEffect(() => {
    getAdmin();
  }, []);

  // getting data from trainers database
  const {
    trainerdata,
    isLoading: isTrainerDataLoading,
    isError: trainerDataError,
  } = useQuery({
    queryKey: ["trainerdData"],
    queryFn: async () => {
      const response = await axios.get("/trainersData");
      setTrainersData(response.data);
      return response.data;
    },
  });

  // getting data from User Database
  const {
    userdata,
    isLoading: isUserDataLoading,
    isError: userDataError,
  } = useQuery({
    queryKey: ["userdData"],
    queryFn: async () => {
      const response = await axios.get("/usersData");
      setUserData(response.data);
      return response.data;
    },
  });

  if (isTrainerDataLoading || isUserDataLoading) {
    return <h1>Loading...</h1>;
  }

  // getting only verified Trainers Data
  const verifiedTrainersData = trainersData.filter((data) => {
    return data.isVerified == true;
  });

  // Getting Acting Member only
  const activeMember = userData.filter((data) => {
    return data.isPaid == true;
  });

  // data for my chart
  const data = {
    labels: ["Users", "Trainers", "Active Members"],
    datasets: [
      {
        label: "Bar Graph",
        data: [
          userData.length,
          verifiedTrainersData.length,
          activeMember.length,
        ],
        fill: false,
        backgroundColor: ["rgba(75,192,192,1", "#50AF95", "#f3ba2f"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  // options of chart
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Bar Graph",
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
      },
    },
  };

  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="flex flex-col">
        <div className="flex felx-row px-4">
          <TiHomeOutline size={35} />
          <h1 className="py-1 px-3 text-xl text-black">Dashboard</h1>
        </div>
        <div className="flex flex-row ">
          <div className="px-4 py-10 ">
            <Card Data={userData.length} title="Users" />
          </div>
          <div className="px-4 py-10">
            <Card Data={activeMember.length} title="Active Members" />
          </div>
          <div className="px-4 py-10">
            <Card Data={verifiedTrainersData.length} title="Trainers" />
          </div>
        </div>
        <div className="flex flex-row items-center">
          <div className="w-[610px] px-5 py-5">
            <h1 className="font-bold">Your Bar Graph:</h1>
            <BarGraph data={data} options={options} />
          </div>
          <div className="w-[400px] px-10">
            {/* <h1 className="font-bold">Your DoughnutChart chart:</h1> */}
            <DoughnutChart data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
