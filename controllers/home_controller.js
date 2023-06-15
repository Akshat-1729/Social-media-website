const Post=require('../models/post');
module.exports.home=function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id',7); //to change the values of cookies
    Post.find({}).
    then(posts=>{
        return res.render('home',{
        title: "Codial | Home",
        posts:posts
        });
    })
    
}

