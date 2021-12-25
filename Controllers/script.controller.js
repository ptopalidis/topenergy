const GlassModel = require("../Models/glass.model");
const csv = require('csv-parser')
const fs = require('fs')


exports.insertGlassesFromCsv = async(req,res)=>{

    var results = [];

    fs.createReadStream('./Files/glasses.CSV')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', async () => {
    for(var result of results){
        await GlassModel.create({name:result.NAME,ug:result.UG,lt:result.LT,g:result.G})
    }
  });
}

exports.countGlasses = async(req,res)=>{
    GlassModel.count({}, function(err, count){
        console.log( "Number of docs: ", count );
    });
}