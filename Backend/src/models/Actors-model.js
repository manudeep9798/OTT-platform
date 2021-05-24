const mongoose= require('mongoose');

const ActorsSchema = new mongoose.Schema({
   name:{
       type:String,
       required:true
   },
   ActorId:{
        type:String,
        required:true
   },
   age:{
       type:String,
       required:true
   },
   movies:{
       type:Array,
       required:true
   }
})

const Actors= mongoose.model('actors', ActorsSchema);

module.exports= Actors;