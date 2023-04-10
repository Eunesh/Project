import React from "react";
import Sidebar from "./Sidebar";
import { useFormik, Form, Field } from "formik";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const initialValues = {
  current_password: "",
  new_password: "",
  confirm_new_password: "",
};

const Updatapassword = () => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      //   validationSchema: Schema,
      onSubmit: async (values) => {
        console.log(values);
        try {
          const res = await axios.post("/AdminPasswordUpdate", values);
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
        }
      },
    });

  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="md:relative flex flex-col md:min-h-screen overflow-hidden px-32">
        <div className="lg:w-[75vh] lg:h-[80vh] h-[100vh] p-6 md:mt-16 md:ml-40 bg-white rounded-md shadow-md max-w-xl">
          <h1 className="text-2xl font-semibold text-center">
            Update Password
          </h1>

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
                // onBlur={handleBlur}
              />
            </label>
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
                // onBlur={handleBlur}
              />
            </label>
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
                // onBlur={handleBlur}
              />
            </label>
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
    </div>
  );
};

export default Updatapassword;
