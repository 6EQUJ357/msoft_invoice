let mongoose = require("mongoose");

let addUserDetailsModel = mongoose.Schema({
    userimg : {
        type : String,
        require : true
    },
    username : {
        type : String,
        require : true
    }, 
    useremail : {
        type : String,
        require : true,
        unique : true
    }, 
    userpassword : {
        type : String,
        require : true
    }, 
    date : {
        type : Date,
        default : Date.now
    }

})

module.exports = mongoose.model("addUserDetailsModel", addUserDetailsModel)