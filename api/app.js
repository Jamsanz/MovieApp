const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');;

const app=express();



app.use(express.static("Public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    secret:"Our little secret.",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect( "mongodb://localhost:27017/movieApp",{useUnifiedTopology:true, useNewUrlParser:true});
mongoose.set("useCreateIndex", true);

const userSchema= new mongoose.Schema({
    fullname: String,
    email:String,
    password:String
});
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
const User = mongoose.model('User',userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });


app.get('/api',(req, res)=>{
    res.sendFile();
});
app.post('/config',(req, res)=>{
  console.log(req.body);
    const email=req.body.email;
 const password=req.body.password;
 const fName= req.body.fName;
 const lName=req.body.lName;
 const fullname=fName+" "+lName;
     User.register({username:email}, password).then(resp=>{
      cons0le.log(resp.json())
      res.send(resp.json())
    }).catch(err=>console.log(err));
 
 console.log(email+" "+password);
});

app.listen(5000, ()=>{
    console.log("server running on port 5000");
});