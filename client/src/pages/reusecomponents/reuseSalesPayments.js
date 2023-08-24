import React, {useState, useEffect} from 'react'
import Sidebar from '../components/sidebar'
import Reusenavbar from './reusenavbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from "yup"
import Footer from '../components/footer'


import API_BASE_URL from "../components/config";


const ReuseSalesPayments = (params) => {

    const navigate = useNavigate();

    //search 
    const [search, setSearch] = useState("");
    
    const [invoice, setinvoice] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15; // Number of items to display per page
    //console.log("invoice", invoice);

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



    //date format
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
      };

    //pass invoice date to invoice details
    const handleClick =(invoiceData)=>{
        navigate('/salespaymentdetails', { state: invoiceData});
    }

        //present date
  const date = new Date();
  const dateTimeString = date.toLocaleString();

  //check paid (or) unpaid 

  const [checkStatus, setCheckStatus] = useState(null);
  


    const formik = useFormik({

        initialValues : {
            dateOfPayment : dateTimeString,
            invoiceno : "",
            vendorname : "",
            totalAmount : "",
            receiveAmount : "",
            PayAmount : "",
            paymentmethod : "",
            paymentstatus : "",
            holdername : '',
            cardnumber : "",
            TranscationID : ""
        },
        validationSchema : Yup.object({
            dateOfPayment : Yup.string(),
            invoiceno : Yup.string().required("Select INvoice No"),
            vendorname : Yup.string(),
            totalAmount : Yup.string(),
            receiveAmount : Yup.string(),
            PayAmount : Yup.string().required("Enter Amount"),
            paymentmethod : Yup.string().required("Choose Payment Method"),
            paymentstatus : Yup.string().required("Select Payment Status"),
            holdername : Yup.string().required("Enter Payment Holder Name"),
            cardnumber : Yup.string().required("Enter Card Number").length(19),
            TranscationID : Yup.string().required("Enter Transcation ID")
        }),
        onSubmit : async(values, {resetForm}) => {
            //console.log("submit", values)

           await axios.post(`${API_BASE_URL}/salespayments`, values).then(res=>alert(res.data.message)).catch(err=>console.log(err));

           
        // pass salesPayment date to sales payment details page
   
        navigate('/salespaymentdetails',{state: values});
    }
        
    })


    //handle Invoice ID

    const handleInvoiceID = (e)=> {
        formik.setFieldValue("invoiceno", e.target.value);

        //find index
        let index = invoice.findIndex(list=>list.invoiceno === e.target.value);
        formik.setFieldValue("vendorname", invoice[index].vendorname);
        formik.setFieldValue("totalAmount", invoice[index].totalAmount);
        formik.setFieldValue("receiveAmount", invoice[index].receiveAmount);

        //Check Status
        setCheckStatus( invoice[index].paymentstatus)
    }

    //handle Payment Method

    const handlePaymentMethod = (e)=> {
        formik.setFieldValue("paymentmethod", e.target.value)

        if(e.target.value === "Credit Card") {
            formik.setFieldValue("TranscationID", "nill");
            formik.setFieldValue("cardnumber", "");
        }
        if(e.target.value === "Google Pay"){
            formik.setFieldValue("cardnumber", "XXXX XXXX XXXX XXXX");
            formik.setFieldValue("TranscationID", "");
        }
        if(e.target.value === "Cash"){
            formik.setFieldValue("cardnumber", "XXXX XXXX XXXX XXXX");
            formik.setFieldValue("TranscationID", "nill")
        }
        if( e.target.value === "Bank Transfer"){
            formik.setFieldValue("cardnumber", "XXXX XXXX XXXX XXXX");
            formik.setFieldValue("TranscationID", "nill")
        }

    }

    //format Card Number
const formatCardNumber = (e)=>{

   
    const formattedValue = e.target.value
    .replace(/\s/g, "")   // Remove any existing spaces
    .match(/.{1,4}/g)     // Split the string into groups of 4 characters
    .join(" ");  
             // Join the groups with a space in between

  formik.setFieldValue("cardnumber", formattedValue);
    
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
                                <h4 className="mb-sm-0">Sales Payments</h4>

                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="#a">Payments</a></li>
                                        <li className="breadcrumb-item active">Sales Payments</li>
                                    </ol>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* end page title */}

                    <div className="row pb-4 gy-3">
                        <div className="col-sm-4">
                            <button className="btn btn-primary addPayment-modal" data-bs-toggle="modal" data-bs-target="#addpaymentModal"><i className="las la-plus me-1"></i> Add Payment</button>
                        </div>

                        <div className="col-sm-auto ms-auto">
                           <div className="d-flex gap-3">
                            <div className="search-box">
                                <input type="text" className="form-control" id="searchMemberList" placeholder="Search for Client" name='search' onChange={e=>setSearch(e.target.value)} />
                                <i className="las la-search search-icon"></i>
                            </div>
                            {/* <div className="">
                                <button type="button" id="dropdownMenuLink1" data-bs-toggle="dropdown" aria-expanded="false" className="btn btn-soft-info btn-icon fs-14"><i className="las la-ellipsis-v fs-18"></i></button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink1">
                                    <li><a className="dropdown-item" href='#a'>All</a></li>
                                    <li><a className="dropdown-item" href='#a'>Last Week</a></li>
                                    <li><a className="dropdown-item" href='#a'>Last Month</a></li>
                                    <li><a className="dropdown-item" href='#a'>Last Year</a></li>
                                </ul>
                            </div> */}
                           </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card">
                                <div className="card-body">
                                    {/* Nav tabs */}
                                    <ul className="nav nav-tabs nav-tabs-custom nav-success mb-3" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link active" data-bs-toggle="tab" href="#nav-border-top-all" role="tab" aria-selected="true">
                                                All
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-bs-toggle="tab" href="#nav-border-top-paid" role="tab" aria-selected="false">
                                                Paid
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-bs-toggle="tab" href="#nav-border-top-unpaid" role="tab" aria-selected="false">
                                                Unpaid
                                            </a>
                                        </li>

                                        <li className="nav-item">
                                            <a className="nav-link" data-bs-toggle="tab" href="#nav-border-top-pending" role="tab" aria-selected="false">
                                                Pending
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="tab-content text-muted pt-2">
                                        
                                        {/* navbar All payments */}

                                        <div className="tab-pane active" id="nav-border-top-all" role="tabpanel">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="table-responsive table-card">
                                                        <table className="table table-hover table-nowrap align-middle mb-0">
                                                            <thead className="table-light">
                                                                <tr className="text-muted text-uppercase">
                                                                <th scope="col">Invoice ID</th>
                                                                    <th scope="col">Client</th>
                                                                    <th scope="col">Date</th>
                                                                    <th scope="col" style={{width: "16%"}}>Payment Type</th>
                                                                    <th scope="col" style={{width: "12%"}}>Amount</th>
                                                                    <th scope="col" style={{width: "12%"}}>Status</th>
                                                                    <th scope="col" style={{width: "12%"}}>Action</th>
                                                                </tr>
                                                            </thead>
                        
                                                            <tbody>
                                                                {currentData.length > 0 ? currentData.filter(list=>list.vendorname.toLowerCase().startsWith(search.toLocaleLowerCase()) || list.invoiceno.startsWith(search)).map((list ,id)=>
                                                                <tr key={id}>
                                                                     <td>{list.invoiceno}</td>
                                                                    <td>
                                                                        <p className="text-body align-middle fw-medium">{list.vendorname}</p>
                                                                    </td>

                                                                    <td>{formatDate(list.date)}</td>

                                                                    <td>{list.paymentmethod}</td>

                                                                    <td>{list.totalAmount}</td>

                                                                    <td><span className="badge badge-soft-success p-2">{list.paymentstatus}</span></td>
                                                                    <td>
                                                                        <div className="dropdown">
                                                                            <button className="btn btn-soft-secondary btn-sm dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                <i className="las la-ellipsis-h align-middle fs-18"></i>
                                                                            </button>
                                                                            <ul className="dropdown-menu dropdown-menu-end">
                                                                                <li>
                                                                                <button className="dropdown-item" onClick={()=>handleClick(list)}><i className="las la-eye fs-18 align-middle me-2 text-muted"></i> View</button>
                                                                                </li>
                                                                                {/* <li>
                                                                                    <button className="dropdown-item" href="#a"><i className="las la-pen fs-18 align-middle me-2 text-muted"></i>
                                                                                        Edit</button>
                                                                                </li>
                                                                                <li>
                                                                                    <a className="dropdown-item" href="#a"><i className="las la-file-download fs-18 align-middle me-2 text-muted"></i>
                                                                                        Download</a>
                                                                                </li>
                                                                                <li className="dropdown-divider"></li>
                                                                                <li>
                                                                                    <a className="dropdown-item remove-item-btn" href='#a'>
                                                                                        <i className="las la-trash-alt fs-18 align-middle me-2 text-muted"></i>
                                                                                        Delete
                                                                                    </a>
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
                                                                        <h3 >No  Paid History...</h3>
                                                                    </div> 
                                                                </td>
                                                            </tr>
                                                            }
                                                             <br />
                                                           
                                                           {/* total count */}
                                                           {currentData.filter(list=>list.vendorname.toLowerCase().startsWith(search.toLocaleLowerCase())).length > 0 && 
                                                            <tr style={{fontWeight:"bolder", fontSize:"1rem"}}>
                                                               <td>Total</td>
                                                               <td></td>
                                                               <td></td>
                                                               <td></td>
                                                               <td>{currentData.filter(list=>list.vendorname.toLowerCase().includes(search.toLocaleLowerCase())).map(list=>list.totalAmount).reduce((a,b)=> (Number(a)+ Number(b)).toFixed(3))}</td>  
                                                               <td></td>
                                                            </tr>
                                                           }

                                                            </tbody>{/* end tbody */}
                                                        </table>{/* end table */}
                                                    </div>{/* end table responsive */}
                                                </div>
                                            </div>
                                        </div>

                                        {/* navbar paid payments */}

                                        <div className="tab-pane" id="nav-border-top-paid" role="tabpanel">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="table-responsive table-card">
                                                        <table className="table table-hover table-nowrap align-middle mb-0">
                                                            <thead className="table-light">
                                                            <tr className="text-muted text-uppercase">
                                                                <th scope="col">Invoice ID</th>
                                                                    <th scope="col">Client</th>
                                                                    <th scope="col">Date</th>
                                                                    <th scope="col" style={{width: "16%"}}>Payment Type</th>
                                                                    <th scope="col" style={{width: "12%"}}>Amount</th>
                                                                    <th scope="col" style={{width: "12%"}}>Status</th>
                                                                    <th scope="col" style={{width: "12%"}}>Action</th>
                                                                </tr>
                                                            </thead>
                        
                                                            <tbody>
                                                                {invoice.filter(list=>list.paymentstatus === "Paid").length >0 ?  invoice.filter(list=>list.vendorname.toLowerCase().startsWith(search.toLocaleLowerCase())  && list.paymentstatus === "Paid").map((data, id)=>
                                                               <tr key={id}>
                                                               <td>{data.invoiceno}</td>
                                                              <td>
                                                                  <p className="text-body align-middle fw-medium">{data.vendorname}</p>
                                                              </td>

                                                              <td>{formatDate(data.date)}</td>

                                                              <td>{data.paymentmethod}</td>

                                                              <td>{data.totalAmount}</td>

                                                              <td><span className="badge badge-soft-success p-2">{data.paymentstatus}</span></td>
                                                              <td>
                                                                  <div className="dropdown">
                                                                      <button className="btn btn-soft-secondary btn-sm dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                          <i className="las la-ellipsis-h align-middle fs-18"></i>
                                                                      </button>
                                                                      <ul className="dropdown-menu dropdown-menu-end">
                                                                          <li>
                                                                          <button className="dropdown-item" onClick={()=>handleClick(data)}><i className="las la-eye fs-18 align-middle me-2 text-muted"></i> View</button>
                                                                          </li>
                                                                          {/* <li>
                                                                              <button className="dropdown-item" href="#a"><i className="las la-pen fs-18 align-middle me-2 text-muted"></i>
                                                                                  Edit</button>
                                                                          </li>
                                                                          <li>
                                                                              <a className="dropdown-item" href="#a"><i className="las la-file-download fs-18 align-middle me-2 text-muted"></i>
                                                                                  Download</a>
                                                                          </li>
                                                                          <li className="dropdown-divider"></li>
                                                                          <li>
                                                                              <a className="dropdown-item remove-item-btn" href='#a'>
                                                                                  <i className="las la-trash-alt fs-18 align-middle me-2 text-muted"></i>
                                                                                  Delete
                                                                              </a>
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
                                                                        <h3 >No History...</h3>
                                                                    </div> 
                                                                </td>
                                                            </tr>
                                                            }
                                                             <br />
                                                           
                                                           {/* total count */}
                                                           {currentData.filter(list=>list.vendorname.toLowerCase().startsWith(search.toLocaleLowerCase())  && list.paymentstatus === "Paid").length > 0 && 
                                                            <tr style={{fontWeight:"bolder", fontSize:"1rem"}}>
                                                               <td>Total</td>
                                                               <td></td>
                                                               <td></td>
                                                               <td></td>
                                                               <td>{currentData.filter(list=>list.vendorname.toLowerCase().startsWith(search.toLocaleLowerCase())  && list.paymentstatus === "Paid").map(data=>data.totalAmount).reduce((a,b)=> (Number(a)+ Number(b)).toFixed(3))}</td>  
                                                               <td></td>
                                                            </tr>
                                                           }
                        
                                                            </tbody>{/* end tbody */}
                                                        </table>{/* end table */}
                                                    </div>{/* end table responsive */}
                                                </div>
                                            </div>
                                        </div>

                                        {/* navbar pending payments */}

                                        <div className="tab-pane" id="nav-border-top-unpaid" role="tabpanel">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="table-responsive table-card">
                                                        <table className="table table-hover table-nowrap align-middle mb-0">
                                                            <thead className="table-light">
                                                            <tr className="text-muted text-uppercase">
                                                                <th scope="col">Invoice ID</th>
                                                                    <th scope="col">Client</th>
                                                                    <th scope="col">Date</th>
                                                                    <th scope="col" style={{width: "16%"}}>Payment Type</th>
                                                                    <th scope="col" style={{width: "12%"}}>Amount</th>
                                                                    <th scope="col" style={{width: "12%"}}>Status</th>
                                                                    <th scope="col" style={{width: "12%"}}>Action</th>
                                                                </tr>
                                                            </thead>
                        
                                                            <tbody>
                                                                {invoice.filter(list=>list.paymentstatus === "Unpaid").length >0 ?  invoice.filter(list=>list.vendorname.toLowerCase().startsWith(search.toLocaleLowerCase())  && list.paymentstatus === "Unpaid").map((data, id)=>
                                                               <tr key={id}>
                                                               <td>{data.invoiceno}</td>
                                                              <td>
                                                                  <p className="text-body align-middle fw-medium">{data.vendorname}</p>
                                                              </td>

                                                              <td>{formatDate(data.date)}</td>

                                                              <td>{data.paymentmethod}</td>

                                                              <td>{data.totalAmount}</td>

                                                              <td><span className="badge badge-soft-success p-2">{data.paymentstatus}</span></td>
                                                              <td>
                                                                  <div className="dropdown">
                                                                      <button className="btn btn-soft-secondary btn-sm dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                          <i className="las la-ellipsis-h align-middle fs-18"></i>
                                                                      </button>
                                                                      <ul className="dropdown-menu dropdown-menu-end">
                                                                          <li>
                                                                          <button className="dropdown-item" onClick={()=>handleClick(data)}><i className="las la-eye fs-18 align-middle me-2 text-muted"></i> View</button>
                                                                          </li>
                                                                          {/* <li>
                                                                              <button className="dropdown-item" href="#a"><i className="las la-pen fs-18 align-middle me-2 text-muted"></i>
                                                                                  Edit</button>
                                                                          </li>
                                                                          <li>
                                                                              <a className="dropdown-item" href="#a"><i className="las la-file-download fs-18 align-middle me-2 text-muted"></i>
                                                                                  Download</a>
                                                                          </li>
                                                                          <li className="dropdown-divider"></li>
                                                                          <li>
                                                                              <a className="dropdown-item remove-item-btn" href='#a'>
                                                                                  <i className="las la-trash-alt fs-18 align-middle me-2 text-muted"></i>
                                                                                  Delete
                                                                              </a>
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
                                                                        <h3 >No Pending History...</h3>
                                                                    </div> 
                                                                </td>
                                                            </tr>
                                                            }
                                                             <br />
                                                           
                                                           {/* total count */}
                                                           {currentData.filter(list=>list.vendorname.toLowerCase().startsWith(search.toLocaleLowerCase())  && list.paymentstatus === "Unpaid").length > 0 && 
                                                            <tr style={{fontWeight:"bolder", fontSize:"1rem"}}>
                                                               <td>Total</td>
                                                               <td></td>
                                                               <td></td>
                                                               <td></td>
                                                               <td>{currentData.filter(list=>list.vendorname.toLowerCase().startsWith(search.toLocaleLowerCase())  && list.paymentstatus === "Unpaid").map(data=>data.totalAmount).reduce((a,b)=> (Number(a)+ Number(b)).toFixed(3))}</td>  
                                                               <td></td>
                                                            </tr>
                                                           }
                        
                                                            </tbody>{/* end tbody */}
                                                        </table>{/* end table */}
                                                    </div>{/* end table responsive */}
                                                </div>
                                            </div>
                                        </div>


                                        {/* pending */}
                                        <div className="tab-pane" id="nav-border-top-pending" role="tabpanel">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="table-responsive table-card">
                                                        <table className="table table-hover table-nowrap align-middle mb-0">
                                                            <thead className="table-light">
                                                            <tr className="text-muted text-uppercase">
                                                                <th scope="col">Invoice ID</th>
                                                                    <th scope="col">Client</th>
                                                                    <th scope="col">Date</th>
                                                                    <th scope="col" style={{width: "16%"}}>Payment Type</th>
                                                                    <th scope="col" style={{width: "12%"}}>Amount</th>
                                                                    <th scope="col" style={{width: "12%"}}>Status</th>
                                                                    <th scope="col" style={{width: "12%"}}>Action</th>
                                                                </tr>
                                                            </thead>
                        
                                                            <tbody>
                                                                {invoice.filter(list=>list.paymentstatus === "Pending").length >0 ?  invoice.filter(list=>list.vendorname.toLowerCase().startsWith(search.toLocaleLowerCase())  && list.paymentstatus === "Pending").map((data, id)=>
                                                               <tr key={id}>
                                                               <td>{data.invoiceno}</td>
                                                              <td>
                                                                  <p className="text-body align-middle fw-medium">{data.vendorname}</p>
                                                              </td>

                                                              <td>{formatDate(data.date)}</td>

                                                              <td>{data.paymentmethod}</td>

                                                              <td>{data.totalAmount}</td>

                                                              <td><span className="badge badge-soft-success p-2">{data.paymentstatus}</span></td>
                                                              <td>
                                                                  <div className="dropdown">
                                                                      <button className="btn btn-soft-secondary btn-sm dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                          <i className="las la-ellipsis-h align-middle fs-18"></i>
                                                                      </button>
                                                                      <ul className="dropdown-menu dropdown-menu-end">
                                                                          <li>
                                                                          <button className="dropdown-item" onClick={()=>handleClick(data)}><i className="las la-eye fs-18 align-middle me-2 text-muted"></i> View</button>
                                                                          </li>
                                                                          {/* <li>
                                                                              <button className="dropdown-item" href="#a"><i className="las la-pen fs-18 align-middle me-2 text-muted"></i>
                                                                                  Edit</button>
                                                                          </li>
                                                                          <li>
                                                                              <a className="dropdown-item" href="#a"><i className="las la-file-download fs-18 align-middle me-2 text-muted"></i>
                                                                                  Download</a>
                                                                          </li>
                                                                          <li className="dropdown-divider"></li>
                                                                          <li>
                                                                              <a className="dropdown-item remove-item-btn" href='#a'>
                                                                                  <i className="las la-trash-alt fs-18 align-middle me-2 text-muted"></i>
                                                                                  Delete
                                                                              </a>
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
                                                                        <h3 >No Pending History...</h3>
                                                                    </div> 
                                                                </td>
                                                            </tr>
                                                            }
                                                             <br />
                                                           
                                                           {/* total count */}
                                                           {currentData.filter(list=>list.vendorname.toLowerCase().startsWith(search.toLocaleLowerCase())  && list.paymentstatus === "Unpaid").length > 0 && 
                                                            <tr style={{fontWeight:"bolder", fontSize:"1rem"}}>
                                                               <td>Total</td>
                                                               <td></td>
                                                               <td></td>
                                                               <td></td>
                                                               <td>{currentData.filter(list=>list.vendorname.toLowerCase().startsWith(search.toLocaleLowerCase())  && list.paymentstatus === "Unpaid").map(data=>data.totalAmount).reduce((a,b)=> (Number(a)+ Number(b)).toFixed(3))}</td>  
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
                            <p className="mb-0 text-muted">Showing <b>1</b> to <b>15</b> of <b>{invoice.length}</b> results</p>
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

                                </div>{/* end card-body */}
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
     <div className="modal fade" id="addpaymentModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0">
                <div className="modal-header p-4 pb-0">
                    <h5 className="modal-title" id="createMemberLabel">Add Payment</h5>
                    <button type="button" className="btn-close" id="createMemberBtn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body p-4">
                    {/* add payment form */}

                    <form onSubmit={formik.handleSubmit}>
                        <div className="row">
                            <div className="col-lg-12">

                                <div className="mb-3">
                                    <label for="dateOfPayment" className="form-label">Date</label>
                                    <input type="text" className="form-control" id="dateOfPayment" name='dateOfPayment' readOnly {...formik.getFieldProps("dateOfPayment")} />
                                </div>

                                <div className="mb-3">
                                
                                    <select type="text" className="form-control" id="invoiceno" name='invoiceno' onChange={handleInvoiceID} > 
                                    <option> --- Select Invoice ID ---</option>
                                    {invoice.map((list, id)=> <option key={id} value={list.invoiceno}>{list.invoiceno}</option>)}
                                    </select>

                                    {(formik.touched.invoiceno && formik.errors.invoiceno) ? <small style={{color:"red"}}>{formik.errors.invoiceno}</small> : null}
                                </div>

                                <div className="mb-3">
                                    <label for="vendorname" className="form-label">Client Name</label>
                                    <input type="text" className="form-control" id="vendorname" name='vendorname' {...formik.getFieldProps("vendorname")} readOnly />            
                                </div>

                                <div className="mb-3">
                                    <label for="totalAmount" className="form-label">Total Amount</label>
                                    <input type="text" className="form-control" id="totalAmount" name='totalAmount'{...formik.getFieldProps("totalAmount")} readOnly/>
                                </div>

                                  {checkStatus === "Pending" && 
                                    <div className="mb-3">
                                        <label for="receiveAmount" className="form-label">Received Amount</label>
                                        <input type="text" className="form-control" id="receiveAmount" name='receiveAmount'{...formik.getFieldProps("receiveAmount")} readOnly/>
                                    </div>
                                   }

                                {checkStatus !== "Paid" && 
                                <div>
                                <div className="mb-3">
                                    <label for="PayAmount" className="form-label">Pay Amount</label>
                                    <input type="text" className="form-control" id="PayAmount" name='PayAmount'{...formik.getFieldProps("PayAmount")} placeholder={`Balance To Be Paid : ${Number(formik.values.totalAmount) - Number(formik.values.receiveAmount)}`}/>

                                    {(formik.touched.PayAmount && formik.errors.PayAmount) ? <small style={{color:"red"}}>{formik.errors.PayAmount}</small> : null}
                                </div>

                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-4">
                                            <label for="paymenttype" className="form-label">payment Method</label>
                                            <select className="form-select" aria-label="Default select example" name='paymentmethod' onChange={handlePaymentMethod}>
                                                <option selected>Select Payment Type</option>
                                                <option value="Google Pay">Google Pay</option>
                                                <option value="Credit Card">Credit Card</option>
                                                <option value="Cash">Cash</option> 
                                                <option value="Bank Transfer">Bank Transfer</option>
                                            </select>
                                        </div>
                                        
                                        {(formik.touched.paymentmethod && formik.errors.paymentmethod) ? <small style={{color:"red"}}>{formik.errors.paymentmethod}</small> : null}
                                    </div>

                                    <div className="col-6">
                                        <div className="mb-4">
                                            <label for="paymentstatus" className="form-label">Payment Status</label>
                                            <select className="form-select" aria-label="Default select example" name='paymentstatus' {...formik.getFieldProps("paymentstatus")}>
                                                <option selected>Select Status</option>
                                                <option value="Paid">Paid</option>
                                                {/* <option value="Unpaid">Unpaid</option> */}
                                                <option value="Pending">Pending</option>
                                                {/* <option value="Failed">Failed</option> */}
                                            </select>
                                        </div>

                                        {(formik.touched.paymentstatus && formik.errors.paymentstatus) ? <small style={{color:"red"}}>{formik.errors.paymentstatus}</small> : null}
                                    </div>

                                    <div className="mb-3">
                                    <label for="holdername" className="form-label">Payment Details</label>

                                        <input type="text" className="form-control" id="holdername" name='holdername' {...formik.getFieldProps("holdername")} placeholder='Enter Holder Name'/>                                     

                                        {/* {(formik.touched.holdername && formik.errors.holdername) ? <small style={{color:"red"}}>{formik.errors.holdername}</small> : null} */}
                                    </div>

                                    {formik.values.paymentmethod === "Credit Card" &&
                                    <div className="mb-3">
                                    <label for="cardnumber" className="form-label">Card Number</label>

                                        <input type="text" className="form-control" id="cardnumber" name='cardnumber'value={formik.values.cardnumber} onChange={formatCardNumber} placeholder='XXXX XXXX XXXX XXXX'/>                                     

                                        {(formik.touched.cardnumber && formik.errors.cardnumber) ? <small style={{color:"red"}}>{formik.errors.cardnumber}</small> : null}
                                    </div>
                                    }

                                    {formik.values.paymentmethod === "Google Pay" &&
                                    <div className="mb-3">
                                    <label for="TranscationID" className="form-label">Transcation ID</label>

                                        <input type="text" className="form-control" id="TranscationID" name='TranscationID' {...formik.getFieldProps("TranscationID")} placeholder='Enter Transcation ID'/>                                     

                                        {(formik.touched.TranscationID && formik.errors.TranscationID) ? <small style={{color:"red"}}>{formik.errors.TranscationID}</small> : null}
                                    </div>
                                    }

                                </div>

                                <div className="hstack gap-2 justify-content-end">
                                    <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-success" id="addNewMember">Add Payment</button>
                                </div>

                                </div>
                                }
                                {checkStatus === "Paid" &&
                                <div>
                                    <p  style={{textAlign:"center", fontSize:"1.5rem"}}><mark> Payment Was Done...</mark></p>
                                </div>
                                }
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

export default ReuseSalesPayments