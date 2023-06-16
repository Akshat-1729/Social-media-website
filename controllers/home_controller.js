const Post=require('../models/post');
const { populate } = require('../models/user');
module.exports.home=function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id',7); //to change the values of cookies

    // Post.find({}).
    // then(posts=>{
    //     return res.render('home',{
    //     title: "Codial | Home",
    //     posts:posts
    //     });
    // }).
    // catch(err=>{
    //     console.log('Error in fetching posts');
    // })
    //populationg the user of each post
    Post.find({}).populate('user').exec().
    then(posts=>{
        return res.render('home',{
            title:'Codial | Home',
            posts:posts
        });
    })
    .catch(err=>{
        console.log('error in fetching posts');
    })
    
    
}

