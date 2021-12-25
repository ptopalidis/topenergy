//Models
const GlassQuoteModel = require("../Models/glassQuote.model");
const UserModel = require("../Models/user.model")

//Libraries
const nodemailer = require("nodemailer")

exports.postGlassQuote = async(req,res)=>{

    var user = await UserModel.findOne({_id:req.body.user});

    await GlassQuoteModel.create(req.body,async (err,glassQuote)=>{
        if(err){
            res.send({error:err})
            return;
        }
        console.log(process.env.SMTP_HOST)
        var transporter = nodemailer.createTransport({
            host:process.env.SMTP_HOST,
            port:process.env.SMTP_PORT,
            secure:true,
            auth:{
                user:process.env.SMTP_USER,
                pass:process.env.SMTP_PASS
            }
        })

     
        await transporter.sendMail({
            from:process.env.MAIL_FROM,
            to:process.env.MAIL_ADMIN,
            subject:"Νέο αίτημα καταχώρησης συνδυασμού",
            text:"Χρήστης: " + user.name + "\n" + "Τηλέφωνο: " + user.phone + "\n" + "Αίτημα: " + glassQuote.quoteText 
        },(mailErr,info)=>{
            if(mailErr){
                console.log(mailErr)
                res.send({error:"Υπήρξε ένα πρόβλημα κατά την αποστολή."})
                return;
            }
            res.send({err:null})
        })
        

    })
}