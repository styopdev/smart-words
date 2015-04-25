var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

var UserSchema = new Schema({
    username : String,
    rate     : Number,
    socId    : String,
    socType  : {type: String, enum: ['twitter', 'fb']}
});
module.exports = mongoose.model('Users', UserSchema);
