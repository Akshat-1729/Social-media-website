const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const Avatar_Path=path.join('/uploads/users/avatars');
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true 
    },
    avatar:{
        type:String 
    }
},{
    timestamps:true
});
//this defines the destination of storing the file
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(__dirname,'..',Avatar_Path));
    },
    //this func sets the filename
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

  //static methods
userSchema.statics.uploadedAvatar=multer({storage:storage}).single('avatar');
userSchema.statics.avatarpath=Avatar_Path;
const User=mongoose.model('User',userSchema);
module.exports=User;