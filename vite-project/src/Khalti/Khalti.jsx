import React from "react";
import KhaltiCheckout from "khalti-checkout-web";
import config from "./khaltiConfig";

export default function Khalti() {
  let checkout = new KhaltiCheckout(config);

  return (
    <div >
      <button className="btn btn-active btn-primary ml-60"
        onClick={() => checkout.show({ amount: 10000 })}
      >
        Pay Via Khalti
      </button>
    </div>
  );
}