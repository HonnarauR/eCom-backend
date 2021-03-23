const bcrypt=require('bcrypt');
const mongoose = require('mongoose');
const jwt=require("jsonwebtoken");
const User=require("../models/user");
// const user = require('../models/user');

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
                 password : hash,
                 accessLevel : req.body.accessLevel
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
         return res.status(500).json({
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


 exports.login = (req,res,next)=>{
    //check if userEmail is present in dataBase
    console.log(req.body)
    User.find({
        email : req.body.email.toLowerCase()
    })
     .exec()
     .then((docs)=>{
        console.log(docs);
        if(docs.length==0){
            // console.log("Error handled 0 size")
            res.status(401).json({
                message : "auth failed",
            })
        }

        bcrypt.compare(req.body.password,docs[0].password,(err,success)=>{
            if(err){
                // console.log("Error handled - password missmatch")
               return res.status(401).json({
                    message : "auth failed",
                })
            }
            if(success){
                console.log("Succuss");

                const LoggedInUser = jwt.sign({
                    user_Id : docs[0]._id,
                    email : docs[0].email
                },"JWT_HR_SECRET_KEY",{expiresIn : "1h"})

                return res.status(200).json({
                    message : "login successful",
                    token : LoggedInUser,
                    accessLevel : docs[0].accessLevel
                    
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

 exports.update_user = (req,res,next)=>{
     const id = req.params.userId
     console.log(id);
    //  res.status(200).json({
    //      message : "placating"
    //  })

    User.updateOne({_id : id},{ $set:{
        accessLevel : req.body.accessLevel
    }}).exec()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            message : "User updated"
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error : err
        })
    })
 }