import React, { useState, useRef, useContext, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import logo from "../Photos/logo.png";
import { UserContext } from "../App";
import axios from "axios";
//import { useEffect } from "react";
//import {initialState} from "../Reducer/useReducer"

function Header() {
  // const {state, dispatch} = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();
  const data = window.localStorage.getItem("STATUS_OF_LOGIN");
  const Status = JSON.parse(data);
  axios.defaults.withCredentials = true; //making axios with credentials true for cookies

  //console.log(Status);
  //console.log(state)

  //const [LoginState, setLoginState] = useState(state)
  //console.log(LoginState)

  // useEffect(()=>{
  //   const data = window.localStorage.getItem('STATUS_OF_LOGIN');
  //   //RenderMenu();
  //   //state = (JSON.parse(data))
  //   console.log(JSON.parse(data));

  // },)

  const RenderMenu = () => {
    if (Status) {
      const [userData, setUserData] = useState({});
      const getMembership = async () => {
        try {
          const res = await axios.get("/membership", {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });
          // console.log(res.data.name);
          setUserData(res.data);
        } catch (err) {
          console.log(err);
        }
      };

      useEffect(() => {
        //callMembership();
        getMembership();
      }, []);

      return (
        <>
          <NavLink
            to="/"
            className=" hover:scale-125 transform transition-all text-black px-3 py-2 rounded-md text-sm font-medium"
          >
            Home
          </NavLink>

          <NavLink
            to="/Membership"
            className="text-black hover:scale-125 transform transition-all hover:text-black px-3 py-2 rounded-md text-sm font-medium"
          >
            Membership
          </NavLink>

          <NavLink
            to="/Chatroom"
            className="text-black hover:scale-125 transform transition-all hover:text-black px-3 py-2 rounded-md text-sm font-medium  "
          >
            Chatroom
          </NavLink>

          <div className="dropdown dropdown-hover">
            <label tabIndex={0} className="btn m-1 bg-black">
              Welcome
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-white rounded-box w-52"
            >
              <li>
                <a>{userData.name}</a>
              </li>
              <li>
                <NavLink
                  to="/Logout"
                  className="text-black hover:text-black px-3 py-2 rounded-md text-sm font-medium  "
                >
                  Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </>
      );
    } else {
      return (
        <>
          <NavLink
            to="/"
            className=" hover:scale-125 transform transition-all text-black px-3 py-2 rounded-md text-sm font-medium"
          >
            Home
          </NavLink>

          <NavLink
            to="/signUp"
            className="text-black hover:scale-125 transform transition-all hover:text-black px-3 py-2 rounded-md text-sm font-medium"
          >
            Signup
          </NavLink>

          <NavLink
            to="/Login"
            className="text-black hover:scale-125 transform transition-all hover:text-black px-3 py-2 rounded-md text-sm font-medium"
          >
            Login
          </NavLink>

          <NavLink
            to="/Membership"
            className="text-black hover:scale-125 transform transition-all hover:text-black px-3 py-2 rounded-md text-sm font-medium"
          >
            Membership
          </NavLink>
        </>
      );
    }
  };

  const RenderMenuForMobile = () => {
    if (Status) {
      return (
        <>
          <NavLink
            to="/"
            className="hover:scale-90 transform transition-all text-black block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </NavLink>

          <NavLink
            to="/Membership"
            className="text-black hover:scale-90 transform transition-all hover:text-black block px-3 py-2 rounded-md text-base font-medium"
          >
            Membership
          </NavLink>

          <NavLink
            to="/Logout"
            className="text-black hover:scale-90 transform transition-all hover:text-black block px-3 py-2 rounded-md text-base font-medium"
          >
            Logout
          </NavLink>
        </>
      );
    } else {
      return (
        <>
          <NavLink
            to="/"
            className="hover:scale-90 transform transition-all text-black block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </NavLink>

          <NavLink
            to="/login"
            className="text-black hover:scale-90 transform transition-all hover:text-black block px-3 py-2 rounded-md text-base font-medium"
          >
            Login
          </NavLink>

          <NavLink
            to="/signUp"
            className="text-black hover:scale-90 transform transition-all hover:text-black block px-3 py-2 rounded-md text-base font-medium"
          >
            Signup
          </NavLink>

          <NavLink
            to="/Membership"
            className="text-black hover:scale-90 transform transition-all hover:text-black block px-3 py-2 rounded-md text-base font-medium"
          >
            Membership
          </NavLink>
        </>
      );
    }
  };

  return (
    <div>
      <nav className=" bg-neutral-100 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:py-1">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {/* <img
                  className="h-14 w-16 mt-2"
                  src={logo}
                  alt="Workflow"
                  
                /> */}
                <p className="h-14 w-16 mt-2">OUR GYM</p>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <RenderMenu />
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {() => (
            <div className="md:hidden" id="mobile-menu">
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <RenderMenuForMobile />
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
}

export default Header;
