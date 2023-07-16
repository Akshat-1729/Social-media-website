const Comment=require('../models/comment');
const Post=require('../models/post');
const commentsMailer=require('../mailers/commentsmailers');

module.exports.create = async function(req, res) {
  try {
    let post = await Post.findById(req.body.post);
    if(post){
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id
      });
      post.comments.push(comment);
      post.save(); 
      comment = await comment.populate('user', 'name email');
      commentsMailer.newComment(comment);
      if(req.xhr){
        return res.status(200).json({
          data:{
            comment:comment
          },
          message:'Comment created!'
        })
      }
      req.flash('success', 'Comment published!');
      res.redirect('/');
    }
  } catch (err) {
    req.flash('error', err);
    return;
  }
};
module.exports.destroy = async function (req, res) {
    try {
      // Find the comment and remove it from the database
      let comment = await Comment.findOneAndDelete({
        _id: req.params.id,
        user: req.user.id
      });
   
      if (comment) {
        // Find the post that contains the comment
        let post = await Post.findById(comment.post);
  
        if (post) {
          // Remove the comment from the array of comments in the post
          post.comments.pull(comment._id);
          //save the updated post to persist changes in DB
          post.save();
          if(req.xhr){
            return res.status(200).json({
              data:{
                comment_id:req.params.id
              },
              message:'Comment deleted'
            })
          }
        }
        req.flash('success', 'Comment deleted!');
        return res.redirect('back');
      }
    } catch (err) {
      req.flash('error', err);
      return res.redirect('back');
    }
  };

