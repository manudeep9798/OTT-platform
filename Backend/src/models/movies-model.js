const mongoose=require('mongoose');

const moviesSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    moviesId:{
        type:String,
        required:true
    },
    coverPic:{
        type:String,
        required:true
    },
    likes:{
        type:String,
    },
    directorsId:{
        type:Array,
        required:true
    },
    comments:{
        type:Array
    },
    geners:{
        type:String,
        required:true
    },
    language:{
        type:Array,
        required:true
    },
    actors:{
        type:Array,
        required:true
    },
    rating:{
        type:String,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    series:{
        type:Boolean,
        default:false
    },
    latest:{
        type:Boolean,
        default:false
    }

})

module.exports=Movies=mongoose.model('movies', moviesSchema);