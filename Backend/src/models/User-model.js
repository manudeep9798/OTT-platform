const mongoose= require('mongoose');

const user= new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
    },
    plan:{
        type:String,
        default:'NAN'
    },
    likedVideos:{
        type:Array
    },
    watchedVideos:{
        type:Array
    },
    watchList:{
        type:Array
    },
    loggedIn:{
        type:Boolean,
        default:false
    }


})


const User= mongoose.model('User', user);

module.exports= User;