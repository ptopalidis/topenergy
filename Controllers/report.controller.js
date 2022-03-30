//Models
const ReportModel = require("../Models/report.model");
const GlassModel = require("../Models/glass.model")
const UserModel = require("../Models/user.model")
//Libraries
const fs =require("fs")
const ejs = require('ejs');
const path = require("path");
var wkhtmltopdf = require('wkhtmltopdf');
const nodemailer = require("nodemailer")
const jsreport = require('@jsreport/jsreport-core')()
jsreport.use(require('@jsreport/jsreport-ejs')())
jsreport.use(require('@jsreport/jsreport-chrome-pdf')())
jsreport.init()

exports.postReport = async(req,res)=>{

    await ReportModel.create(req.body,(err,report)=>{
        if(err){
            res.send({error:err});
            return;
        }
        res.send({error:null,report:report})
    });

   
}

exports.getAllReports = async(req,res)=>{
    var reports = await ReportModel.find();

    res.send({reports:reports})
}

exports.getReports = async(req,res)=>{

    var reports = await ReportModel.find(req.query);


    res.send({reports:reports});
}

exports.getReport = async(req,res)=>{
    var report = await ReportModel.findOne({_id:req.params.reportID});

    res.send({report:report});
}

exports.updateReport = async(req,res)=>{
    await ReportModel.updateOne({_id:req.params.reportID},req.body,(err)=>{
        if(err){
            res.send({error:err})
            return
        }
        res.send({error:null})
    })
}

exports.reportPDF = async(req,res)=>{
    var report = await ReportModel.findOne({_id:req.params.reportID});
    var glass = await GlassModel.findOne({_id:report.glass});
    var user = await UserModel.findOne({_id:report.user})

  

   // res.sendFile("tmp.pdf")
    ejs.renderFile(path.join(__dirname,"..","Templates","reportTemplate.ejs"),{report:report,glass:glass,user:user},(err,result)=>{
        /*if(err){
            console.log(err)
            res.send({error:err})
            return;
        }
        res.setHeader('Content-type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename='+"report.pdf"+';');
      
        jsreport.render({
            template: {
                content: result,
                engine: 'ejs',
                recipe: 'chrome-pdf',
                chrome:{
                    timeout:"600000",
                    format:'A4',
                    marginTop: '0.25in',
                    marginRight: '0.5in',
                    marginBottom: '0.25in',
                    marginLeft: '0.5in'
                }
            },
            data: { name: 'jsreport' }
        }).then((out) => {
            res.send(out.content)
        });*/
    
       if(err){
            console.log(err)
           res.send({error:err})
            return;
        }
        res.setHeader('Content-type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename='+"report.pdf"+';');
        wkhtmltopdf(result).pipe(res);
    })
}

exports.reportEmail = async(req,res)=>{
    var report = await ReportModel.findOne({_id:req.params.reportID});
    var glass = await GlassModel.findOne({_id:report.glass});
    var user = await UserModel.findOne({_id:report.user})

    ejs.renderFile(path.join(__dirname,"..","Templates","reportTemplate.ejs"),{report:report,glass:glass,user:user},async (err,result)=>{
        if(err){
            console.log(err)
            res.send({error:err})
            return;
        }
        res.setHeader('Content-type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename='+"report.pdf"+';');
        

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
            to:req.body.email,
            subject:"Δήλωση απόδοσης " + report._id,
            attachments:[{
                filename:"Δήλωση απόδοσης " + report._id +".pdf",
                content:  wkhtmltopdf(result),
                encoding:"base64"
            }]
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