import React, {useState, useEffect} from 'react'
import Sidebar from '../components/sidebar'
import Reusenavbar from './reusenavbar'
import Footer from '../components/footer'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios'

import API_BASE_URL from "../components/config";


const ReuseExpansesReport = (params) => { 

        // search product state value
   const [searchproduct, setSearchproduct] = useState("");

   const [categortList, SetcategortList] = useState([]);
   const [expansesdatails, Setexpansesdatails] = useState([]);
   //console.log("categortList", categortList)

   useEffect(()=>{
    axios.get(`${API_BASE_URL}/getcategory`).then(res=>SetcategortList(res.data)).catch(err=>console.log(err));
    axios.get(`${API_BASE_URL}/getexpansesdetails`).then(res=>Setexpansesdatails(res.data)).catch(err=>console.log(err));

   },[])

       //present date
  const date = new Date();
  const dateTimeString = date.toLocaleString();


   const formik = useFormik({
    initialValues : {
       expanseDate : dateTimeString,
       expansestype : "",
       details : "",
       amount : "",
       PaymentDetails : "",
    },
    // validationSchema : Yup.object({
        
    //     // registerusergstno : Yup.string(),
    //     registerusername : Yup.string(),
    //     registeruseremail : Yup.string().required("Email Required"),
    //     registerusernumber :  Yup.string(),
    //     registeruseraddress: Yup.string()
        
    // }),
    onSubmit : async(values, {resetForm})=>{
        //console.log("valuesfdbgb", values)

        await axios.post(`${API_BASE_URL}/expansesdetails`, values).then(res=>alert(res.data.message)).catch(err => console.log(err));

         resetForm({values : ""});
    }
})



 //prgination

 const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of items to display per page

    
 const handlePrevClick = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const totalPages = Math.ceil(expansesdatails.length / itemsPerPage);

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
  const currentData = expansesdatails.slice(startIndex, endIndex);

  //pegination ends

   
  return (
    <div>
           {/* Begin page */}
    <div id="layout-wrapper">

    {/* navbar start */}
    <div>
      {/* {params.value1.userType === "super Admin" && <Reusenavbar />}
      {params.value1.userType === "admin" && <Reusenavbar />}
      {params.value1.userType === "user" && <Reusenavbar />} */}

       <Reusenavbar value1 ={params.value1} value2 = {params.value2} value3 = {params.value3}/>


    </div>

    {/* navbar end */}

{/* removeNotificationModal */}
<div id="removeNotificationModal" className="modal fade zoomIn" tabindex="-1" aria-hidden="true">
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
                                <h4 className="mb-sm-0">Expenses Report</h4>

                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="#a">Report</a></li>
                                        <li className="breadcrumb-item active">Expenses Report</li> 
                                    </ol>
                                </div>

                            </div>
                        </div>
                    </div>
                   {/* end page title */}

                   <div className="row pb-4 gy-3">
                   <div className="col-sm-4 w-50" >
                            <button className="btn btn-primary addPayment-modal" data-bs-toggle="modal" data-bs-target="#addpaymentModal"><i className="las la-plus me-1"></i> Add Expanses</button>
                        </div>

                        <div className="col-sm-auto ms-auto">
                           <div className="d-flex gap-3">
                            <div className="search-box">
                                <input type="text" className="form-control" placeholder="Search for Expanses Type..." name="searchvendor" value={searchproduct} onChange={(e)=>setSearchproduct(e.target.value)}/>
                                <i className="las la-search search-icon"></i>
                            </div>
                            
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
                                                    <th scope="col">Expanses Type</th>
                                                    <th scope="col">Details</th>
                                                    <th scope="col">Expense Date</th>
                                                    <th scope="col">Amount</th>
                                                    <th scope="col" style={{width: "12%"}}>Payment Details</th>
                                                </tr>
                                            </thead>
        
                                            <tbody>

                                                {currentData.length > 0 ? currentData.filter(list=>list.expansestype.toLowerCase().startsWith(searchproduct.toLowerCase())).map(list=>
                                                <tr key={list._id}>
                                                    <td><p className="fw-medium mb-0">{list.expansestype}</p></td>
                                                    <td>{list.details}</td>
                                                    <td>
                                                        {list.expanseDate}
                                                    </td>
                                                    <td>{list.amount}</td>
                                                    <td><span className="badge badge-soft-success p-2">{list.PaymentDetails}</span></td>
                                                </tr>
                                                )
                                            :
                                            <tr>
                                                <h2>No Expanses Report Data...</h2>
                                            </tr>
                                                }
        
                                                {/* <tr>
                                                    <td><p className="fw-medium mb-0">Bus Booking</p></td>
                                                    <td>Dare-Stark</td>
                                                    <td>
                                                        12 Arl, 2022
                                                    </td>
                                                    <td>$390.00</td>
                                                    <td><span className="badge badge-soft-success p-2">Approved</span></td>
                                                </tr>
        
                                                <tr>
                                                    <td><p className="fw-medium mb-0">Salary Payment</p></td>
                                                    <td>Ortiz-Cronin</td>
                                                    <td>
                                                        28 Mar, 2022
                                                    </td>
                                                    <td>$440.00</td>
                                                    <td><span className="badge badge-soft-danger p-2">Pending</span></td>
                                                </tr>
        
                                                <tr>
                                                    <td><p className="fw-medium mb-0">Office Rent</p></td>
                                                    <td>Jast, Hane and Bogan</td>
                                                    <td>
                                                        23 Aug, 2022
                                                    </td>
                                                    <td>$520.00</td>
                                                    <td><span className="badge badge-soft-danger p-2">Pending</span></td>
                                                </tr>
        
                                                <tr>
                                                    <td><p className="fw-medium mb-0">Computer Repairs</p></td>
                                                    <td>Schroeder Group</td>
                                                    <td>15 Des, 2022</td>
                                                    <td>$480.00</td>
                                                    <td><span className="badge badge-soft-success p-2">Approved</span></td>
                                                </tr>
        
                                                <tr>
                                                    <td><p className="fw-medium mb-0">Software Update</p></td>
                                                    <td>Carroll-Stroman</td>
                                                    <td>
                                                        18 Sep, 2022
                                                    </td>
                                                    <td>$550.00</td>
                                                    <td><span className="badge badge-soft-success p-2">Approved</span></td>
                                                </tr>
        
                                                <tr>
                                                    <td><p className="fw-medium mb-0">Social Marketing</p></td>
                                                    <td>Christiansen-Gerlach</td>
                                                    <td>
                                                        12 Feb, 2022
                                                    </td>
                                                    <td>$170.00</td>
                                                    <td><span className="badge badge-soft-danger p-2">Pending</span></td>
                                                </tr>
        
                                                <tr>
                                                    <td><p className="fw-medium mb-0">Salary Payment</p></td>
                                                    <td>
                                                        Yost and Sons
                                                    </td>
                                                    <td>23 Sep, 2022</td>
                                                    <td>$720.00</td>
                                                    <td><span className="badge badge-soft-danger p-2">Pending</span></td>
                                                </tr>
                                                <tr>
                                                    <td><p className="fw-medium mb-0">Office Rent</p></td>
                                                    <td>
                                                        Mertz, Hand and Marks
                                                    </td>
                                                    <td>16 Aug, 2022</td>
                                                    <td>$820.00</td>
                                                    <td><span className="badge badge-soft-success p-2">Approved</span></td>
                                                </tr>
                                                <tr>
                                                    <td><p className="fw-medium mb-0">Office Maintenance</p></td>
                                                    <td>
                                                        Bode and Sons
                                                    </td>
                                                    <td>15 Des, 2022</td>
                                                    <td>$640.00</td>
                                                    <td><span className="badge badge-soft-success p-2">Approved</span></td>
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
                            <p className="mb-0 text-muted">Showing <b>1</b> to <b>10</b> of <b>{currentData.length}</b> results</p>
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

                    {/* <div style={{ marginTop: '10px' }}>
                            <button onClick={handlePrevClick} disabled={currentPage === 1}>
                            Previous
                            </button>
                            {renderPageNumbers()}
                            <button onClick={handleNextClick} disabled={currentPage === totalPages}>
                            Next
                            </button>
                        </div> */}

                    </div>
                </div>
                {/* container-fluid */}
            </div>
            {/* End Page-content */}


         {/* Modal */}
    <div className="modal fade" id="addpaymentModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0">
                <div className="modal-header p-4 pb-0">
                    <h5 className="modal-title" id="createMemberLabel">Add Expanses</h5>
                    <button type="button" className="btn-close" id="createMemberBtn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body p-4">

                    <form autocomplete="on" id="memberlist-form" className="needs-validation" onSubmit={formik.handleSubmit} enctype="multipart/form-data">
                        <div className="row">
                            <div className="col-lg-12">                           

                                <div className="mb-3 mt-4">
                                    <label htmlFor="teammembersName" className="form-label">Date</label>
                                    <input type="text" className="form-control" id="teammembersEmail" placeholder="Date" name='expanseDate' value={formik.values.expanseDate} readOnly/>
                                    <div className="invalid-feedback">Please Enter Date.</div>
                                </div>

                                <div className="mb-3 mt-4">
                                    <label htmlFor="teammembersName" className="form-label">Expanses Type</label>
                                    <select className="form-control" id="teammembersName" name='expansestype' onChange={formik.handleChange}>
                                        <option value="">--- Select Expanses Type ---</option>
                                        {categortList.length > 0 && categortList.map(list=>
                                        <option key={list._id} value={list.producttype}>{list.producttype}</option>
                                    )}
                                    </select>
                                    <div className="invalid-feedback">Please Enter Expanses Type.</div>
                                </div>
                                
                                <div className="mb-3">
                                    <label htmlFor="teammembersEmail" className="form-label">Details</label>
                                    <input type="text" className="form-control" id="teammembersEmail" placeholder="Bill No / Bill Date / Desctiption..." name='details' value={formik.values.details} onChange={formik.handleChange} />
                                    <div className="invalid-feedback">Please Enter Details.</div>
                                </div>
                                {/* {(formik.touched.registeruseremail && formik.errors.registeruseremail) ? <small style={{color:"red"}}>{formik.errors.registeruseremail}</small> : null} */}

                                <div className="mb-3">
                                    <label htmlFor="teammembersnumber" className="form-label">Amount</label>
                                    <input type="text" className="form-control" id="teammembersnumber" placeholder="Enter Amount" name='amount' value={formik.values.amount} onChange={formik.handleChange} />
                                    <div className="invalid-feedback">Please Enter amount.</div>
                                </div>
                                {/* {(formik.touched.registerusernumber && formik.errors.registerusernumber) ? <small style={{color:"red"}}>{formik.errors.registerusernumber}</small> : null}                         */}

                                <div className="mb-3">
                                    <label htmlFor="teammembersaddress" className="form-label">Payment Details</label>
                                    <input type="text" className="form-control" id="teammembersaddress" placeholder="Enter Transcation No. / Receipt No." name='PaymentDetails' value={formik.values.PaymentDetails} onChange={formik.handleChange} />
                                    <div className="invalid-feedback">Please Enter Payment Details.</div>
                                </div>
                                {/* {(formik.touched.registeruseraddress && formik.errors.registeruseraddress) ? <small style={{color:"red"}}>{formik.errors.registeruseraddress}</small> : null} */}

                                <div className="hstack gap-2 justify-content-end">
                                    <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-success" id="addNewMember">Add Expanses</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
           {/*end modal-content*/}
        </div>
       {/*end modal-dialog*/}
    </div>
    {/*end modal*/}
           
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

   {/*preloader*/}
    {/* <div id="preloader">
        <div id="status">
            <div className="spinner-border text-primary avatar-sm" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    </div> */}

    </div>
  )
}

export default ReuseExpansesReport