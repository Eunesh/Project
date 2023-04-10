import React, { useState } from "react";
import { FcDatabase } from "react-icons/fc";
import { Gi3DGlasses } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import { HiDatabase } from "react-icons/hi";
import { TiHomeOutline } from "react-icons/ti";

const Sidebar = () => {
  return (
    <div className="flex flex-col bg-black w-[35vh] h-[100vh]">
      <div className="bg-black h-[10vh]">
        <h1 className="text-white px-20 py-5 ">OUR GYM</h1>
      </div>
      <div className="text-white py-10 px-6">
        <NavLink
          to="/AdminDashboard"
          className="py-2 flex flex-row items-center hover:scale-90 transform transition-all"
        >
          <TiHomeOutline />
          Dashboard
        </NavLink>

        <NavLink
          to="/UserDetails"
          className="py-2 flex flex-row items-center hover:scale-90 transform transition-all"
        >
          <HiDatabase />
          User Details
        </NavLink>

        <NavLink
          to="/ActiveMember"
          className="py-2 flex flex-row items-center hover:scale-90 transform transition-all"
        >
          <Gi3DGlasses />
          Active Members
        </NavLink>

        <NavLink
          to="/TrainerDetails"
          className="py-2 flex flex-row items-center hover:scale-90 transform transition-all"
        >
          <HiDatabase />
          Trainers Details
        </NavLink>
        <NavLink
          to="/Updatepassword"
          className="py-2 flex flex-row items-center hover:scale-90 transform transition-all"
        >
          <HiDatabase />
          Update Password
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
