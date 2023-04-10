import React from "react";
import KhaltiCheckout from "khalti-checkout-web";
import config from "./khaltiConfig";

export default function Khalti(props) {
  let checkout = new KhaltiCheckout(config);

  return (
    <div>
      <button
        className="btn btn-active btn-primary ml-40 mt-6"
        onClick={() => checkout.show({ amount: props.amount })}
      >
        Pay Via Khalti
      </button>
    </div>
  );
}
