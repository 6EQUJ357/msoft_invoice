import React from 'react'
import Sidebar from '../components/sidebar'
import Reusenavbar from './reusenavbar'
import { Link } from 'react-router-dom'
import Footer from '../components/footer'
import '../../App.css'


const ReuseDashboard = (params) => {

    //console.table("dashboard", params.value3); 
      
  return (
    <div>
           {/* Begin page */}
    <div id="layout-wrapper">

    {/* navbar start */}
    <div>
      {/* {params.value1.userType === "super Admin" && <Reusenavbar />}
      {params.value1.userType === "admin" && <Reusenavbar />}
      {params.value1.userType === "user" && <Reusenavbar />} */}

      <Reusenavbar value1 ={params.value1} value2 = {params.value2} value3 ={params.value3}/>


    </div>

    {/* navbar end */}

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
        <div className="app-menu navbar-menu" >

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
                            <div className="page-title-box d-sm-flex align-items-center justify-content-center">
                                <h1 className="mb-sm-0 mt-3" style={{fontWeight :"bolder"}}>Dashboard</h1>

                            </div>
                        </div>
                    </div>
                   {/* end page title */}

                    <div className='container'>
                        <center>
                            <div className='row mt-3' >

                                <div className='col-12 col-lg-6 dbutton'>
                                <Link to="/invoice" className="btn btn-primary dlink" ><i className="las la-file-invoice"></i> All Invoice</Link> 
                                </div>

                                <div className='col-12 col-lg-6 dbutton'>

                                    <div class="btn-group dlink">
                                        <button type="button" className="btn btn-primary dropdown-toggle"  data-bs-toggle="dropdown" aria-expanded="false"><i className="las la-money-bill-wave"></i> Payments</button>

                                        <ul class="dropdown-menu w-100">
                                            <li><Link to="/salespayment" className="dropdown-item" ><i className="las la-rupee-sign"></i>&emsp;Sales Payments</Link></li>
                                        </ul>
                                    </div>

                                </div>

                               

                                <div className='col-12 col-lg-6 dbutton'>
                                <Link to="/addinvoice" className="btn btn-primary dlink" ><i className="las la-receipt"></i> Create Invoice</Link>
                                </div>

                                {/* <div className='col-12 col-lg-6 dbutton'>
                                <Link to="/categories" className="btn btn-primary dlink" ><i className="las la-stream"></i> Categories</Link> 
                                </div> */}


                                <div className='col-12 col-lg-6 dbutton'>
                                    <div className="btn-group dlink">
                                        <button type="button" className="btn btn-primary dropdown-toggle"  data-bs-toggle="dropdown" aria-expanded="false" >
                                        <i className="las la-clipboard-list"></i> Reports
                                        </button>
                                            <ul className="dropdown-menu w-100">
                                                <li><Link className="dropdown-item" to="/salepaymentsummary"><i className="las la-money-check"></i>&emsp;Payment Summary (Sales)</Link></li>
                                               
                                                <li><Link className="dropdown-item" to="/salereport"><i className="las la-clipboard-check"></i>&emsp;Sale Report</Link></li>
                                                <li><Link className="dropdown-item" to="/clientwisesalereport"><i className="las la-database"></i>&emsp;Client Wise Sale Report</Link></li>
                                                <li><Link className="dropdown-item" to="/saleperiod"><i className="las la-clipboard-list"></i>&emsp;Sale Period</Link></li>
                                               
                                            </ul>
                                    </div>
                                </div>


                                <div className='col-12 col-lg-6 dbutton'>
                                <Link to="/expansesreport" className="btn btn-primary dlink" ><i className="las la-money-bill-wave"></i>Expenses</Link> 
                                </div>
                                

                                <div className='col-12 col-lg-6 dbutton'>
                                <Link to="/quotation" className="btn btn-primary dlink" ><i className="las la-file-signature"></i> Quotation</Link> 
                                </div>


                                <div className='col-12 col-lg-6 dbutton'>
                                <Link to="/registeruser" className="btn btn-primary dlink" ><i className="las la-user"></i> Clients</Link> 
                                </div>                                

                                <div className='col-12 col-lg-6 dbutton'>
                                    <Link to="/users" className="btn btn-primary dlink" ><i className="las la-user-friends"></i> Users</Link> 
                                </div>

                                <div className='col-12 col-lg-6 dbutton'>
                                    <Link to="/companyprofiledata" className="btn btn-primary dlink" ><i className="las la-address-card"></i> Company Profile</Link> 
                                </div>

                            </div>
                        </center>
                                    
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
    <button onClick="topFunction()" className="btn btn-danger btn-icon" id="back-to-top">
        <i className="ri-arrow-up-line"></i>
    </button>
   {/*end back-to-top*/}

  

    
    </div>
  )
}

export default ReuseDashboard