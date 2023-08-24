let mongoose = require("mongoose");

const salesPaymentsSchema = mongoose.Schema({
    dateOfPayment : {
        type : String,
        require : true
    },
    invoiceno : {
        type : String,
        require : true
    },
    vendorname : {
        type : String,
        require : true
    },
    totalAmount : {
        type : String,
        require : true
    },
    receiveAmount : {
        type : String,
        require : true
    },
    PayAmount : {
        type : String,
        require : true
    },
    paymentmethod : {
        type : String,
        require : true
    },
    paymentstatus : {
        type : String,
        require : true
    },
    holdername : {
        type : String,
        require : true
    }, 
    cardnumber : {
        type : String,
        require : true
    },
    TranscationID : {
        type : String,
        require : true
    },
    date : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model("salesPaymentsSchema", salesPaymentsSchema);