import React from "react";

const Membership_form = (props) => {
  return (
    <div className="absolute bg-black/50 h-screen w-full">
      <div className="flex items-center justify-center mt-20">
        <div className="bg-white w-1/3 rounded-xl  ">
          <div className="flex flex-col max-w-4xl mx-auto bg-white rounded-lg">
            <h1 className="mt-10 ml-32 text-xl text-red-600">
              Your Basic Information
            </h1>
            <div className="flex flex-row mt-10">
              <input
                type="text"
                name="firstName"
                id="firstName"
                onChange={props.change}
                placeholder="First Name"
                className="input input-bordered input-info w-full max-w-xs ml-10 bg-white"
              />
              <input
                type="text"
                name="lastName"
                id="lastName"
                onChange={props.change}
                placeholder="Last Name"
                className="input input-bordered input-info w-full max-w-xs ml-10 mr-10 bg-white "
              />
            </div>
            <div className="flex flex-row mt-10">
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                onChange={props.change}
                placeholder="Phone number"
                className="input input-bordered input-info w-full max-w-xs ml-10 bg-white"
              />
              <input
                type="text"
                name="age"
                id="age"
                onChange={props.change}
                placeholder="Age"
                className="input input-bordered input-info w-full max-w-xs ml-10 mr-10 bg-white"
              />
            </div>
            <div className="flex flex-row mt-10">
              <input
                type="text"
                name="address"
                id="address"
                onChange={props.change}
                placeholder="Address"
                className="input input-bordered input-info w-[9.5rem] max-w-xs ml-10 bg-white"
              />
            </div>

            <button
              className="btn mt-10 ml-10 mr-10 mb-10"
              onClick={props.submit}
            >
              Join Membership
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership_form;
