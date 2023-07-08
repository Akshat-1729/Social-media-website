const express=require('express');
const router=express.Router();
const userAPI=require('../../../controllers/api/v1/user_api');
router.use('/create-session',userAPI.createSession);



module.exports=router;