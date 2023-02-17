import React, {useState,useEffect} from 'react'
import Data from './data';

const More = () => {

  const [data, setData] = useState([]);

  const getUser = async () =>{
        const response = await fetch('https://api.github.com/users');
        const mal = await response.json();
        //console.log(mal);
        setData(mal);
        //console.log(data);
  };


data.map((value)=>{
  console.log(value.login)
})

  useEffect(()=>{
    getUser()
  }, []);

  return (
    <>
  <Data data={data}/>
  </>
  )
}

export default More
