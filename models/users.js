var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

var UserSchema = new Schema({
    username : String,
    rate     : Number,
    socId    : String
});
module.exports = mongoose.model('Users', UserSchema);
