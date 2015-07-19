var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

var GameSchema = new Schema({
    userId   : Schema.Types.ObjectId,
    category : {type: String, enum: ['puzzles', 'sayings', 'quotations']},
    levels   : [Number],
    curLevel : Number,
    hintNum  : Number,
      : Number
});
module.exports = mongoose.model('Games', GameSchema);