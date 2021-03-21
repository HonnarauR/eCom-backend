// const express = require('express');
const bcrypt=require('bcrypt');
const User=require("../models/user");
const mongoose = require('mongoose');

exports.signup=(req,res,next)=>{
    // console.log("i am inside signup");
     bcrypt.hash( req.body.userPassword,10,(err,hash)=>{
         if(err){
             return res.status(500).json({
                 error:err
             })
         }else{
             const user=new User({
                 _id : new mongoose.Types.ObjectId(),
                 userName : req.body.userName,
                 email : req.body.userEmail,
                 password : hash
             });
            //  console.log(user);
             user.save()
             .then(result=>{
                 console.log(`this is the result ${result}`);
                 res.status(201).json({
                     message:"User Created",
                     user:result
                 });
             })
             .catch(err=>{
                 res.status(500).json({
                     message: "unable to Create User",
                     Error:err
                 })
             });
         }
     
     })
 }

 exports.get_all_user= (req,res,next)=>{
    User.find()
    .exec()
    .then(docs=>{
        // console.log(docs);
        const response={
            count : docs.length,
            user : docs.map(doc=>{
                return {
                    email : doc.email,
                    _id : doc.id,
                    userName : doc.userName,
                    password : doc.password
                }
            }) 
        }
        if(docs.length>0){
           return res.status(200).json(response);
        }
        else{
         return res.status(404).json({
                message : "No user found !"
            })
        }
    })
    .catch(err=>{
        console.error(err);
        res.status(500).json({
            error:err
        })
    })
 }

 exports.login = (req,res)=>{
    // const usreData=[]; 

    // const handleError = ()=>{
    //     res.status(401).json({
    //         message : "user not found / password missmatch",
    //     })
    // }

    User.find({
        email : req.body.email.toLowerCase()
    })
     .exec()
     .then((docs)=>{
        console.log(docs);
        if(docs.length==0){
            // handleError;
            console.log("Error handled 0 size")
            res.status(401).json({
                message : "user not found / password missmatch",
            })
        }
        
        bcrypt.compare(req.body.password,docs[0].password,(err,sucsuss)=>{
            if(err){
                console.log("Error handled - password missmatch")
               return res.status(401).json({
                    message : "user not found / password missmatch",
                })
            }
            if(sucsuss){
                console.log("Succuss");

                return res.status(200).json({
                    message : "logged in"
                })
            }
        })
     })
     .catch((err)=>{
        //  handleError();
        console.log("Error handled - error while finding userdata")

        return res.status(401).json({
            message : "user not found / password missmatch",
        })
     })
 }