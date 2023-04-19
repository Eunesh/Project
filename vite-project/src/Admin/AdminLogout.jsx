import React, { useEffect, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Logout = () => {
  const history = useHistory();
  const getLogout = async () => {
    try {
      const res = await axios.get("/Adminlogout", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (res) {
        history.push("/Login");
        history.go(0);
      }
      // //console.log(res.status);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getLogout();
  }, []);

  return <div>Logout</div>;
};

export default Logout;
