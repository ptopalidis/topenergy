const mongoose = require('mongoose');



const quoteSchema = new mongoose.Schema({


    name:{
        type:String
    },
    phone:{
        type:String
    },
    email:{
        type:String
    },
    date:{
        type:Date
    }
});


module.exports = mongoose.model("Quote",quoteSchema, "Quotes");