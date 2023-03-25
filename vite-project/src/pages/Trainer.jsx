import React from 'react';
import { useFormik } from 'formik';
import {TrainerSignupSchema} from './Schema/Schema'

const initialValues = {
    name:"",
    email:"",
    password:"",
    confirm_password:"",

}

const Trainer = () => {

    const {values, errors, touched, handleBlur, handleChange, handleSubmit} =useFormik({
        initialValues: initialValues,
        validationSchema: TrainerSignupSchema,
        onSubmit: (values) =>{
            console.log(values)
        }
    });
    console.log(errors);

    // console.log(values)
    return (
        <div className="flex justify-center items-center h-screen bg-gray-500 bg-opacity-50">
          <div className="w-full max-w-xs p-8 bg-white shadow-md rounded">
            <h2 className="text-2xl font-bold mb-6 text-center">Become a Trainer</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  autoComplete='off'
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name ? (<p className='text-red-900'>{errors.name}</p>): null}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Your Email"
                  autoComplete='off'
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                 {errors.email && touched.email ? (<p className='text-red-900'>{errors.email}</p>): null}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Your Password"
                  autoComplete='off'
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                 {errors.password && touched.password ? (<p className='text-red-900'>{errors.password}</p>): null}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
                  Confirm Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                  id="confirm_password"
                  type="password"
                  placeholder="Confirm Password"
                  autoComplete='off'
                  name="confirm_password"
                  value={values.confirm_password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {errors.confirm_password && touched.confirm_password ? (<p className='text-red-900'>{errors.confirm_password}</p>): null}
              <button
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                onClick={handleSubmit}
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      );
    
}

export default Trainer