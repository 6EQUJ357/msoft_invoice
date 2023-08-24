import React, {useContext, useEffect, useState} from 'react'
import { store } from '../../App.js';
import {useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import ReuseDashboard from '../reusecomponents/reusedashboard'
import { company_profile_store } from '../../App.js';
import jwt_decode from "jwt-decode";

import API_BASE_URL from "./config.js";


const Dashboard = () => {
  const navigate = useNavigate();

  const [company_profile_dataa, set_company_profile_dataa] = useContext(company_profile_store);
   

  const [resdata, setresdata] = useState([])

  //console.log("first", resdata)

     // Function to handle token expiration and redirect
     const handleTokenExpiration = () => {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwt_decode(token);
        //console.log("decodetoken", decodedToken);
  
        const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
        //console.log("currenttime", currentTime);
  
        if (decodedToken.exp < currentTime) {
          // Token has expired, redirect to login page
          localStorage.clear(); // Clear token from storage
          navigate("/"); // Redirect to login page
        } 
        else {
          // Token is still valid, set up a timer to check for expiration
          const timeUntilExpiration = (decodedToken.exp - currentTime) * 1000; // Convert seconds back to milliseconds
          setTimeout(handleTokenExpiration, timeUntilExpiration);
        }
      } else {
        // Token not found, redirect to login page
        navigate("/");
      }
    };

  useEffect(() => { 
   

    handleTokenExpiration(); // Call the function when the component mounts

    // Cleanup function to clear the timer when the component unmounts
    return () => clearTimeout(handleTokenExpiration);
  }, []);



  useEffect(()=>{ 
      axios.get(`${API_BASE_URL}/dashboard`, {
          headers :{
              "x-token" : localStorage.getItem("token")
          }
      }).then(res => setresdata(res.data)).catch(err => console.log(err))  
  },[]) 

  // if(!token){
  //     return <Navigate to="/" />
  // }

  if(!localStorage.getItem("token")){
       return <Navigate to="/" />
}
 
  const signuphandle = ()=>{
      let userResponse = window.confirm("you want to logged out...")
      if(userResponse){
          //setToken(null)
          localStorage.clear();
          navigate("/");

      }
  }







  return (
    <div>
      {resdata.userType === "super Admin" && <ReuseDashboard value1={resdata} value2  = {signuphandle} value3 = {company_profile_dataa}/>}
      {resdata.userType === "admin" && <ReuseDashboard value1={resdata} value2  = {signuphandle} value3 = {company_profile_dataa}/> }
      {resdata.userType === "user" && <ReuseDashboard value1={resdata} value2  = {signuphandle} value3 = {company_profile_dataa}/>}

      {/* default dashboard */}



    </div>
  )
}

export default Dashboard