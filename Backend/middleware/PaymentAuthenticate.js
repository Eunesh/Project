const jwt = require("jsonwebtoken");

const PaymentAuthenticate = async (req, res, next)=>{
    try{
        const payment_token = req.cookies.paymentoken;
        const verifyToken = jwt.verify(payment_token, process.env.SECRET_KEY_PAYMENT);


        if(verifyToken){
            next();
        }
        



    }catch(err){
        res.status(401).send('Unauthorized: No token provided')
        console.log(err);
    }

}

module.exports = PaymentAuthenticate
