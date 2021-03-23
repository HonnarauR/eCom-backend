//importing the required
const express=require('express');
const app=express();

const {response} =require('express');
const mongoose = require('mongoose'); 
//setting up database
const DB_URI="mongodb+srv://honnaraju:H1%40onnaraju@cluster0.jyz1s.mongodb.net/eCom_backend?retryWrites=true&w=majority"
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex:true
})
.then(()=>console.log("mongoDB is connected"))
.catch(err=>console.log(err));

//Importing routes
const productRoutes = require('./api/routes/product')
const userRoutes = require('./api/routes/user');


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

app.use("/products",productRoutes);


const PORT=process.env.PORT || 4000;
app.listen(PORT,()=>{
    return console.log(`backend started in Port - ${PORT}`);
})