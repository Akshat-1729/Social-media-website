const express=require('express');
const router=express.Router();
const homeController=require('../controllers/home_controller');
console.log("router loaded");
router.get('/',homeController.home);
router.use('/user',require('./user'));
router.use('/post',require('./post'));
//for any further routes , access from here
//router.use('/routerName',require());
module.exports=router;
