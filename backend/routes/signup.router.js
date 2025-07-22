
const express = require('express')
const authModel= require('../Schema/signup.schema')
const bcrypt = require('bcrypt')
const router1 = express.Router()
require('dotenv').config()
const jwt = require('jsonwebtoken');
const secretkey = process.env.SECRET_KEY;

router1.post('/signup', async(req, res)=>{
   console.log(req.body);
   const{name, email, password}= req.body;

  try {
    let user = await authModel.findOne({email:email});

    if(user){
      res.status(400).send({
          success:false,
          message:"email has already exit"
      })
    }
  
    let salt = await bcrypt.genSalt(10);
    console.log(salt, 45);
  
    const hashPass = await bcrypt.hash(password, salt);
  
    console.log(hashPass);
  
    user = await authModel.create({
      name: name,
      email: email,
      password: hashPass,
    });
  
    res.send({
      success:true,
      message:"account create successfully",
      userData:user
    });
  
  } catch (error) {
    res.send({
      success:false,
      message:"internal server error"
    })
  }
})

//login proces ======================================================================

router1.post('/login',async(req, res)=>{

  const{email, password} = req.body;

try {
   let user = await authModel.findOne({email:email});
   console.log(user)
   if(!user){
    res.status(400).send({
      success:false,
      message:"email does not exit",
    })
   }

   const isMatch = await bcrypt.compare(password, user.password);
   console.log(isMatch);
   if(!isMatch){
    res.status(400).send({
      success:false,
      message:"invalid email or password",
    })
   }

   const data = {
    id: user._id,

   }
   const token = jwt.sign(data, secretkey);

   console.log(token)

   res.send({
    success:true,
    message:"login successfully",
    userData: user,
    token:token,
   });

} catch (error) {
  res.status(500).send({
    success:false,
    message:"login unsuccessfully",
    error: error
  });
}
})



module.exports = router1;