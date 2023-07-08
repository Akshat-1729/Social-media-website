const User=require('../../../models/user');
const jwt=require('jsonwebtoken');

module.exports.createSession=async function(req,res){
    try{
        let user=await User.findOne({email:req.body.email});
        if(!user||user.password!=user.body.password){
            return res.json(422,{
                message:'Invalid user name or password'
            })
        }
        return res.json(200,{
            message:'Sign in Successfull here is your token ',
            data:{
                token:jwt.sign(user.toJSON(),'codeial',{expiresIn:1000})
            }
        })
    }
    catch(err){
        console.log('********error',err);
        return res.json(500,{
            message:'Internal server error'
        })
    }
  }
  