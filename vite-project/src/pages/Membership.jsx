import React from 'react'
import { useState,useEffect,useReducer } from 'react'
import {useHistory} from 'react-router-dom';
import axios from "axios";

function Membership() {
  
  axios.defaults.withCredentials = true //making axios with credentials true for cookies

  const [userData, setUserData] = useState();
  const history = useHistory()
  // const callMembership = async () =>{
  //   try{
  //     const res = fetch('/membership', {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json"
  //       },
  //       credentials: "include"
  //     });

  //     const data = (await res).json();
  //     setUserData(data);
  //     //console.log((await res).status)
  //     //const data = (await res).json();
  //     const stat = (await res).status;
  //     //const statjson = stat.j
  //     console.log(userData);
      
  //     if(stat===200) {
  //       console.log("welcome")
  //     }else{
  //       const error = new Error(res.error)
  //       throw error;
  //     }

 
  //   }catch(err){
  //     console.log(err)
  //     history.push('/Login')

  //   }
  // }

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




    const Names = [{name: "Big Dragon", id: 0, skill: "Can Kill Person with One Punch"}, {name: "David", id: 1, skill: "Can do 2000000 pullups like boss"}]
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

    </div>
  )
}

export default Membership

