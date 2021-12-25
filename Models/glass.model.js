const mongoose = require('mongoose');



const glassSchema = new mongoose.Schema({


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
    }
});


module.exports = mongoose.model("Glass",glassSchema, "Glasses");