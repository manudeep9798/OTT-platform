const express=require('express');
const router = express.Router();
const passport=require('passport')
const adminRouteController=require('../controllers/Admin-route-controller')


//test route
//get api
router.get('/test',passport.authenticate('jwt',{session:false}),adminRouteController.test)

//register route
//post api
router.post('/register',adminRouteController.register)

//login route
//POST API
router.post('/login',adminRouteController.login)

//add movies route
//POST API
module.exports=router;