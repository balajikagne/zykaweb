const mongoose=require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/registerdata")
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
