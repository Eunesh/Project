import React from 'react'

const Admin = () => {
    
    
  return (
<div className=' bg-white w-full'>
    <h1 className='text-3xl px-[500px] py-10'>Trainers data</h1>
   <table className="w-full  border-collapse bg-white text-left text-sm text-gray-500">
    <thead className="bg-gray-50">
      <tr>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Name</th>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Email</th>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
      {/* <tr>
        <th className="px-6 py-4 font-medium text-gray-900">Helen Howard</th>
        <td className="px-6 py-4">helen@sailboatui.com</td>
        <td className="flex justify-end gap-4 px-6 py-4 font-medium"><a href="">Delete</a><a href="" className="text-primary-700">Edit</a></td>
      </tr> */}

    </tbody>
  </table>
</div>
    
  )
}

export default Admin