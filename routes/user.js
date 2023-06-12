const express=require('express');
const router=express.Router();
const user_control=require('../controllers/user_controller');
console.log('user controller loaded');
router.get('/profile',user_control.profile);
router.get('/sign-up',user_control.signup);
router.get('/sign-in',user_control.signin);
module.exports=router; 