const express = require('express');
const app = express();
const mongoose = require('mongoose'); 
const path = require('path'); 
const bodyParser = require ('body-parser');
const passport = require ('passport');
const cors = require('cors');

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use(cors());
app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());

const user = require('./routes/users');
const config = require('./config/database');
const connection = mongoose.connect(config.database);
if(connection){
    console.log("db connected");
}else{
    console.log("db not connected");
}


app.listen(3000,function(){
  console.log("listening to port 3000");
});

app.use('/user',user);
app.get("",function(req,res){
  res.send("hello baby");
});

// app.get("/user",function(req,res){
//   res.send("hello");
// });


