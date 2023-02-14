const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    number: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

  
    orders:[
        {
                
        } 
    ],

    createdAt: {
        type: Date,
        default: Date.now
    },

})


userSchema.methods.generateToken = async function(){
    
    const token = await jwt.sign({id:this._id}, "thisiaasecretkeytoprotectthatstufffromheckers");
    return token;
}


userSchema.methods.addorder = async function(order){
    try{

        this.orders = this.orders.concat(order)
        await this.save();
    }

    catch(err){
        console.log("mess schmea err " , err);
    }
}


userSchema.pre('save', async function (next) {


    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 12);
    }

   
    next();

})


const user = mongoose.model("user", userSchema);
module.exports = user;