var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

var QuestionSchema = new Schema({
    text: String,
    answers: [String],
    rightAnswer: String,
    level: Number,
    category : {type: String, enum: ['puzzles', 'sayings', 'quotations']}
});
module.exports = mongoose.model('Questions', QuestionSchema);
