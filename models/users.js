var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

var UserSchema = new Schema({
    username : String,
    rate     : Number,
    userId   : String,
    email    : String,
    locale   : String,
    gender   : String,
    rating   : Number,
    socType  : {type: String, enum: ['fb', 'google', 'twitter']}
});
module.exports = mongoose.model('Users', UserSchema);
