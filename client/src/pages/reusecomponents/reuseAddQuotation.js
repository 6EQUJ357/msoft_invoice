import React, {useEffect, useState} from 'react'
import Reusenavbar from './reusenavbar'
import Sidebar from '../components/sidebar'
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import Footer from '../components/footer'
import "../../App.css"


import API_BASE_URL from "../components/config";


const ReuseAddQuotation = (params) => {

    const navigate = useNavigate();

    //present date
  const date = new Date();
  const dateTimeString = date.toLocaleString();

  // generate invoice id

    //   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //   let id = '#';
    //   for (let i = 0; i < 7; i++) {
    //     const randomIndex = Math.floor(Math.random() * characters.length);
    //     id += characters.charAt(randomIndex);
    //   }

      const [quotationdata, setquotationdata] = useState([]);


      //register user details list (client/Client)

      const [registeruser, setregisteruser] = useState([]);


      useEffect(()=>{

        axios.get(`${API_BASE_URL}/getregisteruserdetails`).then(res=>setregisteruser(res.data)).catch(err=>console.log(err));

        axios.get(`${API_BASE_URL}/getquotationtransaction`).then(res=>setquotationdata(res.data)).catch(err=>console.log(err));
       },[])


  const formik = useFormik({
    initialValues : {
        quotationno : "",
        dateofpurchase : dateTimeString,
        paymentstatus : "",
        vendorname : "",
        vendorGSTno : "",
        vendoremail : "",
        vendornumber : "",
        vendoraddress : "",
        paymentmethod : "",
        holdername : "",
        cardnumber : "",
        subtotal : "",
        SGST : "",
        CGST : "",
        totalAmount : "",
        rows: []
        
    },
    // validationSchema : Yup.object({
    //     quotationno : Yup.string(),
    //     dateofpurchase : Yup.string(),
    //     paymentstatus : Yup.string().required("Select Payment Status"),
    //     vendorname : Yup.string().required("Name Required"),
    //     // vendorGSTno: Yup.string().required("Enter GST no"),
    //     vendoremail : Yup.string().required("Email Required"),
    //     vendornumber : Yup.string().required("Number Required"),
    //     vendoraddress : Yup.string().required("Address Required"),
    //     paymentmethod : Yup.string().required("Choose Payment Method"),
    //     holdername : Yup.string().required("Name Required"), 
    //     cardnumber : Yup.string().required("Enter Card Number").length(19),
    //     producttype : Yup.string().required("Specify Type")
    // }),
    onSubmit :async(values, {resetForm})=>{

        await axios.post(`${API_BASE_URL}/quotationtransaction`, values).then(res=>{
            alert(res.data.message);

            if(res.data.status === 200){
                navigate('/quotationdetails', { state: values });
                // console.log("values", values)
            }
        }
            ).catch(err=>console.log(err))

       

    }
    
})


// add new row
const handleAddRow = () => {
    const newRow = {
      sno: formik.values.rows.length + 1,
      productname : "",
      productdescription : "",
      productprice : "",
      quantity : "",
      tax : "",
      taxableAmount : "",
      hsncode : "",
    };

    formik.setFieldValue('rows', [...formik.values.rows, newRow]);
  };


// onChange input handle
const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedRows = [...formik.values.rows];
    updatedRows[index][name] = value;
    formik.setFieldValue('rows', updatedRows);
  };



  //handlePriceChange

  const handlePriceChange = (e, index)=>{
    const { value } = e.target;

   const updatedRows = [...formik.values.rows];
   updatedRows[index].productprice = value;
   formik.setFieldValue('rows', updatedRows);
   

   //set sub total value
   let amountts = updatedRows.reduce((a,b)=>{ return Number(a)+Number(b.productprice)},0);

   formik.setFieldValue('subtotal', amountts);

   //set total amount
   formik.setFieldValue("totalAmount",amountts)
 }





//productname handle change
const handleNameChange = (e, index)=>{
   const { value } = e.target;

   const updatedRows = [...formik.values.rows];
   updatedRows[index].productname = value;
   formik.setFieldValue('rows', updatedRows);
  
 }

 const handleDescChange = (e, index)=>{
   const { value } = e.target;

   const updatedRows = [...formik.values.rows];
   updatedRows[index].productdescription = value;
   formik.setFieldValue('rows', updatedRows);
  
 }

 


// calculate taxable amount througH tax field
const handleTaxChange = (e, index)=>{
   const { value } = e.target;

   const updatedRows = [...formik.values.rows];
   updatedRows[index].tax = value;
   formik.setFieldValue('rows', updatedRows);

   //taxable price
   let productprice = Number(updatedRows[index].productprice); 
   let taxableamounts = productprice * (Number(e.target.value) / 100);
   updatedRows[index].taxableAmount = taxableamounts.toString();
   formik.setFieldValue('rows', updatedRows);

   //SGST
   let estTax = updatedRows.reduce((a,b)=>{ return Number(a)+Number(b.taxableAmount)},0);
   let halftax = estTax / 2;
   formik.setFieldValue('SGST', halftax.toFixed(2).toString());

   //CGST
   formik.setFieldValue('CGST', halftax.toFixed(2).toString());

   //totalAmount
    let totalAmo = Number(formik.values.subtotal) + estTax;
    formik.setFieldValue('totalAmount', totalAmo.toFixed(2).toString());
 }



  //delete row

  const handleDeleteRow = ( index) => {
    let responce = window.confirm(`Are You Delete The Row #${index + 1}`);

    if(responce){
    const updatedRows = [...formik.values.rows];
    updatedRows.splice(index, 1);
    formik.setFieldValue('rows', updatedRows);

    //sub total
    let amountts = updatedRows.reduce((a,b)=>{ return Number(a)+Number(b.productprice)},0);

    //formik.setFieldValue('subtotal', amountts.toFixed(2).toString());
    formik.setFieldValue('totalAmount', amountts.toFixed(2).toString());

    let estTax = updatedRows.reduce((a,b)=>{ return Number(a)+Number(b.taxableAmount)},0);
    let halftax = estTax / 2;
    formik.setFieldValue('SGST', halftax.toFixed(2).toString());

    //CGST
    formik.setFieldValue('CGST', halftax.toFixed(2).toString());
    
    }

  };






//payment Status Handle

const paymentStatusHandle = (e)=>{
    formik.setFieldValue("paymentstatus", e.target.value);

    if(e.target.value === "Unpaid"){
        formik.setFieldValue("paymentmethod","nill");
        formik.setFieldValue("cardnumber","XXXX XXXX XXXX XXXX");
        formik.setFieldValue("holdername","nill")
    }
    if(e.target.value === "Paid"){
        formik.setFieldValue("paymentmethod","");
        formik.setFieldValue("cardnumber","");
        formik.setFieldValue("holdername","")
    }
}

//format Card Number
const formatCardNumber = (e)=>{
    const formattedValue = e.target.value
    .replace(/\s/g, "")   // Remove any existing spaces
    .match(/.{1,4}/g)     // Split the string into groups of 4 characters
    .join(" ");           // Join the groups with a space in between

  formik.setFieldValue("cardnumber", formattedValue);
}


//filter vendor name from Api

const changes = (e)=>{
    formik.setFieldValue("vendorname", e.target.value);

    const index = registeruser.findIndex(list=>list.registerusername === e.target.value)
    //console.log("registeruser", registeruser)
   // console.log("index", index);

    formik.setFieldValue("vendoremail", registeruser[index].registeruseremail);
    formik.setFieldValue("vendornumber", registeruser[index].registerusernumber);
    formik.setFieldValue("vendorGSTno", registeruser[index].registerusergstno);
    formik.setFieldValue("vendoraddress", registeruser[index].registeruseraddress);
    formik.setFieldValue("quotationno", quotationdata.length > 0 ? (Number(quotationdata.map(list=>list.quotationno)[quotationdata.length - 1]) + 1).toString() : "5000")

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
                                <h4 className="mb-sm-0">New Quotation</h4>

                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href='#a'>Quotation</a></li>
                                        <li className="breadcrumb-item active">New Quotation</li>
                                    </ol>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* end page title */}

                    <div className="row justify-content-center">
                        <div className="col-xxl-12">
                            <div className="card">

                                <form className="needs-validation" id="invoice_form" onSubmit={formik.handleSubmit}  autoComplete='off'>
                                    <div className="card-body border-bottom border-bottom-dashed p-4">
                                        <div className="row">

                                            <div className='row'>
                                            <div className='col-lg-4 col-0'></div>
                                                <div className='col-lg-4 col-12'>
                                            {params.value3 && 
                                                    <div className="profile-user mx-auto  mb-3">
                                                        {/* <input id="profile-img-file-input" type="file" className="profile-img-file-input" /> */}

                                                        <label htmlFor="profile-img-file-input" className='addinvoice_lable'  tabIndex="0" style={{width:"20rem"}}>
                                                            
                                                            <span className="overflow-hidden  d-flex align-items-center justify-content-left rounded" >

                                                                <img src={`${API_BASE_URL}/companyprofileimg/${params.value3?.[0].company_logo}`}  className="card-logo card-logo-dark user-profile-image img-fluid  c_profile_addinvoice_img" alt="logo dark" />
 
                                                                <span className='c_profile_name c_profile_addinvoice_name' >{params.value3?.[0].company_name}</span>
                                                                
                                                                {/* <img src={params.value3?.[0].company_logo} className="card-logo card-logo-light user-profile-image img-fluid" alt="logo light" /> */}
                                                            </span>
                                                        </label>
                                                    </div>
                                                }
                                                </div>
                                                <div className='col-lg-4 col-0'></div>
                                            </div>
                                            
                                            <div className="col-lg-6 col-12">
                                                <div className="row g-3">
                                                    <div className="col-lg-8 col-sm-6">
                                                        <label htmlFor="quotationnoInput">Quotation No</label>
                                                        <input type="text" className="form-control bg-light border-0" id="quotationnoInput" placeholder="Invoice No" name="quotationno"  readOnly = "readonly" value={quotationdata.length > 0 ? (Number(quotationdata.map(list=>list.quotationno)[quotationdata.length - 1]) + 1).toString() : "5000"} />
                                                    </div>
                                                    {/*end col*/}
                                                    <div className="col-lg-8 col-sm-6">
                                                        <div>
                                                            <label htmlFor="date-field">Date</label>
                                                            <input type="text" className="form-control bg-light border-0 flatpickr-input" id="date-field" data-provider="flatpickr" data-time="true" placeholder="Select Date-time" name ="dateofpurchase" readOnly = "readonly"  {...formik.getFieldProps("dateofpurchase")}/> 
                                                        </div>
                                                    </div>
                                                                                                    
                                                </div>
                                                
                                            </div>
                                            {/*end col*/}
                                            <div className="col-lg-6 ms-auto col-12">

                                            <div className='row' >
                                                <div className="col-lg-6 mb-2">

                                                    <lable>Client Name</lable>
                                                    <select className="form-control bg-light border-0" id="vendorname"  name="vendorname" onChange={changes} >
                                                        <option>-- Select -- </option>
                                                        {registeruser.length > 0 && registeruser.map((res)=>
                                                        <option key={res._id} value={res.registerusername} >{res.registerusername}</option>
                                                        )}
                                                    </select>
                                                    
                                                    {(formik.touched.vendorname && formik.errors.vendorname) ? <small style={{color:"red"}}>{formik.errors.vendorname}</small> : null}

                                                </div>

                                                <div className='col-lg'>
                                                    <br/>
                                                    <Link to="/registeruser" className='btn btn-primary'>Add New Client</Link>
                                                </div>

                                            </div>

                                                <div className="mb-2">
                                                    <input className="form-control bg-light border-0" id="vendorGSTno"  name="vendorGSTno" placeholder="GST no" {...formik.getFieldProps("vendorGSTno")} readOnly/>
                                                    <div className="invalid-feedback">
                                                        Please enter GST no
                                                    </div>
                                                    {(formik.touched.vendorGSTno && formik.errors.vendorGSTno) ? <small style={{color:"red"}}>{formik.errors.vendorGSTno}</small> : null}

                                                </div>


                                                {/* <div>
                                                    <label htmlFor="companyAddress">Address</label>
                                                </div> */}
                                                <div className="mb-2">
                                                <textarea className="form-control bg-light border-0" id="companyAddress" rows="3" placeholder="Company Address" name="vendoraddress" {...formik.getFieldProps("vendoraddress")} readOnly ></textarea>
                                                    <div className="invalid-feedback">
                                                        Please enter a address
                                                    </div>
                                                    {(formik.touched.vendoraddress && formik.errors.vendoraddress) ? <small style={{color:"red"}}>{formik.errors.vendoraddress}</small> : null}

                                                </div>
                                                {/* <div className="mb-2">
                                                    <input type="text" className="form-control bg-light border-0" id="companyaddpostalcode" minlength="5" maxlength="6" placeholder="Enter Postal Code" required="" />
                                                    <div className="invalid-feedback">
                                                        The US zip code must contain 5 digits, Ex. 45678
                                                    </div>
                                                </div> */}
                                                
                                                <div className="mb-2">
                                                <input type="email" className="form-control bg-light border-0" id="companyEmail" placeholder="Email Address" name="vendoremail"  {...formik.getFieldProps("vendoremail")} readOnly />
                                                    <div className="invalid-feedback">
                                                        Please enter a valid email, Ex., example@gamil.com
                                                    </div>
                                                    {(formik.touched.vendoremail && formik.errors.vendoremail) ? <small style={{color:"red"}}>{formik.errors.vendoremail}</small> : null}

                                                </div>
                                                {/* <div className="mb-2">
                                                    <input type="text" className="form-control bg-light border-0" id="companyWebsite" placeholder="Website" required />
                                                    <div className="invalid-feedback">
                                                        Please enter a website, Ex., www.example.com
                                                    </div>
                                                </div> */}
                                                <div>
                                                <input type="text" className="form-control bg-light border-0" data-plugin="cleave-phone" id="compnayContactno" placeholder="Contact No" name='vendornumber' {...formik.getFieldProps("vendornumber")} readOnly />
                                                    <div className="invalid-feedback">
                                                        Please enter a contact number
                                                    </div>
                                                    {(formik.touched.vendornumber && formik.errors.vendornumber) ? <small style={{color:"red"}}>{formik.errors.vendornumber}</small> : null}

                                                </div>
                                            </div>
                                        </div>
                                        {/*end row*/}
                                    </div>
                                    {/* <div className="card-body p-4 border-top border-top-dashed">
                                        <div className="row">
                                            {/* <div className="col-lg-4 col-sm-6">
                                                <div>
                                                    <label htmlFor="billingName" className="text-muted text-uppercase fw-semibold">Billing Address</label>
                                                </div>
                                                <div className="mb-2">
                                                    <input type="text" className="form-control bg-light border-0" id="billingName" placeholder="Full Name" required />
                                                    <div className="invalid-feedback">
                                                        Please enter a full name
                                                    </div>
                                                </div>
                                                <div className="mb-2">
                                                    <textarea className="form-control bg-light border-0" id="billingAddress" rows="3" placeholder="Address" required></textarea>
                                                    <div className="invalid-feedback">
                                                        Please enter a address
                                                    </div>
                                                </div>
                                                <div className="mb-2">
                                                    <input type="text" className="form-control bg-light border-0" data-plugin="cleave-phone" id="billingPhoneno" placeholder="(123)456-7890" required />
                                                    <div className="invalid-feedback">
                                                        Please enter a phone number
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <input type="text" className="form-control bg-light border-0" id="billingTaxno" placeholder="Tax Number" required />
                                                    <div className="invalid-feedback">
                                                        Please enter a tax number
                                                    </div>
                                                </div>
                                                <div className="form-check">
                                                    <input type="checkbox" className="form-check-input" id="same" name="same" onchange="billingFunction()" />
                                                    <label className="form-check-label" htmlFor="same">
                                                        Will your Billing and Shipping address same?
                                                    </label>
                                                </div>
                                            </div> 
                                            {/*end col
                                            <div className="col-sm-6 ms-auto">
                                                <div className="row">
                                                    <div className="col-lg-8">
                                                        <div>
                                                            <label htmlFor="shippingName" className="text-muted text-uppercase fw-semibold">Shipping Address</label>
                                                        </div>
                                                        <div className="mb-2">
                                                            <input type="text" className="form-control bg-light border-0" id="shippingName" placeholder="Full Name" required />
                                                            <div className="invalid-feedback">
                                                                Please enter a full name
                                                            </div>
                                                        </div>
                                                        <div className="mb-2">
                                                            <textarea className="form-control bg-light border-0" id="shippingAddress" rows="3" placeholder="Address" required></textarea>
                                                            <div className="invalid-feedback">
                                                                Please enter a address
                                                            </div>
                                                        </div>
                                                        <div className="mb-2">
                                                            <input type="text" className="form-control bg-light border-0" data-plugin="cleave-phone" id="shippingPhoneno" placeholder="(123)456-7890" required />
                                                            <div className="invalid-feedback">
                                                                Please enter a phone number
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <input type="text" className="form-control bg-light border-0" id="shippingTaxno" placeholder="Tax Number" required />
                                                            <div className="invalid-feedback">
                                                                Please enter a tax number
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*end col
                                        </div>
                                        {/*end row
                                    </div> */}
                                    <div className="card-body p-2">
                                        <div className="table-responsive">
                                            <table className="invoice-table table table-borderless table-nowrap mb-0">
                                                <thead className="align-middle">
                                                    <tr className="table-active">
                                                        <th>S.no</th>
                                                        {/* <th scope="col" >Category</th> */}
                                                        <th scope="col" className='sss'>Service Name</th>
                                                        <th scope="col" className='sss1'>HSN Code</th>
                                                        <th scope="col" className='sss'>Service Description</th>
                                                        <th scope="col" style={{width:"150px"}}>Price</th>
                                                        {/* <th scope="col" >Quantity</th>
                                                        <th scope="col" >Amount</th> */}
                                                        <th scope="col" className='sss1' >GST Tax (%)</th>
                                                        <th scope="col" className='sss1' >Taxable Amount</th>
                                                        <th scope="col" className="text-end"></th>
                                                    </tr>
                                                </thead>

                                                <tbody id="newlink">

                                                {formik.values.rows.map((row, index) => (
                                                    <tr id="1" className="product" key={index}>
                                                        <td>{row.sno}</td> 

                                                        <td className="text-start">
                                                            <div className="mb-2">
                                                                <input type="text" className="form-control bg-light border-0" id="productName-1" placeholder='Enter Service Name' name={`rows[${index}].productname`}  onChange={(e) => handleNameChange(e, index)} />
                                                                <div className="invalid-feedback">
                                                                    Please enter a product name
                                                                </div>
                                                            </div>
                                                        </td> 

                                                          <td>
                                                            <div className="text-end"> 
                                                            <input type='text' className="form-control bg-light border-0 product-line-price" id="hsn-code" placeholder="code" name="hsncode" value={row.hsncode} onChange={(e) => handleInputChange(e, index)}/>
                                                               
                                                            </div>
                                                        </td> 
                                                                                                                                                               

                                                        <td >
                                                        <textarea type="text" className="form-control bg-light border-0" id="productDetails-1" rows="2" placeholder="Service Details" name={`rows[${index}].productdescription`}  onChange={(e) => handleDescChange(e, index)} />
                                                            <div className="invalid-feedback"> 
                                                                Please enter Product Description
                                                            </div>
                                                            
                                                        </td>
                                                        
                                                        <td >
                                                        <div className="text-end ss2" > 
                                                        <input type="text" className="form-control bg-light border-0 product-line-price" id="productRate-1" placeholder='₹0.00' name={`rows[${index}].productprice`} value={row.productprice}  onChange={(e) => handlePriceChange(e, index)} />
                                                            <div className="invalid-feedback"> 
                                                                Please enter a rate
                                                            </div>
                                                             
                                                        </div>
                                                        </td>

                                                       
                                                        <td className="text-end">
                                                            <div>
                                                            <input type="text" className="form-control bg-light border-0 product-line-price" id="productPrice1" placeholder="₹0.00" name={`rows[${index}].tax`} value={row.tax} onChange={(e) => handleTaxChange(e, index)} />
                                                            </div>
                                                                                                                   
                                                        </td> 
                                                        
                                                         <td className="text-end">
                                                            <div>
                                                            <input type="text" className="form-control bg-light border-0 product-line-price" id="taxable amount" placeholder="₹0.00" name={`rows[${index}].taxableAmount`} value={row.taxableAmount} onChange={(e) => handleInputChange(e, index)} readOnly/>
                                                            </div>
                                                            
                                                        </td>
                                                     


                                                        <td className="product-removal">
                                                        <button type='button' onClick={(e)=>handleDeleteRow(index)} className="btn btn-success">Delete</button>
                                                        </td>
                                                    </tr>
                                                    ))}
                                                </tbody>

                                                <tbody>
                                                    <tr id="newForm" style={{display: "none"}}><td className="d-none" colspan="5"><p>Add New Form</p></td></tr> 
                                                    <tr>
                                                        <td colspan="5">
                                                            <button id="add-item" type='button' onClick={handleAddRow} className="btn btn-soft-secondary fw-medium"><i className="ri-add-fill me-1 align-bottom"></i> Add Item</button>
                                                        </td>
                                                    </tr>
                                                     <tr className="border-top border-top-dashed mt-2">
                                                        <td colspan="3"></td>
                                                        <td colspan="2" className="p-0">
                                                            <table className="table table-borderless table-sm table-nowrap align-middle mb-0">
                                                                <tbody>
                                                                    <tr>
                                                                        <th scope="row">Sub Total</th>
                                                                        <td >
                                                                            <input type="text" className="form-control bg-light border-0" id="cart-subtotal" placeholder="₹0.00" readOnly = "readonly" name="subtotal" value={formik.values.subtotal} style={{width:"100px"}}/>
                                                                        </td>
                                                                    </tr>

                                                                    <tr>
                                                                        <th scope="row">SGST (%)</th>
                                                                        <td>
                                                                        <input type="text" className="form-control bg-light border-0" id="cart-tax" placeholder="₹0.00"name='SGST' value={formik.values.SGST} readOnly  onChange={formik.values.SGST} style={{width:"100px"}}/>
                                                                        </td>
                                                                    </tr>

                                                                    <tr>
                                                                        <th scope="row">CGST (%)</th>
                                                                        <td>
                                                                        <input type="text" className="form-control bg-light border-0" id="cart-discount" placeholder="₹0.00" name='CGST' value={formik.values.CGST} readOnly  onChange={formik.values.CGST} style={{width:"100px"}}/>
                                                                        </td>
                                                                    </tr>
                                                                   
                                                                    <tr className="border-top border-top-dashed">
                                                                        <th scope="row">Total Amount</th>
                                                                        <td>
                                                                        <input type="text" className="form-control bg-light border-0" id="cart-total" placeholder="₹0.00" readOnly = "readonly" name='totalAmount' value={formik.values.totalAmount} style={{width:"100px"}}/>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            {/* end table */}
                                                        </td>

                                                    </tr> 
                                                </tbody>
                                            </table>
                                            {/*end table */}
                                        </div>

                                        <div className="col-lg-8 col-sm-6">
                                                        <label htmlFor="choices-payment-status">Payment Status</label>
                                                        <div className="input-light">
                                                            <select className="form-control bg-light border-0" data-choices data-choices-search-false id="choices-payment-status" name='paymentstatus' value={formik.values.paymentstatus} onChange={paymentStatusHandle}>
                                                                <option>--Select Payment Status--</option>
                                                                <option value="Paid">Paid</option>
                                                                <option value="Unpaid">Unpaid</option>
                                                            </select>
                                                        </div>
                                                        {(formik.touched.paymentstatus && formik.errors.paymentstatus) ? <small style={{color:"red"}}>{formik.errors.paymentstatus}</small> : null}
                                                    </div>
                                        {formik.values.paymentstatus === "Paid" &&
                                        <div className="row mt-3">
                                            <div className="col-lg-4">
                                                <div className="mb-2">
                                                    <label htmlFor="choices-payment-type" className="form-label text-muted text-uppercase fw-semibold">Payment Details</label>
                                                    <div className="input-light">
                                                        <select className="form-control bg-light border-0" data-choices data-choices-search-false data-choices-removeItem id="choices-payment-type" name="paymentmethod" {...formik.getFieldProps("paymentmethod")}>
                                                            <option>--Payment Method--</option>
                                                            <option value="Mastercard">Mastercard</option>
                                                            <option value="Credit Card">Credit Card</option>
                                                            <option value="Visa">Visa</option>
                                                            <option value="Paypal">Paypal</option>
                                                        </select>
                                                    </div>
                                                    {(formik.touched.paymentstatus && formik.values.paymentstatus === "Paid") ? <small style={{color:"red"}}>{formik.errors.paymentmethod}</small> : null}
                                                </div>

                                                <div className="mb-2">
                                                    <input className="form-control bg-light border-0" type="text" id="cardholderName" placeholder="Card Holder Name"  name='holdername' {...formik.getFieldProps("holdername")}/>
                                                </div>
                                                {(formik.touched.paymentstatus && formik.values.paymentstatus === "Paid")  ? <small style={{color:"red"}}>{formik.errors.holdername}</small> : null}

                                                <div className="mb-2">
                                                    <input className="form-control bg-light border-0" type="text" id="cardNumber" placeholder="xxxx xxxx xxxx xxxx" name='cardnumber' value={formik.values.cardnumber} onChange={formatCardNumber}/>
                                                </div>
                                                {(formik.touched.paymentstatus && formik.values.paymentstatus === "Paid")  ? <small style={{color:"red"}}>{formik.errors.cardnumber}</small> : null}

                                                <div>
                                                    <input className="form-control  bg-light border-0" type="text" id="amountTotalPay" placeholder="₹0.00" readOnly = "readonly" name='totalAmount' value={formik.values.totalAmount} />
                                                </div>
                                            </div>
                                            {/*end col */}
                                        </div>
                                        }  
                                        {/*end row*/}
                                        <div className="mt-4">
                                            <label htmlFor="exampleFormControlTextarea1" className="form-label text-muted text-uppercase fw-semibold">NOTES</label>
                                            <textarea className="form-control alert alert-info" id="exampleFormControlTextarea1" placeholder="Notes" rows="2" readOnly>All accounts are to be paid within 7 days from receipt of invoice. To be paid by cheque or credit card or direct payment online. If account is not paid within 7 days the credits details supplied as confirmation of work undertaken will be charged the agreed quoted fee noted above.</textarea>
                                        </div>
                                        <div className="hstack gap-2 justify-content-end d-print-none mt-4">
                                        {/* <button type="submit" className="btn btn-info"><i className="ri-printer-line align-bottom me-1"></i> Save</button> */}
                                            <button type="submit" className="btn btn-info">Generate Quotation</button>
                                            {/* <a href='#a' className="btn btn-primary"><i className="ri-download-2-line align-bottom me-1"></i> Download Invoice</a>
                                            <a href='#a' className="btn btn-danger"><i className="ri-send-plane-fill align-bottom me-1"></i> Send Invoice</a> */}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/*end col*/}
                    </div>
                    {/*end row*/}


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

export default ReuseAddQuotation