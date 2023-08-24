import React from 'react'
import {useNavigate} from "react-router-dom"
import API_BASE_URL from '../components/config'


const Reusenavbar = (params) => {
    const navigate = useNavigate();

    //view  user

    const viewUser = (data)=>{
      navigate("/viewuser", {state : data})
  }

 
  
 
  return (  
    <div>
        <header id="page-topbar">
            <div className="layout-width">
                <div className="navbar-header">
                    <div className="d-flex">

                        {/* administration */}
                        {/* <div className="page-title-box d-sm-flex align-items-center justify-content-between mt-2">
                            <h4 className="mb-sm-0"><span style={{color:"dodgerblue"}}>{params.value1.userType}</span></h4>
                                    
                        </div> */}

                    {/* LOGO */}
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between mt-2">
                        <h3 className="mb-sm-0"><span style={{color:"dodgerblue", textTransform:"uppercase", fontWeight:"bolder"}}>{params.value1.userType}</span></h3>
                                
                    </div>
                    {/* {params.value3 &&
                        <div className="navbar-brand-box horizontal-logo">
                           
                            <a href="#" className="logo logo-dark">
                                <span className="logo-sm">
                                    <img src={params.value3?.[0].company_logo} alt="img not Support..." height="30" />
                                    <span style={{fontWeight : "bolder", fontSize:"1.5rem", color:"black", textTransform : "capitalize"}} >{params.value3?.[0].company_name}</span>
                                </span>
                                <span className="logo-lg">
                                    <img src={params.value3?.[0].company_logo} alt="img not Support..." height="30" />
                                    <span style={{fontWeight : "bolder", fontSize:"1.5rem", color:"black" , textTransform : "capitalize"}} >{params.value3?.[0].company_name}</span>
                                </span>
                            </a>

                            <a href="#" className="logo logo-light">
                                <span className="logo-sm">
                                    <img src={params.value3?.[0].company_logo} alt="img not Support..." height="22" />
                                    <span style={{fontWeight : "bolder", fontSize:"2rem", color:"black" , textTransform : "capitalize"}} >{params.value3?.[0].company_name}</span>
                                </span>
                                <span className="logo-lg">
                                    <img src={params.value3?.[0].company_logo} alt="img not Support..." height="21" />
                                    <span style={{fontWeight : "bolder", fontSize:"2rem", color:"black", textTransform : "capitalize"}} >{params.value3?.[0].company_name}</span>
                                </span>
                            </a>
                        </div>
                        } */}

                        {/* <button type="button" className="btn btn-sm px-3 fs-16 ">
                            <span className="hamburger-icon">
                                <span></span>
                                <span></span>
                                <span></span>
                            </span>
                        </button> */}

                        

                    {/* App Search*/}
                        {/* <form className="app-search d-none d-md-block me-2">
                            <div className="position-relative">
                                <input type="text" className="form-control" placeholder="Search..." autocomplete="off" id="search-options" value="" />
                                <span className="las la-search search-widget-icon"></span>
                                <span className="mdi mdi-close-circle search-widget-icon search-widget-icon-close d-none" id="search-close-options"></span>
                            </div>
                            <div className="dropdown-menu dropdown-menu-lg" id="search-dropdown">
                                <div data-simplebar style={{maxHeight: "320px"}}>
                                {/* item
                                    <div className="dropdown-header">
                                        <h6 className="text-overflow text-muted mb-0 text-uppercase">Recent Searches</h6>
                                    </div>

                                    <div className="dropdown-item bg-transparent text-wrap">
                                        <a href="#" className="btn btn-soft-secondary btn-sm btn-rounded">how to setup <i className="mdi mdi-magnify ms-1"></i></a>
                                        <a href="#" className="btn btn-soft-secondary btn-sm btn-rounded">buttons <i className="mdi mdi-magnify ms-1"></i></a>
                                    </div>
                                {/* item
                                    <div className="dropdown-header mt-2">
                                        <h6 className="text-overflow text-muted mb-1 text-uppercase">Pages</h6>
                                    </div>

                                {/* item
                                    <a href ="#a" className="dropdown-item notify-item">
                                        <i className="ri-bubble-chart-line align-middle fs-18 text-muted me-2"></i>
                                        <span>Analytics Dashboard</span>
                                    </a>
 
                                {/* item
                                    <a href ="#a" className="dropdown-item notify-item">
                                        <i className="ri-lifebuoy-line align-middle fs-18 text-muted me-2"></i>
                                        <span>Help Center</span>
                                    </a>

                                {/* item
                                    <a href ="#a" className="dropdown-item notify-item">
                                        <i className="ri-user-settings-line align-middle fs-18 text-muted me-2"></i>
                                        <span>My account settings</span>
                                    </a>

                                {/* item
                                    <div className="dropdown-header mt-2">
                                        <h6 className="text-overflow text-muted mb-2 text-uppercase">Members</h6>
                                    </div>

                                    <div className="notification-list">
                                    {/* item 
                                        <a href ="#a" className="dropdown-item notify-item py-2">
                                            <div className="d-flex">
                                                <img src="assets/images/users/avatar-2.jpg" className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                                <div className="flex-1">
                                                    <h6 className="m-0">Angela Bernier</h6>
                                                    <span className="fs-11 mb-0 text-muted">Manager</span>
                                                </div>
                                            </div>
                                        </a>
                                    {/* item 
                                        <a href ="#a" className="dropdown-item notify-item py-2">
                                            <div className="d-flex">
                                                <img src="assets/images/users/avatar-3.jpg" className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                                <div className="flex-1">
                                                    <h6 className="m-0">David Grasso</h6>
                                                    <span className="fs-11 mb-0 text-muted">Web Designer</span>
                                                </div>
                                            </div>
                                        </a>
                                    {/* item 
                                        <a href ="#a" className="dropdown-item notify-item py-2">
                                            <div className="d-flex">
                                                <img src="assets/images/users/avatar-5.jpg" className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                                <div className="flex-1">
                                                    <h6 className="m-0">Mike Bunch</h6>
                                                    <span className="fs-11 mb-0 text-muted">React Developer</span>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>

                                <div className="text-center pt-3 pb-1">
                                    <a href="#" className="btn btn-primary btn-sm">View All Results <i className="ri-arrow-right-line ms-1"></i></a>
                                </div>
                            </div>
                        </form> */}

                    </div>

                    <div className="d-flex align-items-center">

                        

                        {/* <div className="dropdown d-md-none topbar-head-dropdown header-item">
                            <button type="button" className="btn btn-icon btn-topbar btn-ghost-primary rounded-circle" id="page-header-search-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="bx bx-search fs-22"></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" aria-labelledby="page-header-search-dropdown">
                                <form className="p-3">
                                    <div className="form-group m-0">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Search ..." aria-label="Recipient's username" />
                                            <button className="btn btn-primary" type="submit"><i className="mdi mdi-magnify"></i></button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div> */}

                        {/* <div className="dropdown ms-1 topbar-head-dropdown header-item">
                            <button type="button" className="btn btn-icon btn-topbar btn-ghost-primary rounded-circle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img id="header-lang-img" src="assets/images/flags/us.svg" alt="Header Language" height="20" className="rounded" />
                            </button>
                            <div className="dropdown-menu dropdown-menu-end">

                                item
                                <a href ="#a" className="dropdown-item notify-item language py-2" data-lang="en" title="English">
                                    <img src="assets/images/flags/us.svg" alt="userImage" className="me-2 rounded" height="18" />
                                    <span className="align-middle">English</span>
                                </a>

                                item
                                <a href ="#a" className="dropdown-item notify-item language" data-lang="sp" title="Spanish">
                                    <img src="assets/images/flags/spain.svg" alt="userImage" className="me-2 rounded" height="18" />
                                    <span className="align-middle">Española</span>
                                </a>

                            {/* item
                                <a href ="#a" className="dropdown-item notify-item language" data-lang="gr" title="German">
                                    <img src="assets/images/flags/germany.svg" alt="userImage" className="me-2 rounded" height="18" /> <span className="align-middle">Deutsche</span>
                                </a>

                            {/* item
                                <a href ="#a" className="dropdown-item notify-item language" data-lang="it" title="Italian">
                                    <img src="assets/images/flags/italy.svg" alt="userImage" className="me-2 rounded" height="18" />
                                    <span className="align-middle">Italiana</span>
                                </a>

                            {/* item
                                <a href ="#a" className="dropdown-item notify-item language" data-lang="ru" title="Russian">
                                    <img src="assets/images/flags/russia.svg" alt="userImage" className="me-2 rounded" height="18" />
                                    <span className="align-middle">русский</span>
                                </a>

                            {/* item
                                <a href ="#a" className="dropdown-item notify-item language" data-lang="ch" title="Chinese">
                                    <img src="assets/images/flags/china.svg" alt="userImage" className="me-2 rounded" height="18" />
                                    <span className="align-middle">中国人</span>
                                </a>

                            {/* item
                                <a href ="#a" className="dropdown-item notify-item language" data-lang="fr" title="French">
                                    <img src="assets/images/flags/french.svg" alt="userImage" className="me-2 rounded" height="18" />
                                    <span className="align-middle">français</span>
                                </a>

                            {/* item
                                <a href ="#a" className="dropdown-item notify-item language" data-lang="ar" title="Arabic">
                                    <img src="assets/images/flags/ae.svg" alt="userImage" className="me-2 rounded" height="18" />
                                    <span className="align-middle">Arabic</span>
                                </a>
                            </div>
                        </div> */}

                        {/* <div className="ms-1 header-item d-none d-sm-flex">
                            <button type="button" className="btn btn-icon btn-topbar btn-ghost-primary rounded-circle" data-toggle="fullscreen">
                                <i className='las la-expand fs-24'></i>
                            </button>
                        </div> */}
        {/* 
                        <div className="ms-1 header-item d-none d-sm-flex">
                            <button type="button" className="btn btn-icon btn-topbar btn-ghost-primary rounded-circle light-dark-mode">
                                <i className='las la-moon fs-24'></i>
                            </button>
                        </div> */}

                        {/* <div className="dropdown topbar-head-dropdown ms-1 header-item" id="notificationDropdown">
                            <button type="button" className="btn btn-icon btn-topbar btn-ghost-primary rounded-circle" id="page-header-notifications-dropdown" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-haspopup="true" aria-expanded="false">
                                <i className='las la-bell fs-24'></i>
                                <span className="position-absolute topbar-badge fs-9 translate-middle badge rounded-pill bg-danger">3<span className="visually-hidden">unread messages</span></span>
                            </button>
                            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" aria-labelledby="page-header-notifications-dropdown">

                                <div className="dropdown-head rounded-top">
                                    <div className="p-3 bg-primary bg-pattern">
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <h6 className="m-0 fs-16 fw-semibold text-white"> Notifications </h6>
                                            </div>
                                            <div className="col-auto dropdown-tabs">
                                                <span className="badge badge-soft-light fs-13"> 4 New</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-2">
                                        <div data-simplebar style={{maxHeight: "300px"}} className="pe-2">
                                            <div className="text-reset notification-item d-block dropdown-item position-relative">
                                                <div className="d-flex">
                                                    <div className="avatar-xs me-3">
                                                        <span className="avatar-title bg-soft-info text-info rounded-circle fs-16">
                                                            <i className="bx bx-badge-check"></i>
                                                        </span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <a href="#!" className="stretched-link">
                                                            <h6 className="mt-0 fs-14 mb-2 lh-base">Your <b>Elite</b> author Graphic
                                                                Optimization <span className="text-secondary">reward</span> is
                                                                ready!
                                                            </h6>
                                                        </a>
                                                        <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                            <span><i className="mdi mdi-clock-outline"></i> Just 30 sec ago</span>
                                                        </p>
                                                    </div>
                                                    <div className="px-2 fs-15">
                                                        <div className="form-check notification-check">
                                                            <input className="form-check-input" type="checkbox" value="" id="all-notification-check01" />
                                                            <label className="form-check-label" for="all-notification-check01"></label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="text-reset notification-item d-block dropdown-item position-relative">
                                                <div className="d-flex">
                                                    <img src="assets/images/users/avatar-2.jpg" className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                                    <div className="flex-1">
                                                        <a href="#!" className="stretched-link">
                                                            <h6 className="mt-0 mb-1 fs-14 fw-semibold">Angela Bernier</h6>
                                                        </a>
                                                        <div className="fs-13 text-muted">
                                                            <p className="mb-1">Answered to your comment on the cash flow forecast's
                                                                graph 🔔.</p>
                                                        </div>
                                                        <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                            <span><i className="mdi mdi-clock-outline"></i> 48 min ago</span>
                                                        </p>
                                                    </div>
                                                    <div className="px-2 fs-15">
                                                        <div className="form-check notification-check">
                                                            <input className="form-check-input" type="checkbox" value="" id="all-notification-check02" />
                                                            <label className="form-check-label" for="all-notification-check02"></label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="text-reset notification-item d-block dropdown-item position-relative">
                                                <div className="d-flex">
                                                    <div className="avatar-xs me-3">
                                                        <span className="avatar-title bg-soft-danger text-danger rounded-circle fs-16">
                                                            <i className='bx bx-message-square-dots'></i>
                                                        </span> 
                                                    </div>
                                                    <div className="flex-1">
                                                        <a href="#!" className="stretched-link">
                                                            <h6 className="mt-0 mb-2 fs-13 lh-base">You have received <b className="text-success">20</b> new messages in the conversation
                                                            </h6>
                                                        </a>
                                                        <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                            <span><i className="mdi mdi-clock-outline"></i> 2 hrs ago</span>
                                                        </p>
                                                    </div>
                                                    <div className="px-2 fs-15">
                                                        <div className="form-check notification-check">
                                                            <input className="form-check-input" type="checkbox" value="" id="all-notification-check03" />
                                                            <label className="form-check-label" for="all-notification-check03"></label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="text-reset notification-item d-block dropdown-item position-relative">
                                                <div className="d-flex">
                                                    <img src="assets/images/users/avatar-8.jpg" className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                                    <div className="flex-1">
                                                        <a href="#!" className="stretched-link">
                                                            <h6 className="mt-0 mb-1 fs-14 fw-semibold">Maureen Gibson</h6>
                                                        </a>
                                                        <div className="fs-13 text-muted">
                                                            <p className="mb-1">We talked about a project on linkedin.</p>
                                                        </div>
                                                        <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                            <span><i className="mdi mdi-clock-outline"></i> 4 hrs ago</span>
                                                        </p>
                                                    </div>
                                                    <div className="px-2 fs-15">
                                                        <div className="form-check notification-check">
                                                            <input className="form-check-input" type="checkbox" value="" id="all-notification-check04" />
                                                            <label className="form-check-label" for="all-notification-check04"></label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="my-3 text-center view-all">
                                                <button type="button" className="btn btn-soft-success btn-sm waves-effect waves-light">View
                                                    All Notifications <i className="ri-arrow-right-line align-middle"></i></button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div> */}

                        {/* <div className="page-title-box d-sm-flex align-items-center justify-content-between mt-2">
                            <h4 className="mb-sm-0"><span style={{color:"dodgerblue"}}>{params.value1.userType}</span></h4>
                                    
                        </div> */}

                        <div className="dropdown header-item">
                            <button type="button" className="btn" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="d-flex align-items-center">
                                    <img className="rounded-circle header-profile-user" src={`${API_BASE_URL}/UserImages/${params.value1.userimg}`} alt="Header Avatar" />
                                    <span className="text-start ms-xl-2">{params.value1.username}
                                        <span className="d-none d-xl-inline-block fw-medium user-name-text fs-16"><i className="las la-angle-down fs-12 ms-1"></i></span>
                                    </span>
                                </span> 
                            </button>
                            <div className="dropdown-menu dropdown-menu-end">
                            {/* item*/}
                                <button onClick={()=>viewUser(params.value1)} className="dropdown-item" ><i className="bx bx-user fs-15 align-middle me-1"></i> <span key="t-profile">Profile</span></button>
                                 {/* <Link className="dropdown-item" to="/resetpassword"><i className="bx bx-wrench fs-15 align-middle me-1"></i> <span key="t-my-wallet">Reset Password</span></Link> */}
                               {/* <a className="dropdown-item d-block" href='#a'><span className="badge bg-success float-end">11</span><i className="bx bx-wallet fs-15 align-middle me-1"></i> <span key="t-settings">Settings</span></a>
                                <a className="dropdown-item" href="auth-lockscreen.html"><i className="bx bx-lock-open fs-15 align-middle me-1"></i> <span key="t-lock-screen">Lock screen</span></a> */}
                                <div className="dropdown-divider"></div>
                                <button className="dropdown-item text-danger" onClick={params.value2}><i className="bx bx-power-off fs-15 align-middle me-1 text-danger"></i> <span key="t-logout">Logout</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>


    </div>
  )
}

export default Reusenavbar