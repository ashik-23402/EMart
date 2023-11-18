const mongoose = require('mongoose');

const connectdb = ()=>{
    mongoose.connect(process.env.dbURL).then(data=>console.log("database connected"))
    .catch(err=>console.log("connection failed with database"));
}


module.exports=connectdb;