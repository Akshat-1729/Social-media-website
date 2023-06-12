const mongoose= require('mongoose');
mongoose.connect('mongodb://127.0.0.1/codeial_development');
const db=mongoose.connection;
db.on('error',console.error.bind("error connecting to database"));
db.once('open',function(){
    console.log('Connected to database:: MongoDB');
})
module.exports=db;