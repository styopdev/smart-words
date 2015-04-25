module.exports = function() {
    var mongoose = require("mongoose");
    var Schema   = mongoose.Schema;

    var QuestionSchema = new Schema({
        text: String,
        answers: [String],
        rightAnswer: Number
    });
    return mongoose.model('Questions', QuestionSchema);
};