require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');
const bcrypt= require("bcryptjs")
const cors =require("cors");
const jwt = require('jsonwebtoken');
const app=express();
swaggerJsdoc = require("swagger-jsdoc"),
swaggerUi = require("swagger-ui-express");

app.use(cors());
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Movie World Express API with Swagger",
      version: "0.1.0",
      description:
        "This is an API made for the MOVIEWORLD app with NodeJs and Express",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Movie World",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5000/login",
      },
    ],
  },
  apis: ["./routes/user.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*'); // to enable calls from every domain 
//   res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE'); // allowed actiosn
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 

//   if (req.method === 'OPTIONS') {
//     return res.sendStatus(200); // to deal with chrome sending an extra options request
//   }

//   next(); // call next middlewer in line
// });




app.use(express.static("Public"));
app.use(express.json());

mongoose.connect( "mongodb://localhost:27017/movieApp",{useUnifiedTopology:true, useNewUrlParser:true},(err)=>{
  if (!err) {
    console.log("Mongo Server Connected Successfully");
  }
});
mongoose.set("useCreateIndex", true);
mongoose.set('useFindAndModify', false);




const userSchema= new mongoose.Schema({
    fullName: String,
    username:String,
    password:String,
    movie: []
});

const User = mongoose.model('User',userSchema);

const auth=(req, res, next)=>{
    const token = req.headers['x-auth-token'];
    if(!token){
      res.status(401).json({msg: 'No token, authorization denied'});
    }else{
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
        if (err){
          console.log(err);
          res.status(400).json({msg: 'Token not valid'})
        }
        else{
          // res.status(200).json({msg: 'Valid token'});
          req.user=decoded;
          next();
        }
      });
      
      
      
    }
}


  app.post('/login',(req, res)=>{

    const {email, password}=req.body;

    const user = new User({
        username:email,
        password:password
      });
      
      User.findOne({username:email},(err, foundUser)=>{
      if(err){
        console.log(err);
      }else{
        if (!foundUser) {
          res.json({msg:"User does not exist"});
        } else {
            bcrypt.compare(user.password, foundUser.password).then(result=>{
              if (result) {
                jwt.sign({id: foundUser.id, name: foundUser.fullName}, process.env.JWT_SECRET,{expiresIn:36000}, (err, token)=>{
                  if(err){
                    console.log(err);
                  }else{
                    res.json({
                      token,
                      user:{
                      id: user.id,
                      name:user.fullName,
                      email: user.username

                    }})
                  }
                })
              }else{
                res.json({msg:"Incorrect password"})
              }
            })
          
        }
      }
      })
    
});
app.post('/register',(req, res)=>{

  const {email:username, password, fName, lName}=req.body;
 const fullName=fName+" "+lName;
 const user = new User({
    fullName,
    username,
    password
 });
    User.findOne({username},(err, foundUser)=>{
      if (err) {
        console.log(err);
      } else {
        if (foundUser) {
          res.json({msg:'User already exist'})
        } else {
          bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(user.password, salt, (err, hash)=>{
              if (err) {
                console.log(err);
              } else {
                user.password=hash;
                user.save((err)=>{
                  if (err) {
                    console.log(err);
                  } else {
                    jwt.sign({id: user.id, name: user.fullName}, process.env.JWT_SECRET,{expiresIn:36000}, (err, token)=>{
                      if(err){
                        console.log(err);
                      }else{
                        res.json({
                          token,
                          user:{
                          id: user.id,
                          name:user.fullName,
                          email: user.username
                        }})
                      }
                    })
                    
                  }
              });
              }
            })
          })
          
        }
      }
    })
});

app.get('/user', auth, (req, res)=>{
  User.findById(req.user.id).select('-password').then(user=>{
    res.json(user)
  })
});

app.post('/', auth, (req, res)=>{
  const {movie} = req.body;
    User.findOneAndUpdate({_id:req.user.id},{$push: {movie:movie}}, (err, foundUser)=>{
      if (err) {
        console.log(err);
      } else {
        if(!foundUser){
          res.json({msg: "User does not exist"});
        }else{
          
              res.json({msg:"Successful"})
            
            //  
          
        }
      }
    })
});

app.post('/del', auth, (req, res)=>{
  // console.log(req.user.id);
  const {movie} = req.body;
  // User.findOne({movie:movies},(err, result)=>{
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log(result)
  //   }
  // });
    User.findOneAndUpdate({_id:req.user.id},{$pull: {movie:movie}}, (err, foundUser)=>{
      if (err) {
        console.log(err);
      } else {
        if(!foundUser){
          res.json({msg: "User does not exist"});
        }else{
          
              res.json({msg:"Successful"})
            
            //  
          
        }
      }
    })
});

app.get('/fav',auth,(req, res)=>{
    User.findById((req.user.id),(err, user)=>{
      if (err) {
        console.log(err);
      } else {
        res.json(user.movie)
      }
    });
});

app.delete('/:id',auth, (req, res)=>{

});
app.listen(5000, ()=>{
    console.log("server running on port 5000");
});
