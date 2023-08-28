import React, {useState, useEffect, useContext} from 'react'
import {Link} from "react-router-dom"
import {useFormik} from "formik"
import * as Yup from "yup"
import axios from 'axios'
import { company_profile_store } from '../../App'
import "../../App.css"
import { useLocation, useNavigate, Navigate } from 'react-router-dom'

import API_BASE_URL from "./config.js";



const PasswordReset = () => {

    const navigate = useNavigate();
 
    let location = useLocation();
  
  const resetUser = location.state;

     //company profile logo & name

     const [company_profile_dataa, set_company_profile_dataa] = useContext(company_profile_store); 


   

    let eyeoff = "las la-eye-slash"
    let eye = "las la-eye"

    const [pass, setPass] = useState("password")
    const [icon,setIcon] = useState(eyeoff)

    const eyehandle = ()=>{
       if(pass ==="password"){
       setPass("text");
       setIcon(eye)

    }
    else{
       setPass("password")
       setIcon(eyeoff)

    }
   }


   
    const formik = useFormik({
        initialValues : {
            email : resetUser.email,
            password : ""
        },
        validationSchema: Yup.object({
            email : Yup.string().email("Invalid Email").required("Email Required"),
            password : Yup.string().min(6, "Password Must Be 6 Characters At Least").required("Password Required"),
        }),
       onSubmit : (values, {resetForm})=>{
        //console.log(values);

        axios.put(`${API_BASE_URL}/resetpassword/${resetUser._id}`, values).then(res=>
            { 
                alert(res.data.message);
                if(res.data.status === 200){
                    navigate("/");
                }

                resetForm({values : ""});
            }).catch(err=>console.log(err))
       }
    })


    useEffect(()=>{ 
        axios.get(`${API_BASE_URL}/resetpassword`, {
            headers :{
                "x-token" : localStorage.getItem("token")
            }
        }).catch(err => console.log(err))  
    },[]) 
     
    if(!localStorage.getItem("token")){
         return <Navigate to="/" />
    }

     
   



  return (
    <div>
        <div className="bg-overlay bg-light"></div>
    
    <div className="account-pages">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-11">
                    <div className="auth-full-page-content d-flex min-vh-100 py-sm-5 py-4">
                        <div className="w-100">
                            <div className="d-flex flex-column h-100 py-0 py-xl-4">

                                <div className="text-center mb-5">
                                {company_profile_dataa && 
                                    <Link to="/">
                                        <span className="logo-lg">
                                            
                                            <img className='c_profile_img' src={`${API_BASE_URL}/companyprofileimg/${company_profile_dataa[0]?.company_logo}`} alt="img not support..." />
                                            <span className='c_profile_name'>{company_profile_dataa[0]?.company_name}</span>
                                            
                                            
                                        </span>
                                    </Link>
                                    }
                                </div>

                                <div className="card my-auto overflow-hidden">
                                        <div className="row g-0">
                                            <div className="col-lg-6">
                                                <div className="p-lg-5 p-4">
                                                    <div className="text-center">
                                                        <h5 className="mb-0">Reset Password?</h5>
                                                        <p className="text-muted mt-2">Reset password with {company_profile_dataa && company_profile_dataa[0]?.company_name}</p>
                                                    </div>

                                                    {/* <div className="text-center my-5">
                                                        <div className="alert alert-borderless alert-warning text-center mb-2 mx-2" role="alert">
                                                            Enter your email and instructions will be sent to you!
                                                        </div>
                                                    </div> */}

                                                   
                                                
                                                    <div className="mt-4">
                                                        <form className="auth-input" onSubmit={formik.handleSubmit}>
                                                            <div className="mb-3">
                                                                <label for="email" className="form-label">Email</label>
                                                                <input type="email" className="form-control bg-light" id="email" placeholder="Enter email" name='email' {...formik.getFieldProps("email")} readOnly/>
                                                                {formik.errors.email ? <small style={{color:"red"}}>{formik.errors.email}</small> : null}

                                                                {/* <div className="mt-2">
                                                                {/* <button className="btn btn-primary w-100" type="submit">Send Reset Link</button> 
                                                                <button className="btn btn-primary w-100" type="submit">Change Password</button>

                                                                </div> */}
                                                            
                                                            </div>

                                                            <div className="mb-3">
                                                                <label for="password" className="form-label">New Password</label>
                                                                <div className="position-relative auth-pass-inputgroup mb-3">

                                                                <input type={pass} className="form-control" id="password" placeholder="Enter new password" name='password' {...formik.getFieldProps("password")}/>
                                                                <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button" id="password-addon" onClick={()=>eyehandle()}><i className={`${icon} align-middle fs-18`}></i></button>
                                                                {formik.errors.password ? <small style={{color:"red"}}>{formik.errors.password}</small> : null}
                                                                </div>
                                                                <div className="mt-2">
                                                                {/* <button className="btn btn-primary w-100" type="submit">Send Reset Link</button> */}
                                                                <button className="btn btn-primary w-100" type="submit">Reset Password</button>

                                                                </div>
                                                            
                                                            </div>
                
                                                           
                
                                                            {/* <div className="mt-4 text-center">
                                                                <div className="signin-other-title">
                                                                    <h5 className="fs-15 mb-3 title">Sign in with</h5>
                                                                </div>
                                
                                                                <ul className="list-inline">
                                                                    <li className="list-inline-item">
                                                                        <a href='#a' className="social-list-item bg-primary text-white border-primary">
                                                                            <i className="mdi mdi-facebook"></i>
                                                                        </a>
                                                                    </li>
                                                                    <li className="list-inline-item">
                                                                        <a href='#a' className="social-list-item bg-info text-white border-info">
                                                                            <i className="mdi mdi-twitter"></i>
                                                                        </a>
                                                                    </li>
                                                                    <li className="list-inline-item">
                                                                        <a href='#a' className="social-list-item bg-danger text-white border-danger">
                                                                            <i className="mdi mdi-google"></i>
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div> */}
                
                                                            {/* <div className="mt-4 text-center">
                                                                <p className="mb-0">Wait, I remember my password...  <Link to="/" className="fw-medium text-primary text-decoration-underline">  Click here  </Link> </p>
                                                            </div> */}
                                                        </form>
                                                    </div>
                                
                                                </div>
                                            </div>
                
                                            <div className="col-lg-6">
                                                <div className="d-flex h-100 bg-auth align-items-end" style={{backgroundImage : "url('assets/images/bg-auth.jpg')"}}>
                                                    <div className="p-lg-5 p-4">
                                                        <div className="bg-overlay bg-primary"></div>
                                                        <div className="p-0 p-sm-4 px-xl-0 py-5">
                                                            <div id="reviewcarouselIndicators" className="carousel slide auth-carousel" data-bs-ride="carousel">
                                                                <div className="carousel-indicators carousel-indicators-rounded">
                                                                    <button type="button" data-bs-target="#reviewcarouselIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                                                    <button type="button" data-bs-target="#reviewcarouselIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                                                    <button type="button" data-bs-target="#reviewcarouselIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                                                </div>
                                                            
                                                                {/* end carouselIndicators */}
                                                                {/* <div className="carousel-inner mx-auto">
                                                                    <div className="carousel-item active">
                                                                        <div className="testi-contain text-center">
                                                                            <h5 className="fs-20 text-white mb-0">“I feel confident
                                                                                imposing
                                                                                on myself”
                                                                            </h5>
                                                                            <p className="fs-15 text-white-50 mt-2 mb-0">Vestibulum auctor orci in risus iaculis consequat suscipit felis rutrum aliquet iaculis
                                                                                augue sed tempus In elementum ullamcorper lectus vitae pretium Nullam ultricies diam
                                                                                eu ultrices sagittis.</p>
                                                                        </div>
                                                                    </div>
                    
                                                                    <div className="carousel-item">
                                                                        <div className="testi-contain text-center">
                                                                            <h5 className="fs-20 text-white mb-0">“Our task must be to
                                                                                free widening circle”</h5>
                                                                            <p className="fs-15 text-white-50 mt-2 mb-0">
                                                                                Curabitur eget nulla eget augue dignissim condintum Nunc imperdiet ligula porttitor commodo elementum
                                                                                Vivamus justo risus fringilla suscipit faucibus orci luctus
                                                                                ultrices posuere cubilia curae ultricies cursus.
                                                                            </p>
                                                                        </div>
                                                                    </div>
                    
                                                                    <div className="carousel-item">
                                                                        <div className="testi-contain text-center">
                                                                            <h5 className="fs-20 text-white mb-0">“I've learned that
                                                                                people forget what you”</h5>
                                                                            <p className="fs-15 text-white-50 mt-2 mb-0">
                                                                                Pellentesque lacinia scelerisque arcu in aliquam augue molestie rutrum Fusce dignissim dolor id auctor accumsan
                                                                                vehicula dolor
                                                                                vivamus feugiat odio erat sed  quis Donec nec scelerisque magna
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div> */}
                                                                {/* end carousel-inner */}
                                                            </div>
                                                            {/* end review carousel */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                    </div>
                                </div>
                                {/* end card */}
                                
                                <div className="mt-5 text-center">
                                    <p className="mb-0 text-muted">©
                                        <script>document.write(new Date().getFullYear())</script>Design & Developed By <i className="mdi mdi-heart text-danger"></i><a href='https://msoftwebtechnologies.com/' style={{color:"red", fontWeight:"bold"}} target='_blank'>Msoft</a>.  
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* end col */}
            </div>
            {/* end row */}
        </div>
        {/* end container */}
    </div>
    </div>
  )
}

export default PasswordReset