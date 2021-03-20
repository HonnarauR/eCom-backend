//importing the required
const express=require('express');
const {response} =require('express');
const mongoose = require('mongoose');
const User=require("./api/models/user");

const DB_URI="mongodb+srv://honnaraju:H1%40onnaraju@cluster0.jyz1s.mongodb.net/eCom_backend?retryWrites=true&w=mejority"
//Globle level middleWare
const app=express();
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex:true
    })
    .then(()=>console.log("mongoDB is connected"))
    .catch(err=>console.log(err));

//api level middleware
app.use(express.json());
app.use(
    express.urlencoded({
        extended:true
    })
);


app.post('/userData',(req,res,next)=>{
   
    const user=new User({
        _id : new mongoose.Types.ObjectId(),
        userName : req.body.userName,
        email : req.body.userEmail,
        password : req.body.userPassword
    });
    
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
})

app.get("/",(req,res,next)=>{
    res.end("Hello form main url")
})

app.get("/userName",(req,res,next)=>{
    res.status(200)
    res.send("honnaraju")
    res.end();
})

app.post("/sum",(req,res)=>{
    let n1 = req.body.num1;
    let n2 = req.body.num2;
    res.status(200);
    res.send(`Addition of these numbers = ${n1+n2}`);
    res.end();
})

const PORT=process.env.PORT || 4000;
app.listen(PORT,()=>{
    return console.log(`backend started in Port - ${PORT}`);
})