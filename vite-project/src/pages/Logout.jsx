import React, {useEffect, useContext} from 'react';
import axios from "axios";;
import {useHistory} from 'react-router-dom';
import { UserContext } from '../App'


const Logout = () => {
  const {state, dispatch} = useContext(UserContext);
    axios.defaults.withCredentials = true //making axios with credentials true for cookies
    const history = useHistory()
    const getLogout = async ()=>{
        try{
            const res = await axios.get("/logout", {
              headers: {
                Accept: "application/json",
                'Content-Type': 'application/json',
              }
            }
            )
            if (res){
                dispatch({type:"USER", payload:false})
                history.push('/Login')

            }
            // //console.log(res.status);
             if(!res.status === 200) {
             const error = new Error(res.error)
            throw error;
               }
          }catch(err){
            console.log(err)
          }
          
        }
    
    
    useEffect(()=>{
        getLogout();
     }, []);

    return (
        <h1>LogOut</h1>
  )
}

export default Logout