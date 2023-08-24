import React, {useEffect, useState} from 'react'
import Sidebar from '../components/sidebar'
import Reusenavbar from './reusenavbar'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/footer'
import "../../App.css"


import API_BASE_URL from "../components/config";



const Reuseinvoice = (params) => {

    // view  invoice details
    const navigate = useNavigate();


     // search product state value
   const [searchproduct, setSearchproduct] = useState("")


    const [invoice, setinvoice] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of items to display per page

    //console.log("invoiceData", invoice);



    useEffect(()=>{
        axios.get(`${API_BASE_URL}/getinvoicetransaction`).then(res=>setinvoice(res.data)).catch(err=>console.log(err));
    },[])

    //prgination
    const handlePrevClick = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
      };
    
      const handleNextClick = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
      };
    
      const totalPages = Math.ceil(invoice.length / itemsPerPage);

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
      const currentData = invoice.slice(startIndex, endIndex);

      //pegination ends



//pass invoice date to invoice details
    const handleClick =(invoiceData)=>{
        navigate('/invoicedetails', { state: invoiceData});
    }

    // delete invoice data

    const deleteinvoice = (id, name)=>{

        let response = window.confirm(`you try to delect the #${name}...`);
        if(response){
        axios.delete(`${API_BASE_URL}/deleteinvoicetransaction/${id}`).then(res=>setinvoice(res.data)).catch(err=>console.log(err));
    }
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
                                <h4 className="mb-sm-0">Invoice</h4>

                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="#a">Invoice</a></li>
                                        <li className="breadcrumb-item active">Invoice</li>
                                    </ol>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* end page title */}

                    <div className="row pb-4 gy-3">
                        <div className="col-sm-4">
                            <Link to="/addinvoice" className="btn btn-primary addMembers-modal"><i className="las la-plus me-1"></i> Add Invoices</Link>
                        </div>

                        <div className="col-sm-auto ms-auto">
                           <div className="d-flex gap-3">
                            <div className="search-box">
                                <input type="text" className="form-control" placeholder="Search for invoice or Client..." name="searchvendor" value={searchproduct} onChange={(e)=>setSearchproduct(e.target.value)}/>
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
                                                    {/* <th style={{width: "50px"}}>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" id="checkAll" value="option" />
                                                        </div>
                                                    </th> */}
                                                    <th scope="col">Invoice ID</th>
                                                    <th scope="col">Client</th>
                                                    <th scope="col" style={{width: "20%"}}>Email</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Billed</th>
                                                    {/* <th scope="col">Output Tax</th> */}
                                                    <th scope="col" style={{width: "16%"}}>Status</th>
                                                    <th scope="col" style={{width: "12%"}}>Action</th>
                                                </tr>
                                            </thead>
        
                                            <tbody>
                                                {currentData.length > 0 ? currentData.filter(list => list.vendorname.toLowerCase().startsWith(searchproduct.toLowerCase()) || list.invoiceno.startsWith(searchproduct)).map((res, id)=>
                                                
                                                <tr key={id}>
                                                    {/* <td>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" id="check1" value="option" />
                                                        </div>
                                                    </td> */}
                                                    <td><p className="fw-medium mb-0">{res.invoiceno}</p></td>
                                                   <td> {/* <img src="assets/images/users/avatar-1.jpg" alt="img not support..." className="avatar-xs rounded-circle me-2" /> */}
                                                        <p className="text-body align-middle fw-medium">{res.vendorname}</p>
                                                    </td>
                                                    <td>{res.vendoremail}</td>
                                                    <td>{res.dateofpurchase}</td>
                                                    <td>{res.totalAmount}</td>
                                                    {/* <td>{res.rows.map(list=>list.taxableAmount).reduce((a,b)=> Number(a)+ Number(b))}</td> */}
                                                    <td><span className="badge badge-soft-success p-2">{res.paymentstatus}</span></td>
                                                    <td>
                                                        <div className="dropdown">
                                                            <button className="btn btn-soft-secondary btn-sm dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                <i className="las la-ellipsis-h align-middle fs-18"></i>
                                                            </button>
                                                            <ul className="dropdown-menu dropdown-menu-end">
                                                                <li>
                                                                    <button className="dropdown-item" onClick={()=>handleClick(res)}><i className="las la-eye fs-18 align-middle me-2 text-muted"></i>
                                                                        View</button>
                                                                </li>
                                                                {/* <li>
                                                                    <button className="dropdown-item" href='#a'><i className="las la-pen fs-18 align-middle me-2 text-muted"></i>
                                                                        Edit</button>
                                                                </li> */}
                                                                {/* <li>
                                                                    <a className="dropdown-item" href='#a'><i className="las la-file-download fs-18 align-middle me-2 text-muted"></i>
                                                                        Download</a>
                                                                </li> */}
                                                                <li className="dropdown-divider"></li>

                                                                {params.value1.userType === "super Admin" &&
                                                                <li>
                                                                    <button className="dropdown-item remove-item-btn" onClick={()=>deleteinvoice(res._id, res.vendorname)}>
                                                                        <i className="las la-trash-alt fs-18 align-middle me-2 text-muted"></i>
                                                                        Delete
                                                                    </button>
                                                                </li>
                                                                
                                                                }
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                                )
                                               
                                                :
                                                <tr>
                                                     <td>
                                                         <div className="form-check">
                                                             <h3 className="form-check-input">No History...</h3>
                                                         </div> 
                                                     </td>
                                                 </tr>
                                                 }
                                                <br />
                                                
                                                {/* total count */}
                                                {currentData.length > 0 && 
                                                 <tr style={{fontWeight:"bolder", fontSize:"1rem"}}>
                                                    <td>Total</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>{currentData.map(list=>list.totalAmount).reduce((a,b)=> (Number(a)+ Number(b)).toFixed(3))}</td>  
                                                    {/* <td>{ (currentData.map(res=>res.rows.map(list=>list.taxableAmount).reduce((a,b)=> Number(a)+ Number(b))) ).reduce((a,b)=>{return Number(a) + Number(b)}, 0)}</td>  */}
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
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
                            <p className="mb-0 text-muted">Showing <b>1</b> to <b>10</b> of <b>{invoice.length}</b> results</p>
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

export default Reuseinvoice