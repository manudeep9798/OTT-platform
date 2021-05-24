const Movies=require('../models/movies-model')

const test=async(req,res)=>{
    const body=await req.body;
    res.send(body)
}




module.exports={
    test,
}