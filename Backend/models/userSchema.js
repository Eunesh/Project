const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    date:{
        type: Date,
        default: new Date(+new Date() + 7*24*60*60*1000)
    },
    isPaid: {
        type: Boolean,
        default: false // default value is false
      },
    payments:[
        {
            payment_details: {
                type: String,
                required: true,
            },
            amount: {
                type: Number,
                required: true,
        
            },
            Type: {
                type: String,
        
            },
            MembershipEnd:{
                type: Date,
                default: new Date(+new Date() + 200000)
            },
        }

    ],
    tokens: [
        {
            token: {
                type: String,
                required:true
            }
        }
    ]

})

// we are hashing the password here
userSchema.pre('save', async function (next){
    if (this.isModified('password')){
        this.password =  bcrypt.hashSync(this.password, 12);
    }
    next();
});


//Creating token 
userSchema.methods.generateAuthToken = async function () {
    try{
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        return token
    } catch(err){
        console.log(err);
    }
}

// storing the payment 
userSchema.methods.addPaymen = async function (payment_details, amount, Type) {
    try{
        this.payments = this.payments.concat({payment_details, amount, Type});
        await this.save();
        return this.payments;
    } catch(err){
        console.log(err);
    }
}



// collection creation
const User = mongoose.model('USER', userSchema );

module.exports = User;