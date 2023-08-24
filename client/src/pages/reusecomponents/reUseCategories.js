import React, { useEffect, useState } from 'react'
import Sidebar from '../components/sidebar'
import Reusenavbar from './reusenavbar'
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/footer'


import API_BASE_URL from "../components/config";


const ReuseCategories = (params) => {

    const [search, setSearch] = useState("");

    const [Category, setCategory] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15; // Number of items to display per page


    const formik = useFormik({
        initialValues : {
            producttype : ""      
        },
        validationSchema : Yup.object({
            producttype : Yup.string().required("Enter Product Type")
        }),
        onSubmit : async(values, {resetForm})=>{
            //console.log("values", values)


            await axios.post(`${API_BASE_URL}/category`, values).then(res=>alert(res.data.message)).catch(err => console.log(err));

            resetForm({values : ""});
        } 
    })


    //second formik for category update

    
    //update category

    const [modalData, setModalData] = useState("");

    const handleClickUpdateCategory = (data) => {

        // Update modal data state
        setModalData(data);
    };



    const formik1 = useFormik({
        initialValues : {
            editproducttype : ""      
        },
        validationSchema : Yup.object({
            editproducttype : Yup.string().required("Enter Product Type")
        }),
        onSubmit : async(values, {resetForm})=>{
            //console.log("values", values)

            let filter = Category.filter((res)=>res.producttype === modalData);
            let id = filter.map(list=> list._id)
            //console.log("first", filter.map(list=>list._id))

            await axios.put(`${API_BASE_URL}/editcategory/${id}`, values).then(res=>alert(res.data.message)).catch(err => console.log(err));

            resetForm({values : ""});
        } 
    })


    //get category details
    useEffect(()=>{
        axios.get(`${API_BASE_URL}/getcategory`).then(res=>setCategory(res.data)).catch(err => console.log(err))
    },[])

     //pegination
     const handlePrevClick = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
      };
    
      const handleNextClick = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
      };
    
      const totalPages = Math.ceil(Category.length / itemsPerPage);

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
      const currentData = Category.slice(startIndex, endIndex);

      //pegination ends


    //delete category  details

    const deletecategoryhandle = (res)=>{
        let response = window.confirm(` Want to Delete This product type #${res.producttype}`);

        if(response){
        axios.delete(`${API_BASE_URL}/deletecategory/${res._id}`).then(res=>setCategory(res.data)).catch(err => console.log(err))
        }
    }

    //update category

    let navigate = useNavigate();

    const EditCategory = (data)=>{
        navigate("/editcategory", {state : data})
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
                                <h4 className="mb-sm-0">Categoty</h4>

                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="#a">Categoty</a></li>
                                        <li className="breadcrumb-item active">Categoty Details</li>
                                    </ol>
                                </div>

                            </div>
                        </div>
                    </div>
                   {/* end page title */}

                    <div className="row pb-4 gy-3">
                        <div className="col-sm-4">
                            <button className="btn btn-primary addPayment-modal" data-bs-toggle="modal" data-bs-target="#addpaymentModal"><i className="las la-plus me-1"></i> Add Category</button>
                        </div>

                        <div className="col-sm-auto ms-auto">
                           <div className="d-flex gap-3">
                            <div className="search-box">
                                <input type="text" className="form-control" id="searchMemberList" placeholder="Search for Category" name='search' onChange={(e)=>setSearch(e.target.value)}/>
                                <i className="las la-search search-icon"></i>
                            </div>
                            {/* <div className="">
                                <button type="button" id="dropdownMenuLink1" data-bs-toggle="dropdown" aria-expanded="false" className="btn btn-soft-info btn-icon fs-14"><i className="las la-ellipsis-v fs-18"></i></button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink1">
                                    <li><a className="dropdown-item" href="#a">All</a></li>
                                    <li><a className="dropdown-item" href="#a">Last Week</a></li>
                                    <li><a className="dropdown-item" href="#a">Last Month</a></li>
                                    <li><a className="dropdown-item" href="#a">Last Year</a></li>
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
                                                    <th scope="col">Category</th>
                                                    <th scope='col'>Date</th>
                                                    <th scope="col" style={{width: "12%"}}>Action</th> 
                                                </tr>
                                            </thead>
        
                                            <tbody>
                                                {currentData.length > 0 ? currentData.filter(list=>list.producttype.toLowerCase().startsWith(search.toLocaleLowerCase())).map(res=>
                                                <tr key={res._id}>
                                                   
                                                    <td>{res.producttype}</td> 

                                                    <td>{new Date(res.Date).toDateString()}</td>   {/* .toDateString(), .toLocaleDateString(),  .toLocaleString()*/}
                                                    {/* <td><span className="badge badge-soft-success p-2">{res.userstatus}</span></td> */}

                                                    <td>
                                                        <ul className="list-inline hstack gap-2 mb-0">
                                                            {/* <li className="list-inline-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="View">
                                                                <button type='button' onClick={()=>viewUser(res)} className="btn btn-soft-info btn-sm d-inline-block">
                                                                    <i className="las la-eye fs-17 align-middle"></i>
                                                                </button>
                                                            </li> */}
                                                            <li className="list-inline-item edit" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Edit">
                                                                <button type='button' className="btn btn-soft-info btn-sm d-inline-block" data-bs-toggle="modal" data-bs-target="#addcategoryModal" onClick={()=>handleClickUpdateCategory(res.producttype)}>
                                                                    <i className="las la-pen fs-17 align-middle"></i>
                                                                </button> 
                                                                {/* <button className="btn btn-primary addPayment-modal" data-bs-toggle="modal" data-bs-target="#addpaymentModal"><i className="las la-plus me-1"></i> Add Category</button>  onClick={()=>EditCategory(res)}  */  }
                                                            </li>
                                                            <li className="list-inline-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Remove">
                                                                <button type='button' onClick={()=>deletecategoryhandle(res)} className="btn btn-soft-danger btn-sm d-inline-block">
                                                                    <i className="las la-file-download fs-17 align-middle"></i>
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                                )
                                                :
                                                <tr>
                                                    <h1>No Category Data Found...</h1>
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
                            <p className="mb-0 text-muted">Showing <b>1</b> to <b>15</b> of <b>{Category.length}</b> results</p>
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

   {/* Modal */}
    <div className="modal fade" id="addpaymentModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0">
                <div className="modal-header p-4 pb-0">
                    <h5 className="modal-title" id="createMemberLabel">Add Category</h5>
                    <button type="button" className="btn-close" id="createMemberBtn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body p-4">

                    <form autocomplete="on" id="memberlist-form" className="needs-validation" onSubmit={formik.handleSubmit} enctype="multipart/form-data">
                        <div className="row">
                            <div className="col-lg-12">
                                

                                <div className="mb-3 mt-4">
                                    <label htmlFor="producttype" className="form-label">Category</label>
                                    <input type="text" className="form-control" id="producttype" placeholder="Enter Product Type" name='producttype' value={formik.values.producttype} onChange={formik.handleChange} />
                                    <div className="invalid-feedback">Please Enter a Product Category.</div>
                                </div>
                                {(formik.touched.producttype && formik.errors.producttype) ? <small style={{color:"red"}}>{formik.errors.producttype}</small> : null}


                                <div className="hstack gap-2 justify-content-end">
                                    <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-success" id="addNewMember">Add Category</button>
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


    {/* model2 */}

    <div className="modal fade" id="addcategoryModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0">
                <div className="modal-header p-4 pb-0">
                    <h5 className="modal-title" id="createMemberLabel">Edit Category</h5>
                    <button type="button" className="btn-close" id="createMemberBtn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body p-4">

                    <form autocomplete="on" id="memberlist-form1" className="needs-validation" onSubmit={formik1.handleSubmit} >
                        <div className="row">
                            <div className="col-lg-12">
                                

                                <div className="mb-3 mt-4">
                                    <label htmlFor="producttype" className="form-label">Category</label>
                                    <input type="text" className="form-control"  value={modalData} readOnly />
                                    <div className="invalid-feedback">Please Enter a Product Category.</div>
                                </div>

                                <div className="mb-3 mt-4">
                                    <input type="text" className="form-control" id="editproducttype" placeholder="Enter New Category" name='editproducttype' value={formik1.values.editproducttype} onChange={formik1.handleChange} />
                                    <div className="invalid-feedback">Please Enter a Product Category.</div>
                                </div>
                                {(formik1.touched.editproducttype && formik1.errors.editproducttype) ? <small style={{color:"red"}}>{formik1.errors.editproducttype}</small> : null} 


                                <div className="hstack gap-2 justify-content-end">
                                    <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-success" id="addNewMember">Edit Category</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
           {/*end modal-content*/}
        </div>
       {/*end modal-dialog*/}
    </div>

    


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

export default ReuseCategories