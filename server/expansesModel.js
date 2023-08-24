let mongoose = require("mongoose");

let expansesModel =new mongoose.Schema({
    expanseDate : {
        type: Date,
        required: true
    }, 
    expansestype : {
        type: String ,
        required:true
    }, 
    details : {
        type:String,
        required: true
    }, 
    amount : {
        type: String,
        required: true
    }, 
    PaymentDetails : {
        type : String,
        require : true
    },
    date : {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model("expansesmodel", expansesModel)