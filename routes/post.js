const express=require('express');
const router=express.Router();
const post_controller=require('../controllers/post_controller');
const passport=require('../config/passport_local_strategy');
router.post('/create',passport.checkAuthentication,post_controller.create);
router.get('/destroy/:id',passport.checkAuthentication,post_controller.destroy);
module.exports=router;