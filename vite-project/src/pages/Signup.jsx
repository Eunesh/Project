import React, { useState, useEffect, useReducer } from "react";
import { useHistory } from "react-router-dom";
import img2 from "../Photos/img2.jpg";
import { NavLink } from "react-router-dom";
import { useFormik, Form, Field } from "formik";
import { Schema } from "./Schema/Schema";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
  checkboxField: false,
};

export default function Signup() {
  const history = useHistory();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: Schema,
      onSubmit: async (values) => {
        // console.log(values);
        try {
          const res = await axios.post("/register", values);
          if (res.status === 200) {
            history.push("/Login");
          } else if (res.status === 202) {
            toast.success(
              "You have successfully registered as Trainer but wait for Verification",
              {
                position: "top-center",
              }
            );
          } else if (res.status === 422) {
            toast.error("Your Email already exist", {
              position: "top-center",
            });
          }
        } catch (error) {
          toast.error("Sorry Registration error ", {
            position: "top-center",
          });
        }
      },
    });

  return (
    <div className="flex flex-row">
      <div className="md:relative flex flex-col md:min-h-screen overflow-hidden  ">
        <div className="lg:w-[75vh] lg:h-[80vh] h-[100vh] p-6 md:mt-16 md:ml-40 bg-white rounded-md shadow-md max-w-xl">
          <h1 className="text-3xl font-semibold text-center">Welcome!</h1>

          <div className="mt-8 flex flex-col gap-5 md:flex-row">
            <label
              htmlFor="checkboxField"
              className="relative block h-7 w-12 cursor-pointer"
            >
              <input
                className="peer sr-only"
                type="checkbox"
                id="checkboxField"
                name="checkboxField"
                checked={values.checkboxField}
                onChange={handleChange}
              />

              <span className="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-green-500"></span>

              <span className="absolute inset-0 m-1 h-5 w-5 rounded-full bg-white transition peer-checked:translate-x-5"></span>
            </label>

            <div className="font-semibold text-gray-600">
              Register as Trainer
            </div>
          </div>

          <div className="form-control p-5">
            {errors.name && touched.name ? (
              <p className="text-red-900 text-sm ml-1">{errors.name}</p>
            ) : null}
            <label className="input-group input-group-md ">
              <input
                type="text"
                placeholder="Name"
                name="name"
                id="name"
                className="input input-bordered input-md bg-white min-w-full"
                autoComplete="off"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </label>
          </div>
          <div className="form-control p-5">
            {errors.email && touched.email ? (
              <p className="text-red-900 text-sm">{errors.email}</p>
            ) : null}
            <label className="input-group input-group-md ">
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered input-md bg-white min-w-full"
                autoComplete="off"
                name="email"
                id="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </label>
          </div>
          <div className="form-control p-5">
            {errors.password && touched.password ? (
              <p className="text-red-900 text-sm">{errors.password}</p>
            ) : null}
            <label className="input-group input-group-md ">
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered input-md bg-white min-w-full"
                autoComplete="off"
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </label>
          </div>
          <div className="form-control p-5">
            {errors.confirm_password && touched.confirm_password ? (
              <p className="text-red-900 text-sm">{errors.confirm_password}</p>
            ) : null}
            <label className="input-group input-group-md ">
              <input
                type="password"
                placeholder="Confirm Passowrd"
                className="input input-bordered input-md bg-white min-w-full"
                autoComplete="off"
                id="confirm_password"
                name="confirm_password"
                value={values.confirm_password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </label>

            <button
              className="btn btn-sm ml-5 mt-1 bg-black"
              type="submit"
              onClick={handleSubmit}
            >
              Register
            </button>
            <ToastContainer />

            <p className="mt-2 text-xs font-light text-center text-gray-700">
              <NavLink
                to="/Login"
                className="font-medium text-black hover:underline"
              >
                Already Registered? Sign in now
              </NavLink>
            </p>
          </div>
        </div>
      </div>
      <div>
        <img
          className="h-[100vh] w-[100vh] object-cover lg:w-[500px] lg:h-[530px] lg:mt-16"
          src={img2}
          alt=""
        />
      </div>
    </div>
  );
}
