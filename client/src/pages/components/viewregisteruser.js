import React, {useEffect} from 'react'
import { useLocation, Link } from 'react-router-dom'
import "./productview.css"
import axios from 'axios'
import {Navigate } from 'react-router-dom';

import API_BASE_URL from "./config.js";


const Viewregisteruser = () => {

  let location = useLocation();
  
  const viewRegisterUser = location.state;
  //console.log("first", viewRegisterUser)

  useEffect(()=>{ 
    axios.get(`${API_BASE_URL}/viewregisteruser`, {
        headers :{
            "x-token" : localStorage.getItem("token")
        }
    }).catch(err => console.log(err))  
},[]) 
 
if(!localStorage.getItem("token")){
     return <Navigate to="/" />
}
  
  return (
    <div className="container">
    <div className="card">
        <div className="container-fliud">
            <div className="wrapper row">

                <div className="preview "> {/*col-md-6 */}          
                    <div className="preview-pic tab-content">
                        <h3 className="product-title">{viewRegisterUser.registerusername}</h3>
                        {/* <div className="tab-pane active" id="pic-1"><img src={`${API_BASE_URL}/RegisterUserImages/${viewRegisterUser.userimg}`} alt='img not support...'/></div> */}
                    </div>

                </div>

                <div className="details "> {/*col-md-6 */} 
                {/* <h3 className="price"> GST number : <span>{viewRegisterUser.registerusergstno}</span></h3> 
                <br /> */}
                <h4 className="price">Email : <span>{viewRegisterUser.registeruseremail}</span></h4> 
                <br />
                <h4 className="price">Contact Number : <span>{viewRegisterUser.registerusernumber}</span></h4> 
                <br />                   
                    
                    <h4>Address : </h4>
                    <div className='card' style={{width:"100%", boxShadow:"0px 0px 3px 0px black"}}>
                    <p className="product-description">{viewRegisterUser.registeruseraddress}</p>
                    </div>

                    <Link to="/registeruser" className='btn btn-ghost-primary' style={{width:"200px", margin:"auto", fontWeight:"bolder"}}>Back</Link>
                   
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default Viewregisteruser