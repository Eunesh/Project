import React from "react";

const Steps = () => {
  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-hero bg-fixed bg-no-repeat bg-cover bg-center">
        <div className="grid lg:grid-cols-2 items-center justify-items-center gap-72">
          <div className="order-2 lg:order-1 flex flex-col justify-center items-center">
            <p className="text-4xl font-bold md:text-7xl text-white">
              WELCOME TO
            </p>
            <p className="text-4xl font-bold md:text-7xl text-black">OUR GYM</p>
            <p className="mt-2 text-sm md:text-lg text-black">
              Seize the opportunity! It's time to get in
              <br />
              the best shape of your life.
            </p>
            <button className="text-lg md:text-2xl bg-black text-white py-2 px-5 mt-10 hover:bg-zinc-800">
              JOIN NOW
            </button>
          </div>
          {/* <div className="order-1 lg:order-2">
      <img className="h-80 w-80 object-cover lg:w-[500px] lg:h-[500px]" src={img1} alt=""/>
    </div> */}
        </div>

        {/* <h1 className="text-4xl font-bold md:text-7xl text-orange-600 ">WELCOME TO </h1>
    <h2 className="text-4xl font-bold md:text-7xl text-white">OUR GYM</h2> */}
      </div>

      <div className="p-10">
        <h2 className="font-bold text-4xl">Sample Section</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab numquam
          eveniet molestias veniam, inventore sint voluptates nam provident
          impedit laborum ipsa vel quos amet laboriosam dolorum suscipit! Nihil
          eos repellendus blanditiis repellat laboriosam veniam quod maxime ab!
          Ea eveniet doloremque, excepturi totam, et molestias dicta accusamus
          quibusdam quas sunt inventore!
        </p>
      </div>

      <div className="bg-hero1 min-h-screen bg-center bg-no-repeat bg-cover bg-fixed"></div>

      {/* <div className="bg-sea3 min-h-screen bg-fixed bg-no-repeat bg-cover"></div> */}
    </>
  );
};

export default Steps;
