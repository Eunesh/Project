import { useState, createContext, useReducer } from 'react'
import reactLogo from './assets/react.svg'
import {Route, Switch } from "react-router-dom";
import Header from './components/Header'
import Home from './pages/Home/Home'
import Khalti from './Khalti/Khalti'
import Signup from './pages/Signup';
import Login from './pages/Login';
import Membership from './pages/Membership';
import Logout from './pages/Logout';
import {initialState, reducer} from "./Reducer/useReducer"


export const UserContext = createContext(); 
const Routing = ()=>{
  return <Switch>
  <Route exact path="/"  component={Home} />
  <Route path="/signUp"  component={Signup} />
  <Route path="/Login" component={Login}/>
  <Route path="/Membership" component={Membership}/>
  <Route path="/Logout" component={Logout}/>
  <Route path ='/khalti' component={Khalti}/>

</Switch>
}



function App() {
const [state, dispatch] = useReducer(reducer, initialState);


  return (
    <div className='bg-neutral-100 text-gray-800 '>
    <UserContext.Provider value={{state, dispatch}}>
      <Header/>
      <Routing/>
    </UserContext.Provider>
    </div>
  )
}

export default App
