const mongoose = require('mongoose');



const  userGlassSchema = new mongoose.Schema({


    name:{
        type:String
    },
    ug:{
        type:String
    },
    lt:{
        type:String
    },
    g:{
        type:String
    },
    userID:{
        type:String
    }
});


module.exports = mongoose.model("UserGlass",userGlassSchema, "UserGlasses");