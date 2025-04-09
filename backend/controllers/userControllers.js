const User = require('../models/userModel')
const getUsersForSiderbar = async (req,res) => {
    try {
        const loggedInUserId = req.user._id;
        //ne means not equal [ie., we r getting all the users except the loggedin user];
        const allUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        res.status(200).json(allUsers);
    } catch (error) {
        console.log('Error in getUsersForSidebar: ',error.message);
        res.status(500).json({error:"Internal Server Error"})
    }
};

module.exports = {getUsersForSiderbar};