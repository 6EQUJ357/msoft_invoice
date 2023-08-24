import React from 'react'
import Sidebar from '../components/sidebar'
import Reusenavbar from './reusenavbar'
import Footer from '../components/footer'


const ReuseTaxes = (params) => {
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
                                <h4 className="mb-sm-0">Taxes</h4>

                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="#a">Taxes</a></li>
                                        <li className="breadcrumb-item active">Taxes</li>
                                    </ol>
                                </div>

                            </div>
                        </div>
                    </div>
                   {/* end page title */}

                    <div className="row pb-4 gy-3">
                        <div className="col-sm-4">
                            <button className="btn btn-primary addtax-modal" data-bs-toggle="modal" data-bs-target="#addtaxModal"><i className="las la-plus me-1"></i> Add Taxes</button>
                        </div>

                        <div className="col-sm-auto ms-auto">
                           <div className="d-flex gap-3">
                            <div className="search-box">
                                <input type="text" className="form-control" id="searchMemberList" placeholder="Search for Result" />
                                <i className="las la-search search-icon"></i>
                            </div>
                            <div className="">
                                <button type="button" id="dropdownMenuLink1" data-bs-toggle="dropdown" aria-expanded="false" className="btn btn-soft-info btn-icon fs-14"><i className="las la-ellipsis-v fs-18"></i></button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink1">
                                    <li><a className="dropdown-item" href="#a">All</a></li>
                                    <li><a className="dropdown-item" href="#a">Last Week</a></li>
                                    <li><a className="dropdown-item" href="#a">Last Month</a></li>
                                    <li><a className="dropdown-item" href="#a">Last Year</a></li>
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
                                                    <th scope="col">Tax Name</th>
                                                    <th scope="col">Country</th>
                                                    <th scope="col">Region</th>
                                                    <th scope="col" style={{width: "16%"}}>Tax Rate(%)</th>
                                                    <th scope="col" style={{width: "12%"}}>Status</th>
                                                    <th >
                                                    </th>
                                                </tr>
                                            </thead>
        
                                            <tbody>
                                                <tr>
                                                    <td>Sales Tax</td>
                                                    <td>United States</td>
                                                    <td>(any)</td>
                                                    <td>10%</td>
                                                    <td><span className="badge badge-soft-success p-2">Enabled</span></td>
                                                    <td> 
                                                        <div className="form-check form-switch">
                                                            <input className="form-check-input" type="checkbox" role="switch" id="switch1" />
                                                            <label className="form-check-label" for="switch1"></label>
                                                          </div>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td>Value Added Tax(VAT)</td>
                                                    <td>Australia</td>
                                                    <td>(any)</td>
                                                    <td>20%</td>
                                                    <td><span className="badge badge-soft-success p-2">Enabled</span></td>
                                                    <td> 
                                                        <div className="form-check form-switch">
                                                            <input className="form-check-input" type="checkbox" role="switch" id="switch2" />
                                                            <label className="form-check-label" for="switch1"></label>
                                                          </div>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td>Goods & Service Tax(GST)</td>
                                                    <td>New Zealand</td>
                                                    <td>(any)</td>
                                                    <td>15%</td>
                                                    <td><span className="badge badge-soft-success p-2">Enabled</span></td>
                                                    <td> 
                                                        <div className="form-check form-switch">
                                                            <input className="form-check-input" type="checkbox" role="switch" id="switch3" />
                                                            <label className="form-check-label" for="switch1"></label>
                                                          </div>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td>Excise</td>
                                                    <td>Italy</td>
                                                    <td>(any)</td>
                                                    <td>10%</td>
                                                    <td><span className="badge badge-soft-success p-2">Enabled</span></td>
                                                    <td> 
                                                        <div className="form-check form-switch">
                                                            <input className="form-check-input" type="checkbox" role="switch" id="switch4" />
                                                            <label className="form-check-label" for="switch1"></label>
                                                          </div>
                                                    </td>
                                                </tr>
        
                                           
                                                
                                            </tbody>{/* end tbody */}
                                        </table>{/* end table */}
                                    </div>{/* end table responsive */}
                                </div>
                            </div>

                            <div className="row align-items-center mb-2 gy-3">
                                <div className="col-md-5">
                                    <p className="mb-0 text-muted">Showing <b>1</b> to <b>5</b> of <b>10</b> results</p>
                                </div>
                                <div className="col-sm-auto ms-auto">
                                    <nav aria-label="...">
                                        <ul className="pagination mb-0">
                                          <li className="page-item disabled">
                                            <span className="page-link">Previous</span>
                                          </li>
                                          <li className="page-item active"><a className="page-link" href="#a">1</a></li>
                                          <li className="page-item" aria-current="page">
                                            <span className="page-link">2</span>
                                          </li>
                                          <li className="page-item"><a className="page-link" href="#a">3</a></li>
                                          <li className="page-item">
                                            <a className="page-link" href="#a">Next</a>
                                          </li>
                                        </ul>
                                      </nav>
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

    {/* Modal */}
     <div className="modal fade" id="addtaxModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0">
                <div className="modal-header p-4 pb-0">
                    <h5 className="modal-title" id="createMemberLabel">Add Payment</h5>
                    <button type="button" className="btn-close" id="createMemberBtn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body p-4">
                    <form>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="mb-3">
                                    <label for="Name" className="form-label">Tax Name</label>
                                    <input type="text" className="form-control" id="Name" placeholder="Enter Name" />
                                </div>

                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-4">
                                            <label for="country" className="form-label">Country</label>
                                            <select className="form-select" aria-label="Default select example">
                                                <option selected>Select Country</option>
                                                <option value="1">United States</option>
                                                <option value="2">Australia	</option>
                                                <option value="3">New Zealand</option>
                                                <option value="4">Italy</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-6">
                                        <div className="mb-4">
                                            <label for="region" className="form-label">Region</label>
                                            <select className="form-select" aria-label="Default select example">
                                                <option selected>Select Region</option>
                                                <option value="1">(any)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label for="Name" className="form-label">Tax Rate</label>
                                    <input type="text" className="form-control" id="Name" placeholder="Enter Text Rate" />
                                </div>

                                <div className="hstack gap-2 justify-content-end">
                                    <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-success" id="addNewMember">Add Taxes</button>
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

export default ReuseTaxes