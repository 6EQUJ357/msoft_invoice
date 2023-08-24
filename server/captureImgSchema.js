let mongoose = require("mongoose");

let captureImgModel =new mongoose.Schema({
    photo : {
        type: String,
        required: true,

    },
    date : {
        type: Date,
        default: Date.now

    }
})

module.exports = mongoose.model("captureImgModel", captureImgModel);