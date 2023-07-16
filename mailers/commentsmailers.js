const nodemailer=require('../config/nodemailer');


//this is another way of exporting
exports.newComment=(comment)=>{
    console.log('inside new comment');
    nodemailer.transporter.sendMail({
        from:'akshatkumar7689@gmail.com',
        to:comment.user.email,
        subject:'new comment published',
        html:'<h1>yup, your comment was published</h1>'
    },(err,info)=>{
        if(err){console.log('error in sending mail',err);return;}
        console.log('message sent',info);
        return;
    })
}