module.exports.home=function(req,res){
    console.log(req.cookies);
    res.cookie('user_id',7); //to change the values of cookies
    return res.render('home',{
        title: "Codial home"
    });
}
