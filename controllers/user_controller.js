const User=require('../models/user');
module.exports.profile=async function(req,res){
  try{
    User.findById(req.params.id)
    .then(user=>{
      return res.render('user_profile',{
        title:'User Profile',
        profile_user:user
      })
    })
  }catch(e){
    console.log('Error occured at profile',e);
  }
}

module.exports.update=async function(req,res){
    if(req.user.id==req.params.id){
      try{
        let user =await User.findByIdAndUpdate(req.params.id);
        User.uploadedAvatar(req,res,function(err){
          if(err){console.log('*******Multer',err)}
          user.name=req.body.name;
          user.email=req.body.email;
          if(req.file){
            //this is saving the path of uploaded file into the avatar field os user
            user.avatar=User.avatarpath+'/'+req.file.filename;
          }
          user.save();
          return res.redirect('back');
        })
      }catch(err){
        console.log("error is",err)
        return res.redirect('back');
      }
    }
      
    else{
      req.flash('error','Unauthorized');
      return res.status(401).send('Unauthorized');
    }

  
}

//render the signup page
module.exports.signup=function(req,res){
  if(req.isAuthenticated()){
    return res.redirect('/user/profile');
  }  
    return res.render('user_signup',{
        title:"Codial | signup"
    });
};
 //render the sign in page
module.exports.signin=function(req,res){
  if(req.isAuthenticated()){
    return res.redirect('/user/profile');
  }  
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
  req.flash('success','Logged in successfully');
  return res.redirect('/');
}
module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.log('Error logging out:', err);
      return res.redirect('/');
    }
    req.flash('success','You have Logged out!');
    return res.redirect('/');
  });
};