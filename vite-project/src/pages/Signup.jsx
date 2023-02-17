import React, {useState, useEffect, useReducer} from 'react';
import { useHistory } from 'react-router-dom';


const iState ={
    name: '',
    email: '',
    password: ''
};

const reducer = (state, action)=>{
    return {...state, [action.input]: action.value}
    
    
}



export default function Signup() {

    const history = useHistory();
    const [state, dispatch] = useReducer(reducer, iState);
    //console.log(state);

    //const [data, setData] = useState([]);
     
    const onChange = (e)=>{
        const action = {
            input: e.target.name,
            value: e.target.value
        };
        dispatch(action);
    }

    const PostData = async (e)=>{
        e.preventDefault()
        // const result = Object.entries(state)
        //setData([...data, state])
        const {name, email, password} = state;
         const res= await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
         })  
         
         const data = await res.json();
         console.log(data)

         if (res.status === 200) {
            history.push("/login")
         }else{
            window.alert("Registration error")
         }
    };

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                   Sign up
                </h1>
                <form method="POST" onSubmit={PostData}  className="mt-6">
                    <div className="mb-2">
                        <label
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            //id='name'
                            name='name'
                            // value={name}
                            // onChange={(event)=>{
                            //     setName(event.target.value)
                            // }}
                            onChange={onChange}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            name='email'
                            //id='email'
                            // value={email}
                            // onChange={(e)=>
                            //     setEmail(e.target.value)}
                            onChange={onChange}
                        />

                    </div>
                   <div className='mb-2'>
                   <label

                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            name='password'
                           // id='password'
                            // value={password}
                            // onChange={(e)=>{
                            //     setPassword(e.target.value)
                            // }}
                            onChange={onChange}

                        />

                   </div>
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            Register
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    <a
                        href="#"
                        className="font-medium text-purple-600 hover:underline"
                    >
                        Already Registered? k
                    </a>
                </p>
                <div>
                    {/* {
                        data.map((value)=>{
                            return <h1>name: {value.name} & email: {value.email}</h1>
                        })
                    } */}
                        
                </div>
            </div>
        </div>

    );
}
