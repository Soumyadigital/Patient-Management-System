const mongoose = require("mongoose")
const validator = require("validator")

//Schema 
const userSchema = new mongoose.Schema({  
    InternalId:{
        type:String,
        minlength:6
    },
    username: {
        type:String,
        minlength:2,
        maxlength:100
    },
    dob:{
        type:String
    },
    gender:{
        type:String,
        minlength:2
    },
    phone:{
        type:Number,
        minlength:10
    },
    email:{
        type:String,
        validate(value){
            if(!validator.isEmail(value)){        // Using Installed Validator (To know more go to npm validator page)
                throw new Error('Invalid Email');
            }
        }
    },
    occupation:{
        type:String
    },
    Idtype:{
        type:String,
        minlength:2,
        maxlength:100
    },
    IdNumber:{
        type:String,
        minlength:2
    }
});

const User = new mongoose.model("User",userSchema);

module.exports = User;

