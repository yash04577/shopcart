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

    createdAt: {
        type: Date,
        default: Date.now
    },

})


userSchema.methods.generateToken = async function(){
    
    const token = await jwt.sign({id:this._id}, "thisiaasecretkeytoprotectthatstufffromheckers");
    // console.log("schem ", token)
    return token;
}


userSchema.pre('save', async function (next) {


    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 12);
        console.log("pre method")
    }

   
    next();

})


const user = mongoose.model("user", userSchema);
module.exports = user;