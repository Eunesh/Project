import React, { useState } from "react";
import Footer from "../Footer/Footer";

export default function Home() {
  return (
    <>
      <main className=" items-start justify-between">
        <div className="min-h-screen flex justify-center items-center bg-hero bg-fixed bg-no-repeat bg-cover bg-center">
          <div className="grid lg:grid-cols-2 items-center justify-items-center gap-72">
            <div className="order-2 lg:order-1 flex flex-col justify-center items-center">
              <p className="text-4xl font-bold md:text-7xl text-white">
                WELCOME TO
              </p>
              <p className="text-4xl font-bold md:text-7xl text-black">
                OUR GYM
              </p>
              <p className="mt-2 text-sm md:text-lg text-black">
                Seize the opportunity! It's time to get in
                <br />
                the best shape of your life.
              </p>

              <button className="text-lg md:text-2xl bg-black text-white py-2 px-5 mt-10 hover:bg-zinc-800">
                JOIN NOW
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
