const cors =  require("cors");
const express = require('express');

const mongoose = require('mongoose');

const app = express();

app.use(express.json());

app.use(cors());

const connect = ()=>{

    return mongoose.connect("mongodb+srv://ranarajat:Nike21uno@cluster0.hu9dj.mongodb.net/newUser?retryWrites=true&w=majority");

}

const userSchema = new mongoose.Schema({
    id:{type:String,required:false},
    name:{type:String,required:false},
    email:{type:String,required:false},
    role:{type:String,required:false}

},{
    versionKey:false,
    timestamps:true
})

const User = mongoose.model("user",userSchema);


app.post("/users",async(req,res)=>{
       const Data = await User.create(req.body);
       res.send(Data);
})
app.get("/users",async(req,res)=>{
    const page = +req.query.page;
    const size = +req.query.size;
   
    const skip = (page-1)*size;
    const Data = await User.find().skip(skip).limit(size).lean().exec();
    const totalPages = Math.ceil((await User.find().countDocuments())/size);
    
    res.send(Data);
    
})

app.get("/users/search/:n",async(req,res)=>{
const x = req.params.n;
if(x.includes("@")){

    const data = await User.find({email:{$eq:req.params.n}}).lean().exec();
    res.send(data);

}
else{
    const data = await User.find({name:{$eq:req.params.n}}).lean().exec();
    res.send(data);

}


})

app.listen(2345,function(){
    connect();
    console.log("Listening on port 2345");
})

