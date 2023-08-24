import React, { useContext, useState, useEffect} from 'react'
import { Link} from 'react-router-dom'
import axios from "axios"
import { store } from '../../App.js';
import { Navigate, useNavigate} from 'react-router-dom'
import { company_profile_store } from '../../App.js';
import "../../App.css"


import API_BASE_URL from "./config.js";



const Signin = () => {

    const navigate = useNavigate();

     //company profile logo & name

      const [company_profile_dataa, set_company_profile_dataa] = useContext(company_profile_store); 


     //const [token, setToken] = useContext(store) 
     const [data, setData] = useState({
        email:"",
        password:""
     })

     const {email, password}= data;


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

    const handleChange = (e)=>{
        setData({...data, [e.target.name]:e.target.value})
    }

    const SubmitHandle = (e)=> {
        e.preventDefault();
        axios.post(`${API_BASE_URL}/signin`, data).then(res=>
            {
                if(res.data.status === 400){
                alert(res.data.message); 
                }
                //setToken(res.data.token); 
                if(res.data.status === 200){
                localStorage.setItem("token", res.data.token);
                navigate("/dashboard"); 
                }

            }).catch(err=>console.log(err)) 
    }
    
    if(localStorage.getItem("token")){ 
        return <Navigate to ="/dashboard"/>
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
                                                        <h5 className="mb-0">Welcome Back !</h5>
                                                        <p className="text-muted mt-2">Sign in to continue to Msoft.</p>
                                                    </div>

                                                    {/* to show validation message
                                                    <div className="text-center">
                                                        {validatemag && 
                                                        <h5 className="mb-0" style={{color:"red", border:"1px solid red", borderRadius:"20px", width:"60%", margin:"auto", padding:"7px", boxShadow:"2px 2px 2px  red"}}>{validatemag}</h5>
                                                        }
                                                        
                                                    </div> */}
                                                 
                                                    <div className="mt-4">
                                                        <form onSubmit={SubmitHandle} className="auth-input">
                                                        <div className="mb-2">
                                                                {/* email */}
                                                                <label htmlFor="Email" className="form-label">Email</label>
                                                                <div className="position-relative auth-pass-inputgroup mb-3">
                                                                    <input type="email" className="form-control pe-5 password-input" placeholder="Enter Email" id="email-input" name='email' value={email} onChange={handleChange}/>
                                                               </div>
                                                                                                                          
                                                            </div>
                                    
                                                            <div className="mb-2">
                                                                {/* password */}
                                                                <label htmlFor="userpassword" className="form-label">Password</label>
                                                                <div className="position-relative auth-pass-inputgroup mb-3">
                                                                    <input type={pass} className="form-control pe-5 password-input" placeholder="Enter password" id="password-input" name='password'  value={password} onChange={handleChange}/>
                                                                    <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button" id="password-addon" onClick={()=>eyehandle()}><i className={`${icon} align-middle fs-18`}></i></button>
                                                               </div>
                                                        
                                                            </div>

                                                            {/* <div className="mb-2">
                                                                 selector 
                                                                <label htmlFor="userpassword" className="form-label">User Type</label>
                                                                <div className="position-relative auth-pass-inputgroup mb-3">
                                                            
                                                                   <select className="form-control pe-5 password-input" id="password-input">
                                                                   <option>--Select--</option>
                                                                    <option value="superAdmin">Super Admin</option>
                                                                    <option value="admin">Admin</option>
                                                                    <option value="user">User</option>
                                                                   </select>
                                                               </div>
                                                            </div> */}
                
                                                            {/* <div className="form-check form-check-primary fs-16 py-2">
                                                                <input className="form-check-input" type="checkbox" id="remember-check" />
                                                                <div className="float-end">
                                                                    <Link to="/resetpassword" className="text-muted text-decoration-underline fs-14">Forgot your password?</Link>
                                                                </div>
                                                                
                                                                <label className="form-check-label fs-14" htmlFor="remember-check">
                                                                    Remember me
                                                                </label>
                                                            </div> */}
                
                                                            <div className="mt-2">
                                                               <button className="btn btn-primary w-100" type="submit">Log In</button>
                                                            </div>
                
                                                            {/* <div className="mt-4 text-center">
                                                                <div className="signin-other-title">
                                                                    <h5 className="fs-15 mb-3 title">Sign in with</h5>
                                                                </div>
                                
                                                                <ul className="list-inline">
                                                                    <li className="list-inline-item">
                                                                        <a href="#a" className="social-list-item bg-primary text-white border-primary">
                                                                            <i className="mdi mdi-facebook"></i>
                                                                        </a>
                                                                    </li>
                                                                    <li className="list-inline-item">
                                                                        <a href="#a" className="social-list-item bg-info text-white border-info">
                                                                            <i className="mdi mdi-twitter"></i>
                                                                        </a>
                                                                    </li>
                                                                    <li className="list-inline-item">
                                                                        <a href="#a" className="social-list-item bg-danger text-white border-danger">
                                                                            <i className="mdi mdi-google"></i>
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div> */}
                
                                                            {/* <div className="mt-4 text-center">
                                                                <p className="mb-0">Don't have an account ? <Link to ="/signup" className="fw-medium text-primary text-decoration-underline"> Signup now </Link> </p>
                                                            </div> */}
                                                        </form>
                                                    </div>
                                
                                                </div>
                                            </div>
                
                                            <div className="col-lg-6">
                                                <div className="d-flex h-100 bg-auth align-items-end" style={{backgroundImage : "url('assets/images/crackersimage.jpg')"}}>
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

export default Signin