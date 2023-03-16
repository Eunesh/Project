import myKey from './KhaltiKeys'
import axios from "axios";
import {useHistory} from 'react-router-dom';



//   function verifyPayment() {
//     axios.post('/verify_payments', {
//         // token: data.token,
//         // amount: data.amount
//         payload
//       })
//       .then(function (response) {
//         console.log(response);
//       })
// }
// const history = useHistory()
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
        axios.defaults.withCredentials = true
        axios.post('/verify_payment', {
            token: data.token,
            amount: data.amount
          })
          .then(function (response) {
            console.log(response);
          })
      },
      // onError handler is optional
      onError(error) {
        // handle errors
        console.log(error);
      },
      onClose() {
        console.log("widget is closing");
        const history = useHistory()
        history.go(0);

      },
    },
    paymentPreference: [
      "KHALTI",
      "EBANKING",
      "MOBILE_BANKING",
      "CONNECT_IPS",
      "SCT",
    ],
  };
  
  export default config;
  