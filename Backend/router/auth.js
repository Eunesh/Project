const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();
require('../db/conn');
const User = require("../models/userSchema");
const bcrypt = require('bcryptjs');
const authenticate = require('../middleware/Authenticate');
const cookieParser = require("cookie-parser");
const axios = require('axios');

router.use(cookieParser());

router.get("/", (req, res)=>{
    res.send("Hellow from server");
})

router.post('/register', async (req, res)=>{
    const {name, email, password} = req.body;  // 
    //console.log(name);

    try{
        if (!name || !email || !password){
            return res.status(422).json({ error: "Empty" })
 
        }
        const userExist = await User.findOne({email:email})

        if(userExist) {
            return res.status(422).json({ error: "Email already Exist" })
        }

        const user = new User({ name, email, password});

        const userRegister = await user.save()

        if (userRegister) {
            res.status(200).json({message: "user registered successfuly"});
        }


    } catch(err){
        console.log(err)
    }

})


router.post('/login', async (req, res)=>{
 try{
    const {email, password} = req.body;
    //console.log(password);

    if(!email || !password){
        return res.status(400).json({message: "Please fill the data"})
    }

    const userLogin = await User.findOne({email:email})
    //console.log(userLogin);


    if (userLogin){
        //console.log(userLogin.password)
    
        const isMatch = await bcrypt.compare(password, userLogin.password)  //comparing Password in database and password we get after login from user
        const token = await userLogin.generateAuthToken();
       //console.log(token)
        
        res.cookie("jwtoken", token, {
            expires:new Date(Date.now() + 25892000000),
            httpOnly:true,
            // sameSite: 'none', 
            // secure: true
        })
        if (isMatch){
        res.status(200).json({message: "Login sucessfull"})
       
        //console.log(token);
        } else{
        res.status(400).json({message: "Invalid Crediantials"})
        }

    }else{
        res.status(400).json({message: "Invalid Crediantials"})
    }

 } catch(err) {
    console.log(err);
 }
    
})

// Membership Page

router.get('/membership', authenticate , (req,res)=>{
    //res.send("Hellow from membership side")
    res.send(req.rootUser)
  
})

router.get('/logout', (req,res)=>{
    res.clearCookie('jwtoken', { path: '/'})
    res.status(200).send('UserLogout')
  
})

// for khalti payment verification
router.post('/verify_payment', (req,res)=>{
    try{
        const {token, amount} = req.body;
        // console.log(token);
        // res.send("ok got it")
        let data = {
            "token": token,
            "amount": amount
          };
          
          let config = {
            headers: {'Authorization': 'Key test_secret_key_5c35ed14b804428b87fcc547855605b6'}
          };
          
          axios.post("https://khalti.com/api/v2/payment/verify/", data, config)
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });


    }catch(err){

    }
})


module.exports= router;


