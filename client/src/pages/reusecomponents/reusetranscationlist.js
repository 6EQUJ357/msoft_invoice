import React from 'react'
import Sidebar from '../components/sidebar'
import Reusenavbar from './reusenavbar'
import { Link } from 'react-router-dom'
import Footer from '../components/footer'


const ReuseTranscationlist = (params) => {
   
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
                                <h4 className="mb-sm-0">Transaction List</h4>

                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="#a">User</a></li>
                                        <li className="breadcrumb-item active">Transaction List</li> 
                                    </ol>
                                </div>

                            </div>
                        </div>
                    </div>
                   {/* end page title */}

                   <div className="row pb-4 gy-3">
                        <div className="col-sm-4">
                            <Link to="/newtranscation" className="btn btn-primary"><i className="las la-plus me-1"></i>Add Transaction</Link>
                        </div>

                        <div className="col-sm-auto ms-auto">
                           <div className="d-flex gap-3">
                            <div className="search-box">
                                <input type="text" className="form-control" id="searchMemberList" placeholder="Search for result" />
                                <i className="las la-search search-icon"></i>
                            </div>
                            <div className="">
                                <button type="button" id="dropdownMenuLink1" data-bs-toggle="dropdown" aria-expanded="false" className="btn btn-soft-info btn-icon fs-14"><i className="las la-ellipsis-v fs-18"></i></button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink1">
                                    <li><a className="dropdown-item" href='#a'>All</a></li>
                                    <li><a className="dropdown-item" href='#a'>Last Week</a></li>
                                    <li><a className="dropdown-item" href='#a'>Last Month</a></li>
                                    <li><a className="dropdown-item" href='#a'>Last Year</a></li>
                                </ul>
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
                                                    <th scope="col">Transaction Id</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Description</th>
                                                    <th scope="col">Credit / Debit</th>
                                                    <th scope="col">Amount</th>
                                                    <th scope="col" style={{width: "12%"}}>Attachment</th>
                                                </tr>
                                            </thead>
        
                                            <tbody>
                                                <tr>
                                                    <td>#BR2150</td>
                                                    <td>20 Sep, 2022</td>
                                                    <td>Maintenance</td>
                                                    <td><span className="badge badge-soft-success p-2">Credit</span></td>
                                                    <td>$1200.00</td>
                                                    <td>N/A</td>
                                                </tr>
        
                                                <tr>
                                                    <td>#BR2151</td>
                                                    <td>12 Arl, 2022</td>
                                                    <td>Flight Booking</td>
                                                    <td><span className="badge badge-soft-success p-2">Credit</span></td>
                                                    <td>$3600.00</td>
                                                    <td>N/A</td>
                                                    
                                                </tr>
        
                                                <tr>
                                                    <td>#BR2152</td>
                                                    <td>28 Mar, 2022</td>
                                                    <td>Office Rent</td>
                                                    <td><span className="badge badge-soft-danger p-2">Debit</span></td>
                                                    <td>$800.00</td>
                                                    <td>N/A</td>
                                                </tr>
        
                                                <tr>
                                                    <td>#BR2153</td>
                                                    <td>23 Aug, 2022</td>
                                                    <td>Salary Payment</td>
                                                    <td><span className="badge badge-soft-success p-2">Credit</span></td>
                                                    <td>$1600.00</td>
                                                    <td>
                                                        <button type="button" className="btn btn-soft-success btn-sm btn-icon fs-14">
                                                            <i className="las la-download fs-18"></i>
                                                        </button>
                                                    </td>
                                                </tr>
        
                                                <tr>
                                                    <td>#BR2154</td>
                                                    <td>18 Sep, 2022</td>
                                                    <td>Salary Payment</td>
                                                    <td><span className="badge badge-soft-danger p-2">Debit</span></td>
                                                    <td>$3200.00</td>
                                                    <td>N/A</td>
                                                </tr>
        
                                                <tr>
                                                    <td>#BR2155</td>
                                                    <td>12 Feb, 2022</td>
                                                    <td>Maintenance</td>
                                                    <td><span className="badge badge-soft-success p-2">Credit</span></td>
                                                    <td>$900.00</td>
                                                    <td>
                                                        <button type="button" className="btn btn-soft-success btn-sm btn-icon fs-14">
                                                            <i className="las la-download fs-18"></i>
                                                        </button>
                                                    </td>
                                                </tr>
        
                                                <tr>
                                                    <td>#BR2156</td>
                                                    <td>30 Nov, 2022</td>
                                                    <td>Online Product</td>
                                                    <td><span className="badge badge-soft-success p-2">Credit</span></td>
                                                    <td>$200.00</td>
                                                    <td>
                                                        <button type="button" className="btn btn-soft-success btn-sm btn-icon fs-14">
                                                            <i className="las la-download fs-18"></i>
                                                        </button>
                                                    </td>
                                                </tr>
        
                                                <tr>
                                                    <td>#BR2157</td>
                                                    <td>23 Sep, 2022</td>
                                                    <td>Office Rent</td>
                                                    <td><span className="badge badge-soft-danger p-2">Debit</span></td>
                                                    <td>$1200.00</td>
                                                    <td>N/A</td>
                                                </tr>
                                                <tr>
                                                    <td>#BR2158</td>
                                                    <td>16 Aug, 2022</td>
                                                    <td>Online Product</td>
                                                    <td><span className="badge badge-soft-success p-2">Credit</span></td>
                                                    <td>$1800.00</td>
                                                    <td>N/A</td>
                                                </tr>
                                            </tbody>{/* end tbody */}
                                        </table>{/* end table */}
                                    </div>{/* end table responsive */}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row align-items-center mb-4 gy-3">
                        <div className="col-md-5">
                            <p className="mb-0 text-muted">Showing <b>1</b> to <b>5</b> of <b>10</b> results</p>
                        </div>
                        <div className="col-sm-auto ms-auto">
                            <nav aria-label="...">
                                <ul className="pagination mb-0">
                                  <li className="page-item disabled">
                                    <span className="page-link">Previous</span>
                                  </li>
                                  <li className="page-item active"><a className="page-link" href='#a'>1</a></li>
                                  <li className="page-item" aria-current="page">
                                    <span className="page-link">2</span>
                                  </li>
                                  <li className="page-item"><a className="page-link" href='#a'>3</a></li>
                                  <li className="page-item">
                                    <a className="page-link" href='#a'>Next</a>
                                  </li>
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

export default ReuseTranscationlist