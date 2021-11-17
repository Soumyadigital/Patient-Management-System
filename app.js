require('dotenv').config();
const express = require("express")
const app = express()
const path = require("path");
const ejs = require("ejs");
const nodemailer = require("nodemailer")
const expressLayout = require('express-ejs-layouts')


require("./src/db/conn")

const User = require("./src/models/user");
const port = process.env.PORT || 3000;
const static_path = path.join(__dirname, "./public");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(expressLayout)
app.use(express.static(static_path));
app.set("view engine", "ejs");


const transport = nodemailer.createTransport(    
    {
        service:"gmail",
        auth:{
            user : "imsoumyajitmondal@gmail.com", 
            pass : process.env.PASS  
        },
        tls:{
            rejectUnauthorized:false
        }
        
    }
);

app.get("/",(req,res)=>{
    res.render("home");
})
app.get("/add",(req,res)=>{
    res.render("adduser")
})
app.post("/add",async(req,res)=>{
    try {
        const username = req.body.username
        const dob = req.body.dob
        const IdNumber = req.body.IdNumber
        const InternalId = process.env.SECRET+IdNumber 
        const adduser = new User({
            InternalId:InternalId,
            username:username,
            dob:dob,
            gender : req.body.gender,
            phone : req.body.phone,
            email : req.body.email,
            occupation : req.body.occupation,
            Idtype : req.body.Idtype,
            IdNumber : IdNumber
        })
        const addeduser = await adduser.save();
        res.status(201).render("useradded",{InternalId:InternalId}); 
        const mailOptions ={
            from :'"You are Registered on PMS" <imsoumyajitmondal@gmail.com>',             
            to :adduser.email,
            subject :"You are Registered on PMS",
            html:`<h2> Congratulations You are Registered on PMS</h2>
                <h4>You will get your all PMS related notice on mail </h4>
               `
    };

        transport.sendMail(mailOptions,function(error,info){
            if(error){
                console.log(error);
            }else{
                console.log("verification Email sent" + info.response);
            }
        });

    } catch (error) {
        console.log(error)
    }
})

app.get("/dashboard",async(req,res)=>{
    const Users = await User.find({})
    res.render("dashboard",{userdata:Users})
})

app.listen(port,()=>{console.log("server is running on port 3000")})