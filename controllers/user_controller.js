module.exports.profile=function(req,res){
    return res.render('user_profile',{});
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

module.exports.create=function(res,req){
    
}