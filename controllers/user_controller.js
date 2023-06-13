const User=require('../models/user');
module.exports.profile=function(req,res){
    if(req.cookies.user_id){
      User.findById(req.cookies.user_id)
      .then(user=>{
        if(user){ 
          return res.render('user_profile',{
            title:"User-profile",
            user:user 
          });
        }
        return res.redirect('/user/sign-in');
      })
    }
    else{
      return res.redirect('/user/sign-in');
    }
}

//render the signup page
module.exports.signup=function(req,res){
    return res.render('user_signup',{
        title:"Codial | signup"
    });
};
 //render the sign in page
module.exports.signin=function(req,res){
    return res.render('user_signin',{
        title:"Codial | signin"
    });
};

//get the signup data

module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.render('back');
    }
    User.findOne({ email: req.body.email })
  .then(function(user){
    if (!user) {
      return User.create(req.body)
        .then( function() {
          return res.redirect('/user/sign-in');
        })
        .catch(function(err){
          console.log('Error in creating user during sign up:', err);
          // Handle the error
        });
    } else {
      return res.render('back');
    }
  })
  .catch(function(err) {
    console.log('Error in finding the user:', err);
    // Handle the error
  });
}
//sign in and create a session for the user

module.exports.createSession=function(req,res){
    //steps to authenticate
    //find the user
    User.findOne({email:req.body.email})
    .then(user=>{
      //handle user found
      if(user){
        //handle password which dont match
        if(user.password!=req.body.password){
          return res.redirect('back');
        }
        //handle session creation
        res.cookie('user_id',user.id);
        return res.redirect('/user/profile');
      }
      else{
        //handle user not found
        return res.redirect('back');
      }
    })
    .catch(err=>{
      console.log('Error in signing Up',err);
    });
}