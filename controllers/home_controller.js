const Post=require('../models/post');
const User=require('../models/user'); 
const { populate } = require('../models/user');
module.exports.home= async function(req,res){
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
    try {
        const posts = await Post.find({})
        .sort('-createdAt')
          .populate('user')
          .populate({ path: 'comments', populate: { path: 'user' } });
      
        const users = await User.find({});

        return res.render('home', {
          title: 'Codial | Home',
          posts: posts,
          all_user: users,
        });
      } catch (err) {
        console.log('error in fetching posts', err);
      }
    
    
}

