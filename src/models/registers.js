const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({

    image:{
        type:String
    },
    type:{
        type:String,
        require:true
    },
    fullname : {
        type:String,
        require:true
    },

   email : {
        type:String,
        require:true,
        unique:true
    },

    password :{
        type:String,
        require:true
        
    },

    confirmpassword :{
        type:String,
        require:true
    },

    about:{
        type:String

    }
})

// we need to create a Collection

const User = new mongoose.model("User", userSchema );
module.exports= User;