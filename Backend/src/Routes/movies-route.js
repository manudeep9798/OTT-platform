const express=require('express');
const router = express.Router();
const moviesRouteController= require('../controllers/Movies-route-controller')
//test route
//GET API
router.get('/test',moviesRouteController.test)

//add Movies
//POST movies
router.post('/')




module.exports=router;