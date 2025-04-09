const User = require('../models/userModel');
const jwt  = require('jsonwebtoken');
const createToken = (id) => {
    return jwt.sign({_id:id},process.env.SEC,{expiresIn:"3d"});
}

//Login Controller : 
const loginUser = async (req,res) => {
    const {username,password} = req.body;
    try {
        const user = await User.login(username,password);
        const token = createToken(user._id);
        res.status(200).json({...user,token});
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}
//signup controller : 
const signupUser = async (req,res) => {
    const {username,fullname,password,gender} = req.body;
    try {
        const user = await User.signup(username,fullname,password,gender);
        const token = createToken(user._id);
        res.status(200).json({...user,token});
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

module.exports = {loginUser,signupUser};