const express=require('express');
const User=require('../models/user-model')
const config=require('../config/config')
const client =require("twilio")(config.accountSID,config.authToken)
const keys=require('../config/Keys')
const jwt=require('jsonwebtoken')
//test route
//GET api
const test=(req,res)=>{
    res.json(req.body)
}
//generate OTP
//GET API
const generateOtp=async(req,res)=>{
    let id='';
    let phone="";
    if((req.body.phone===undefined)&&(req.body.email!==undefined)){
        id=req.body.email
        res.send(id)
    }else{
        id=req.body.phone
    }
    User.findOne({phone:id}).then(user=>{
        if(user){
            client 
            .verify
            .services(config.serviceID)
            .verifications
            .create({
                 to: `+91${req.body.phone}`,
                 channel:`sms`
            }).then(data=>{res.status(200).json(data)})
            .catch(err=>{res.json(err.message)})
        }else{
            res.end('user not found')
        }
    })
    

    
}

//verify OTP
//GET API
const verifyOtp=async(req,res)=>{
    client
    .verify
    .services(config.serviceID)
    .verificationChecks
    .create({
        to: `+91${req.body.phone}`,
        code:req.body.code
    })
    .then(data=>{
        if(data.status==="approved"){
            const payLoad={
               phone:`+91${req.body.phone}`
            }
            jwt.sign(payLoad,keys.secretOrKey,{expiresIn:3600},(err,token)=>{
                if(err){
                    return res.status(400).send('error : ',err.message)
                }
                // User.findOne({phone:req.body.phone}).then(user=>{

                // })
                res.json({
                    success:true,
                    token:'User '+token,
                })
      })   
        }
       
    }).catch(err=>{
        res.json(err.message)
    })
}

//register route
//POST API
const register=async(req,res)=>{
    await User.findOne({email:req.body.email}).then(user=>{
        if(user){
            res.send("user already present")
        }else{
            const email=req.body.email;
            const phone=req.body.phone;
            const name=req.body.name;
            const newUser=new User({
                name:name,
                email:email,
                phone:phone
            })
            newUser.save().then(user=>{
                res.json(user)
            }).catch(err=>{
                res.json(err.message)
            })
        }
    })

    


}



module.exports={
    test,
    generateOtp,
    register,
    verifyOtp,
   
}