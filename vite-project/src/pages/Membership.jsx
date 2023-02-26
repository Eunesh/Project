import React from 'react'
import { useState,useEffect,useReducer } from 'react'
import {useHistory} from 'react-router-dom';
import axios from "axios";
import Khalti from '../Khalti/Khalti'
// import KhaltiCheckout from "khalti-checkout-web";
// import { useTransition } from "react"

function Membership() {
  
  axios.defaults.withCredentials = true //making axios with credentials true for cookies

  const history = useHistory()

  const getMembership = async ()=>{

    try{
      const res = await axios.get("/membership", {
        headers: {
          Accept: "application/json",
          'Content-Type': 'application/json',
        }
      }
      )
      //console.log(res.status);
      if(!res.status === 200) {
        const error = new Error(res.error)
        throw error;
        }
    }catch(err){
      console.log(err)
      history.push('/Login')
    }
    
  }

    useEffect(()=>{
       //callMembership();
       getMembership();
    }, []);




    const Names = [{name: "david", id: 0, skill: "ok"}, {name: "David", id: 1, skill: "joke"}]
    const [bio, setMyBio] = useState(Names);


    const remove = (id) => {
       setMyBio(bio.filter((curElm)=>{
          return curElm.id != id
       }))
    }

  return (
    <div className='ml-10 mt-10 '>
        <>
        {
            bio.map((value )=>{
              //const [name, skill] = value;
                return <h1 className=''>Name: {value.name} & skill: {value.skill}
                <button onClick={()=>remove(value.id)} className='ml-10 mt-5 bg-blue-800 hover:bg-black text-white text-xs font-semibold py-3 px-9 border border-gray-400 rounded shadow transition-all'> Remove </button>
                </h1>
            })

        }
        </>
        <Khalti/>

    </div>
  )
}

export default Membership

