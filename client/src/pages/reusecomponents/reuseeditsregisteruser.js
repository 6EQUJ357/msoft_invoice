import React from 'react'
import Reusenavbar from './reusenavbar'
import Sidebar from '../components/sidebar'
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios'
import { useLocation, Link } from 'react-router-dom'
import Footer from '../components/footer'


import API_BASE_URL from "../components/config";


const Reuseeditsregisteruser = (params) => {

    let location = useLocation();

    const registeruserData = location.state;
    //console.log(registerUserData); 

    // let registeruserData = new URLSearchParams(search)
    // console.log(registeruserData.get("id")); 
    // const values = {};
    // productData.forEach((value, key) => {
    //     values[key] = value;
    //   });

    //   values.img = values.img.split(",")

    // let image =  productData.get("img").split(",")

    const formik = useFormik({
        initialValues : {
            editregisterusergstno : null,
            editregisterusername : registeruserData.registerusername,
            editregisteruseremail : registeruserData.registeruseremail,
            editregisterusernumber : registeruserData.registerusernumber,
            editregisteruseraddress : registeruserData.registeruseraddress
        },
        validationSchema:Yup.object({
            // editregisterusergstno : Yup.string().required("Enter GST Number"),
            editregisterusername : Yup.string().required("Name Required"),
            editregisteruseremail : Yup.string().required("Type Required"),
            editregisterusernumber : Yup.string().required("Price Required"),
            editregisteruseraddress : Yup.string().required("Specify Address")

        }),
        onSubmit :(values, {resetForm})=>{
           
            axios.put(`${API_BASE_URL}/editregisteruserdetails/${registeruserData._id}`, values).then(res=>alert(res.data.message)).catch(err=>console.log(err))

        }
 
    })


  
  return (
    <div>
            {/* Begin page */}
    <div id="layout-wrapper">
     <Reusenavbar value1 ={params.value1} value2 = {params.value2} value3 = {params.value3}/>
 

{/* removeNotificationModal */}
<div id="removeNotificationModal" className="modal fade zoomIn" tabIndex="-1" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
            <div className="modal-header">
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="NotificationModalbtn-close"></button>
            </div>
            <div className="modal-body">
                <div className="mt-2 text-center">
                    <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style={{width:"100px",height:"100px"}}></lord-icon>
                    <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                        <h4>Are you sure ?</h4>
                        <p className="text-muted mx-4 mb-0">Are you sure you want to remove this Notification ?</p>
                    </div>
                </div>
                <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                    <button type="button" className="btn w-sm btn-light" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn w-sm btn-danger" id="delete-notification">Yes, Delete It!</button>
                </div>
            </div>

        </div>{/* /.modal-content */}
    </div>{/* /.modal-dialog */}
</div>{/* /.modal */}
        {/* ========== App Menu ========== */}
        <div className="app-menu navbar-menu">
            {/* LOGO */}
            

            {/* sidebar start */}
            <Sidebar value1={params.value1} value2 = {params.value2} value3={params.value3}/>
            {/* sidebar end */}

        </div>
        {/* Left Sidebar End */}
        {/* Vertical Overlay*/}
        <div className="vertical-overlay"></div>

        {/* ============================================================== */}
        {/* Start right Content here */}
        {/* ============================================================== */}
        <div className="main-content">

            <div className="page-content">
                <div className="container-fluid">

                    {/* start page title */}
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0">Update Customer</h4>

                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href='#a'>Customer</a></li>
                                        <li className="breadcrumb-item active">Update Customer</li>
                                    </ol>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* end page title */}


                    <div className="row">

                    <div className="col-sm-4">
                            <Link to="/registeruser" className="btn btn-primary addtax-modal"> Go To Register Customer</Link>
                            </div>
                        <div className="col-xl-12">
                            <div className="card">
                                <div className="card-body">
                                   <div className="p-2">
                                    
                                    {/* add product form */}
                                    <form onSubmit={formik.handleSubmit}>
                                        
                                    <div className="row">
                                    {/* <div className="col-lg-6">
                                            <div className="mb-3">
                                                <label className="form-label" for="productid">GST Number</label>
                                                <input id="productid" name="editregisterusergstno" placeholder="#GST Number" type="text" className="form-control" {...formik.getFieldProps("editregisterusergstno")}/>
                                                {formik.errors.editregisterusergstno ? <small style={{color:"red"}}>{formik.errors.editregisterusergstno}</small> : null}
                                            </div>
                                        </div> */}

                                        <div className="col-lg-6">
                                            <div className="mb-3">
                                                <label className="form-label" for="productname">Customer Name</label>
                                                <input id="productname" name="editregisterusername" placeholder="Enter Name" type="text" className="form-control" {...formik.getFieldProps("editregisterusername")}/>
                                                {formik.errors.editregisterusername ? <small style={{color:"red"}}>{formik.errors.editregisterusername}</small> : null}
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label" for="product type">Email</label>
                                                        <input id="product type" name="editregisteruseremail"  type="email" className="form-control" {...formik.getFieldProps("editregisteruseremail")} placeholder="Enter Email"/>
                                                        {formik.errors.editregisteruseremail ? <small style={{color:"red"}}>{formik.errors.editregisteruseremail}</small> : null}

                                                </div>
                                        </div>
                                       
                                    </div>
                                        
                                        <div className="row">
                                            

                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label" for="price">Phone</label>
                                                    <input id="price" name="editregisterusernumber" placeholder="Enter Number" type="text" className="form-control" {...formik.getFieldProps("editregisterusernumber")} />
                                                    {formik.errors.editregisterusernumber ? <small style={{color:"red"}}>{formik.errors.editregisterusernumber}</small> : null}

                                                </div>
                                            </div>                                         

                                        </div>                                      

                                        <div className="mb-3">
                                            <label className="form-label" for="productdesc">Address</label>
                                            <input type='text' className="form-control" id="productdesc" name='editregisteruseraddress' placeholder="Enter Address" {...formik.getFieldProps("editregisteruseraddress")} />

                                            {formik.errors.editregisteruseraddress ? <small style={{color:"red"}}>{formik.errors.editregisteruseraddress}</small> : null}

                                        </div>

                                        <div className="hstack gap-2 mt-4">
                                        <button type="submit" className="btn btn-primary">Update Customer</button>
                                    </div> 
                                    </form>

                                   

                                   </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* container-fluid */}
            </div>
            {/* End Page-content */}

            <Footer value3 ={params.value3}/>
        </div>
        {/* end main content*/}

    </div>
    {/* END layout-wrapper */}

    {/*start back-to-top*/}
    <button onclick="topFunction()" className="btn btn-danger btn-icon" id="back-to-top">
        <i className="ri-arrow-up-line"></i>
    </button>
    {/*end back-to-top*/}

    {/* preloader
    <div id="preloader">
        <div id="status">
            <div className="spinner-border text-primary avatar-sm" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    </div> */}

    </div>
  )
}

export default Reuseeditsregisteruser
