import React from 'react'

const Data = ({data}) => {
  return (
    <>
{
  data.map((value)=>{
    return(
  <div className="bg-red-200 w-40 rounded-lg shadow-lg p-6 border border-gray-400">
  <h3 className="text-xl font-bold mb-4">{value.login}</h3>
  <p className="text-gray-700 mb-4">{value.id}</p>
  <img src={value.avatar_url}></img>
</div>
  
    )
  })
}
</>
  )
}

export default Data

