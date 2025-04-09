const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const bcrypt   = require('bcrypt');
const validator = require('validator');

//Defining User Schema :
const userSchema = new Schema({
    username   : {type:String,required:true},
    fullname   : {type:String,required:true},
    password   : {type:String,required:true},
    gender     : {type:String,required:true,enum:["male","female"]},
    profilePic : {type:String,default:""}
});
//Signup Statics function
userSchema.statics.signup = async function(username,fullname,password,gender) {
    if (!username || !fullname || !password) {
        throw Error("All Fields must be filled!");
    }
    if (!validator.isStrongPassword(password)){
        throw Error("Password ain't string enough!");
    }
    const exists = await this.findOne({username});
    if (exists) {
        throw Error("User already exists!")
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);
    const bPic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const gPic = `https://avatar.iran.liara.run/public/girl?username=${username}`
    const user = await this.create({username,fullname,password:hash,gender,profilePic:gender==='male'?bPic:gPic});
    return user
}
//Login Statics function
userSchema.statics.login  = async function(username,password) {
    if (!username || !password) {
        throw Error("All fields must be filled!");
    }
    const user = await this.findOne({username});
    if (!user) {
        throw Error("User doesn't exist or wrong username");
    }
    
    const match = await bcrypt.compare(password,user.password);
    if (!match) {
        throw Error("Wrong Password!")
    }
    return user;
}

module.exports = mongoose.model('chatuser',userSchema);