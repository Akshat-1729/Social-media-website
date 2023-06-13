const express=require('express');
const router=express.Router();
const passport=require('passport');
const user_control=require('../controllers/user_controller');
console.log('user controller loaded');
router.get('/profile',user_control.profile);
router.get('/sign-up',user_control.signup);
router.get('/sign-in',user_control.signin);
router.post('/create',user_control.create);
//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'user/sign-in'},
),user_control.createSession);
module.exports=router; 