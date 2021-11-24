const mongoose = require("mongoose");

var mongoDBURL = 'mongodb+srv://sangtran:nonstop001@nodeapi.hq1hm.mongodb.net/react-hotel'

mongoose.connect(mongoDBURL , {useUnifiedTopology:true , useNewUrlParser:true})

var dbconnect = mongoose.connection

dbconnect.on('error' , ()=>{
    console.log(`Mongo DB Connection Failed`);
})

dbconnect.on('connected' , ()=>{
    console.log(`Mongo DB Connection Successfull`);
})

module.exports = mongoose