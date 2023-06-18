const Post=require('../models/post');
const Comment=require('../models/comment');
module.exports.create=function(req,res){
    Post.create({
        content:req.body.content,
        user:req.user._id
    }).then(()=>{
        return res.redirect('back');
    })
    .catch(err=>{
        if(err){console.log('Error in creating post',err);return;}
    })
}

module.exports.destroy = function(req, res){
    Post.deleteOne({ _id: req.params.id, user: req.user.id })
        .then(() => {
            return Comment.deleteMany({ post: req.params.id });
        })
        .then(() => {
            return res.redirect('back');
        })
        .catch(err => {
            console.log('Error in destroying post', err);
            return res.redirect('back');
        });
};


