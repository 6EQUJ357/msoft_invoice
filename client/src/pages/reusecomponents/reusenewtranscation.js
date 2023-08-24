import React from 'react'
import Sidebar from '../components/sidebar'
import Reusenavbar from './reusenavbar'
import Footer from '../components/footer'


const ReuseNewTranscation = (params) => {
   
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
                                <h4 className="mb-sm-0">New Transaction</h4>

                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="#a">Account</a></li>
                                        <li className="breadcrumb-item active">New Transaction</li> 
                                    </ol>
                                </div>

                            </div>
                        </div>
                    </div>
                   {/* end page title */}

 
                   <div className="row">
                        <div className="col-xl-12">
                            <div className="card">
                                <div className="card-body">
                                        <form>
                                        <div className="mb-3">
                                            <label className="form-label" for="desc">Description</label>
                                            <textarea className="form-control" id="desc" placeholder="Enter Description" rows="3"></textarea>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label for="credit/debit" className="form-label">Credit / Debit</label>
                                                    <select className="form-select" aria-label="Default select example">
                                                        <option selected="">Select Credit / Debit</option>
                                                        <option value="1">Credit</option>
                                                        <option value="2">Debit</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label" for="price">Amount</label>
                                                    <input id="price" name="price" placeholder="Enter Amount" type="number" className="form-control" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label" for="attachment">Attachment</label>
                                            <div className="dropzone my-dropzone">
                                                <div className="dz-message">
                                                    <div className="mb-3"> <i
                                                            className="display-4 text-muted ri-upload-cloud-2-fill"></i>
                                                    </div>
                                                    <h5>Drop files here or click to upload.</h5>
                                                </div>
                                            </div>
                                        </div>
                                        </form>
    
                                        <div className="hstack gap-2 mt-4">
                                            <button type="submit" className="btn btn-primary">Pay Now</button>
                                            <button type="button" className="btn btn-light">Discard</button>
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

export default ReuseNewTranscation