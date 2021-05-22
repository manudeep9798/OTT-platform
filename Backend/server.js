const express= require('express');
const cors=require('cors');
const env =require('dotenv') 
const mongoose=require('mongoose')
const adminRoutes=require('./src/Routes/adminRoutes')
const passport=require('passport')
const jwt=require('jsonwebtoken')
// const userRoutes=require('./src/Routes/user-routes')
const bodyParser= require('body-parser');
env.config();

const connStr=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rky1z.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`

const app= express();

const startConfig= async()=>{
    await app.use(cors());
    await app.use(bodyParser.urlencoded({extended:false}));
    await app.use(bodyParser.json());
    app.use(passport.initialize());
    require('./src/config/passport')(passport);
}

const startServer=async()=>{
    
    await startConfig();
    
    console.log('initilizing DB');
    await mongoose.connect(connStr,{useNewUrlParser:true,useUnifiedTopology: true })
    .then(()=>{console.log('connected to mongoDB')})
    .catch((err)=>console.log(err));
    mongoose.connection.on('error',(err)=>console.log(err.message))
    app.post('/api/reg',(req,res)=>{
        console.log(req.body);
        res.send(req.body);
    })
    
    const server =await app.listen(process.env.PORT)
    app.use('/api/admin',adminRoutes)
    // app.use('/api/user',userRoutes)
    server.on('error',(err)=>console.log(err.message))
    
}
startServer()
.then(()=>{console.log('server started on',process.env.PORT)})
.catch((err)=>console.log(err.message));



