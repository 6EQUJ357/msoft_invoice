import React, {useEffect, useState} from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from "axios"


import API_BASE_URL from "../components/config";



const Demo2 = (params) => {

    const [captureimg, setCaptureImg] = useState(null);

useEffect(()=> {
    axios.get(`${API_BASE_URL}/getCaptureImg`).then(res=> setCaptureImg(res.data)).catch(err=>console.log(err));
}, [])


  return (
    <div  className='container'>

    <div>
        <h1>Captured images</h1>
        {captureimg ? captureimg.map(list=>
        <img key={list._id} src={list.photo} alt='not displayed' style={{border:"2px solid black", borderRadius:"10px", width:"30rem"}}/>
        )
     :
     <div className="spinner-border" role="status">
     <span className="visually-hidden">Loading...</span>
   </div>
     }
    </div>

    </div>
  )
}

export default Demo2