const mongoose = require('mongoose');



const reportSchema = new mongoose.Schema({

    user:{
        type:String
    },
    code:{
        type:String
    },
    glass:{
        type:String
    },
    date:{
        type:Date
    }

});


module.exports = mongoose.model("Report",reportSchema, "Reports");