const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const conversationSchema = new Schema({
    participants : [{type:Schema.Types.ObjectId,ref:"User",}],
    messages : [{type:Schema.Types.ObjectId,ref:"Message",default:[]}],
},{timestamps:true});

module.exports = mongoose.model('chatConvos',conversationSchema);