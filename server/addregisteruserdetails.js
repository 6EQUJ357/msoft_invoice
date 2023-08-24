let mongoose = require("mongoose");

let addRegisterUserDetailsModel = mongoose.Schema({
    registerusergstno : {
        type : String,
        require : true
    },
    registerusername : {
        type : String,
        require : true
    }, 
    registeruseremail : {
        type : String,
        require : true,
        unique : true
    }, 
    registerusernumber : {
        type : String,
        require : true
    },  
    registeruseraddress : {
        type : String,
        require : true
    },
    date : {
        type : Date,
        default : Date.now
    }

})

module.exports = mongoose.model("addRegisterUserDetailsModel", addRegisterUserDetailsModel)