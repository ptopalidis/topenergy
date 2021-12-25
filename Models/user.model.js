const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({


    username: {
        type:String
    },
    password: {
        type:String
    },
    name:{
        type:String
    },
    address:{
        type:String
    },
    phone:{
        type:String
    },
    logo:{
        type:String
    },
    ceYear:{
        type:String
    }

});


module.exports = mongoose.model("User",userSchema, "Users");