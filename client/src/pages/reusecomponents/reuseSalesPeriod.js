import React, {useEffect, useState} from 'react'
import Sidebar from '../components/sidebar'
import Reusenavbar from './reusenavbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/footer'
import "../../App.css"



import API_BASE_URL from "../components/config";


const ReuseSalesPeriod = (params) => {

    const navigate = useNavigate();


    const [invoice, setinvoice] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of items to display per page
 


    useEffect(()=>{
        axios.get(`${API_BASE_URL}/getinvoicetransaction`).then(res=>setinvoice(res.data)).catch(err=>console.log(err));

    },[])


//pass invoice date to invoice details
const handleClick =(invoiceData)=>{
    navigate('/invoicedetails', { state: invoiceData});
}

//filter preferencr
const [selectPreference, setSelectPreference] = useState("");

const handlePreference = (e)=>{
    setSelectPreference(e.target.value);
    setFilter([]);

    if(e.target.value === "date"){
        setStartMonth("");
        setEndMonth("");

        setStartYear("");
        setEndYear("");
        
    }

    if(e.target.value === "month"){
        setstartDate("");
        setendDate("");

        setStartYear("");
        setEndYear("");
       
    }

    if(e.target.value === "year"){
        setstartDate("");
        setendDate("");

        setStartMonth("");
        setEndMonth("");
       
    }

    if(e.target.value === "all"){
        setFilter(invoice)
        setstartDate("");
        setendDate("");

        setStartMonth("");
        setEndMonth("");

        setStartYear("");
        setEndYear("");
    }
}


//handle Filter 
const [filter, setFilter] = useState([]);



const [startDate, setstartDate] = useState("");   // startDate 
const [endDate, setendDate] = useState("");       //endDate



//filter based on date
const  handleFilterDate = ()=>{

  const filteredData = invoice.filter(item => {
    const itemDate = new Date(item.date);
    const selectedStartDate = new Date(startDate);
    const selectedEndDate = new Date(endDate);
    return (
      itemDate >= selectedStartDate &&
      itemDate <= selectedEndDate 
    );
  });

  setFilter(filteredData);
}

//months list
const monthNames = [];

for (let month = 0; month < 12; month++) {
  const date = new Date(0, month);
  const monthName = date.toLocaleString('en-US', { month: 'long' });
  monthNames.push(monthName);
}


const [startMonth, setStartMonth]= useState("");        //start month
const [endMonth, setEndMonth] = useState("");           //end month

// Function to convert month name to month number
const getMonthNumber = (monthName) => {
    const monthMap = {
      January: 1,
      February: 2,
      March: 3,
      April: 4,
      May: 5,
      June: 6,
      July: 7,
      August: 8,
      September: 9,
      October: 10,
      November: 11,
      December: 12
    };
    return monthMap[monthName];
  };

//filter based on month
const handleFilterMonth = ()=>{
    const filteredData = invoice.filter(obj => {
        const date = new Date(obj.date);
        const month = date.getMonth() + 1;
        const selectedStartMonth = getMonthNumber(startMonth);
        const selectedEndMonth =  getMonthNumber(endMonth);

        return month >= selectedStartMonth && month <= selectedEndMonth;
      });
      setFilter(filteredData);   
}


// years between 2020 to 2040
const startYears = 2020;
const endYears = 2040;
const years = [];

for (let year = startYears; year <= endYears; year++) {
  years.push(year);
}

const [startYear, setStartYear] = useState("");     //start year
const [endYear, setEndYear] = useState("");         //end year

//filter based on year
const handleFilteryear = ()=>{
    const filteredData = invoice.filter(obj => {
        const year = new Date(obj.date).getFullYear();
        const selectedStartYear = parseInt(startYear);
        const selectedEndYear = parseInt(endYear);

        return year >=selectedStartYear && year <= selectedEndYear;
      });
      setFilter(filteredData);
}


 //prgination
 const handlePrevClick = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const totalPages = Math.ceil(filter.length / itemsPerPage);

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
  const currentData = filter.slice(startIndex, endIndex);

  //pegination ends


   
  return (
    <div>
           {/* Begin page */}
    <div id="layout-wrapper">

    {/* navbar start */}
    <div>

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
                                <h4 className="mb-sm-0">Sale Period </h4>

                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="#a">Report</a></li>
                                        <li className="breadcrumb-item active">Sale Period</li> 
                                    </ol>
                                </div>

                            </div>
                        </div>
                    </div>
                   {/* end page title */}

                   <div className="row pb-4 gy-3">
                        <div className="col-sm-4">

                            {/* filter preference */}
                            <div className="d-flex">
                                    <div className="search-box">
                                        <select  className="form-control"  name="selectPreference" onChange={handlePreference}>
                                            <option>--- Filter Based On --- </option>
                                            <option value="all">All</option>
                                            <option value="date">Date</option>
                                            <option value="month">Month</option>
                                            <option value="year">Year</option>
                                        </select> 
                                                                                                          
                                    </div>
                                    
                            </div>
                            <br />

                           

                            {/* filter date */}
                            {selectPreference === "date" &&
                                <div className="d-flex">
                                    <div className="search-box">
                                        <input type='date' className="form-control"  name="startDate" value={startDate} onChange={(e)=>setstartDate(e.target.value)} />                                                                    
                                    </div>

                                    <div  style={{width:"80px", height:"50px",textAlign:"center", fontSize:"20px", padding:"5px 20px 0px 20px" }}>
                                        to                                                                
                                    </div>

                                    <div className="search-box">
                                        <input type='date' className="form-control"  name="endDate" value={endDate} onChange={(e)=>setendDate(e.target.value)} />                                                                    
                                    </div>

                                    <div className="search-box">
                                    <button type="button" className="btn btn-soft-primary fs-14" onClick={handleFilterDate} style={{margin : "0px 15px"}} >Search</button>
                                    </div>


                            </div>
                            }

                           {/* filter month */}
                            {selectPreference ==="month" &&
                            <div className="d-flex">
                                    <div className="search-box">
                                    <select  className="form-control"  name="startMonth"  onChange={(e)=>setStartMonth(e.target.value)} >
                                            <option>--- Select Start Month ---</option>

                                            {monthNames.length > 0 && monthNames.map((month, id)=><option key={id} value={month}>{month}</option>)}
                                        </select>                                       </div>

                                    <div  style={{width:"80px", height:"50px",textAlign:"center", fontSize:"20px", padding:"5px 20px 0px 20px" }}>
                                        to                                                                
                                    </div>

                                    <div className="search-box" >
                                    <select  className="form-control"  name="endMonth"onChange={(e)=>setEndMonth(e.target.value)} > 
                                        <option>--- Select End Month ---</option>

                                        {monthNames.length > 0 && monthNames.map((month, id)=><option key={id} value={month}>{month}</option>)}   
                                        </select>                                    
                                    </div>

                                    <button type="button" className="btn btn-soft-primary fs-14" onClick={handleFilterMonth} style={{margin : "0px 15px"}} >Search</button>

                            </div>
                            }

                            {/* filter year */}
                            {selectPreference === "year" &&
                                <div className="d-flex">
                                    <div className="search-box">
                                    <select  className="form-control"  name="startYear"  onChange={(e)=>setStartYear(e.target.value)} >
                                            <option>--- Select Start Year ---</option>
                                            {years.length > 0 && years.map((year, id)=><option key={id} value={year}>{year}</option>)}
                                        </select>                                     </div>

                                    <div  style={{width:"80px", height:"50px",textAlign:"center", fontSize:"20px", padding:"5px 20px 0px 20px" }}>
                                        to                                                                
                                    </div>

                                    <div className="search-box" >
                                    <select  className="form-control"  name="endYear" onChange={(e)=>setEndYear(e.target.value)} placeholder='Enter End Year'> 
                                        <option>--- Select End Year ---</option>
                                            {years.length > 0 && years.map((year, id)=><option key={id} value={year}>{year}</option>)}
                                        </select>                                    </div>

                                    <button type="button" className="btn btn-soft-primary fs-14" onClick={handleFilteryear} style={{margin : "0px 15px"}} >Search</button>

                            </div>
                            }
                        </div>

                        {/* <div className="col-sm-auto ms-auto">
                            <div className="d-flex gap-2"> 
                                <button type="button" className="btn btn-soft-primary fs-14" onClick={handleFilter}><i className="las la-filter fs-16 align-middle me-2"></i>Filter</button>
                                <button type="button" id="dropdownMenuLink1" data-bs-toggle="dropdown" aria-expanded="false" className="btn btn-soft-info btn-icon fs-14"><i className="las la-ellipsis-v fs-18"></i></button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink1">
                                    <li><a className="dropdown-item" href='#a'>Print</a></li>
                                    <li><a className="dropdown-item" href='#a'>Export to Excel</a></li>
                                </ul>
                            </div>
                        </div> */}
                    </div>

                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="table-responsive table-card">
                                        <table className="table table-hover table-nowrap align-middle mb-0">
                                            {currentData.length > 0 &&
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
                                                    {/* <th scope="col" style={{width: "16%"}}>Status</th> */}
                                                    <th scope="col" style={{width: "12%"}}>Action</th>
                                                </tr>
                                            </thead>
                                            }
        
                                            <tbody>
                                                {currentData.length > 0 ? currentData.map((res, id)=>
                                                
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
                                                    {/* <td><span className="badge badge-soft-success p-2">{res.paymentstatus}</span></td> */}
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
                                                                </li>
                                                                <li>
                                                                    <a className="dropdown-item" href='#a'><i className="las la-file-download fs-18 align-middle me-2 text-muted"></i>
                                                                        Download</a>
                                                                </li>
                                                                <li className="dropdown-divider"></li>
                                                                <li>
                                                                    <button className="dropdown-item remove-item-btn" onClick={()=>deleteinvoice(res._id, res.vendorname)}>
                                                                        <i className="las la-trash-alt fs-18 align-middle me-2 text-muted"></i>
                                                                        Delete
                                                                    </button>
                                                                </li> */}
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                                )
                                                :
                                                <tr>
                                                     <td>
                                                         <div >
                                                             <h3 >Search Sales History...</h3>
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
                                                    <td>{(currentData.map(list=> list.totalAmount).reduce((a,b)=> {return Number(a) + Number(b)}, 0)).toFixed(3)}</td> 
                                                    {/* <td>{ (currentData.map(res=>res.rows.map(list=>list.taxableAmount).reduce((a,b)=> Number(a)+ Number(b))) ).reduce((a,b)=>{return Number(a) + Number(b)}, 0)}</td> */}
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
                            <p className="mb-0 text-muted">Showing <b>1</b> to <b>5</b> of <b>{filter.length}</b> results</p>
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

export default ReuseSalesPeriod