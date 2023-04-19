import React, { useContext, useState } from "react";
import img1 from "../Photos/img1.jpg";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = formData;
    //console.log(email);
    const res = await fetch("/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();

    // console.log(res.status);

    if (res.status === 200) {
      dispatch({ type: "USER", payload: true });
      toast.success("you are loggid in", {
        position: "top-center",
      });
      setTimeout(() => {
        history.push("/Profile");
      }, 3000); // 3000ms or 3 seconds delay before redirecting to /Login
    } else if (res.status === 201) {
      toast.success("You are logged in as Trainer");
      setTimeout(() => {
        history.push("/Tchatroom");
      }, 3000); // 3000ms or 3 seconds delay before redirecting to /Login
      // history.push("/Tchatroom");
    } else if (res.status === 202) {
      toast.success("you are loggid in as admin", {
        position: "top-center",
      });

      setTimeout(() => {
        history.push("/AdminDashboard");
      }, 3000); // 3000ms or 3 seconds delay before redirecting to /Login

      // history.push("/AdminDashboard");
    } else {
      toast.error("Invalid Credeantials", {
        position: "top-center",
      });
    }
  };

  return (
    <section className="bg-gray-50 ">
      {/* <img src={img1}/> */}
      <div className="flex flex-row">
        <div className="flex flex-col justify-center mx-auto md:h-screen lg:py-0 items-center h-screen">
          <div className="w-full rounded-md dark:border md:mt-0 sm:max-w-md xl:p-0 bg:white shadow-md lg:ml-36">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Your email
                  </label>
                  <input
                    // type="email"
                    name="email"
                    id="email"
                    autoComplete="off"
                    // value={formData.email}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg:white  dark:text-black"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    //value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg:white  dark:text-black"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-black text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <ToastContainer />
                <p className="text-sm font-light text-black">
                  Don’t have an account yet?{" "}
                  <NavLink
                    to="/signUp"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </NavLink>
                </p>
              </form>
            </div>
          </div>
        </div>
        <div>
          <img
            className="h-[100vh] w-[100vh] object-cover lg:w-[110vh] lg:h-[60vh] lg:mt-32 lg:mr-10 "
            src={img1}
            alt="login image"
          />
        </div>
      </div>
      {/* <img className='w-7/12 h-7/12'  src={img1}/> */}
    </section>
  );
};

export default Login;
