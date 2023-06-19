const Comment=require('../models/comment');
const Post=require('../models/post');

module.exports.create = async function(req, res) {
  try {
    const post = await Post.findById(req.body.post);

    if (!post) {
      console.log('Post not found');
      return res.redirect('/');
    }

    const comment = await Comment.create({
      content: req.body.content,
      post: req.body.post,
      user: req.user._id
    });

    post.comments.push(comment);
    await post.save(); 

    res.redirect('/');
  } catch (err) {
    console.log('Error in creating comment', err);
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
          await post.save();
        }
      }
  
      return res.redirect('back');
    } catch (err) {
      console.log('Error in destroying comment', err);
      return res.redirect('back');
    }
  };

