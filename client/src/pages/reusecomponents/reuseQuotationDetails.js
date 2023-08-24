import React, {useRef} from 'react'
import Reusenavbar from './reusenavbar'
import Sidebar from '../components/sidebar'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Footer from '../components/footer'
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import {useReactToPrint} from "react-to-print"
import "../../App.css"
import Downloadtoexcel from '../components/Download to excel';
import API_BASE_URL from '../components/config';





const ReuseQuotationdetails = (params) => {

    const location = useLocation();
    const quotationData = location.state;


    //console.log(quotationData);

      //download as pdf
      const pdfRef = useRef();

      const downloadPDF = ()=>{
          const input = pdfRef.current;
          html2canvas(input,{}).then(canvas=>{
              const imgData = canvas.toDataURL("image/png");
              const pageWidth = 210;
              const pageHeight = 297;
              const height = canvas.height*pageWidth/canvas.width;
              const pdf = new jsPDF("p", "mm", "a4");
              pdf.addImage(imgData, "PNG",0,0,pageWidth,height);
  
              pdf.save(`${quotationData.quotationno}-${params.value3?.[0].company_name}.pdf`);
  
          })
      } 
  
      const handlePrint = useReactToPrint({
          content : ()=> pdfRef.current,
          documentTitle : `${quotationData.quotationno}-${params.value3?.[0].company_name}`,
          onAfterPrint:() => window.close(),
  
      })

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
                                <h4 className="mb-sm-0">Quotation Details</h4>

                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="#a">Quotation</a></li>
                                        <li className="breadcrumb-item active">Quotation Details</li>
                                    </ol>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* end page title */}

                    
                    {/* <div className="row pb-4 gy-3">
                        <div className="col-sm-4">
                            <Link to="/invoice" className="btn btn-primary addMembers-modal"><i className="las la-plus me-1"></i>Go To Invoice</Link>
                        </div>
                    </div> */}

                        {/* invoice data generation */}


                    {quotationData ?
                     <div className="row justify-content-center">
                     <div className="col-xxl-9">
                         <div className="card" id="demo" ref={pdfRef} style={{width:"100%"}}>
                                <div className="card-body">

                                {params.value3 &&
                                        <div className='row p-4'>   

                                            <div className="col-lg-4 col-4">

                                                <div className="mt-sm-0 mt-3">
                                                    <div className="mb-4">
                                                        <img src={`${API_BASE_URL}/companyprofileimg/${params.value3?.[0].company_logo}`}  className="card-logo card-logo-dark c_profile_img c_profile_addinvoicedetails_img" alt="logo dark"/>
                                                        {/* <span style={{fontWeight : "bolder", fontSize:"2rem", color:"black", textTransform : "capitalize"}} >{params.value3?.[0].company_name}</span> */}

                                                        {/* <img src={params.value3?.[0].company_logo}  className="card-logo card-logo-light" alt="logo light" height="80" /> */}
                                                        {/* <span style={{fontWeight : "bolder", fontSize:"2rem", color:"black", textTransform : "capitalize"}} >{params.value3.company_name}</span> */}                                       
                                                    </div>
                                                    
                                                </div>

                                            </div>

                                            <div className="col-lg-4 col-4">
                                                <div className="mt-sm-0 mt-3">
                                                    <p> <span className='c_profile_invoicedetaikls_name '>{params.value3?.[0].company_name}</span></p>
                                                    {/* <p className="text-muted mb-1" id="zip-code"><span>GST No : </span> {params.value3?.[0].GST_No}</p> */}
                                                    <p className="c_profile_invoicedetaikls_name" id="address-details">{params.value3?.[0].address}</p>


                                                </div>
                                            </div>

                                            <div className="col-lg-4 col-4">
                                                <div className="mt-sm-0 mt-3">
                                                {/* <h6 className="text-muted text-uppercase fw-semibold">Address</h6> */}
                                                    
                                                    <h6><span className="text-muted fw-normal">Email : </span><span id="email">{params.value3?.[0].email}</span></h6>
                                                    {/* <h6><span className="text-muted fw-normal">Website:</span> <a href="https://themesbrand.com/" className="link-primary" rel='noreferrer' target="_blank" id="website">www.themesbrand.com</a></h6> */}
                                                    <h6 className="mb-0"><span className="text-muted fw-normal">Contact No : </span><span id="contact-no">{params.value3?.[0].mobile_No}</span></h6>
                                                </div>
                                            </div>
                                                    
                                        
                                        
                                        </div>
                                    }
                                 <div className="row p-4">
                                     <div className="col-lg-12">
                                         <h3 className="fw-bold mb-4">Quotation No:{quotationData.quotationno} </h3>
                                         <div className="row g-4">
                                             <div className="col-lg-4 col-4">
                                                 <p className="mb-1 text-uppercase fw-medium fs-14">Client Name : {quotationData.vendorname} </p>
                                                 {/* <h5 className="fs-16 mb-0"><span id="invoice-no">GST No : {quotationData.vendorGSTno}</span></h5> */}
                                             </div>
                                             {/*end col*/}
                                             <div className="col-lg-4 col-4">
                                                 <p className="text-muted mb-1 text-uppercase fw-medium fs-14">Date</p>
                                                 <h5 className="fs-16 mb-0"><span id="invoice-date">{quotationData.dateofpurchase.substr(0,9)}</span> 
                                                 {/* <small className="text-muted" id="invoice-time">{quotationData.dateofpurchase.substr(13,8)}</small> */}
                                                 </h5>
                                             </div>
                                             {/*end col*/}
                                             <div className="col-lg-4 col-4">
                                                 <p className="text-muted mb-1 text-uppercase fw-medium fs-14">Payment Status</p>
                                                 <span className="badge badge-soft-success fs-11" id="payment-status">{quotationData.paymentstatus}</span>
                                             </div>
                                             {/*end col*/}
                                             {/* <div className="col-lg-4 col-4">
                                                 <p className="text-muted mb-1 text-uppercase fw-medium fs-14">Total Amount</p>
                                                 <h5 className="fs-16 mb-0">₹<span id="total-amount">{quotationData.totalAmount}</span></h5>
                                             </div> */}
                                             {/*end col*/}
                                         </div>
                                     </div>
                                     {/* <div className="col-lg-3">
                                         <div className="mt-sm-0 mt-3">
                                             <div className="mb-4">
                                                 <img src="assets/images/logo-dark.png" className="card-logo card-logo-dark" alt="logo dark" height="17" />
                                                 <img src="assets/images/logo-light.png" className="card-logo card-logo-light" alt="logo light" height="17" />
                                             </div>
                                             <h6 className="text-muted text-uppercase fw-semibold">Address</h6>
                                             <p className="text-muted mb-1" id="address-details">California, United States</p>
                                             <p className="text-muted mb-1" id="zip-code"><span>Zip-code:</span> 90201</p>
                                             <h6><span className="text-muted fw-normal">Email:</span><span id="email">Invoika@themesbrand.com</span></h6>
                                             <h6><span className="text-muted fw-normal">Website:</span> <a href="https://themesbrand.com/" className="link-primary" rel='noreferrer' target="_blank" id="website">www.themesbrand.com</a></h6>
                                             <h6 className="mb-0"><span className="text-muted fw-normal">Contact No: </span><span id="contact-no"> +(01) 234 6789</span></h6>
                                         </div>
                                     </div> */}
                                 </div>{/*end col*/}

                                 <div className="row p-4 border-top border-top-dashed">
                                     <div className="col-lg-9">
                                         <div className="row g-3">
                                             {/* <div className="col-6">
                                                 <h6 className="text-muted text-uppercase fw-semibold mb-3">Billing Address</h6>
                                                 <p className="fw-medium mb-2" id="billing-name">Msoft</p>
                                                 <p className="text-muted mb-1" id="billing-address-line-1">806 Manjeera Majestic Commercial Kukatpally</p>
                                                 <p className="text-muted mb-1"><span id="billing-phone-no">Phone: (+91) 9618 624 866</span></p>
                                                 <p className="text-muted mb-0"><span>Tax: </span><span id="billing-tax-no">12-3456789</span> </p>
                                             </div> */}
                                             {/*end col*/}
                                             <div className="col-6">
                                                 <h6 className="text-muted text-uppercase fw-semibold mb-3">Billing Address</h6>
                                                 {/* <p className="fw-medium mb-2" id="shipping-name">{quotationData.vendorname}</p> */}
                                                 <p className="text-muted mb-1" id="shipping-address-line-1">{quotationData.vendoraddress}</p>
                                                 <p className="text-muted mb-1"><span id="shipping-phone-no">Phone: (+91) {quotationData.vendornumber}</span></p>
                                             </div>
                                             {/*end col*/}
                                         </div>
                                         {/*end row*/}
                                     </div>{/*end col*/}

                                     <div className="col-lg-3">
                                             <h6 className="text-muted text-uppercase fw-semibold mb-3">Total Amount</h6>
                                             <h3 className="fw-bold mb-2">₹ {quotationData.totalAmount}</h3>
                                             <span className="badge badge-soft-success fs-12">Due Date: {quotationData.dateofpurchase.substr(0,10)}</span>
                                     </div>

                                     <div className="col-lg-4 col-4">
                                            <p className=" mb-1 text-uppercase fw-medium fs-14">Category</p>
                                            <span className="badge badge-soft-success fs-11" id="payment-status">{quotationData.producttype}</span>
                                        </div>

                                 </div>

                                 <div className="row">
                                     <div className="col-lg-12">
                                         <div className="card-body p-4">
                                             <div className="table-responsive">
                                                 <table className="table table-borderless text-center align-middle mb-0">
                                                     <thead>
                                                         <tr className="table-active">
                                                             <th scope="col" style={{width:"20px"}}>S.no</th>
                                                             <th scope="col" style={{textAlign:"left", width:"200px"}}>Service Name</th>
                                                             <th scope="col" style={{width:"80px"}}>Price</th>
                                                             {/* <th scope="col" style={{width:"80px"}}>Quantity</th>
                                                             <th scope="col" style={{width:"80px"}}>Amount</th>  */}
                                                             <th scope="col" style={{width:"80px"}}>Tax (%)</th>
                                                             <th scope="col" style={{width:"10px"}}>Taxable Amount</th>
                                                             <th scope="col" style={{width:"10px"}} className="text-end">HSN Code</th>   
                                                        </tr>
                                                     </thead>
                                                     <tbody id="products-list">
                                                        {quotationData.rows.map((res,id)=>
                                                         <tr key={id}>
                                                             <th scope="row">{res.sno}</th>
                                                             <td className="text-start">
                                                                 <span className="fw-medium">{res.productname}</span>
                                                                 <p className="text-muted mb-0">{res.productdescription}</p>
                                                             </td>
                                                             <td>{res.productprice}</td> 
                                                             {/* <td>{res.quantity}</td>
                                                             <td>{res.amount}</td> */}
                                                             <td>{res.tax}</td>
                                                             <td>{res.taxableAmount}</td>
                                                             <td className="text-end">{res.hsncode}</td>
                                                         </tr>
                                                         )}
                                                         {/* <tr>
                                                             <th scope="row">02</th>
                                                             <td className="text-start">
                                                                 <span className="fw-medium">Noise NoiseFit Endure Smart Watch</span>
                                                                 <p className="text-muted mb-0">32.5mm (1.28 Inch) TFT Color Touch Display</p>
                                                             </td>
                                                             <td>$94.99</td>
                                                             <td>01</td>
                                                             <td className="text-end">$94.99</td>
                                                         </tr>
                                                         <tr>
                                                             <th scope="row">03</th>
                                                             <td className="text-start">
                                                                 <span className="fw-medium">350 ml Glass Grocery Container</span>
                                                                 <p className="text-muted mb-0">Glass Grocery Container (Pack of 3, White)</p>
                                                             </td>
                                                             <td>$24.99</td>
                                                             <td>01</td>
                                                             <td className="text-end">$24.99</td>
                                                         </tr>
                                                         <tr>
                                                             <th scope="row">04</th>
                                                             <td className="text-start">
                                                                 <span className="fw-medium">Fabric Dual Tone Living Room Chair</span>
                                                                 <p className="text-muted mb-0">Chair (White)</p>
                                                             </td>
                                                             <td>$340.00</td>
                                                             <td>01</td>
                                                             <td className="text-end">$340.00</td>
                                                         </tr> */}
                                                     </tbody>
                                                 </table>{/*end table*/}
                                             </div>
                                             <div className="border-top border-top-dashed mt-2">
                                                 <table className="table table-borderless table-nowrap align-middle mb-0 ms-auto" style={{width: "250px"}}>
                                                     <tbody>
                                                         <tr>
                                                             <td>Sub Total</td>
                                                             <td className="text-end">{quotationData.subtotal}</td>
                                                         </tr>
                                                         <tr>
                                                             <td>SGST (%)</td>
                                                             <td className="text-end">{quotationData.SGST}</td>
                                                         </tr>
                                                         <tr>
                                                             <td>CGST (%)<small className="text-muted"></small></td>
                                                             <td className="text-end">{quotationData.CGST}</td>
                                                         </tr>
                                                         
                                                         <tr className="border-top border-top-dashed fs-15">
                                                             <th scope="row">Total Amount</th>
                                                             <th className="text-end">₹ {quotationData.totalAmount}</th>
                                                         </tr>
                                                     </tbody>
                                                 </table>
                                                 {/*end table*/}
                                             </div>
                                             <div className="mt-3">
                                                 <h6 className="text-muted text-uppercase fw-semibold mb-3">Payment Details:</h6>
                                                 <p className="text-muted mb-1">Payment Method: <span className="fw-medium" id="payment-method">{quotationData.paymentmethod}</span></p>
                                                 <p className="text-muted mb-1">Card Holder: <span className="fw-medium" id="card-holder-name">{quotationData.holdername}</span></p>
                                                 <p className="text-muted mb-1">Card Number: <span className="fw-medium" id="card-number">xxxx xxxx xxxx {quotationData.cardnumber.substr(15, 4)}</span></p>
                                                 <p className="text-muted">Total Amount: <span className="fw-medium" id="">₹ </span><span id="card-total-amount">{quotationData.totalAmount}</span></p>
                                             </div>
                                             <div className="mt-4">
                                                 <div className="alert alert-info">
                                                     <p className="mb-0"><span className="fw-semibold">NOTES:</span>
                                                         <span id="note">All accounts are to be paid within 7 days from receipt of invoice. To be paid by cheque or
                                                             credit card or direct payment online. If account is not paid within 7
                                                             days the credits details supplied as confirmation of work undertaken
                                                             will be charged the agreed quoted fee noted above.
                                                         </span>
                                                     </p>
                                                 </div>
                                             </div>
                                             <div className="hstack gap-2 justify-content-end d-print-none mt-4">
                                                <button onClick={handlePrint} className="btn btn-info"><i className="ri-printer-line align-bottom me-1"></i> Print</button>

                                                <div className="dropdown header-item">
                                    <button type="button" className="btn" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="d-flex align-items-center">
                                        <button className="btn btn-primary"><i className="ri-download-2-line align-bottom me-1"></i> Download</button>
                                        </span> 
                                    </button>

                                    <div className="dropdown-menu dropdown-menu-end">
                                    {/* item*/}
                                        <button  className="dropdown-item" onClick={downloadPDF}><span key="t-profile">PDF</span></button>
                                        
                                        <div className="dropdown-divider"></div>
                                        
                                        <Downloadtoexcel data={quotationData} fileName={`${quotationData.quotationno}-${params.value3?.[0].company_name}`}/>
                                    </div>
                                </div>

                                                 <Link to="/quotation" className="btn btn-danger addMembers-modal" ><i class="las la-arrow-left"></i> Back To Quotaton</Link>

                                             </div>
                                         </div>
                                         {/*end card-body*/}
                                     </div>{/*end col*/}
                                 </div>
                                </div>
                         </div>
                     </div>
                     {/*end col*/}
                 </div>
                     : 
                     <div style={{display:"flex", width:"100%", height:"100vh", justifyContent:"center", alignItems:"center"}}>
                        <h1>Firstly, Add Invoice To View Details...</h1>
                     </div>
                        }
                    

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

export default ReuseQuotationdetails