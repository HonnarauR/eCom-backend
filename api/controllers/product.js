const mongoose = require('mongoose');
const Product = require('../models/products');


exports.show_all_products = (req,res)=>{
    Product.find()
    .exec()
    .then(docs=>{
        console.log("Inside docs")
        console.log(docs)
        const allProducts = {
            count : docs.length,
            Products : docs.map(doc=>{
                return{
                    name : doc.productName,
                    category : doc.category,
                    phoneNumber : doc.phoneNumber
                }
            })
        }

        if(docs.length>0){
            console.log("count > 0")
             return  res.status(200).json(allProducts)
        }else{
            console.log("products not found")
           return res.status(500).json({
                error : "No user found"
            })
        }
    })

    .catch(err=>{
        res.status(500).json({
            error : err
        })
    })
}


exports.add_product = (req,res)=>{
    console.log("request to add product");

    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        productName : req.body.name,
        category : req.body.category,
        phoneNumber : req.body.number
    })

    product.save()
    .then(result=>{
        console.log("product in result suction")
        console.log(result);
        res.status(201).json({
            message : "Product added.",
            Result : result
        })
    })
    .catch(err=>{
        console.log("product in Error section")

        console.log(err);
        res.status(500).json({
            message : "Unable to add Product",
            Error : err
        })
    })
}
