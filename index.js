require('dotenv').config()
const passport=require('passport')
require("./controller/passport-setup")
const express=require("express");
const path=require("path");
const session=require("express-session")
const cookieSession=require("cookie-session")
const hbs=require("hbs");
const app=express();
const templatepath=path.join(__dirname , "./frontend")
const collection =require("./controller/app");
app.use(express.urlencoded({extended:false}))
app.use(express.json());
//this file for linking static files such as css
app.use(express.static('public'))
app.set("view engine","hbs");
app.set("views",templatepath);
app.get('/',(req,res)=>{
    res.render("login")
})
//here /login is the rout
app.get('/login',(req,res)=>{
    res.render("index")
})
app.get('/signin',(req,res)=>{
    res.render("signin")
})
app.get('/index',(req,res)=>{
    res.render("index")
})
app.get('/success',(req,res)=>{
    res.render("index",{
        name:req.user.name,
        email:req.user.emails[0].value,
        pic:req.user.photos[0].value
    })
})
app.use(cookieSession({
    name:'tuto-session',
    keys:['key1','key2']
}))
app.use(passport.initialize())
app.use(passport.session({
    secret:'some-secret',
    cookie:{maxAge:30000},
    saverUninitialized:false
}))
//this command get user photo and mail 
app.get('/google', passport.authenticate('google',{scope:['profile','email']}));
app.get('/google/callback',passport.authenticate('google',{failureRedirect:'/failed'})
,function(req,res){
    res.redirect('/success');
})
app.post('/signin',async(req,res)=>
{
    try{
        const data={
            name:req.body.name,
            mobnumber:req.body.mobnumber,
            address:req.body.address,
            email:req.body.email,
            password:req.body.password,
            conformpassword:req.body.conformpassword
        }
        if (data.password!=data.conformpassword)
        {
           res.render("signin",{
            message:"both field have same password !"
           })
        }
        else{
            await collection.insertMany([data]);
            res.render('index',{
                name:req.body.name,
                email:req.body.email,
                address:req.body.address,
                mobnumber:req.body.mobnumber,
                password:req.body.password,
                conformpassword:req.body.conformpassword
            })
        }
       
    }
    catch(e){
        console.log(e);
        
    }
})
app.post('/login',async (req,res)=>{
    try
    {
     const check=await collection.findOne({mobnumber:req.body.mobnumber})
     console.log(check);
     if (check==null){
        res.render("login",{
            message:"please enter currect password"
         })
     }
     if (check.password===req.body.password)
    {
     res.render('index',{
        name:check.name,
        email:check.email,
        address:check.address,
        mobnumber:check.mobnumber,
    })
    }
    else
    {
     res.render("login",{
        message:"please enter currect password"
     })
    }
    }
    catch(e){
     console.log(e)
    }
 })
 const port=process.env.PORT
app.listen(port,()=>{
    console.log("port is connected :",port)
})
