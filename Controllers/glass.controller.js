const GlassModel = require("../Models/glass.model");
const UserGlassModel = require("../Models/userGlass.model")

exports.getAllGlasses = async(req,res)=>{
    var glasses = await GlassModel.find({userID:null});
    var userGlasses = await GlassModel.find({userID:req.query.userID});


    res.send({glasses:[...glasses,...userGlasses]})
}

exports.getGlasses = async(req,res)=>{

    var glasses = await GlassModel.find(req.query);
   

    res.send({glasses:glasses})
}


exports.postGlass = async(req,res)=>{

    await GlassModel.create(req.body,(err,glass)=>{
        if(err){
            res.send({error:err});
            return;
        }
        res.send({error:null});
    })
}

exports.postUserGlass = async(req,res)=>{

    await UserGlassModel.create(req.body)
    res.send({error:null});
}