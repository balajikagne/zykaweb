const mongoose=require("mongoose")
require("dotenv").config()
mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("connection is successfully")
})
.catch((e)=>{
    console.log(e)
})

const loginschema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"this field is required !"]
    },
    email:{
        type:String,
        required:[true,"this field is required !"]
    },
    address:{
        type:String,
        required:[true,"this field is required !"]
    },
    mobnumber:{
        type:Number,
        required:[true,"this field is required !"]
    },
    password:{
        type:String,
        required:[true,"this field is required !"]
    },
    conformpassword:{
        type:String,
        required:[true,"this field is required !"]
    }
})

const collection=new mongoose.model("collection",loginschema);
module.exports=collection;
