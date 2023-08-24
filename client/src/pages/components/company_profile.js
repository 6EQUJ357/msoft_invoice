import React , {useState, useEffect}from 'react'
import {useFormik} from "formik"
import * as Yup from "yup"
import {useNavigate, Navigate} from "react-router-dom"
import axios from "axios"

import API_BASE_URL from "./config.js";


//company frofile sinhup form

const Company_profile = () => {

    const navigate = useNavigate();


    //selected img URL
   const [imageURL, setImageURL] = useState('');

    const formik = useFormik({
        initialValues: {
            company_name : "",
            GST_No : null,
            mobile_No : "",
            email : "",
            address : "",
            company_logo : null,
            imageURL: "",
        },
        validationSchema: Yup.object({
            company_name : Yup.string().required("Company Name Required"),
            // GST_No : Yup.string().required("Enter GST no."),
            mobile_No : Yup.string().required('Phone number is required').matches(/^\d+$/, 'Phone number must only contain numbers').min(10, 'Phone number must be exactly 10 digits').max(10, 'Phone number must be exactly 10 digits'),
            email : Yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email address').required("Email Required"),
            address : Yup.string().required("Enter Address"),
            // company_logo : Yup.mixed().required('Image is required')
            // .test('fileType', 'Only JPEG and PNG images are allowed', (value) =>
            //   value && ['image/jpeg', 'image/png'].includes(value.type)
            // )
            // .test('fileSize', 'Image size should be below 1MB', (value) =>
            //   value && value.size <= 1024 * 1024
            // ),
        }), 
        onSubmit: async(values, {resetForm}) => {

            const formData = new FormData();
            formData.append("company_name",values.company_name) 
            formData.append("GST_No",values.GST_No)
            formData.append("mobile_No",values.mobile_No) 
            formData.append("email",values.email)
            formData.append("address",values.address)
            formData.append("company_logo",values.company_logo)

           await axios.post(`${API_BASE_URL}/companyprofile`, formData).then(res=>
                {

                    alert(res.data.message);
                    if(res.data.status === 200) {
                      
                         navigate("/")
                    }

                }).catch(err=>console.log(err))
            
        } 
    })

   
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        formik.setFieldValue('company_logo', file);
      
        // Create a URL for the selected image

        if (file && file.size <= 1024 * 1024) {
            formik.setFieldValue('company_logo', file);
        
            const imageURL = URL.createObjectURL(file);
            setImageURL(imageURL);
          } 
          else {
            formik.setFieldValue('company_logo', null);
            setImageURL('');
          }
      };

    //   let backgroundImage = imageURL ? `url(${imageURL})`:`url('assets/images/bg-auth.jpg')`

    useEffect(()=>{ 
        axios.get(`${API_BASE_URL}/companyprofile`, {
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
                                    {imageURL &&
                                    <a href="#">
                                        <span className="logo-lg">
                                            <img src={imageURL} alt="img not displayed..." height="35" /> &nbsp;
                                            <span style={{fontWeight : "bolder", fontSize:"2rem", color:"black"}} >{formik.values.company_name && formik.values.company_name.slice(0,1).toUpperCase()}{formik.values.company_name && formik.values.company_name.slice(1, formik.values.company_name.length)}</span>
                                        </span>
                                    </a>
                                    }
                                </div>

                                <div className="card my-auto overflow-hidden">
                                        <div className="row g-0">
                                            <div className="col-lg-6">
                                                <div className="p-lg-5 p-4">
                                                    <div className="text-center">
                                                        <h5 className="mb-0">Create Company Profile</h5>
                                                        {/* <p className="text-muted mt-2">Get your free Msoft account now</p> */}
                                                    </div>
                                                
                                                    <div className="mt-4">
                                                        {/* form */}
                                                        <form className="auth-input" onSubmit={formik.handleSubmit} enctype="multipart/form-data">
                                                                                    
                                                            <div className="mb-3">
                                                                <label htmlFor="username" className="form-label">Company Name</label>
                                                                <input type="text" className="form-control" id="username" placeholder="Enter company name" name='company_name' {...formik.getFieldProps("company_name")} />
                                                                {(formik.touched.company_name && formik.errors.company_name) ? <small style={{color:"red"}}>{formik.errors.company_name}</small> : null}
                                                            </div>

                                                            {/* <div className="mb-3">
                                                                {/* selector 
                                                                <label htmlFor="userpassword" className="form-label">GST No.</label>
                                                                <div className="position-relative       auth-pass-inputgroup mb-3">
                                                            
                                                                   <input type='text' className="form-control pe-5 password-input" id="password-input" name='GST_No' placeholder="Enter GST No." {...formik.getFieldProps("GST_No")} />
                                                                   
                                                                   
                                                               </div>
                                                               {(formik.touched.GST_No && formik.errors.GST_No) ? <small style={{color:"red"}}>{formik.errors.GST_No}</small> : null}
                                                            </div> */}

                                                            <div className="mb-3">
                                                                <label htmlFor="mobile" className="form-label">Mobile No.</label>
                                                                <input type="text" className="form-control" id="mobile" placeholder="Enter mobile No." name='mobile_No' {...formik.getFieldProps("mobile_No")} />
                                                                {(formik.touched.mobile_No && formik.errors.mobile_No) ? <small style={{color:"red"}}>{formik.errors.mobile_No}</small> : null}
                                                            </div>

                                                            <div className="mb-3">
                                                                <label htmlFor="email" className="form-label">Email</label>
                                                                <input type="email" className="form-control" id="email" placeholder="Enter email" name='email' {...formik.getFieldProps("email")} />
                                                                {(formik.touched.email && formik.errors.email) ? <small style={{color:"red"}}>{formik.errors.email}</small> : null}
                                                            </div>
                                    
                                                             <div className="mb-2">
                                                                <label htmlFor="useraddress" className="form-label">Address</label> 
                                                                <div className="position-relative auth-pass-inputgroup mb-3">
                                                                    <input type="text" className="form-control pe-5 password-input" placeholder="Enter address" id="useraddress" name='address' {...formik.getFieldProps("address")} />
                                                                    
                                                               </div>
                                                               {(formik.touched.address && formik.errors.address) ? <small style={{color:"red"}}>{formik.errors.address}</small> : null}
                                                            </div>

                                                            <div className="mb-2">
                                                                
                                                                <div className="position-relative auth-pass-inputgroup mb-3">
                                                                    <input type="file" className="form-control pe-5 password-input"  name='company_logo' onChange={handleImageChange} />
                                                                    
                                                               </div>
                                                               {/* {(formik.touched.company_logo && formik.errors.company_logo) ? <small style={{color:"red"}}>{formik.errors.company_logo}</small> : null} */}
                                                            </div>

                                                            {/* <div className="mb-2">
                                                                <label htmlFor="userpassword" className="form-label">Conform Password</label>
                                                                <div className="position-relative auth-pass-inputgroup mb-3">
                                                                    <input type={pass2} className="form-control pe-5 password-input" placeholder="Conform Password" id="userpassword" name='conformPassword' {...formik.getFieldProps("conformPassword")} />
                                                                    <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button" id="password-addon" onClick={()=>togleHandle2()}><i className={`las la-${eyeoff2} align-middle fs-18`}></i></button>
                                                               </div>
                                                               {(formik.touched.conformPassword && formik.errors.conformPassword) ? <small style={{color:"red"}}>{formik.errors.conformPassword}</small> : null}
                                                            </div> */}
                                                            
{/*                 
                                                            <div className="fs-16 pb-2">
                                                                <p className="mb-0 fs-14 text-muted fst-italic">By registering you agree to the Invoika <a href="#a" className="text-primary text-decoration-underline fst-normal fw-medium">Terms of Use</a></p>
                                                            </div> */}
        
                                                            <div className="mt-2">
                                                                <button className="btn btn-primary w-100" type="submit">Submit</button>
                                                            </div>
{/*                 
                                                            <div className="mt-4 text-center">
                                                                <div className="signin-other-title">
                                                                    <h5 className="fs-15 mb-3 title">Create account with</h5>
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
                                                                <p className="mb-0">Already an account ? <Link to="/" className="fw-medium text-primary text-decoration-underline"> Signin </Link> </p>
                                                            </div> */}
                                                        </form>
                                                    </div>
                                
                                                </div>
                                            </div>
                
                                            <div className="col-lg-6">
                                                <div className="d-flex h-100 bg-auth align-items-end" style={{backgroundImage :imageURL ? `url(${imageURL})`:`url('assets/images/bg-auth.jpg')`}}>
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
                                                                <div className="carousel-inner mx-auto">
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
                                                                </div>
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
                                        <script>document.write(new Date().getFullYear())</script>Design & Develop By <i className="mdi mdi-heart text-danger"></i><a href='https://msoftweb.online/' style={{color:"red", fontWeight:"bold"}} target='_blank'>Msoft</a>.  
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

export default Company_profile