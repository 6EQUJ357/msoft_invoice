import React, {useEffect, useState} from 'react'
import { useLocation, Link } from 'react-router-dom'
import "./productview.css"

import { useFormik } from 'formik'
import * as Yup from "yup"
import {Navigate } from 'react-router-dom';

import axios from 'axios'

import API_BASE_URL from "../components/config";



const ViewUser = () => {
    const [admindata, setAdmindata] = useState(null);

  let location = useLocation();
  
  const viewuser = location.state;

  const [pass1, setPass1] = useState("password")
  let [eyeoff1, setEye1] = useState("eye-slash")

  const togleHandle1= ()=>{
    if(pass1 ==="password"){
        setPass1("text")
        setEye1("eye-slash")
 
    }
    else{
        setPass1("password")
        setEye1("eye")

    }
}


//   useEffect(()=> {
//     axios.get()
//   },[])
   //selected img URL
   const [imageURL, setImageURL] = useState('');


    const formik = useFormik({
        initialValues : {
            userimg : null,
            imageURL: '',
            username : viewuser.username,
            email : viewuser.email,
            password : "",
           
        },
        validationSchema : Yup.object({
            // userimg: Yup.mixed().required('Image is required')
            // .test('fileType', 'Only JPEG and PNG images are allowed', (value) =>
            //   value && ['image/jpeg', 'image/png'].includes(value.type)
            // )
            // .test('fileSize', 'Image size should be below 1MB', (value) =>
            //   value && value.size <= 1024 * 1024
            // ),

            username : Yup.string().required("Name Required"),
            email : Yup.string().required("Email Required"),
            password : Yup.string().min(6, "Password Must Be 6 Characters At Least").required("Password Required"),

        }),
        onSubmit : async(values, {resetForm})=>{
            //console.log("values", values)

            const formData = new FormData();
            formData.append("userimg",values.userimg)
            formData.append("username",values.username)
            formData.append("email",values.email)
            formData.append("password",values.password)


            await axios.put(`${API_BASE_URL}/editadmindetails/${viewuser._id}`, formData).then(res=>alert(res.data.message)).catch(err => console.log(err));

            resetForm({values : ""});
        } 
    })

    useEffect(()=>{  
        axios.get(`${API_BASE_URL}/viewuser`, {
            headers :{
                "x-token" : localStorage.getItem("token") 
            }
        }).catch(err => console.log(err))  
    },[]) 
    
    if(!localStorage.getItem("token")){
         return <Navigate to="/" />
    }
    

 
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        formik.setFieldValue('userimg', file);
      
        // Create a URL for the selected image

        if (file && file.size <= 1024 * 1024) {
            formik.setFieldValue('userimg', file);
        
            const imageURL = URL.createObjectURL(file);
            setImageURL(imageURL);
          } 
          else {
            formik.setFieldValue('userimg', null);
            setImageURL('');
          }
      };

  return (
    <div className="container">
    <div className="card">
        <div className="container-fliud">
            <div className="wrapper row">
                 <div className="preview "> {/*col-md-6 */}      
                 <div className="preview-pic tab-content">
                        <h3 className="product-title">{viewuser.username}</h3>
                        <div className="tab-pane active" id="pic-1"><img src={`${API_BASE_URL}/UserImages/${viewuser.userimg}`} alt='img not support...'/></div>
                    </div>                                                                         
                </div>

                <div className="details "> {/*col-md-6 */} 
                {/* <h3 className="price"> GST number : <span>{viewuser.usergstno}</span></h3> 
                <br /> */}
                <h4 className="price">Email : <span>{viewuser.email}</span></h4> 
                <br />
                {/* <h4 className="price">Contact Number : <span>{viewuser.usernumber}</span></h4> 
                <br />                    */}
                    
                    {/* <h4>Address : </h4> 
                    <div className='card' style={{width:"100%", boxShadow:"0px 0px 3px 0px black"}}>
                    <p className="product-description">{viewuser.useraddress}</p>
                    </div> */}

                    <Link to={viewuser.userType === "super Admin" ? "/dashboard" : "/dashboard"} className='btn btn-ghost-primary' style={{width:"200px", margin:"auto", fontWeight:"bolder"}}>Back</Link>
                    { viewuser.userType === "super Admin" &&
                    <>
                    <br />
                    {/* <Link to="/editadmin" className='btn btn-ghost-primary' style={{width:"200px", margin:"auto", fontWeight:"bolder"}}></Link> */}
                    <button className="btn btn-primary addPayment-modal" data-bs-toggle="modal" data-bs-target="#addpaymentModal"><i className="las la-edit me-1"></i> Edit Profile</button>
                    </>
                    }

                     {/* Modal */}
    <div className="modal fade" id="addpaymentModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0">
                <div className="modal-header p-4 pb-0">
                    <h5 className="modal-title" id="createMemberLabel">Update Profile</h5>
                    <button type="button" className="btn-close" id="createMemberBtn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body p-4">

                    <form autocomplete="on" id="memberlist-form" className="needs-validation" onSubmit={formik.handleSubmit} enctype="multipart/form-data">
                        <div className="row">
                            <div className="col-lg-12">
                                <input type="hidden" id="memberid-input" className="form-control" value="" />
                                <div className="text-center mb-4">
                                    <div className="position-relative d-inline-block">
                                         <div className="position-absolute bottom-0 end-0">
                                            <label htmlFor="member-image-input" className="mb-0" data-bs-toggle="tooltip" data-bs-placement="right" title="Select Member Image">
                                                <div className="avatar-xs">
                                                    <div className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                                                        <i className="ri-image-fill"></i>
                                                    </div>
                                                </div>
                                            </label>
                                             <input className="form-control d-none" id="member-image-input" type="file" accept="image/png, image/jpg, image/jpeg" name="userimg" onChange={handleImageChange} /> 
                                        </div> 

                                         <div className="avatar-lg">
                                            <div className="avatar-title bg-light rounded-circle">
                                                <img src={imageURL ? imageURL: "/assets/images/users/user-dummy-img.jpg"} id="member-img" alt='img not support...' className="avatar-md rounded-circle h-auto" />
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                                {/* {formik.errors.userimg ? <small style={{color:"red"}}>{formik.errors.userimg}</small> : null} */}

                                <div className="mb-3 mt-4">
                                    <label htmlFor="teammembersName" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="teammembersName" placeholder="Enter name" name='username' value={formik.values.username} onChange={formik.handleChange} />
                                    <div className="invalid-feedback">Please Enter a member name.</div>
                                </div>
                                {formik.errors.username ? <small style={{color:"red"}}>{formik.errors.username}</small> : null}

                                <div className="mb-3">
                                    <label htmlFor="teammembersEmail" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="teammembersEmail" placeholder="Enter email" name='email' value={formik.values.email} onChange={formik.handleChange} />
                                    <div className="invalid-feedback">Please Enter a member Email.</div>
                                </div>
                                {formik.errors.email ? <small style={{color:"red"}}>{formik.errors.email}</small> : null}

                                <div className="mb-3">
                                    <label htmlFor="teammembersnumber" className="form-label">New Password</label>

                                    <div className="position-relative auth-pass-inputgroup mb-3">
                                        <input type={pass1} className="form-control" id="teammembersnumber" placeholder="Enter New Password" name='password' value={formik.values.password} onChange={formik.handleChange} />
                                        <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button" id="password-addon" onClick={()=>togleHandle1()}><i className={`las la-${eyeoff1} align-middle fs-18`}></i></button>
                                    </div>
                                    
                                    <div className="invalid-feedback">Please Enter a member Password.</div>
                                </div>
                                {(formik.touched.password && formik.errors.password) ? <small style={{color:"red"}}>{formik.errors.password}</small> : null}

                                {/* <div className="mb-3">
                                    <label htmlFor="teammembersnumbrs" className="form-label">Conform Password</label>
                                    <input type="text" className="form-control" id="teammembersnumbers" placeholder="Enter Password" name='conformPassword' value={formik.values.conformPassword} onChange={formik.handleChange} />
                                    <div className="invalid-feedback">Please Enter a member conform Password.</div>
                                </div>
                                {formik.errors.conformPassword ? <small style={{color:"red"}}>{formik.errors.conformPassword}</small> : null} */}
                            
                                {/* <div className="mb-3">
                                    <label htmlFor="teammembersaddress" className="form-label">Address</label>
                                    <input type="text" className="form-control" id="teammembersaddress" placeholder="Enter Address" name='useraddress' value={formik.values.useraddress} onChange={formik.handleChange} />
                                    <div className="invalid-feedback">Please Enter a member number.</div>
                                </div>
                                {formik.errors.useraddress ? <small style={{color:"red"}}>{formik.errors.useraddress}</small> : null} */}

                                <div className="hstack gap-2 justify-content-end">
                                    <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-success" id="addNewMember">Update</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
           {/*end modal-content*/}
        </div>
       {/*end modal-dialog*/}
    </div>{/*end modal*/}

                   
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default ViewUser