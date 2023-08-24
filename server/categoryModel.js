let mongoose = require("mongoose");

let CategoryModel = new mongoose.Schema({
    producttype : {
        type : String,
        required: true,
        unique:true
    },
    Date : {
        type :Date,
        default :  Date.now
    }
})

module.exports = mongoose.model("CategoryModel", CategoryModel);