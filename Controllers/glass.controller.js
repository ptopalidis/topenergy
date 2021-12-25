const GlassModel = require("../Models/glass.model");

exports.getAllGlasses = async(req,res)=>{
    var glasses = await GlassModel.find();

    res.send({glasses:glasses})
}

exports.getGlasses = async(req,res)=>{

   
    var glasses = await GlassModel.find(req.query);
    console.log(glasses)
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