import React from "react";
import KhaltiCheckout from "khalti-checkout-web";
import config from "./khaltiConfig";

export default function Khalti() {
  let checkout = new KhaltiCheckout(config);

  return (
    <div >
      <button className="bg-purple-800 px-10 text-white border-stone-50 font-bold mt-32 ml-96" 
        onClick={() => checkout.show({ amount: 10000 })}
      >
        Pay Via Khalti
      </button>
    </div>
  );
}