let mongoose = require("mongoose");

let QuotationTransactionModel = mongoose.Schema({
    quotationno : {
        type : String,
        require : true
    },
    dateofpurchase : {
        type : String,
        require : true
    },
    paymentstatus : {
        type : String,
        require : true
    },
    vendorname : {
        type : String,
        require : true
    },
    vendorGSTno : {
        type : String,
        require : true
    },
    vendoremail : {
        type : String,
        require : true
    },
    vendornumber :{
        type : String,
        require : true
    },
    vendoraddress : {
        type : String,
        require : true
    },
    paymentmethod : {
        type : String,
        require : true
    }, 
    holdername :  {
        type : String,
        require : true
    }, 
    cardnumber : {
        type : String,
        require : true
    },
    subtotal : {
        type : String,
        require : true
    }, 
    SGST : {
        type : String,
        require : true
    }, 
    CGST : {
        type : String,
        require : true
    }, 
    totalAmount : {
        type : String,
        require : true
    }, 
    rows : {
        type : Array,
        require : true
    },
    date : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model("QuotationTransactionModel", QuotationTransactionModel)