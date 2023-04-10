import React from "react";
import { useFormik, Form, Field } from "formik";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Schema } from "./SchemaUserPassword";

const initialValues = {
  current_password: "",
  new_password: "",
  confirm_new_password: "",
};

const Updatepassworduser = () => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: Schema,
      onSubmit: async (values, action) => {
        console.log(values);

        try {
          const res = await axios.post("/UserPasswordUpdate", values);
          console.log(res.status);
          if (!res.status === 200) {
            toast.error("Please enter correct credentials ", {
              position: "top-center",
            });
          } else {
            toast.success(
              "You have successfully Changed Your Password thanks!!",
              {
                position: "top-center",
              }
            );
          }
        } catch (error) {
          toast.error("Please enter correct credentials ", {
            position: "top-center",
          });
          // console.log(error.message);
          //   alert("Please Enter your current password correctly");
        }
      },
    });
  return (
    <div className="md:relative flex flex-col md:min-h-screen overflow-hidden">
      <h1 className="px-20 font-serif ">Change Your Password Here:</h1>
      <div className="lg:w-[75vh] lg:h-[80vh] h-[100vh]  mt-10 bg-white rounded-md shadow-md max-w-xl">
        <h1 className="text-2xl font-semibold text-center">Update Password</h1>

        <div className="form-control p-5">
          <label className="input-group input-group-md ">
            <input
              type="password"
              placeholder="Current Password"
              name="current_password"
              id="current_password"
              className="input input-bordered input-md bg-white min-w-full"
              autoComplete="off"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </label>
          {errors.current_password && touched.current_password ? (
            <p className="text-red-900 text-sm ml-1">
              {errors.current_password}
            </p>
          ) : null}
        </div>

        <div className="form-control p-5">
          <label className="input-group input-group-md ">
            <input
              type="password"
              placeholder="New Password"
              name="new_password"
              id="new_password"
              className="input input-bordered input-md bg-white min-w-full"
              autoComplete="off"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </label>
          {errors.new_password && touched.new_password ? (
            <p className="text-red-900 text-sm ml-1">{errors.new_password}</p>
          ) : null}
        </div>

        <div className="form-control p-5">
          <label className="input-group input-group-md ">
            <input
              type="password"
              placeholder="Confirm New Password"
              name="confirm_new_password"
              id="confirm_new_password"
              className="input input-bordered input-md bg-white min-w-full"
              autoComplete="off"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </label>
          {errors.confirm_new_password && touched.confirm_new_password ? (
            <p className="text-red-900 text-sm ml-1">
              {errors.confirm_new_password}
            </p>
          ) : null}
        </div>

        <button
          className="btn btn-sm lg:px-[185px] mt-10 ml-5 bg-black"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Updatepassworduser;
