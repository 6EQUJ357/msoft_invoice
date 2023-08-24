import React from 'react'
import { Link } from 'react-router-dom'

const Notauthorised = () => {
  return (
        <div style={{display:"flex", justifyContent:"center", alignItems:"center",textAlign:"center", height:"100vh"}}>
           <div className="card" style={{width: "30rem",  padding:"100px"}}>
            <div className="card-body">
                <p className="card-text">Not Authorised For This User...</p>
                <Link to="/dashboard" className="btn btn-primary">Goto Dashboard</Link>
            </div>
        </div>
        </div>
       

  )
}

export default Notauthorised