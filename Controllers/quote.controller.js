const QuoteModel = require("../Models/quote.model");



exports.postQuote = async(req,res)=>{

    await QuoteModel.create(req.body,(err,quote)=>{
        if(err){
            res.send({error:"Υπήρξε ένα πρόβλημα. Παρακαλώ δοκιμάστε αργότερα."})
            return;
        }

        res.send({error:null});
    });

    
}