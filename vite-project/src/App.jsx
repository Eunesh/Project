import { useState } from 'react'
import reactLogo from './assets/react.svg'
import {Route, Switch } from "react-router-dom";
import Header from './components/Header'
import Home from './pages/Home/Home'
import More from './pages/More'
import Footer from './pages/Footer/footer';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Membership from './pages/Membership';
import Logout from './pages/Logout';


function App() {

  return (
    <div className='bg-neutral-100 text-gray-800 '>
      <Header/>
      <Switch>
        <Route exact path="/"  component={Home} />
        <Route path="/signUp"  component={Signup} />
        <Route path="/Login" component={Login}/>
        <Route path="/Membership" component={Membership}/>
        <Route path="/Logout" component={Logout}/>
      </Switch>
      {/* <Header/>
      <Home/>
      <Practice/>
      <Login/> */}
    </div>
  )
}

export default App
