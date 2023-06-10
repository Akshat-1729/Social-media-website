const express=require('express');
const router=express.Router();
const user_control=require('../controllers/user_controller');
console.log('user controller loaded');
router.get('/profile',user_control.profile);
module.exports=router; 