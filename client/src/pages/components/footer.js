import React from 'react'

const Footer = (params) => {
  return (
    <footer className="footer">
    <div className="container-fluid">
        <div className="row">

            {params.value3 &&
            <div className="col-6 col-sm-6 col-lg-6">
                <script>document.write(new Date().getFullYear())</script> © {params.value3[0]?.company_name}.
            </div>
            }

            <div className="col-6 col-sm-6 col-lg-6">
                <div className="text-sm-end  d-sm-block">
                <script>document.write(new Date().getFullYear())</script>Design & Developed By <i className="mdi mdi-heart text-danger"></i>
                <a href='https://msoftwebtechnologies.com/' style={{color:"red", fontWeight:"bold"}} target='_blank'>Msoft</a>.  
                </div>
            </div>
        </div>
    </div>
</footer>
  )
}

export default Footer