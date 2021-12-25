const  UserModel = require('../Models/user.model');

//Libraries
const fs = require("fs");
const path = require("path");

exports.getUser = async(req,res)=>{
    var user = await UserModel.findOne({_id:req.params.userID});
    console.log(user)
    res.send({user:user});
}

exports.postUserLogin = async(req,res)=>{
 
    const user = await UserModel.findOne({username:req.body.username});

    if(user){
        if(user.password != req.body.password){
            res.send({error:"Λάθος κωδικός"})
        }
        else{
            res.send({error:null,user:user})
        }
    }               
    else{
        res.send({error:"Ο χρήστης δεν βρέθηκε"})
    }
}

exports.updateUser = async(req,res)=>{

    var logo = null;
    var user = JSON.parse(req.body.user);

    if(req.files){
        if(!fs.existsSync(path.join(__dirname,"../Media","Users",req.params.userID))){
            fs.mkdirSync(path.join(__dirname,"../Media","Users",req.params.userID))
        }
        logo = Object.values(req.files)[0];

        var existingLogo = fs.readdirSync(path.join(__dirname,"../Media","Users",req.params.userID));
        for(var file of existingLogo){
            fs.unlinkSync(path.join(__dirname,"../Media","Users",req.params.userID,file));
        }
        logo.mv(path.join(__dirname,"../Media","Users",req.params.userID,logo.name))
        user.logo = process.env.SERVER_HOST +"/" +  "Media" + "/" + "Users" + "/" + req.params.userID + "/" + logo.name;
    }

   

    await UserModel.updateOne({_id:req.params.userID},user,(err,user)=>{
        if(err){
            res.send({error:err})
            return;
        }
        res.send({error:null})
    })


 
}