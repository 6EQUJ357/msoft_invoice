import React, { useEffect, useState } from 'react'
import Sidebar from '../components/sidebar'
import Reusenavbar from './reusenavbar'
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/footer'


import API_BASE_URL from "../components/config";


const ReuseUsers = (params) => {

    const [search, setSearch] = useState("");

    const [userDetails, setUserdetails] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of items to display per page


    
   //selected img URL
   const [imageURL, setImageURL] = useState('');


    const formik = useFormik({
        initialValues : {
            userimg : null,
            imageURL: '',
            username : "",
            userType : "user",
            email : "",
            password : "",
            conformPassword : ""
           
        },
        validationSchema : Yup.object({
            //userimg: Yup.mixed()
            // .test('fileType', 'Only JPEG and PNG images are allowed', (value) =>
            //   value && ['image/jpeg', 'image/png'].includes(value.type)
            // )
            // .test('fileSize', 'Image size should be below 1MB', (value) =>
            //   value && value.size <= 1024 * 1024
            // )
            

            username : Yup.string(),
            email : Yup.string(),
            password : Yup.string().min(6, "Password Must Be 6 Characters At Least").required("Password Required"),
            conformPassword : Yup.string().oneOf([Yup.ref("password"), null], "Passwords Must Match").required("Password Required")

        }),
        onSubmit : async(values, {resetForm})=>{
            //console.log("values", values)

            const formData = new FormData();
            formData.append("userimg",values.userimg)
            formData.append("username",values.username)
            formData.append("userType",values.userType)
            formData.append("email",values.email)
            formData.append("password",values.password)
            formData.append("conformPassword",values.conformPassword)


            await axios.post(`${API_BASE_URL}/muser`, formData).then(res=>alert(res.data.message)).catch(err => console.log(err));

           // resetForm({values : ""});
        } 
    })


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        formik.setFieldValue('userimg', file);
      
        // Create a URL for the selected image

        if (file && file.size <= 1024 * 1024) {
            formik.setFieldValue('userimg', file);
        
            const imageURL = URL.createObjectURL(file);
            setImageURL(imageURL);
          } else {
            formik.setFieldValue('userimg', null);
            setImageURL('');
          }
      };



    //get get user details
    useEffect(()=>{
        axios.get(`${API_BASE_URL}/getallusers`).then(res=>setUserdetails(res.data.filter(list=>list.userType === "user"))).catch(err => console.log(err))
    },[])

     //prgination
     const handlePrevClick = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
      };
    
      const handleNextClick = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
      };
    
      const totalPages = Math.ceil(userDetails.length / itemsPerPage);

      const handlePageClick = (page) => {
        setCurrentPage(page);
      };

      const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(
            <span
              key={i}
              onClick={() => handlePageClick(i)}
              className='pegination_button'
            >
              {i}
            </span>
          );
        }
        return pageNumbers;
      };

      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = currentPage * itemsPerPage;
      const currentData = userDetails.slice(startIndex, endIndex);

      //pegination ends


    //delete user  details

    const deleteuserhandle = (res)=>{
        let response = window.confirm(` Want to Delete This User #${res.username}`);

        if(response){
        axios.delete(`${API_BASE_URL}/deleteuserdetails/${res._id}`).then(res=>setUserdetails(res.data.filter(list=>list.userType === "user"))).catch(err => console.log(err))
        }
    }

    //update  user

    let navigate = useNavigate();

    const EditUser = (data)=>{
        navigate("/edituser", {state : data})
    }

    //view  user

    const viewUser = (data)=>{ 
        navigate("/viewuser", {state : data})
    }



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
           
            {/* side bar start*/}

            <Sidebar value1={params.value1} value2 = {params.value2} value3={params.value3}/>
            {/* side bar end*/}

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
                                <h4 className="mb-sm-0">User</h4>

                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="#a">User</a></li>
                                        <li className="breadcrumb-item active">Add User</li>
                                    </ol>
                                </div>

                            </div>
                        </div>
                    </div>
                   {/* end page title */}

                    <div className="row pb-4 gy-3">
                        <div className="col-sm-4">
                            <button className="btn btn-primary addPayment-modal" data-bs-toggle="modal" data-bs-target="#addpaymentModal"><i className="las la-plus me-1"></i> Add User</button>
                        </div>

                        <div className="col-sm-auto ms-auto">
                           <div className="d-flex gap-3">
                            <div className="search-box">
                                <input type="text" className="form-control" id="searchMemberList" placeholder="Search for User Name" name='search' onChange={(e)=>setSearch(e.target.value)}/>
                                <i className="las la-search search-icon"></i>
                            </div>
                            {/* <div className="">
                                <button type="button" id="dropdownMenuLink1" data-bs-toggle="dropdown" aria-expanded="false" className="btn btn-soft-info btn-icon fs-14"><i className="las la-ellipsis-v fs-18"></i></button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink1">
                                    <li><a className="dropdown-item" href="#a">All</a></li>
                                    <li><a className="dropdown-item" href="#a">Last Week</a></li>
                                    <li><a className="dropdown-item" href="#a">Last Month</a></li>
                                    <li><a className="dropdown-item" href="#a">Last Year</a></li>
                                </ul>
                            </div> */}
                           </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="table-responsive table-card">
                                        <table className="table table-hover table-nowrap align-middle mb-0">
                                            <thead>
                                                <tr className="text-muted text-uppercase">
                                                    <th scope="col">User Name</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Registered On</th>
                                                    {/* <th scope="col" style={{width: "16%"}}>Status</th> */}
                                                    <th scope="col" style={{width: "12%"}}>Action</th> 
                                                </tr>
                                            </thead>
        
                                            <tbody>
                                                {currentData.length > 0 ? currentData.filter(list=>list.username.toLowerCase().includes(search.toLocaleLowerCase())).map(res=>
                                                <tr key={res._id}>
                                                    <td>{/* <img src="assets/images/users/avatar-1.jpg" alt="" className="avatar-xs rounded-circle me-2" /> */}
                                                        <a href='#a' className="text-body align-middle fw-medium">{res.username}</a>
                                                    </td>
                                                    <td>{res.email}</td>                                                   
                                                    <td>{new Date(res.date).toDateString()}</td>   {/* .toDateString(), .toLocaleDateString(),  .toLocaleString()*/}
                                                    {/* <td><span className="badge badge-soft-success p-2">{res.userstatus}</span></td> */}
                                                    <td>
                                                        <ul className="list-inline hstack gap-2 mb-0">
                                                            <li className="list-inline-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="View">
                                                                <button type='button' onClick={()=>viewUser(res)} className="btn btn-soft-info btn-sm d-inline-block">
                                                                    <i className="las la-eye fs-17 align-middle"></i>
                                                                </button>
                                                            </li>
                                                            <li className="list-inline-item edit" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Edit">
                                                                <button type='button' onClick={()=>EditUser(res)} className="btn btn-soft-info btn-sm d-inline-block">
                                                                    <i className="las la-pen fs-17 align-middle"></i>
                                                                </button>
                                                            </li>
                                                            <li className="list-inline-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Remove">
                                                                <button type='button' onClick={()=>deleteuserhandle(res)} className="btn btn-soft-danger btn-sm d-inline-block">
                                                                    <i className="las la-file-download fs-17 align-middle"></i>
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                                )
                                                :
                                                <tr>
                                                    <h1>No User Data Found...</h1>
                                                </tr>
                                                }
                                                
        
                                                {/* <tr>
                                                    <td><img src="assets/images/users/avatar-2.jpg" alt="" className="avatar-xs rounded-circle me-2" />
                                                        <a href='#a' className="text-body align-middle fw-medium">Brody Holman</a>
                                                    </td>
                                                    <td>metus@protonmail.org</td>
                                                    <td>253-205-7394</td>
                                                    <td>12 Arl, 2022</td>
                                                    <td><span className="badge badge-soft-danger p-2">Disabled</span></td>
                                                    <td>
                                                        <ul className="list-inline hstack gap-2 mb-0">
                                                            <li className="list-inline-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="View">
                                                                <a href="#a" className="btn btn-soft-info btn-sm d-inline-block">
                                                                    <i className="las la-eye fs-17 align-middle"></i>
                                                                </a>
                                                            </li>
                                                            <li className="list-inline-item edit" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Edit">
                                                                <a href="#a" className="btn btn-soft-info btn-sm d-inline-block">
                                                                    <i className="las la-pen fs-17 align-middle"></i>
                                                                </a>
                                                            </li>
                                                            <li className="list-inline-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Remove">
                                                                <a href="#a" className="btn btn-soft-danger btn-sm d-inline-block">
                                                                    <i className="las la-file-download fs-17 align-middle"></i>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </td>
                                                </tr>
        
                                                <tr>
                                                    <td><img src="assets/images/users/avatar-3.jpg" alt="" className="avatar-xs rounded-circle me-2" />
                                                        <a href='#a' className="text-body align-middle fw-medium">Jolie Hood</a>
                                                    </td>
                                                    <td>morbi.quis@protonmail.org</td>
                                                    <td>832-330-4300</td>
                                                    <td>28 Mar, 2022</td>
                                                    <td><span className="badge badge-soft-success p-2">Active</span></td>
                                                    <td>
                                                        <ul className="list-inline hstack gap-2 mb-0">
                                                            <li className="list-inline-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="View">
                                                                <a href="#a" className="btn btn-soft-info btn-sm d-inline-block">
                                                                    <i className="las la-eye fs-17 align-middle"></i>
                                                                </a>
                                                            </li>
                                                            <li className="list-inline-item edit" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Edit">
                                                                <a href="#a" className="btn btn-soft-info btn-sm d-inline-block">
                                                                    <i className="las la-pen fs-17 align-middle"></i>
                                                                </a>
                                                            </li>
                                                            <li className="list-inline-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Remove">
                                                                <a href="#a" className="btn btn-soft-danger btn-sm d-inline-block">
                                                                    <i className="las la-file-download fs-17 align-middle"></i>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </td>
                                                </tr>
        
                                                <tr>
                                                    <td><img src="assets/images/users/avatar-4.jpg" alt="" className="avatar-xs rounded-circle me-2" />
                                                        <a href='#a' className="text-body align-middle fw-medium">Buckminster Wong</a>
                                                    </td>
                                                    <td>morbi.quis@protonmail.org</td>
                                                    <td>770-800-9825</td>
                                                    <td>23 Aug, 2022</td>
                                                    <td><span className="badge badge-soft-success p-2">Active</span></td>
                                                    <td>
                                                        <ul className="list-inline hstack gap-2 mb-0">
                                                            <li className="list-inline-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="View">
                                                                <a href="#a" className="btn btn-soft-info btn-sm d-inline-block">
                                                                    <i className="las la-eye fs-17 align-middle"></i>
                                                                </a>
                                                            </li>
                                                            <li className="list-inline-item edit" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Edit">
                                                                <a href="#a" className="btn btn-soft-info btn-sm d-inline-block">
                                                                    <i className="las la-pen fs-17 align-middle"></i>
                                                                </a>
                                                            </li>
                                                            <li className="list-inline-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Remove">
                                                                <a href="#a" className="btn btn-soft-danger btn-sm d-inline-block">
                                                                    <i className="las la-file-download fs-17 align-middle"></i>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </td>
                                                </tr>
        
                                                <tr>
                                                    <td><img src="assets/images/users/avatar-5.jpg" alt="" className="avatar-xs rounded-circle me-2" />
                                                        <a href='#a' className="text-body align-middle fw-medium">Howard Lyons</a>
                                                    </td>
                                                    <td>neque.sed.dictum@icloud.org</td>
                                                    <td>804-509-5073</td>
                                                    <td>18 Sep, 2022</td>
                                                    <td><span className="badge badge-soft-danger p-2">Disabled</span></td>
                                                    <td>
                                                        <ul className="list-inline hstack gap-2 mb-0">
                                                            <li className="list-inline-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="View">
                                                                <a href="#a" className="btn btn-soft-info btn-sm d-inline-block">
                                                                    <i className="las la-eye fs-17 align-middle"></i>
                                                                </a>
                                                            </li>
                                                            <li className="list-inline-item edit" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Edit">
                                                                <a href="#a" className="btn btn-soft-info btn-sm d-inline-block">
                                                                    <i className="las la-pen fs-17 align-middle"></i>
                                                                </a>
                                                            </li>
                                                            <li className="list-inline-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Remove">
                                                                <a href="#a" className="btn btn-soft-danger btn-sm d-inline-block">
                                                                    <i className="las la-file-download fs-17 align-middle"></i>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </td>
                                                </tr>
        
                                                <tr>
                                                    <td><img src="assets/images/users/avatar-6.jpg" alt="" className="avatar-xs rounded-circle me-2" />
                                                        <a href='#a' className="text-body align-middle fw-medium">Howard Oneal</a>
                                                    </td>
                                                    <td>metus@protonmail.org</td>
                                                    <td>205-243-9746</td>
                                                    <td>12 Feb, 2022</td>
                                                    <td><span className="badge badge-soft-success p-2">Active</span></td>
                                                    <td>
                                                        <ul className="list-inline hstack gap-2 mb-0">
                                                            <li className="list-inline-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="View">
                                                                <a href="#a" className="btn btn-soft-info btn-sm d-inline-block">
                                                                    <i className="las la-eye fs-17 align-middle"></i>
                                                                </a>
                                                            </li>
                                                            <li className="list-inline-item edit" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Edit">
                                                                <a href="#a" className="btn btn-soft-info btn-sm d-inline-block">
                                                                    <i className="las la-pen fs-17 align-middle"></i>
                                                                </a>
                                                            </li>
                                                            <li className="list-inline-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Remove">
                                                                <a href="#a" className="btn btn-soft-danger btn-sm d-inline-block">
                                                                    <i className="las la-file-download fs-17 align-middle"></i>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </td>
                                                </tr>
        
                                                <tr>
                                                    <td><img src="assets/images/users/avatar-7.jpg" alt="" className="avatar-xs rounded-circle me-2" />
                                                        <a href='#a' className="text-body align-middle fw-medium">Jena Hall</a>
                                                    </td>
                                                    <td>morbi.quis@protonmail.org</td>
                                                    <td>214-592-0512</td>
                                                    <td>30 Nov, 2022</td>
                                                    <td><span className="badge badge-soft-danger p-2">Disabled</span></td>
                                                    <td>
                                                        <ul className="list-inline hstack gap-2 mb-0">
                                                            <li className="list-inline-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="View">
                                                                <a href="#a" className="btn btn-soft-info btn-sm d-inline-block">
                                                                    <i className="las la-eye fs-17 align-middle"></i>
                                                                </a>
                                                            </li>
                                                            <li className="list-inline-item edit" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Edit">
                                                                <a href="#a" className="btn btn-soft-info btn-sm d-inline-block">
                                                                    <i className="las la-pen fs-17 align-middle"></i>
                                                                </a>
                                                            </li>
                                                            <li className="list-inline-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Remove">
                                                                <a href="#a" className="btn btn-soft-danger btn-sm d-inline-block">
                                                                    <i className="las la-file-download fs-17 align-middle"></i>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </td>
                                                </tr>
        
                                                <tr>
                                                    <td><img src="assets/images/users/avatar-8.jpg" alt="" className="avatar-xs rounded-circle me-2" />
                                                        <a href='#a' className="text-body align-middle fw-medium">Paki Edwards</a>
                                                    </td>
                                                    <td>dictum.phasellus.in@hotmail.org</td>
                                                    <td>862-222-0853</td>
                                                    <td>23 Sep, 2022</td>
                                                    <td><span className="badge badge-soft-success p-2">Active</span></td>
                                                    <td>
                                                        <ul className="list-inline hstack gap-2 mb-0">
                                                            <li className="list-inline-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="View">
                                                                <a href="#a" className="btn btn-soft-info btn-sm d-inline-block">
                                                                    <i className="las la-eye fs-17 align-middle"></i>
                                                                </a>
                                                            </li>
                                                            <li className="list-inline-item edit" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Edit">
                                                                <a href="#a" className="btn btn-soft-info btn-sm d-inline-block">
                                                                    <i className="las la-pen fs-17 align-middle"></i>
                                                                </a>
                                                            </li>
                                                            <li className="list-inline-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Remove">
                                                                <a href="#a" className="btn btn-soft-danger btn-sm d-inline-block">
                                                                    <i className="las la-file-download fs-17 align-middle"></i>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><img src="assets/images/users/avatar-9.jpg" alt="" className="avatar-xs rounded-circle me-2" />
                                                        <a href='#a' className="text-body align-middle fw-medium">James Diaz</a>
                                                    </td>
                                                    <td>nascetur@yahoo.com</td>
                                                    <td>407-691-4701</td>
                                                    <td>16 Aug, 2022</td>
                                                    <td><span className="badge badge-soft-success p-2">Active</span></td>
                                                    <td>
                                                        <ul className="list-inline hstack gap-2 mb-0">
                                                            <li className="list-inline-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="View">
                                                                <a href="#a" className="btn btn-soft-info btn-sm d-inline-block">
                                                                    <i className="las la-eye fs-17 align-middle"></i>
                                                                </a>
                                                            </li>
                                                            <li className="list-inline-item edit" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Edit">
                                                                <a href="#a" className="btn btn-soft-info btn-sm d-inline-block">
                                                                    <i className="las la-pen fs-17 align-middle"></i>
                                                                </a>
                                                            </li>
                                                            <li className="list-inline-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Remove">
                                                                <a href="#a" className="btn btn-soft-danger btn-sm d-inline-block">
                                                                    <i className="las la-file-download fs-17 align-middle"></i>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </td>
                                                </tr> */}
                                            </tbody>{/* end tbody */}
                                        </table>{/* end table */}
                                    </div>{/* end table responsive */}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row align-items-center mb-4 gy-3">
                        <div className="col-md-5">
                            <p className="mb-0 text-muted">Showing <b>1</b> to <b>10</b> of <b>{userDetails.length}</b> results</p>
                        </div>

                        <div className="col-sm-auto ms-auto">
                            <nav aria-label="...">
                                <ul className="pagination mb-0">
                                  <button className="page-item "  onClick={handlePrevClick} disabled={currentPage === 1}>
                                    <span>Previous</span>
                                  </button>

                                  {/* <li className="page-item active"><span className="page-link m-lg-1"> {renderPageNumbers()}</span></li> */}
                                  {renderPageNumbers()}

                                  {/* <li className="page-item" aria-current="page">
                                    <span className="page-link">2</span>
                                  </li>
                                  <li className="page-item"><a className="page-link" href='#a'>3</a></li> */}

                                  <button className="page-item" onClick={handleNextClick} disabled={currentPage === totalPages}>
                                    <span>Next</span>
                                  </button>
                                </ul>
                              </nav>
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

   {/* Modal */}
    <div className="modal fade" id="addpaymentModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0">
                <div className="modal-header p-4 pb-0">
                    <h5 className="modal-title" id="createMemberLabel">Add User</h5>
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
                                {(formik.touched.userimg && formik.errors.userimg) ? <small style={{color:"red"}}>{formik.errors.userimg}</small> : null}

                                <div className="mb-3 mt-4">
                                    <label htmlFor="teammembersName" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="teammembersName" placeholder="Enter name" name='username' value={formik.values.username} onChange={formik.handleChange} />
                                    <div className="invalid-feedback">Please Enter a member name.</div>
                                </div>
                                {(formik.touched.username && formik.errors.username) ? <small style={{color:"red"}}>{formik.errors.username}</small> : null}

                                <div className="mb-3">
                                    <label htmlFor="teammembersEmail" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="teammembersEmail" placeholder="Enter email" name='email' value={formik.values.email} onChange={formik.handleChange} />
                                    <div className="invalid-feedback">Please Enter a member Email.</div>
                                </div>
                                {(formik.touched.email && formik.errors.email) ? <small style={{color:"red"}}>{formik.errors.email}</small> : null}

                                <div className="mb-3">
                                    <label htmlFor="teammembersnumber" className="form-label">Password</label>
                                    <input type="text" className="form-control" id="teammembersnumber" placeholder="Enter Password" name='password' value={formik.values.password} onChange={formik.handleChange} />
                                    <div className="invalid-feedback">Please Enter a member Password.</div>
                                </div>
                                {(formik.touched.password && formik.errors.password) ? <small style={{color:"red"}}>{formik.errors.password}</small> : null}

                                <div className="mb-3">
                                    <label htmlFor="teammembersnumbrs" className="form-label">Conform Password</label>
                                    <input type="text" className="form-control" id="teammembersnumbers" placeholder="Enter Password" name='conformPassword' value={formik.values.conformPassword} onChange={formik.handleChange} />
                                    <div className="invalid-feedback">Please Enter a member conform Password.</div>
                                </div>
                                {(formik.touched.conformPassword && formik.errors.conformPassword) ? <small style={{color:"red"}}>{formik.errors.conformPassword}</small> : null}
                            
                                {/* <div className="mb-3">
                                    <label htmlFor="teammembersaddress" className="form-label">Address</label>
                                    <input type="text" className="form-control" id="teammembersaddress" placeholder="Enter Address" name='useraddress' value={formik.values.useraddress} onChange={formik.handleChange} />
                                    <div className="invalid-feedback">Please Enter a member number.</div>
                                </div>
                                {formik.errors.useraddress ? <small style={{color:"red"}}>{formik.errors.useraddress}</small> : null} */}

                                <div className="hstack gap-2 justify-content-end">
                                    <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-success" id="addNewMember">Add User</button>
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

export default ReuseUsers