// npm install passport-google-oauth
// npm install crypto
const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');


//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID:'480009700020-40o8htp19f8riprjobcrbqunn84omaeb.apps.googleusercontent.com',
    clientSecret:'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',
    callbackURL:'http://localhost:7000/user/auth/google/callback',
},async function(accessToken,refreshToken,profile,done){
    //find a user
    try{
    const user=await User.findOne({email:profile.emails[0].value}).exec();
        
        console.log(profile);
        if(user){
            //if found set this user as req.user
            return done(null,user);
        }else{
            //if not found, create the user and set it as req.user
            const newUser=await User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            }
        );
        return done(null,newUser);
        }
    }
    catch(err){
        console.log('Error in google strategy-passport', err);
        return done(err);
    }
    
}
))