const mongoose= require('mongoose');

const DirectorsSchema = new mongoose.Schema({
   name:{
       type:String,
       required:true
   },
   directorsId:{
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

const Directors= mongoose.model('directors', DirectorsSchema);

module.exports= Directors;