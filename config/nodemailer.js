// nodemailer
// config
// mailers
// template
const nodemailer=require('nodemailer');
const ejs=require('ejs');


let transporter=nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:'akttt2929@gmail.com',
        pass:'akshat2929'
    }
});
let renderTemplate=(data,relativePath)=>{
    let mailHtml;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){console.log('error in rendering template');return}
            mailHtml=template;
        }
    )
    return mailHtml;
}
module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}