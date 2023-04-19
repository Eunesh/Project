import myKey from "./KhaltiKeys";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Alert from "../pages/Alerts/Alert";
import { ToastContainer, toast } from "react-toastify";

let config = {
  // replace this key with yours
  publicKey: myKey.publicTestKey,
  productIdentity: "123766",
  productName: "Gym Membership",
  productUrl: "http://127.0.0.1:5173/",
  eventHandler: {
    onSuccess(payload) {
      // hit merchant api for initiating verfication
      console.log(payload);
      // verifyPayment();
      let data = {
        token: payload.token,
        amount: payload.amount,
      };
      // console.log(data.token);
      // verifyPayment();
      axios.defaults.withCredentials = true;
      axios
        .post("/verify_payment", {
          token: data.token,
          amount: data.amount,
        })
        .then(function (response) {
          if (response.status === 201) {
            toast.success("Payment Successfull", {
              position: "top-center",
            });
            // alert("payment done and please reload to see the changes");
            // window.location.reload(false);

            setTimeout(() => {
              window.location.reload(false);
            }, 3000);
          }
        });
    },
    // onError handler is optional
    onError(error) {
      // handle errors
      console.log(error);
      alert(error);
    },
    onClose() {
      console.log("widget is closing");
    },
  },
  paymentPreference: ["KHALTI"],
};

export default config;
