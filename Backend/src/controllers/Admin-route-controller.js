const express=require('express');
const User=require('../models/Admin-model')
const bcrpyt=require('bcryptjs')
const keys=require('../config/Keys')
const jwt=require('jsonwebtoken')

//test route
//GET api
const test=(req,res)=>{
    res.json(req.body)
}

//register route for admin user
//post API
const register=async(req,res)=>{
    let password=req.body.password
    bcrpyt.genSalt(10,(err,salt)=>{
        bcrpyt.hash(req.body.password,salt,(err,hash)=>{
            if(err){
                throw err;
            }
            else{
                const newUser=new User({
                    email:req.body.email,
                    password:hash
                })
                newUser.save().then(user=>{
                    res.send(user)
                }).catch(err=>{
                    res.send(err.message)
                })
            }
        })
    })
    console.log(password);
    

}

//login for admin user
//post API
const login=async(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    User.findOne({email:email}).then(user=>{
        bcrpyt.compare(password,user.password)
        .then(isMatch=>{
            if(!isMatch){
                res.send('invalid credentials')
            }
            const payLoad={
                id:user._id,
                email:user.email
            }
            jwt.sign(payLoad,keys.secretOrKey,{expiresIn:3600},(err,token)=>{
                if(err){
                    return res.status(400).send('error : ',err.message)
                }
                res.json({
                    success:true,
                    token:'Bearer '+token,
                })
      })            
        })
    })
}

module.exports={
    test,
    register,
    login
}