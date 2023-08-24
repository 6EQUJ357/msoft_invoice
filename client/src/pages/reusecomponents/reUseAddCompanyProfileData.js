import React, {useEffect, useState} from 'react'
import Sidebar from '../components/sidebar'
import Reusenavbar from './reusenavbar'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/footer'


import API_BASE_URL from "../components/config";



const ReuseAddCompanyProfileData = (params) => {

    // view  companyProfileData details
    const navigate = useNavigate();



    const [companyProfileData, setCompanyProfileData] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of items to display per page
    //console.log("companyProfileData", companyProfileData);



    useEffect(()=>{
        axios.get(`${API_BASE_URL}/getcompanyprofile`).then(res=>setCompanyProfileData(res.data)).catch(err=>console.log(err));
    },[])

     //prgination
     const handlePrevClick = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
      };
    
      const handleNextClick = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
      };
    
      const totalPages = Math.ceil(companyProfileData.length / itemsPerPage);

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
      const currentData = companyProfileData.slice(startIndex, endIndex);

      //pegination ends


//pass companyProfile date to companyProfileData details
    const viewcompanyprofile =(data)=>{
        navigate('/viewcompanyprofiledata', { state: data});
    }

    // delete companyProfile data

    const deletecompanyProfileData = (res)=>{

        let response = window.confirm(`you want to delete the Profile : #${res.company_name}`);
        if(response){
        axios.delete(`${API_BASE_URL}/deletecompanyprofiledata/${res._id}`).then(res=>setCompanyProfileData(res.data)).catch(err=>console.log(err));
    }
}

    //Edit company Profile Data
    const EditcompanyProfileData = (data)=>{

        navigate("/editcompanyprofiledata", {state : data})
    }
    

  return (
    <div>
         {/* Begin page */}
    <div id="layout-wrapper">

       {/* navbar start */}
    <div>
        {/* default navbar */}
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
                                <h4 className="mb-sm-0">Company Profile</h4>

                                {/* <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="#a">Invoice</a></li>
                                        <li className="breadcrumb-item active">Invoice</li>
                                    </ol>
                                </div> */}

                            </div>
                        </div>
                    </div>
                    {/* end page title */}

                    <div className="row pb-4 gy-3">
                        {companyProfileData.length < 1 &&
                            <div className="col-sm-4">
                                <Link to="/companyprofile" className="btn btn-primary addMembers-modal"><i className="las la-plus me-1"></i>Create Company Profile</Link>
                            </div>
                        }

                        <div className="col-sm-auto ms-auto">
                            <div className="d-flex gap-3">
                          {/*  <div className="search-box">
                                <input type="text" className="form-control" placeholder="Search for name or designation..." name="searchvendor" value={searchproduct} onChange={(e)=>setSearchproduct(e.target.value)}/>
                                <i className="las la-search search-icon"></i>
                            </div> */}
                            {/* <div className="">
                                <button type="button" id="dropdownMenuLink1" data-bs-toggle="dropdown" aria-expanded="false" className="btn btn-soft-info btn-icon fs-14"><i className="las la-ellipsis-v fs-18"></i></button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink1">
                                    <li><a className="dropdown-item" href='#a'>Print</a></li>
                                    <li><a className="dropdown-item" href='#a'>Export to Excel</a></li>
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
                                                    <th scope="col">Company Name</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Registered On</th>
                                                    <th scope="col" style={{width: "12%"}}>Action</th> 
                                                </tr>
                                            </thead>
        
                                            <tbody>
                                                {currentData ? currentData.map(res=>
                                                <tr key={res._id}>
                                                    <td>
                                                        <a href='#a' className="text-body align-middle fw-medium">{res.company_name}</a>
                                                    </td>
                                                    <td>{res.email}</td>                                                   
                                                    <td>{new Date(res.date).toDateString()}</td>   {/* .toDateString(), .toLocaleDateString(),  .toLocaleString()*/}
                                                    <td>
                                                        <ul className="list-inline hstack gap-2 mb-0">
                                                            <li className="list-inline-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="View">
                                                                <button type='button' onClick={()=>viewcompanyprofile(res)} className="btn btn-soft-info btn-sm d-inline-block">
                                                                    <i className="las la-eye fs-17 align-middle"></i>
                                                                </button>
                                                            </li>
                                                            <li className="list-inline-item edit" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Edit">
                                                                <button type='button' onClick={()=>EditcompanyProfileData(res)} className="btn btn-soft-info btn-sm d-inline-block">
                                                                    <i className="las la-pen fs-17 align-middle"></i>
                                                                </button>
                                                            </li>
                                                            <li className="list-inline-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Remove">
                                                                <button type='button' onClick={()=>deletecompanyProfileData(res)} className="btn btn-soft-danger btn-sm d-inline-block">
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
                                                
                                            </tbody>{/* end tbody */}
                                        </table>{/* end table */}
                                    </div>{/* end table responsive */}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row align-items-center mb-4 gy-3">
                        <div className="col-md-5">
                            <p className="mb-0 text-muted">Showing <b>1</b> to <b>5</b> of <b>{companyProfileData.length}</b> results</p>
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

export default ReuseAddCompanyProfileData