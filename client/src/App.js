import React, {useState, createContext, useEffect} from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import API_BASE_URL from './pages/components/config'
import axios from 'axios'

//pages import
import Company_profile from './pages/components/company_profile'

import Signin from './pages/components/signin'
import Signup from './pages/components/signup'
import Dashboard from './pages/components/dashboard'

import Invoice from './pages/components/invioce'
import AddInvoice from './pages/components/addInvoice'
import Inviocedetails from './pages/components/inviocedetails'

import RegisterUser from './pages/components/registeruser'
import Editsregisteruser from './pages/components/editsregisteruser'
import Viewregisteruser from './pages/components/viewregisteruser'

import Quotation from './pages/components/quotation'
import AddQuotation from './pages/components/addQuotation'
import Quotationdetails from './pages/components/quotationDetails'


import SalePaymentSummary from './pages/components/salePaymentSummary'

import Salereport from './pages/components/salereport'
import ClientWiseSaleReport from './pages/components/clientwiseSaleReport'
import SalePeriod from './pages/components/salePeriod'


import ExpansesReport from './pages/components/expensesreport'

// import TranscationList from './pages/components/transactionlist'
// import NewTranscation from './pages/components/newtranscation'
import PasswordReset from './pages/components/passwordReset'

import SalesPayments from './pages/components/salesPayments'
import SalesPaymentDetails from './pages/components/salesPaymentDetails'


// import Taxes from './pages/components/taxes'

//categories
import Categories from './pages/components/categories'

import Users from './pages/components/users'
import ViewUser from './pages/components/viewUser'
import EditUser from './pages/components/editUser'



import CompanyProfileData from './pages/components/company_profile_data'
import Viewcompanyprofile from './pages/components/viewCompanyProfile'
import EditCompanyProfileData from './pages/components/editCompanyProfileData'

//demo
import Demo from "./pages/components/demo/demo"
import Demo2 from './pages/reusecomponents/reusepurchaseform'


export const store = createContext();
export const company_profile_store = createContext();

const App = () => {
  //const [token, setToken] = useState(null);

  //company profile logo & name
  const [company_profile_dataa, set_company_profile_dataa] = useState(null);

   //getting company profilre data

   useEffect(()=>{
    axios.get(`${API_BASE_URL}/getcompanyprofile`).then(res=> 
        {
            set_company_profile_dataa(res.data);
            //console.log("qwertysdfgh", res.data)
            
        })
},[])

  return (
    <div>
      {/* <store.Provider value={[token,setToken]}> */}

        <company_profile_store.Provider value={[company_profile_dataa, set_company_profile_dataa]}>

          <BrowserRouter>

            <Routes>

              {/* login page */}
              <Route path='/companyprofile'  element={<Company_profile />}/>
              <Route path='/' element = {<Signin/>} />
              {/* <Route path='/signup' element = {<Signup/>} /> */}
              <Route path='/dashboard' element = {<Dashboard/>} />

              <Route path='/invoice' element = {<Invoice/>} />
              <Route path='/addinvoice' element = {<AddInvoice/>} />
              <Route path='/invoicedetails' element = {<Inviocedetails />}/>

              <Route path='/registeruser' element = {<RegisterUser />}/>
              <Route path='/editregisteruser' element = {<Editsregisteruser />}/>
              <Route path='/viewregisteruser' element = {<Viewregisteruser />}/>

              <Route path='/quotation' element = {<Quotation />}/>
              <Route path='/addquotation' element = {<AddQuotation />}/>
              <Route path='/quotationdetails' element = {<Quotationdetails />}/>  

              <Route path='/salepaymentsummary' element = {<SalePaymentSummary/>} />

              <Route path='/salereport' element = {<Salereport/>} />
              <Route path='/clientwisesalereport' element = {<ClientWiseSaleReport/>} />
              <Route path='/saleperiod' element = {<SalePeriod/>} />
              
             
              <Route path='/expansesreport' element = {<ExpansesReport/>} />

              {/* <Route path='/transcationlist' element = {<TranscationList/>} />
              <Route path='/newtranscation' element = {<NewTranscation/>} /> */}

              <Route path='/resetpassword' element = {<PasswordReset />} />

              <Route path='/salespayment' element = {<SalesPayments />} />
              <Route path='/salespaymentdetails' element = {<SalesPaymentDetails />} />


              {/* <Route path='/taxes' element = {<Taxes />} /> */}

              <Route path='/categories' element = {<Categories />}/>

              <Route path='/users' element = {<Users />} />
              <Route path='/viewuser' element = {<ViewUser />} />
              <Route path='/edituser' element = {<EditUser />} />


 


              <Route path='/companyprofiledata' element = {<CompanyProfileData />}/>
              <Route path='/viewcompanyprofiledata' element ={<Viewcompanyprofile />}/> 
              <Route path='/editcompanyprofiledata' element ={<EditCompanyProfileData />}/>

            

              {/* demo router */}
              <Route path='/demo' element = {<Demo />} />
              <Route path='/demo2' element = {<Demo2 />} /> 

            </Routes>
          </BrowserRouter>

        {/* </store.Provider> */}
      </company_profile_store.Provider>

      {/* </store.Provider> */}
    </div>
  )
}

export default App