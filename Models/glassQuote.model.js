const mongoose = require('mongoose');



const glassQuoteSchema = new mongoose.Schema({

    user:{
        type:String
    },
    quoteText:{
        type:String
    }

});


module.exports = mongoose.model("Glass Quote",glassQuoteSchema, "Glass Quotes");