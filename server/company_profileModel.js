let mongoose = require("mongoose");

let company_profileModel = mongoose.Schema({
    company_name : {
        type : String,
        require : true
    },
    GST_No : {
        type : String,
        require : true
    },
    mobile_No : {
        type : String,
        require : true
    }, 
    email : {
        type : String,
        require : true,
        unique : true
    },   
    address : {
        type : String,
        require : true
    },
    company_logo : {
        type : String,
        require : true
    },
    date : {
        type : Date,
        default : Date.now
    }

})

module.exports = mongoose.model("company_profileModel", company_profileModel)