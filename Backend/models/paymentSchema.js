const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const paymentSchema = new mongoose.Schema({
    payment_details: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,

    },
    // payment_tokens: [
    //     {
    //         payment_token: {
    //             type: String,
    //             required:true
    //         }
    //     }
    // ]
})


//Creating token 
// paymentSchema.methods.generatePaymentToken = async function () {
//     try{
//         let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY_PAYMENT);
//         this.payment_tokens = payment_tokens.concat({payment_token: token});
//         await this.save();
//         return token
//     } catch(err){
//         console.log(err);
//     }
// }


const payment_information = mongoose.model('PAYMENT_INFORMATION', paymentSchema );
module.exports = payment_information;
