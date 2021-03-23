const mongoose = require('mongoose');

const productSchema=mongoose.Schema({

    _id : mongoose.Schema.Types.ObjectId,
    productName :{
        type : String,
        required : true
    },
    category : {
        type : String,
        required:true
    },
    phoneNumber :{
        type:String
    }
})

module.exports = mongoose.model("Product",productSchema);