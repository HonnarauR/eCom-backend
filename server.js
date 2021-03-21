//importing the required
const express=require('express');
const {response} =require('express');
const mongoose = require('mongoose');

const userRoutes = require('./api/routes/user');

const DB_URI="mongodb+srv://honnaraju:H1%40onnaraju@cluster0.jyz1s.mongodb.net/eCom_backend?retryWrites=true&w=majority"
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

//it will be saving the data in Data Base
// app.post('/user',)
//We are passing the control to userRoutes.
app.use("/user",userRoutes);

app.get("/",(req,res,next)=>{
    res.end("Hello form main url")
})



const PORT=process.env.PORT || 4000;
app.listen(PORT,()=>{
    return console.log(`backend started in Port - ${PORT}`);
})