const jwt = require('jsonwebtoken');
const express = require("express");
const cron = require('node-cron');
const router = express.Router();
require('../db/conn');
const User = require("../models/userSchema");
const membersInformation = require("../models/MembersInfoSchema");
const Payment_information = require("../models/paymentSchema");
const bcrypt = require('bcryptjs');
const authenticate = require('../middleware/Authenticate');
const PaymentAuthenticate = require('../middleware/PaymentAuthenticate');
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
            //res.cookie("registoken",'cookie after registration' );
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
        // const token = await userLogin.generateAuthToken();
       //console.log(token)
        
        // res.cookie("jwtoken", token, {
        //     expires:new Date(Date.now() + 25892000000),
        //     httpOnly:true,
        //     // sameSite: 'none', 
        //     // secure: true
        // })
        if (isMatch){
            const token = await userLogin.generateAuthToken();

            res.cookie("jwtoken", token, {
                expires:new Date(Date.now() + 25892000000),
                httpOnly:true,
            })


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
router.post('/verify_payment', authenticate,  async (req,response)=>{
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
          
          const res = await axios.post("https://khalti.com/api/v2/payment/verify/", data, config)
          console.log(res.data.user.name);
          console.log(String(res.data.amount));
          console.log(res.status)

          if (res.status === 200){
            const payment_details = res.data.user.name;
            const amount = res.data.amount;

            const exactUser = await User.findOne({_id: req.userID});

            //console.log(exactUser);
            if (exactUser){
                const sendPayment = await exactUser.addPaymen(payment_details, amount);
                await exactUser.save();
                response.status(201).send('Payment Successfull')


            }
            // const amount = String(price)
            // const paymentInformation = new Payment_information({ payment_details, amount});
            // const Payment = await paymentInformation.save()

            // let pay_token = jwt.sign({details:payment_details, price:amount}, process.env.SECRET_KEY_PAYMENT);
            // console.log(pay_token);

            // response.cookie("paymentoken", pay_token, {
            //     expires:new Date(Date.now() + 25892000000),
            //     httpOnly:true,
            //     // sameSite: 'none', 
            //     // secure: true
            // })




        //    if (Payment) {
        //     console.log("stored")
        //     response.status(200).json({message: "Payment Successfull"})
        //    }else{
        //     response.status(400).json({message: "Payment  unsucessfull"})
        //    }



          }
    }catch(err){
        console.log(err)

    }
})

router.post('/membershipInfo', authenticate, async (req, res)=>{
    try {
        const { firstName, lastName, phoneNumber, age, address } = req.body;
        const paymentChecking = await User.findOne({_id: req.userID});
        console.log(paymentChecking.payments.length);

        if (paymentChecking.payments.length > 0) {
            const members_Information = new membersInformation({ firstName, lastName, phoneNumber, age, address });
            const membersinfo = await members_Information.save()

            // const activePayments = paymentChecking.payments.filter(payment => payment.MembershipEnd >= new Date());
            // //console.log(activePayments);
            // // If all the payments have expired, delete the payments array
            // if (activePayments.length === 0) {
            //     paymentChecking.payments = [];
            //   }
            // await paymentChecking.save()

            if (membersinfo) {
                res.status(200).json({ message: "You have successfully joined our gym membership" });
            }
            } else {
                res.status(404).json({ message: "You need to complete your payment" });
             }

        // deleting payments field after Membership expired.
        const deleteExpiredMembership = async ()=>{
            const activePayments = paymentChecking.payments.filter(payment => payment.MembershipEnd >= new Date());
            //console.log(activePayments);
            // If all the payments have expired, delete the payments array
            if (activePayments.length === 0) {
                paymentChecking.payments = [];
              }
            await paymentChecking.save()
        }

        // Schedule the function to run daily at midnight
         cron.schedule('* * * * *', deleteExpiredMembership);        


    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports= router;


