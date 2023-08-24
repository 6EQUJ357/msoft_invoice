import React, {useEffect} from 'react'
import { useLocation, Link } from 'react-router-dom'
import "./productview.css"
import axios from 'axios'
import {Navigate } from 'react-router-dom';

import API_BASE_URL from "./config.js";




const Viewcompanyprofile = () => {

  let location = useLocation();
  
  const viewcompanyProfile = location.state;  


  useEffect(()=>{ 
    axios.get(`${API_BASE_URL}/viewcompanyprofiledata`, {
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
{/*                     
                    <div className="preview-pic tab-content">
                    <h3 className="product-title">{params.get("name")}</h3>
                      <div className="tab-pane active" id="pic-1"><img src={params.get("img")} alt='img not support...' /></div>
                      <div className="tab-pane" id="pic-2"><img src='' alt='img not support...' /></div>
                      <div className="tab-pane" id="pic-3"><img src='' alt='img not support...' /></div>
                      <div className="tab-pane" id="pic-4"><img src='' alt='img not support...' /></div>
                      <div className="tab-pane" id="pic-5"><img src='' alt='img not support...' /></div>
                    </div>
                    <ul className="preview-thumbnail nav nav-tabs"> 
                      <li className="active"><a href="#pic-1" data-toggle="tab"><img src={params.get("img")} alt='img not support...' /></a></li>
                      <li><a href="#pic-2" data-toggle="tab"><img src='assets/images/products/img-2.png' alt='img not support...' /></a></li>
                      <li><a href="#pic-3" data-toggle="tab"><img src='assets/images/products/img-3.png' alt='img not support...' /></a></li>
                      <li><a href="#pic-4" data-toggle="tab"><img src='assets/images/products/img-4.png' alt='img not support...' /></a></li>
                      <li><a href="#pic-5" data-toggle="tab"><img src='assets/images/products/img-5.png' alt='img not support...' /></a></li>
                    </ul>                   */}

                    <div className="preview-pic tab-content">
                    <h3 className="product-title">{viewcompanyProfile.company_name}</h3>
                      <div className="tab-pane active" id="pic-1"><img src={`${API_BASE_URL}/companyprofileimg/${viewcompanyProfile.company_logo}`} alt='img not support...'/></div>

                      {/* <ul className="preview-thumbnail nav nav-tabs"> 
                      {viewcompanyProfile.map((res,id)=>

                        <li key={id} ><img src={res} style={{cursor:'pointer'}} alt='img not support...' onClick={()=>setCurrentImage(res)}/></li>
                  
                        )} */}
                      {/* <li onClick={()=>setImages(arr[0])}><img src={arr[0]} style={{cursor:'pointer'}} alt='img not support...' /></li>
                      <li onClick={()=>setImages(arr[1])} style={{cursor:'pointer'}}><img src={arr[1]} alt='img not support...' /></li>
                      <li onClick={()=>setImages(arr[2])} style={{cursor:'pointer'}}><img src={arr[2]} alt='img not support...' /></li>
                      <li onClick={()=>setImages(arr[3])} style={{cursor:'pointer'}}><img src={arr[3]} alt='img not support...' /></li>
                      <li onClick={()=>setImages(arr[4])} style={{cursor:'pointer'}}><img src={arr[4]} alt='img not support...' /></li> */}
                    {/* </ul>  */}

                    </div>
                     
                                        
                </div>

                <div className="details "> {/*col-md-6 */} 
                   
                    {/* <h3 className="price"> GST number : <span>{viewcompanyProfile.GST_No}</span></h3> 
                    <br /> */}
                    <h4 className="price">Email : <span>{viewcompanyProfile.email}</span></h4> 
                    <br />
                    <h4 className="price">Contact Number : <span>{viewcompanyProfile.mobile_No}</span></h4> 

                    <div className="rating">
                        <p>Address : </p>

                        <div className='card' style={{width:"100%", boxShadow:"0px 0px 3px 0px black"}}>
                            <p className="product-description">{viewcompanyProfile.address}</p>
                        </div>
                        <Link to="/companyprofiledata" className='btn btn-ghost-primary' style={{width:"200px", margin:"auto", fontWeight:"bolder"}}>Back to Profile</Link>

                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default Viewcompanyprofile