import React, {useContext, useEffect, useState} from 'react'
import { store } from '../../App.js';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReuseClientWiseReport from '../reusecomponents/reuseClientWiseSaleReport.js';
import { company_profile_store } from '../../App.js';


import API_BASE_URL from "./config.js";


const ClientWiseSaleReport = () => {
  const navigate = useNavigate();

  //const [token, setToken] = useContext(store);

  const [company_profile_dataa, set_company_profile_dataa] = useContext(company_profile_store);

  const [resdata, setresdata] = useState([])

  useEffect(()=>{ 
      axios.get(`${API_BASE_URL}/clientwisesalereport`, {
          headers :{
              "x-token" : localStorage.getItem("token")
          }
      }).then(res => setresdata(res.data)).catch(err => console.log(err))  
  },[]) 

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
      {resdata.userType === "super Admin" && <ReuseClientWiseReport value1={resdata} value2  = {signuphandle} value3 = {company_profile_dataa}/>}
      {resdata.userType === "admin" && <ReuseClientWiseReport value1={resdata} value2  = {signuphandle} value3 = {company_profile_dataa}/>}
      {resdata.userType === "user" && <ReuseClientWiseReport value1={resdata} value2  = {signuphandle} value3 = {company_profile_dataa}/>}

      {/* default dashboard */}



    </div>
  )
}

export default ClientWiseSaleReport