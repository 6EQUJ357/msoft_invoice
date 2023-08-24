import React from 'react'
import { Link } from 'react-router-dom'
import "../../App.css"

import API_BASE_URL from "./config.js";


const Sidebar = (params) => {
  return (
    <div  className='slidebarm' >

         {/* LOGO */}
         {params.value3 &&
            <div className="navbar-brand-box">
               {/* Dark Logo*/}
                <Link to="/" className="logo logo-dark">
                    <span className="logo-sm">
                        <img src={`${API_BASE_URL}/companyprofileimg/${params.value3[0]?.company_logo}`} alt="no img" className='c_profile_img'/>
                        <span className='c_profile_name c_profile_sidebar_name' >{params.value3[0]?.company_name}</span>
                    </span>
                    <span className="logo-lg">
                        <img src={`${API_BASE_URL}/companyprofileimg/${params.value3[0]?.company_logo}`} alt="no img" className='c_profile_img' />
                        <span className='c_profile_name c_profile_sidebar_name' >{params.value3[0]?.company_name}</span>
                    </span>
                </Link>
               {/* Light Logo*/}
                <a href="#" className="logo logo-light">
                    <span className="logo-sm">
                        <img src={`${API_BASE_URL}/companyprofileimg/${params.value3[0]?.company_logo}`} alt="no img" className='c_profile_img' />
                        <span className='c_profile_name c_profile_sidebar_name' >{params.value3[0]?.company_name}</span>
                    </span>
                    <span className="logo-lg">
                        <img src={`${API_BASE_URL}/companyprofileimg/${params.value3[0]?.company_logo}`} alt="no img" className='c_profile_img' />
                        <span className='c_profile_name c_profile_sidebar_name' >{params.value3[0]?.company_name}</span>
                    </span>
                </a>
                <button type="button" className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover" id="vertical-hover">
                    <i className="ri-record-circle-line"></i>
                </button>
            </div>
        }
        <div id="scrollbar" >
                <div className="container-fluid scrollBar_Style" >

                    <div id="two-column-menu">
                    </div>

                   
                    <ul className="navbar-nav" id="navbar-nav">
                        <li className="menu-title"><span data-key="t-menu">Menu</span></li>
                        <li className="nav-item">
                            <Link className="nav-link menu-link" to="/dashboard">
                                <i className="las la-house-damage"></i> <span data-key="t-dashboard">Dashboard</span>
                            </Link>
                        </li>


                        <li className="nav-item">
                            
                                <ul className="nav  flex-column">  {/* nav-sm */}
                                    <li className="nav-item">
                                        <Link to="/invoice" className="nav-link" data-key="t-invoice"><i className="las la-file-invoice"></i> All Invoice </Link>
                                    </li>

                                    {params.value1.userType !== "user" && 
                                    <li className="nav-item">
                                        <Link to="/addinvoice" className="nav-link" data-key="t-add-invoice"><i className="las la-receipt"></i> Create Invoice </Link>
                                    </li>
                                    }

                                    <li className="nav-item">
                                        <Link to="/registeruser" className="nav-link" data-key="t-users"><i className="las la-user"></i> Clients</Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link to="/quotation" className="nav-link" data-key="t-add-invoice"><i className="las la-file-signature"></i> Quotation </Link>
                                    </li>


                                    <li className="nav-item">
                                        <a className="nav-link" href="#sidebarPayments" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarPayments"
                                           data-key="t-products"><i className="las la-money-bill-wave"></i> Payments
                                        </a>
                                        <div className="collapse menu-dropdown" id="sidebarPayments">
                                            <ul className="nav flex-column"> {/* nav-sm */}

                                                <li className="nav-item">
                                                    <Link to="/salespayment" className="nav-link" data-key="t-payments"><i className="las la-rupee-sign"></i> Sales Payments</Link>
                                                </li>
                                               
                                               
                                            </ul>
                                        </div>
                                    </li>

                                  

                                    <li className="nav-item">
                                        <a className="nav-link menu-link" href="#sidebarReport" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarReport"
                                            data-key="t-report"> <i className="las la-clipboard-list"></i> Reports
                                        </a>
                                        <div className="collapse menu-dropdown" id="sidebarReport">
                                            <ul className="nav flex-column"> {/*nav-sm  */}

                                                <li className="nav-item">
                                                    <Link to="/salepaymentsummary" className="nav-link" data-key="t-payment-summary"><i className="las la-money-check"></i> Payment Summary (Sales) </Link>
                                                </li>

                                                

                                                <li className="nav-item">
                                                    <Link to="/salereport" className="nav-link" data-key="t-sale-report"><i className="las la-clipboard-check"></i> Sale Report </Link>
                                                </li>

                                                <li className="nav-item">
                                                    <Link to="/clientwisesalereport" className="nav-link" data-key="t-sale-report"><i className="las la-database"></i> Client Wise Sale Report </Link>
                                                </li> 

                                                <li className="nav-item">
                                                    <Link to="/saleperiod" className="nav-link" data-key="t-sale-report"><i className="las la-clipboard-list"></i> Sale Period </Link>
                                                </li>

                                               
                                                <li className="nav-item">
                                                    <Link to="/expansesreport" className="nav-link" data-key="t-expenses-report"><i className="las la-money-bill-wave"></i> Expenses Report </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>

                                    

                                    {params.value1.userType !== "user" && 
                                    <>

                                    <li className="nav-item">
                                        <Link to="/categories" className="nav-link" data-key="t-users"><i className="las la-stream"></i> Categories</Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link to="/users" className="nav-link" data-key="t-users"><i className="las la-user-friends"></i> Users</Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link to="/companyprofiledata" className="nav-link" data-key="t-users"><i className="las la-address-card"></i> Company Profile</Link>
                                    </li>

                                    </>

                                    }
                                    
                                </ul>
                            {/* </div> */}
                        </li>


                    </ul>
                   
                    
                </div>
               {/* Sidebar */}
            </div>

            <div className="sidebar-background"></div>

    </div>
  )
}

export default Sidebar