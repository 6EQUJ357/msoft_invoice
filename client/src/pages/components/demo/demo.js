import React, { useState, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Webcam from 'react-webcam';
import axios from 'axios';

import API_BASE_URL from "../config.js";


const Demo = () => {
  const webcamRef =useRef(null);

  const [capturedImage, Setcapturedimage]= useState(null);
  const [cameraOn, setCameraOn] = useState(true);

  const retakePhoto = () => {
    Setcapturedimage(null); 
         setCameraOn(true);
       };
    

  const validationSchema = Yup.object().shape({
    photo: Yup.mixed().required('Please capture a photo'),
  });

  const formik = useFormik({
    initialValues: {
      photo: null,
    },
    validationSchema,
    onSubmit: async (values) => {

      const formData = new FormData();
      formData.append('photo', values.photo);

     axios.post(`${API_BASE_URL}/captureImg`, formData).then(res=>alert(res.data.message)).catch(err=>console.log(err))

    }
  });

  const capturePhoto = () => {
    const photoSrc = webcamRef.current.getScreenshot();
    formik.setFieldValue('photo', dataURLtoFile(photoSrc, 'photo.jpg'));
    Setcapturedimage(photoSrc);
    setCameraOn(false);
  };

  // Helper function to convert data URL to a File object
  const dataURLtoFile = (dataURL, fileName) => {  
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  };

  return (
    <div className='container'>
        <form onSubmit={formik.handleSubmit}>
            {cameraOn ? 
        <div>
        <Webcam audio={false} ref={webcamRef} imageSmoothing = {true} screenshotFormat="image/jpeg"  style={{border:"2px solid black", borderRadius:"10px", width:"30rem"}}/>
            {formik.touched.photo && formik.errors.photo && (
            <div>{formik.errors.photo}</div>
            )}

            <br />
            <button type="button" onClick={capturePhoto} className='btn btn-primary'>
            Capture Photo
            </button>
        </div>
        :

        <div className='container mt-5'>
                <h1>Preview Image</h1>
                <img src={capturedImage ? capturedImage: "/assets/images/users/user-dummy-img.jpg"} alt="Captured"  style={{border:"2px solid black", borderRadius:"10px", width:"30rem"}}/>
                <br /> <br />

                  <button onClick={retakePhoto} className='btn btn-danger'>Retake Photo</button> 
                 <br /><br />

            <button type="submit" className='btn btn-info'>Upload Photo</button>
        </div>
}
        </form>
    </div>
  );
};

export default Demo;

